from app.common.log import logger


async def get_user_list():
    """获取用户列表"""
    logger.info("user_list")
    return {"code": 0, "msg": "success", "data": []}


async def create_user():
    """创建用户"""
    logger.info("create_user")
    return {"code": 0, "msg": "success", "data": []}


async def update_user():
    """更新用户"""
    logger.info("update_user")
    return {"code": 0, "msg": "success", "data": []}


async def delete_user():
    """删除用户"""
    logger.info("delete_user")
    return {"code": 0, "msg": "success", "data": []}


async def get_user_info():
    """获取用户信息"""
    logger.info("get_user_info")
    return {"code": 0, "msg": "success", "data": []}


async def update_user_info():
    """更新用户信息"""
    logger.info("update_user_info")
    return {"code": 0, "msg": "success", "data": []}
