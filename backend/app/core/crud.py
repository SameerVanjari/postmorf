import uuid

from sqlmodel import Session, select

from ..models import User, UserCreate
from .security import get_hashed_password_optional


def get_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()


def get_user_by_id(session: Session, user_id: uuid.UUID) -> User | None:
    return session.get(User, user_id)


def create_user(session: Session, user_create: UserCreate) -> User:
    db_user = User(
        email=user_create.email,
        name=user_create.name,
        avatar_url=user_create.avatar_url,
        hashed_password=get_hashed_password_optional(user_create.password),
        is_superuser=user_create.is_superuser,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user