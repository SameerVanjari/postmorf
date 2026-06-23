import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlalchemy import JSON
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user import User
    from .generated_post import GeneratedPost
    from .artifact_version import ArtifactVersion


class PostArtifactBase(SQLModel):
    title: Optional[str] = None
    final_content: str
    excerpt: Optional[str] = None
    status: str = Field(default="draft")
    is_favorite: bool = Field(default=False)
    platforms: list[str] = Field(default_factory=list, sa_type=JSON)
    tags: list[str] = Field(default_factory=list, sa_type=JSON)
    scheduled_at: Optional[datetime] = None


class PostArtifact(PostArtifactBase, table=True):
    __tablename__ = "post_artifacts"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    generated_post_id: Optional[uuid.UUID] = Field(
        default=None, foreign_key="generated_posts.id"
    )
    source_post_id: Optional[uuid.UUID] = Field(
        default=None, foreign_key="source_posts.id"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: "User" = Relationship(back_populates="post_artifacts")
    generated_post: Optional["GeneratedPost"] = Relationship(back_populates="post_artifacts")
    artifact_versions: list["ArtifactVersion"] = Relationship(back_populates="artifact")


class PostArtifactCreate(PostArtifactBase):
    user_id: uuid.UUID
    generated_post_id: Optional[uuid.UUID] = None
    source_post_id: Optional[uuid.UUID] = None


class PostArtifactPublic(PostArtifactBase):
    id: uuid.UUID
    user_id: uuid.UUID
    generated_post_id: Optional[uuid.UUID] = None
    source_post_id: Optional[uuid.UUID] = None
    created_at: datetime
    updated_at: datetime


class PostArtifactUpdate(SQLModel):
    title: Optional[str] = None
    final_content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[str] = None
    is_favorite: Optional[bool] = None
    platforms: Optional[list[str]] = None
    tags: Optional[list[str]] = None
    scheduled_at: Optional[datetime] = None
    source_post_id: Optional[uuid.UUID] = None