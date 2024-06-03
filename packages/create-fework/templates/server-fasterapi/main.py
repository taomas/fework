import uvicorn
from dotenv import load_dotenv
from app.main import app


if __name__ == "__main__":
    load_dotenv()
    uvicorn.run(app=app, host="0.0.0.0", port=8081, workers=1)
