# PostMorph Database Schema

## Overview

This schema supports:

* User authentication
* Twitter/X account connection
* Fetching latest tweets/threads
* AI-generated LinkedIn content
* Artifact management
* Version history
* Multi-generation workflows

Database:

* PostgreSQL

---

# Tables

---

# 1. users

Stores application users.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

# 2. social_accounts

Stores connected social media accounts.

```sql
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    platform TEXT NOT NULL,
    -- twitter, linkedin (future)

    platform_user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    display_name TEXT,
    profile_image TEXT,

    access_token TEXT,
    refresh_token TEXT,

    last_synced_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

# 3. source_posts

Stores fetched Twitter/X posts and threads.

```sql
CREATE TABLE source_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,

    platform_post_id TEXT NOT NULL,

    post_type TEXT NOT NULL,
    -- single, thread

    content TEXT NOT NULL,

    author_username TEXT,

    source_url TEXT,

    posted_at TIMESTAMP,

    metadata JSONB,

    raw_payload JSONB,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

# 4. source_post_chunks

Stores individual tweets inside a thread.

```sql
CREATE TABLE source_post_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    source_post_id UUID REFERENCES source_posts(id) ON DELETE CASCADE,

    platform_chunk_id TEXT NOT NULL,

    content TEXT NOT NULL,

    sequence_number INT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 5. generated_posts

Stores AI-generated LinkedIn outputs.

```sql
CREATE TABLE generated_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    source_post_id UUID REFERENCES source_posts(id) ON DELETE CASCADE,

    generation_prompt TEXT,

    tone TEXT,
    -- professional
    -- storytelling
    -- educational

    content_type TEXT,
    -- linkedin_post
    -- linkedin_article

    generated_content TEXT NOT NULL,

    model_name TEXT,

    generation_metadata JSONB,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 6. post_artifacts

Stores finalized or editable user artifacts.

```sql
CREATE TABLE post_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    generated_post_id UUID REFERENCES generated_posts(id),

    title TEXT,

    final_content TEXT NOT NULL,

    status TEXT NOT NULL,
    -- draft
    -- finalized
    -- published

    is_favorite BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

# 7. artifact_versions

Stores version history of artifacts.

```sql
CREATE TABLE artifact_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    artifact_id UUID REFERENCES post_artifacts(id) ON DELETE CASCADE,

    content TEXT NOT NULL,

    version_number INT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 8. generation_feedback (Optional)

Stores user feedback on AI generations.

```sql
CREATE TABLE generation_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    generated_post_id UUID REFERENCES generated_posts(id) ON DELETE CASCADE,

    rating INT,
    -- 1-5

    feedback_text TEXT,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# Relationships

```text
users
 └── social_accounts
        └── source_posts
               └── source_post_chunks
               └── generated_posts
                      └── post_artifacts
                             └── artifact_versions
```

---

# Entity Flow

```text
Twitter/X Account
      ↓
Fetched Source Posts
      ↓
AI Generated LinkedIn Variants
      ↓
Saved Artifacts
      ↓
Version History
```

---

# Recommended Indexes

```sql
CREATE INDEX idx_social_accounts_user_id
ON social_accounts(user_id);

CREATE INDEX idx_source_posts_social_account_id
ON source_posts(social_account_id);

CREATE INDEX idx_generated_posts_source_post_id
ON generated_posts(source_post_id);

CREATE INDEX idx_post_artifacts_user_id
ON post_artifacts(user_id);

CREATE INDEX idx_artifact_versions_artifact_id
ON artifact_versions(artifact_id);
```

---

# Future Expansion Possibilities

This schema supports future additions such as:

* LinkedIn publishing
* Analytics tracking
* Multi-platform ingestion
* AI prompt history
* Team collaboration
* Scheduled posting
* Content tagging
* Semantic search
* Embeddings/vector search
* AI personalization

---

# Suggested Backend Stack

* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL
* Redis (optional)
* Celery / Background Workers (optional)

---

# Suggested API Flow

```text
Connect Twitter/X
      ↓
Sync latest posts
      ↓
Store in source_posts
      ↓
Generate LinkedIn content
      ↓
Store generated variants
      ↓
Save finalized artifacts
      ↓
Track versions/history
```

