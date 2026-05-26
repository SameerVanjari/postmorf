from fastapi import APIRouter

from app.api.routes import posts, users
from app.api.routes import social_accounts, source_posts, generated_posts, post_artifacts

api_router = APIRouter()

api_router.include_router(posts.router)
api_router.include_router(users.router)
api_router.include_router(social_accounts.router)
api_router.include_router(source_posts.router)
api_router.include_router(generated_posts.router)
api_router.include_router(post_artifacts.router)