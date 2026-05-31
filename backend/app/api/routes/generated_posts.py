import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.core.db import get_session
from app.models import (
    GeneratedPost,
    GeneratedPostCreate,
    GeneratedPostPublic,
    GeneratedPostUpdate,
    GenerationFeedback,
    GenerationFeedbackCreate,
    GenerationFeedbackPublic,
    SourcePost,
)

router = APIRouter(prefix="/generated-posts", tags=["generated-posts"])


@router.post("/", response_model=GeneratedPostPublic)
def create_generated_post(
    gen: GeneratedPostCreate, session: Session = Depends(get_session)
):
    source_post = session.get(SourcePost, getattr(gen, "source_post_id", None))
    if source_post is None:
        raise HTTPException(status_code=404, detail="Source post not found")

    db_gen = GeneratedPost(**gen.model_dump())
    session.add(db_gen)
    session.commit()
    session.refresh(db_gen)
    return db_gen


@router.get("/", response_model=List[GeneratedPostPublic])
def read_generated_posts(session: Session = Depends(get_session)):
    return session.exec(select(GeneratedPost)).all()


@router.get("/{gen_id}", response_model=GeneratedPostPublic)
def read_generated_post(gen_id: uuid.UUID, session: Session = Depends(get_session)):
    gen = session.get(GeneratedPost, gen_id)
    if not gen:
        raise HTTPException(status_code=404, detail="Generated post not found")
    return gen


@router.put("/{gen_id}", response_model=GeneratedPostPublic)
def update_generated_post(
    gen_id: uuid.UUID,
    gen_update: GeneratedPostUpdate,
    session: Session = Depends(get_session),
):
    gen = session.get(GeneratedPost, gen_id)
    if not gen:
        raise HTTPException(status_code=404, detail="Generated post not found")
    gen.sqlmodel_update(gen_update.model_dump(exclude_unset=True))
    session.add(gen)
    session.commit()
    session.refresh(gen)
    return gen


@router.delete("/{gen_id}")
def delete_generated_post(gen_id: uuid.UUID, session: Session = Depends(get_session)):
    gen = session.get(GeneratedPost, gen_id)
    if not gen:
        raise HTTPException(status_code=404, detail="Generated post not found")
    session.delete(gen)
    session.commit()
    return {"detail": "Generated post deleted"}


@router.post("/{gen_id}/feedback", response_model=GenerationFeedbackPublic)
def create_feedback(
    gen_id: uuid.UUID,
    feedback: GenerationFeedbackCreate,
    session: Session = Depends(get_session),
):
    gen = session.get(GeneratedPost, gen_id)
    if not gen:
        raise HTTPException(status_code=404, detail="Generated post not found")
    db_feedback = GenerationFeedback(
        **feedback.model_dump(), generated_post_id=gen_id
    )
    session.add(db_feedback)
    session.commit()
    session.refresh(db_feedback)
    return db_feedback


@router.get("/{gen_id}/feedback", response_model=List[GenerationFeedbackPublic])
def read_feedback(gen_id: uuid.UUID, session: Session = Depends(get_session)):
    gen = session.get(GeneratedPost, gen_id)
    if not gen:
        raise HTTPException(status_code=404, detail="Generated post not found")
    return session.exec(
        select(GenerationFeedback).where(
            GenerationFeedback.generated_post_id == gen_id
        )
    ).all()