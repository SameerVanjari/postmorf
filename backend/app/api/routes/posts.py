from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.config import settings
from app.core.db import get_session
from app.models import PostArtifact

router = APIRouter()


@router.get("/posts")
def get_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(PostArtifact)).all()
    return [
        {
            "id": str(p.id),
            "title": p.title,
            "content": p.final_content,
            "excerpt": p.excerpt,
            "status": p.status,
            "platforms": p.platforms,
            "tags": p.tags,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "updated_at": p.updated_at.isoformat() if p.updated_at else None,
            "scheduled_at": p.scheduled_at.isoformat() if p.scheduled_at else None,
        }
        for p in posts
    ]


@router.get("/config-test")
def test_config():
    """Test endpoint to verify environment variables are loaded"""
    return {
        "project_name": settings.PROJECT_NAME,
        "api_v1_str": settings.API_V1_STR,
        "db_server": settings.POSTGRES_SERVER,
        "db_user": settings.POSTGRES_USER,
        "db_name": settings.POSTGRES_DB,
        "secret_key_configured": bool(
            settings.SECRET_KEY
            and settings.SECRET_KEY != "your-secret-key-here-change-in-production"
        ),
    }
