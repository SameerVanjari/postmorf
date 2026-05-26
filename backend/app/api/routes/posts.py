from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/posts")
def get_posts():
    return {"message": "List of posts"}

@router.get("/config-test")
def test_config():
    """Test endpoint to verify environment variables are loaded"""
    return {
        "project_name": settings.PROJECT_NAME,
        "api_v1_str": settings.API_V1_STR,
        "db_server": settings.POSTGRES_SERVER,
        "db_user": settings.POSTGRES_USER,
        "db_name": settings.POSTGRES_DB,
        "secret_key_configured": bool(settings.SECRET_KEY and settings.SECRET_KEY != "your-secret-key-here-change-in-production")
    }

