import app.modules.user.user_servier as user_servier

from fastapi import APIRouter, Request

router = APIRouter()


@router.post('/user-list')
async def user_list(request: Request):
    request_json = await request.json()
    data = await user_servier.get_user_list(request_json)
    return {"code": 0, "data": data, "message": "获取列表成功"}


@router.post('/create-user')
async def create_user(request: Request):
    request_json = await request.json()
    data = await user_servier.create_user(request_json)
    return {"code": 0, "data": data, "message": "创建用户成功"}


@router.get('/get-user')
async def get_user(request: Request):
    request_json = await request.json()
    user_id = request_json.get('user_id')
    return user_servier.get_user(user_id)
