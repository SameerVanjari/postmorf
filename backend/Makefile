.PHONY: migrate seed shell dev

# Create/update database tables
migrate:
	python scripts/create_tables.py

# Seed the database with sample data
seed:
	python scripts/seed.py

# Open a Python shell with models loaded
shell:
	python -c "from app.models import *; from app.core.db import engine; from sqlmodel import Session; s = Session(engine); print('Models & Session ready. Use s for queries.')"

# Run development server
dev:
	uvicorn app.main:app --port 8800 --reload