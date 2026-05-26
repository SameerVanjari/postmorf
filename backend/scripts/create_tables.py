import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlmodel import SQLModel
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


def create_tables():
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully!")


def verify_tables():
    from sqlalchemy import inspect

    inspector = inspect(engine)
    tables = sorted(inspector.get_table_names())
    print(f"\nTables in database ({len(tables)}):")
    for table in tables:
        cols = [col["name"] for col in inspector.get_columns(table)]
        print(f"  - {table}: {', '.join(cols)}")


if __name__ == "__main__":
    create_tables()
    verify_tables()