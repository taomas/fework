import openai
import os
import requests

from app.common.log import logger


async def completion(model="qwen-turbo", messages=[]):
    """补全会话内容"""
    try:
        BASE_URL = os.environ.get("OPENAI_BASE_URL")
        API_KEY = os.environ.get("OPENAI_API_KEY")

        setting_message = {
            "role": "system",
            "content": "我是一个聊天机器人，我是小冰。",
        }

        messages.insert(0, setting_message)
        client = openai.OpenAI(api_key=API_KEY, base_url=BASE_URL)
        logger.info(f"开始推理： model={model} messages={messages} \n")
        completion = client.chat.completions.create(
            model=model,
            messages=messages
        )
    except Exception as e:
        logger.info(f"completion error: {str(e)}")
        raise ValueError(f"{str(e)}")
    finally:
        logger.info(f"completion finallly completion={completion}")
    return completion


async def completion_stream(model="qwen-turbo", messages=[]):
    """补全会话内容-流式接口"""
    try:
        BASE_URL = os.environ.get("OPENAI_BASE_URL")
        API_KEY = os.environ.get("OPENAI_API_KEY")

        params = {
            "model": model,
            "messages": messages,
            "stream": True,
        }

        logger.info(f"开始推理： model={model} messages={messages} \n")

        response = requests.post(
            f"{BASE_URL}/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {API_KEY}",
            },
            json=params,
            stream=True,
        )

        logger.info(f"Response status code: {response.status_code}")

        if response.status_code != 200:
            raise Exception(
                f"Error requesting completions: {response.status_code}")

        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                decoded_chunk = chunk.decode("utf-8")
                # TODO:处理content中出现\\n的情况
                yield decoded_chunk

    except Exception as e:
        logger.info(f"completion_stream error: {str(e)}")
        raise ValueError(f"{str(e)}")
    finally:
        logger.info(f"completion_stream finallly")
