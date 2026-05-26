import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .post_artifact import PostArtifact


class ArtifactVersionBase(SQLModel):
    content: str
    version_number: int


class ArtifactVersion(ArtifactVersionBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    artifact_id: uuid.UUID = Field(foreign_key="post_artifacts.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    artifact: "PostArtifact" = Relationship(back_populates="artifact_versions")


class ArtifactVersionCreate(ArtifactVersionBase):
    pass


class ArtifactVersionPublic(ArtifactVersionBase):
    id: uuid.UUID
    artifact_id: uuid.UUID
    created_at: datetime