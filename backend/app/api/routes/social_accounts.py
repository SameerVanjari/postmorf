import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from datetime import datetime, timezone

from app.core.db import get_session
from app.models import (
    SocialAccount,
    SocialAccountCreate,
    SocialAccountPublic,
    SocialAccountUpdate,
    User,
)

router = APIRouter(prefix="/social-accounts", tags=["social-accounts"])


@router.post("/", response_model=SocialAccountPublic)
def create_social_account(
    account: SocialAccountCreate, session: Session = Depends(get_session)
):
    user = session.get(User, getattr(account, "user_id", None))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    existing = session.exec(
        select(SocialAccount).where(
            SocialAccount.platform == account.platform,
            SocialAccount.platform_user_id == account.platform_user_id,
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Social account already connected")

    db_account = SocialAccount(**account.model_dump())
    session.add(db_account)
    session.commit()
    session.refresh(db_account)
    return db_account


@router.get("/", response_model=List[SocialAccountPublic])
def read_social_accounts(session: Session = Depends(get_session)):
    return session.exec(select(SocialAccount)).all()


@router.get("/{account_id}", response_model=SocialAccountPublic)
def read_social_account(
    account_id: uuid.UUID, session: Session = Depends(get_session)
):
    account = session.get(SocialAccount, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social account not found")
    return account


@router.put("/{account_id}", response_model=SocialAccountPublic)
def update_social_account(
    account_id: uuid.UUID,
    account_update: SocialAccountUpdate,
    session: Session = Depends(get_session),
):
    account = session.get(SocialAccount, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social account not found")
    account.sqlmodel_update(account_update.model_dump(exclude_unset=True))
    session.add(account)
    session.commit()
    session.refresh(account)
    return account


@router.delete("/{account_id}")
def delete_social_account(
    account_id: uuid.UUID, session: Session = Depends(get_session)
):
    account = session.get(SocialAccount, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social account not found")
    session.delete(account)
    session.commit()
    return {"detail": "Social account deleted"}


@router.post("/{account_id}/sync")
def sync_social_account(
    account_id: uuid.UUID, session: Session = Depends(get_session)
):
    account = session.get(SocialAccount, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Social account not found")
    account.last_synced_at = datetime.now(timezone.utc)
    session.add(account)
    session.commit()
    return {
        "detail": "Sync completed",
        "account_id": str(account_id),
        "platform": account.platform,
        "last_synced_at": account.last_synced_at.isoformat(),
    }