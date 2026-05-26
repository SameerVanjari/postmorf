# Postmorf Backend Implementation Plan
## Complete Database Schema Implementation Based on db-schema-doc.md

This plan outlines the step-by-step implementation of the comprehensive database schema described in `db-schema-doc.md`, migrating from the current basic user authentication system to the full social media content transformation platform.

## Overview

**Current State**: Basic user authentication system with email/password storage
**Target State**: Full platform supporting Twitter/X connection, AI-generated LinkedIn content, artifact management, and version history

## Implementation Approach

We'll implement this in logical phases, each building upon the previous one. Each phase includes:
1. Database schema changes
2. SQLModel updates
3. API endpoint additions
4. Integration points
5. Testing considerations

## Phase 1: Foundation - UUIDs & Enhanced User Model

**Goal**: Establish UUID primary keys and enhance the user model with additional profile fields.

### Database Changes
- Alter `users` table to use UUID primary key with `gen_random_uuid()` default
- Add `name` and `avatar_url` columns
- Keep `email` as UNIQUE NOT NULL
- Maintain `created_at` and `updated_at` timestamps

### Model Updates
```python
# app/models/user.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    name: Optional[str] = None
    avatar_url: Optional[str] = None

class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    is_superuser: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Pydantic models remain largely the same but add new fields
```

### API Updates
- Update user creation/update endpoints to handle new fields
- Ensure password hashing is implemented (using bcrypt or similar)

### Dependencies
- `python-uuid` (built-in)
- `bcrypt` or `passlib` for password hashing

### Testing
- Verify UUID generation works correctly
- Test unique constraints on email
- Validate new fields can be null/empty as needed

## Phase 2: Social Accounts Integration

**Goal**: Add ability to connect and manage social media accounts (starting with Twitter/X).

### Database Changes
- Create `social_accounts` table with:
  - UUID primary key
  - Foreign key to users (CASCADE DELETE)
  - Platform field (twitter, linkedin, etc.)
  - Platform-specific user ID and username
  - Display name and profile image URL
  - OAuth token storage (access_token, refresh_token)
  - Last sync timestamp
  - Standard timestamps

### Model Updates
```python
# app/models/social_account.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class SocialAccountBase(SQLModel):
    platform: str = Field(index=True)  # twitter, linkedin
    platform_user_id: str = Field(index=True)
    username: str
    display_name: Optional[str] = None
    profile_image: Optional[str] = None
    access_token: Optional[str] = None  # Encrypt in production
    refresh_token: Optional[str] = None  # Encrypt in production
    last_synced_at: Optional[datetime] = None

class SocialAccount(SocialAccountBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    
    # Relationships
    user: "User" = Relationship(back_populates="social_accounts")
    source_posts: list["SourcePost"] = Relationship(back_populates="social_account")

class User(SQLModel, table=True):
    # ... existing fields ...
    social_accounts: list["SocialAccount"] = Relationship(back_populates="user")
```

### API Endpoints Needed
- POST `/social-accounts/` - Connect new social account
- GET `/social-accounts/` - List user's connected accounts
- GET `/social-accounts/{account_id}` - Get specific account
- PUT `/social-accounts/{account_id}` - Update account (tokens, etc.)
- DELETE `/social-accounts/{account_id}` - Disconnect account
- POST `/social-accounts/{account_id}/sync` - Trigger sync of latest posts

### Dependencies
- Twitter API v2 client library (or similar for other platforms)
- Encryption library for token storage (cryptography, Fernet)

### Testing
- Test OAuth flow simulation
- Verify foreign key constraints work
- Test CASCADE delete behavior
- Validate token encryption/decryption (if implemented)

## Phase 3: Content Fetching & Storage

**Goal**: Store fetched Twitter/X posts and threads from connected accounts.

### Database Changes
- Create `source_posts` table:
  - UUID primary key
  - Foreign key to social_accounts (CASCADE DELETE)
  - Platform post ID (unique per platform)
  - Post type (single, thread)
  - Content text
  - Author username (denormalized for convenience)
  - Source URL (to original post)
  - Posted timestamp
  - Metadata JSONB (engagement metrics, etc.)
  - Raw payload JSONB (full API response)
  - Standard timestamps

