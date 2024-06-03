// 用户token
export const USER_TOKEN = "access_token";

// 用户信息
export const USER_INFO = "user_info";

// 用户手机号
export const USER_PHONE = "user_phone";

// 获取请求地址
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || "https://api.example.com";
};
