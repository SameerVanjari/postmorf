import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user import User
    from .source_post import SourcePost


class SocialAccountBase(SQLModel):
    platform: str = Field(index=True)
    platform_user_id: str = Field(index=True)
    username: str
    display_name: Optional[str] = None
    profile_image: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    last_synced_at: Optional[datetime] = None


class SocialAccount(SocialAccountBase, table=True):
    __tablename__ = "social_accounts"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: "User" = Relationship(back_populates="social_accounts")
    source_posts: list["SourcePost"] = Relationship(back_populates="social_account")


class SocialAccountCreate(SocialAccountBase):
    user_id: uuid.UUID


class SocialAccountPublic(SocialAccountBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class SocialAccountUpdate(SQLModel):
    platform: Optional[str] = None
    platform_user_id: Optional[str] = None
    username: Optional[str] = None
    display_name: Optional[str] = None
    profile_image: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    last_synced_at: Optional[datetime] = None