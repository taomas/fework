import request from "./request";

// 发送验证码
export const handleApiSendCode = async (data: Record<string, any>) => {
  const response = await request.post("/mobile/send-code", data);
  return response;
};

// 用户登录
export const handleApiLogin = async (data: Record<string, any>) => {
  const response = await request.post("/mobile/login", data);
  return response;
};
