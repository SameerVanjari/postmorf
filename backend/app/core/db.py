from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy import inspect, text

from .config import settings

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)


def get_session():
    with Session(engine) as session:
        yield session


def ensure_columns():
    """Add any columns that exist in SQLModel metadata but are missing from the
    actual database tables. Runs at startup so model additions are picked up."""
    inspector = inspect(engine)
    metadata = SQLModel.metadata

    for table_name, table in metadata.tables.items():
        if table_name not in inspector.get_table_names():
            # Table doesn't exist — create_all will handle it
            continue

        existing_columns = {c["name"] for c in inspector.get_columns(table_name)}
        for column in table.columns:
            if column.name not in existing_columns:
                col_type = column.type.compile(engine.dialect)
                nullable = "NULL" if column.nullable else "NOT NULL"

                # Determine a server default for non-nullable columns
                server_default = ""
                if not column.nullable:
                    if str(column.type) == "JSON":
                        server_default = " DEFAULT '[]'::json"
                    elif str(column.type) in ("BOOLEAN", "BOOL"):
                        server_default = " DEFAULT FALSE"
                    elif str(column.type) == "INTEGER":
                        server_default = " DEFAULT 0"
                    elif str(column.type) in ("VARCHAR", "TEXT"):
                        server_default = " DEFAULT ''"
                    elif str(column.type).startswith("TIMESTAMP") or str(column.type).startswith("DATETIME"):
                        server_default = " DEFAULT NOW()"

                sql = f'ALTER TABLE {table_name} ADD COLUMN "{column.name}" {col_type} {nullable}{server_default}'
                print(f"[db] Adding missing column: {column.name} to {table_name} ({col_type})")
                with engine.begin() as conn:
                    conn.execute(text(sql))
