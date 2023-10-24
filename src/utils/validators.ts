export const required = { value: true, message: "This field is required" };

export function minmaxLen(value: string, max: number, min: number = 0) {
  return !(value.length > max) && !(value.length < min);
}
export const isEmail = (value: string) =>
  value.includes("@") && !value.includes(" ") ? true : "Input value must be a proper email address";

export const isPhoneNumber = (value: string) => {
  let regex = /^[0-9\s+-]+$/;
  return regex.test(value) ? true : "Phone number can contain only numbers and '- +' symbols";
};
