import classNames from "classnames";
import { PayingMethod, Plan } from "../../interfaces";
import { IFormFields } from "../../interfaces";

export interface IRadioInput {
  name: string;
  label: string;
  price: number;
  img?: { src: string; alt: string };
  payingMethod?: string;
  currentPlan?: string;
  handleChange?: (fields: Partial<IFormFields>) => void;
  [x: string]: any;
}

export default function RadioInput({
  name,
  label,
  img,
  onClick,
  price,
  payingMethod,
  currentPlan,
  handleChange,
  extra,
  ...rest
}: IRadioInput) {
  const isChecked = currentPlan === label;
  const classes = classNames(
    "w-full h-full flex max-md:flex-row py-2 px-4 border rounded-2xl gap-4 transition-all duration-300 cursor-pointer [&>*]:pointer-events-none md:flex-col md:gap-8 md:justify-center",
    {
      "bg-cgray-200 border-cblue-600 scale-95": isChecked,
      "border-cgray-300 hover:bg-cgray-200": !isChecked,
    }
  );
  const isYearly = payingMethod === PayingMethod.YEAR;
  const printPricing = (price: number) => `$${price * (isYearly ? 10 : 1)}/${isYearly ? "yr" : "mo"}`;
  const extraClasses = classNames("text-base text-cblue-600 transition-all origin-top", {
    "scale-y-0": !isYearly,
    "scale-y-1": isYearly,
  });

  const onChange = () => {
    handleChange?.({ [name]: label });
  };

  return (
    <div className="pointer">
      <input
        className="hidden"
        type="radio"
        id={label}
        value={label}
        name={name}
        readOnly
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={label} className={classes} data-value={label}>
        {img && <img src={img.src} alt={img.alt} className="md:w-1/2 self-center" />}
        <div className="flex flex-col">
          <h2 className="text-l font-bold capitalize text-cblue-600 md:text-2xl">{label}</h2>
          <p className="text-cgray-400 md:text-xl">{printPricing(price)}</p>
          <p className={extraClasses}>{extra}</p>
        </div>
      </label>
    </div>
  );
}
