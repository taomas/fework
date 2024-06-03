import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.router.router import create_api_router
from app.common.log import logger

app = FastAPI()

# 注册路由器对象
api_router = create_api_router()
app.include_router(api_router, prefix="/v1")

# 跨域中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """记录请求处理时间"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"Request {request.url.path} took {process_time:.2f} seconds")
    return response


@app.get("/")
async def read_root():
    """根路由"""
    return {"message": "Hello World"}