- Create `source_post_chunks` table:
  - UUID primary key
  - Foreign key to source_posts (CASCADE DELETE)
  - Platform chunk ID (for individual tweets in thread)
  - Content text
  - Sequence number (order in thread)
  - Created timestamp

### Model Updates
```python
# app/models/source_post.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from sqlalchemy import JSON

class SourcePostBase(SQLModel):
    platform_post_id: str = Field(index=True)
    post_type: str = Field(index=True)  # single, thread
    content: str
    author_username: Optional[str] = None
    source_url: Optional[str] = None
    posted_at: Optional[datetime] = None
    metadata: Optional[dict] = Field(sa_column=JSON)
    raw_payload: Optional[dict] = Field(sa_column=JSON)

class SourcePost(SourcePostBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    social_account_id: uuid.UUID = Field(foreign_key="social_accounts.id", ondelete="CASCADE")
    
    # Relationships
    social_account: "SocialAccount" = Relationship(back_populates="source_posts")
    source_post_chunks: list["SourcePostChunk"] = Relationship(back_populates="source_post")
    generated_posts: list["GeneratedPost"] = Relationship(back_populates="source_post")

class SourcePostChunkBase(SQLModel):
    platform_chunk_id: str = Field(index=True)
    content: str
    sequence_number: int

class SourcePostChunk(SourcePostChunkBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    source_post_id: uuid.UUID = Field(foreign_key="source_posts.id", ondelete="CASCADE")
    
    # Relationships
    source_post: "SourcePost" = Relationship(back_populates="source_post_chunks")
```

### API Endpoints Needed
- GET `/social-accounts/{account_id}/source-posts/` - List fetched posts for account
- GET `/source-posts/{post_id}` - Get specific post with chunks
- GET `/source-posts/{post_id}/chunks` - Get all chunks for a thread post
- POST `/source-posts/{post_id}/generate` - Trigger AI generation from post

### Dependencies
- Twitter API v2 client for fetching posts
- Background job system (Celery/RQ) for async fetching (recommended for production)

### Testing
- Test JSONB field storage and querying
- Verify thread chunk sequencing
- Test foreign key relationships
- Validate content length limits

## Phase 4: AI Generation Pipeline

**Goal**: Store AI-generated LinkedIn content based on source posts.

### Database Changes
- Create `generated_posts` table:
  - UUID primary key
  - Foreign key to source_posts (CASCADE DELETE)
  - Generation prompt used
  - Tone (professional, storytelling, educational, etc.)
  - Content type (linkedin_post, linkedin_article)
  - Generated content text
  - Model name used (for tracking)
  - Generation metadata JSONB (temperature, token usage, etc.)
  - Created timestamp

### Model Updates
```python
# app/models/generated_post.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from sqlalchemy import JSON

class GeneratedPostBase(SQLModel):
    generation_prompt: Optional[str] = None
    tone: Optional[str] = None  # professional, storytelling, educational
    content_type: Optional[str] = None  # linkedin_post, linkedin_article
    generated_content: str
    model_name: Optional[str] = None
    generation_metadata: Optional[dict] = Field(sa_column=JSON)

class GeneratedPost(GeneratedPostBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    source_post_id: uuid.UUID = Field(foreign_key="source_posts.id", ondelete="CASCADE")
    
    # Relationships
    source_post: "SourcePost" = Relationship(back_populates="generated_posts")
    post_artifacts: list["PostArtifact"] = Relationship(back_populates="generated_post")
```

### API Endpoints Needed
- POST `/generated-posts/` - Create new AI generation (typically called from background job)
- GET `/source-posts/{post_id}/generations` - Get all generations for a source post
- GET `/generated-posts/{gen_id}` - Get specific generation
- PUT `/generated-posts/{gen_id}` - Update generation (if editing prompt/params)

### Dependencies
- AI service integration (OpenAI API, Anthropic, or similar)
- Prompt templating system
- Background job system for async generation

