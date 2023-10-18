import { AddOns } from "../../interfaces";
interface ICheckboxInput {
  name: string;
  label: AddOns;
  heading: string;
  desc: string;
  price?: number;
}
export default function CheckboxInput({ name, label, heading, desc, price }: ICheckboxInput) {
  return (
    <div>
      <input type="checkbox" name={name} id={label} value={label} className="hidden peer" />
      <label
        htmlFor={label}
        className="flex flex-row items-center p-4 border rounded-2xl justify-between gap-3 peer-checked:bg-cgray-200 peer-checked:border-cblue-700 peer-checked:[&>.sq]:bg-cblue-700 peer-checked:[&>.sq]:border-cblue-700 [&>*]:pointer-events-none"
      >
        <div className="w-6 h-6 border rounded sq p-1 transition-colors">
          <img src="/images/icon-checkmark.svg" alt="checkmark" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-medium text-cblue-600 text-sm font-bold">{heading}</h2>
          <p className="text-xs text-cgray-400">{desc}</p>
        </div>
        <p className="text-cblue-700">+${price}/mo</p>
      </label>
    </div>
  );
}
