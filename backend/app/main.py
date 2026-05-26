from fastapi import FastAPI
from sqlmodel import SQLModel

from app.api.main import api_router
from app.core.db import engine
from app.models import (
    User,
    SocialAccount,
    SourcePost,
    SourcePostChunk,
    GeneratedPost,
    PostArtifact,
    ArtifactVersion,
    GenerationFeedback,
)

app = FastAPI(title="Post morph API")

# Create database tables on startup
try:
    SQLModel.metadata.create_all(engine)
except Exception:
    pass

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
def health_check():
	return {"status": "ok"}