### Testing
- Test different tone and content type combinations
- Validate JSONB metadata storage
- Test relationship traversal (source post → generations → artifacts)

## Phase 5: Artifact Management

**Goal**: Store finalized or editable user artifacts derived from AI generations.

### Database Changes
- Create `post_artifacts` table:
  - UUID primary key
  - Foreign key to users (CASCADE DELETE) - who owns the artifact
  - Foreign key to generated_posts (SET NULL) - optional source generation
  - Title (user-defined)
  - Final content text (the user-edited version)
  - Status (draft, finalized, published)
  - Is favorite flag
  - Standard timestamps

### Model Updates
```python
# app/models/post_artifact.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class PostArtifactBase(SQLModel):
    title: Optional[str] = None
    final_content: str
    status: str = Field(default="draft")  # draft, finalized, published
    is_favorite: bool = Field(default=False)

class PostArtifact(PostArtifactBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    generated_post_id: Optional[uuid.UUID] = Field(
        default=None, foreign_key="generated_posts.id"
    )
    
    # Relationships
    user: "User" = Relationship(back_populates="post_artifacts")
    generated_post: Optional["GeneratedPost"] = Relationship(back_populates="post_artifacts")
    artifact_versions: list["ArtifactVersion"] = Relationship(back_populates="artifact")
```

### API Endpoints Needed
- POST `/artifacts/` - Create new artifact (from generation or blank)
- GET `/artifacts/` - List user's artifacts (with filtering by status, favorite)
- GET `/artifacts/{artifact_id}` - Get specific artifact
- PUT `/artifacts/{artifact_id}` - Update artifact (title, content, status)
- DELETE `/artifacts/{artifact_id}` - Delete artifact
- POST `/artifacts/{artifact_id}/favorite` - Toggle favorite status
- GET `/users/{user_id}/artifacts` - Get artifacts for specific user

### Dependencies
- None beyond existing setup

### Testing
- Test status transitions (draft → finalized → published)
- Test favorite toggling
- Validate relationship integrity
- Test filtering and pagination on list endpoints

## Phase 6: Versioning & Feedback

**Goal**: Add version history for artifacts and optional feedback on AI generations.

### Database Changes
- Create `artifact_versions` table:
  - UUID primary key
  - Foreign key to post_artifacts (CASCADE DELETE)
  - Content text (versioned content)
  - Version number (integer, increments per artifact)
  - Created timestamp

- Create `generation_feedback` table (optional):
  - UUID primary key
  - Foreign key to generated_posts (CASCADE DELETE)
  - Rating (integer 1-5)
  - Feedback text
  - Created timestamp

### Model Updates
```python
# app/models/artifact_version.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class ArtifactVersionBase(SQLModel):
    content: str
    version_number: int

class ArtifactVersion(ArtifactVersionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    artifact_id: uuid.UUID = Field(foreign_key="post_artifacts.id", ondelete="CASCADE")
    
    # Relationships
    artifact: "PostArtifact" = Relationship(back_populates="artifact_versions")

# app/models/generation_feedback.py
import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class GenerationFeedbackBase(SQLModel):
    rating: Optional[int] = None  # 1-5
    feedback_text: Optional[str] = None

class GenerationFeedback(GenerationFeedbackBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    generated_post_id: uuid.UUID = Field(foreign_key="generated_posts.id", ondelete="CASCADE")
    
    # Relationships
    generated_post: "GeneratedPost" = Relationship(back_populates="feedback")
```

### API Endpoints Needed
- GET `/artifacts/{artifact_id}/versions` - Get version history for artifact
- GET `/artifact-versions/{version_id}` - Get specific version
- POST `/generated-posts/{gen_id}/feedback` - Submit feedback for generation
- GET `/generated-posts/{gen_id}/feedback` - Get feedback for generation

### Dependencies
- None beyond existing setup

### Testing
- Test version numbering increments correctly
- Verify CASCADE delete removes versions when artifact is deleted
- Test feedback rating constraints (1-5)
- Validate relationship integrity

