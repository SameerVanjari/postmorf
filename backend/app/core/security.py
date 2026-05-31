import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional, Any

from jose import jwt
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from pwdlib.hashers.bcrypt import BcryptHasher

from app.core.config import settings

password_hasher = PasswordHash((Argon2Hasher(), BcryptHasher()))

ALGORITHM = "HS256"


def get_hashed_password(password: str) -> str:
    return password_hasher.hash(password)


def get_hashed_password_optional(password: Optional[str]) -> Optional[str]:
    if password is None:
        return None
    return password_hasher.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> tuple[bool, str | None]:
    return password_hasher.verify_and_update(plain_password, hashed_password)


def create_access_token(subject: str | Any, expires_delta: timedelta | None = None) -> str:
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict[str, Any]:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])