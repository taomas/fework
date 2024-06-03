// 请求地址
export const IS_PROD = true;

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || "https://api.x-chat.site";
};
