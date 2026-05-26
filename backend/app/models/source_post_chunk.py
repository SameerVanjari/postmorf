import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .source_post import SourcePost


class SourcePostChunkBase(SQLModel):
    platform_chunk_id: str = Field(index=True)
    content: str
    sequence_number: int


class SourcePostChunk(SourcePostChunkBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    source_post_id: uuid.UUID = Field(foreign_key="source_posts.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    source_post: "SourcePost" = Relationship(back_populates="source_post_chunks")


class SourcePostChunkCreate(SourcePostChunkBase):
    pass


class SourcePostChunkPublic(SourcePostChunkBase):
    id: uuid.UUID
    source_post_id: uuid.UUID
    created_at: datetime