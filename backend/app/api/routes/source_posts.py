import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.core.db import get_session
from app.models import (
    SourcePost,
    SourcePostCreate,
    SourcePostPublic,
    SourcePostUpdate,
    SocialAccount,
)

router = APIRouter(prefix="/source-posts", tags=["source-posts"])


@router.post("/", response_model=SourcePostPublic)
def create_source_post(
    post: SourcePostCreate, session: Session = Depends(get_session)
):
    account = session.get(SocialAccount, getattr(post, "social_account_id", None))
    if account is None:
        raise HTTPException(status_code=404, detail="Social account not found")

    existing = session.exec(
        select(SourcePost).where(
            SourcePost.platform_post_id == post.platform_post_id,
            SourcePost.social_account_id == getattr(post, "social_account_id"),
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Source post already exists")

    db_post = SourcePost(**post.model_dump())
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@router.get("/", response_model=List[SourcePostPublic])
def read_source_posts(session: Session = Depends(get_session)):
    return session.exec(select(SourcePost)).all()


@router.get("/{post_id}", response_model=SourcePostPublic)
def read_source_post(post_id: uuid.UUID, session: Session = Depends(get_session)):
    post = session.get(SourcePost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Source post not found")
    return post


@router.put("/{post_id}", response_model=SourcePostPublic)
def update_source_post(
    post_id: uuid.UUID,
    post_update: SourcePostUpdate,
    session: Session = Depends(get_session),
):
    post = session.get(SourcePost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Source post not found")
    post.sqlmodel_update(post_update.model_dump(exclude_unset=True))
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@router.delete("/{post_id}")
def delete_source_post(post_id: uuid.UUID, session: Session = Depends(get_session)):
    post = session.get(SourcePost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Source post not found")
    session.delete(post)
    session.commit()
    return {"detail": "Source post deleted"}