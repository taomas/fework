// 使用正则检验手机号
export function checkPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

// 使用正则检验邮箱
export function checkEmail(email: string): boolean {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email);
}
