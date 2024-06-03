import app.modules.chat.chat_service as chat_service

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse


# 创建一个路由器对象
chat_router = APIRouter()


@chat_router.post("/completions")
async def completion(request: Request):
    """补全聊天对话"""
    request_json = await request.json()
    stream = request_json.get("stream", False)
    model = request_json.get("model", "gml-3-turbo")
    messages = request_json.get("messages", "")

    if stream is True:
        return StreamingResponse(chat_service.completion_stream(model=model, messages=messages), media_type="text/event-stream")

    result = await chat_service.completion(model=model, messages=messages)
    return result
