
from fastapi import APIRouter
from app.common.log import logger
from app.modules.chat.chat_route import chat_router


def create_api_router():
    """创建API路由"""
    api_router = APIRouter()
    api_router.include_router(chat_router, prefix="/chat")
    logger.info("Router created successfully")
    return api_router
