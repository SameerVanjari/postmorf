import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON

if TYPE_CHECKING:
    from .source_post import SourcePost
    from .post_artifact import PostArtifact
    from .generation_feedback import GenerationFeedback


class GeneratedPostBase(SQLModel):
    generation_prompt: Optional[str] = None
    tone: Optional[str] = None
    content_type: Optional[str] = None
    generated_content: str
    model_name: Optional[str] = None
    generation_metadata: Optional[dict] = Field(default=None, sa_column=Column(JSON))


class GeneratedPost(GeneratedPostBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    source_post_id: uuid.UUID = Field(foreign_key="source_posts.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    source_post: "SourcePost" = Relationship(back_populates="generated_posts")
    post_artifacts: list["PostArtifact"] = Relationship(back_populates="generated_post")
    feedback: list["GenerationFeedback"] = Relationship(back_populates="generated_post")


class GeneratedPostCreate(GeneratedPostBase):
    source_post_id: uuid.UUID


class GeneratedPostPublic(GeneratedPostBase):
    id: uuid.UUID
    source_post_id: uuid.UUID
    created_at: datetime


class GeneratedPostUpdate(SQLModel):
    generation_prompt: Optional[str] = None
    tone: Optional[str] = None
    content_type: Optional[str] = None
    generated_content: Optional[str] = None
    model_name: Optional[str] = None
    generation_metadata: Optional[dict] = None