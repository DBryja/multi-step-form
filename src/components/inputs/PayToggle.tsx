import classNames from "classnames";
import Toggle from "./Toggle";
import { PayingMethod } from "../../interfaces";

interface IPayToggle {
  name: string;
  payingMethod: PayingMethod;
  handleChange?: () => void;
}
export default function PayToggle({ name, payingMethod, handleChange }: IPayToggle) {
  const isActive = payingMethod === PayingMethod.YEAR;
  const sideClasses = classNames("transition-colors font-medium", {
    "text-cgray-400": !isActive,
    "text-cblue-600": isActive,
  });

  const onChange = () => {
    handleChange?.();
  };
  return (
    <div className="flex justify-center items-center md:col-span-3 md:w-80 md:justify-self-center md:self-center md:scale-110">
      <input type="checkbox" id={name} name={name} onChange={onChange} className="hidden" />
      <label
        htmlFor={name}
        className="flex flex-row w-full justify-evenly [&>p]:leading-8 md:cursor-pointer md:bg-cgray-200 md:py-4 md:px-8 rounded-xl [&>*]:pointer-events-none"
      >
        <p className={sideClasses}>Monthly</p>
        <Toggle isActive={isActive} />
        <p className={sideClasses}>Yearly</p>
      </label>
    </div>
  );
}
