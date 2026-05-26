import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .generated_post import GeneratedPost


class GenerationFeedbackBase(SQLModel):
    rating: Optional[int] = None
    feedback_text: Optional[str] = None


class GenerationFeedback(GenerationFeedbackBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    generated_post_id: uuid.UUID = Field(foreign_key="generated_posts.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    generated_post: "GeneratedPost" = Relationship(back_populates="feedback")


class GenerationFeedbackCreate(GenerationFeedbackBase):
    pass


class GenerationFeedbackPublic(GenerationFeedbackBase):
    id: uuid.UUID
    generated_post_id: uuid.UUID
    created_at: datetime