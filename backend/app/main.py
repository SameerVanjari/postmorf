from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from app.api.main import api_router
from app.core.db import engine, ensure_columns
from app.middleware import ResponseNormalizerMiddleware, register_exception_handlers
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

origins = [
    "http://localhost:3000"
]

app.add_middleware(ResponseNormalizerMiddleware)
app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_headers=["*"],
    allow_methods=["*"],
)
register_exception_handlers(app)

SQLModel.metadata.create_all(engine)
ensure_columns()

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}