## Phase 7: API Integration & Refinement

**Goal**: Create cohesive API endpoints that follow the documented flow and handle complex operations.

### Key API Flows to Implement

1. **Connect Twitter/X Account**
   ```
   POST /social-accounts/ → stores account + initiates OAuth
   ```

2. **Sync Latest Posts**
   ```
   POST /social-accounts/{id}/sync → background job fetches posts → stores in source_posts + chunks
   ```

3. **Generate AI Content**
   ```
   POST /source-posts/{id}/generate → background job creates generation → returns generated_post ID
   ```

4. **Create Artifact from Generation**
   ```
   POST /artifacts/ → with generated_post_id → creates artifact from generation
   ```

5. **Update & Version Artifact**
   ```
   PUT /artifacts/{id} → creates new version in artifact_versions
   GET /artifacts/{id}/versions → get version history
   ```

### Background Job Integration
For production readiness, implement background jobs for:
- Social media syncing (Twitter API rate limits)
- AI generation (LLM API calls, can be slow)
- Consider using Celery with Redis/RabbitMQ or similar

### API Response Standards
- Consistent error responses
- Pagination for list endpoints
- Filtering and sorting capabilities
- Proper HTTP status codes

## Phase 8: Testing, Optimization & Deployment

**Goal**: Ensure system reliability, performance, and production readiness.

### Testing Strategy
1. **Unit Tests**: Model validation, helper functions
2. **Integration Tests**: API endpoints with test database
3. **End-to-End Tests**: Full workflows (connect account → sync → generate → artifact)
4. **Performance Tests**: Load testing on critical paths

### Database Optimization
- Verify all recommended indexes are created
- Consider partitioning for high-volume tables (source_posts, artifacts)
- Implement connection pooling
- Add database query logging for slow query detection

### Security Considerations
- Encrypt sensitive fields (OAuth tokens) at rest
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use prepared statements to prevent SQL injection
- Implement proper CORS policies

### Deployment Considerations
- Database migration scripts (using Alembic or similar)
- Environment-specific configuration
- Backup and recovery procedures
- Monitoring and alerting setup
- Health check endpoints

## Migration Strategy from Current State

Since we already have a basic users table, we'll need migration scripts:

### Migration 1: Update Users Table
```sql
-- Add new columns
ALTER TABLE users ADD COLUMN name TEXT;
ALTER TABLE users ADD COLUMN avatar_url TEXT;
-- Change id to UUID (requires data migration)
-- For simplicity in dev, we might recreate; in production use proper migration
```

### Migration 2: Create New Tables
Execute CREATE TABLE statements for all new tables in order of dependency.

### Migration 3: Add Indexes
Create all recommended indexes from the document.

### Migration 4: Add Constraints
Add foreign key constraints and any check constraints (e.g., rating between 1-5).

## Estimated Effort

| Phase | Estimated Time | Dependencies |
|-------|----------------|--------------|
| 1 | 1-2 days | None |
| 2 | 2-3 days | Phase 1 |
| 3 | 2-3 days | Phase 2 |
| 4 | 2-3 days | Phase 3 |
| 5 | 1-2 days | Phase 4 |
| 6 | 1-2 days | Phase 5 |
| 7 | 2-3 days | All previous |
| 8 | 2-3 days | All previous |

**Total**: Approximately 2-3 weeks for full implementation

## Next Steps

1. Begin with Phase 1 (Foundation) to establish UUIDs and enhanced user model
2. Set up development environment with PostgreSQL running locally
3. Create migration scripts for schema changes
4. Implement each phase sequentially with thorough testing
5. Regularly validate against the db-schema-doc.md to ensure alignment

## Success Criteria

When complete, the system should:
1. Support all functionality outlined in db-schema-doc.md
2. Pass all automated tests (unit, integration, e2e)
3. Handle expected load with acceptable performance
4. Securely store sensitive data
5. Provide clear API documentation
6. Be ready for production deployment with proper monitoring

---

This implementation plan provides a roadmap to transform the current basic authentication system into the full-featured social media content transformation platform described in the database schema document.