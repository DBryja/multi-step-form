export const required = { value: true, message: "This field is required" };

export function minmaxLen(value: string, max: number, min: number = 0) {
  return !(value.length > max) && !(value.length < min);
}
// export function isEmail(value: string) {
//   return value.includes("@") && !value.includes(" ");
// }
export const isEmail = (e: string) =>
  e.includes("@") && !e.includes(" ") ? true : "Input value must be a proper email address";
