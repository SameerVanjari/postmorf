import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .social_account import SocialAccount
    from .post_artifact import PostArtifact


class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    is_superuser: bool = Field(default=False)


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    social_accounts: list["SocialAccount"] = Relationship(back_populates="user")
    post_artifacts: list["PostArtifact"] = Relationship(back_populates="user")


class UserCreate(UserBase):
    password: Optional[str] = None


class UserPublic(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class UserUpdate(SQLModel):
    email: Optional[str] = None
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    is_superuser: Optional[bool] = None
    password: Optional[str] = None