import { IFormFields, AddOns } from "../../interfaces";
interface ICheckboxInput {
  name: string;
  label: AddOns;
  heading: string;
  desc: string;
  price?: number;
  checked?: boolean;
  handleChange?: (fields: Partial<IFormFields>) => void;
}
export default function CheckboxInput({ name, label, heading, desc, price, handleChange, checked }: ICheckboxInput) {
  const onChange = () => {
    // const obj = {
    //   [name]: {
    //     [label]: function () {
    //       return !this;
    //     },
    //   },
    // };
    // handleChange?.(obj);
  };
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
        <p className="text-cblue-700 md:ml-auto">+${price}/mo</p>
      </label>
    </div>
  );
}
