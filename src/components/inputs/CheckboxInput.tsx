import { IFormFields, AddOns, AddOnsObject, PayingMethod } from "../../interfaces";
interface ICheckboxInput {
  name: string;
  label: AddOns | string;
  heading: string;
  desc: string;
  payingMethod?: PayingMethod;
  price?: number;
  checked?: boolean;
  data?: AddOnsObject;
  handleChange?: (fields: Partial<IFormFields>) => void;
}
export default function CheckboxInput({
  name,
  label,
  heading,
  desc,
  price,
  payingMethod,
  handleChange,
  checked,
  data,
}: ICheckboxInput) {
  let onChange;
  if (checked !== undefined && data) {
    onChange = () => {
      const obj = {
        [name]: {
          ...data,
          [label]: !checked,
        },
      };
      handleChange?.(obj);
    };
  }

  const isYearly = payingMethod === PayingMethod.YEAR;
  const printPricing = (price: number) => `$${price * (isYearly ? 10 : 1)}/${isYearly ? "yr" : "mo"}`;

  return (
    <div>
      <input
        type="checkbox"
        name={name}
        id={label}
        value={label}
        className="hidden peer"
        onChange={onChange}
        checked={checked || false}
      />
      <label
        htmlFor={label}
        className="flex flex-row items-center p-4 border rounded-2xl justify-between gap-3 transition-colors peer-checked:bg-cgray-200 peer-checked:border-cblue-700 peer-checked:[&>.sq]:bg-cblue-700 peer-checked:[&>.sq]:border-cblue-700 [&>*]:pointer-events-none md:text-2xl md:p-6 md:justify-start md:gap-x-8 md:cursor-pointer hover:bg-cgray-200"
      >
        <div className="w-6 h-6 border rounded sq p-1 transition-colors md:w-8 md:h-8">
          <img src="/images/icon-checkmark.svg" alt="checkmark" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-medium text-cblue-600 font-bold">{heading}</h2>
          <p className="text-sm text-cgray-400">{desc}</p>
        </div>
        {price && <p className="text-cblue-700 md:ml-auto">{printPricing(price)}</p>}
      </label>
    </div>
  );
}
