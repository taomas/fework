// 接口返回类型
export interface ApiResponse<T> {
  code: number;
  data: Record<string, any> | T;
  message: string;
  count?: number;
}
