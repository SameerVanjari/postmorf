import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from app.core.db import get_session
from app.models import (
    PostArtifact,
    PostArtifactCreate,
    PostArtifactPublic,
    PostArtifactUpdate,
    ArtifactVersion,
    ArtifactVersionCreate,
    User,
)

router = APIRouter(prefix="/artifacts", tags=["artifacts"])


@router.post("/", response_model=PostArtifactPublic)
def create_artifact(
    artifact: PostArtifactCreate, session: Session = Depends(get_session)
):
    user = session.get(User, artifact.user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_artifact = PostArtifact(**artifact.model_dump())
    session.add(db_artifact)
    session.commit()
    session.refresh(db_artifact)
    return db_artifact


@router.get("/", response_model=List[PostArtifactPublic])
def read_artifacts(
    session: Session = Depends(get_session),
    user_id: Optional[uuid.UUID] = Query(default=None),
    status: Optional[str] = Query(default=None),
):
    query = select(PostArtifact)
    if user_id:
        query = query.where(PostArtifact.user_id == user_id)
    if status:
        query = query.where(PostArtifact.status == status)
    return session.exec(query).all()


@router.get("/{artifact_id}", response_model=PostArtifactPublic)
def read_artifact(artifact_id: uuid.UUID, session: Session = Depends(get_session)):
    artifact = session.get(PostArtifact, artifact_id)
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")
    return artifact


@router.put("/{artifact_id}", response_model=PostArtifactPublic)
def update_artifact(
    artifact_id: uuid.UUID,
    artifact_update: PostArtifactUpdate,
    session: Session = Depends(get_session),
):
    artifact = session.get(PostArtifact, artifact_id)
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")

    if "final_content" in artifact_update.model_dump(
        exclude_unset=True
    ) and artifact_update.final_content != artifact.final_content:
        version_data = ArtifactVersionCreate(
            content=artifact.final_content,
            version_number=len(artifact.artifact_versions) + 1,
        )
        db_version = ArtifactVersion(
            **version_data.model_dump(), artifact_id=artifact_id
        )
        session.add(db_version)

    artifact.sqlmodel_update(artifact_update.model_dump(exclude_unset=True))
    session.add(artifact)
    session.commit()
    session.refresh(artifact)
    return artifact


@router.delete("/{artifact_id}")
def delete_artifact(artifact_id: uuid.UUID, session: Session = Depends(get_session)):
    artifact = session.get(PostArtifact, artifact_id)
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")
    session.delete(artifact)
    session.commit()
    return {"detail": "Artifact deleted"}


@router.get("/{artifact_id}/versions", response_model=List[dict])
def read_artifact_versions(
    artifact_id: uuid.UUID, session: Session = Depends(get_session)
):
    artifact = session.get(PostArtifact, artifact_id)
    if not artifact:
        raise HTTPException(status_code=404, detail="Artifact not found")
    versions = session.exec(
        select(ArtifactVersion)
        .where(ArtifactVersion.artifact_id == artifact_id)
        .order_by("version_number")
    ).all()
    return [
        {"id": v.id, "version_number": v.version_number, "content": v.content}
        for v in versions
    ]