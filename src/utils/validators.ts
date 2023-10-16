export function minmaxLen(value: string, max: number, min: number = 0) {
  return !(value.length > max) && !(value.length < min);
}
export function isEmail(value: string) {
  return value.includes("@") && !value.includes(" ");
}
