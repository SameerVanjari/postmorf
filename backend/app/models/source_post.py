import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON

if TYPE_CHECKING:
    from .social_account import SocialAccount
    from .source_post_chunk import SourcePostChunk
    from .generated_post import GeneratedPost


class SourcePostBase(SQLModel):
    platform_post_id: str = Field(index=True)
    post_type: str = Field(index=True)
    title: Optional[str] = None
    content: str
    author_username: Optional[str] = None
    source_url: Optional[str] = None
    source_platform: Optional[str] = None
    posted_at: Optional[datetime] = None
    post_metadata: Optional[dict] = Field(default=None, sa_column=Column("metadata", JSON))
    raw_payload: Optional[dict] = Field(default=None, sa_column=Column(JSON))


class SourcePost(SourcePostBase, table=True):
    __tablename__ = "source_posts"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    social_account_id: uuid.UUID = Field(foreign_key="social_accounts.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    social_account: "SocialAccount" = Relationship(back_populates="source_posts")
    source_post_chunks: list["SourcePostChunk"] = Relationship(back_populates="source_post")
    generated_posts: list["GeneratedPost"] = Relationship(back_populates="source_post")


class SourcePostCreate(SourcePostBase):
    social_account_id: uuid.UUID


class SourcePostPublic(SourcePostBase):
    id: uuid.UUID
    social_account_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class SourcePostUpdate(SQLModel):
    post_type: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    author_username: Optional[str] = None
    source_url: Optional[str] = None
    source_platform: Optional[str] = None
    posted_at: Optional[datetime] = None
    post_metadata: Optional[dict] = None
    raw_payload: Optional[dict] = None