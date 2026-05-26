from typing import Optional

from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from pwdlib.hashers.bcrypt import BcryptHasher

password_hasher = PasswordHash((Argon2Hasher(), BcryptHasher()))


def get_hashed_password(password: str) -> str:
    return password_hasher.hash(password)


def get_hashed_password_optional(password: Optional[str]) -> Optional[str]:
    if password is None:
        return None
    return password_hasher.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> tuple[bool, str | None]:
    return password_hasher.verify_and_update(plain_password, hashed_password)