import classNames from "classnames";
import { PayingMethod, Plan } from "../../interfaces";

export interface IRadioInput {
  name: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  currentPlan?: Plan;
  img?: { src: string; alt: string };
  priceM?: number;
  priceY?: number;
  payingMethod?: PayingMethod;
  [x: string]: any;
}

export default function RadioInput({
  name,
  label,
  img,
  onClick,
  priceM,
  priceY,
  payingMethod,
  extra,
  currentPlan,
  ...rest
}: IRadioInput) {
  const isChecked = currentPlan === label;
  const classes = classNames(
    "w-full h-full flex max-md:flex-row p-4 border rounded-2xl gap-4 transition-all duration-300 cursor-pointer [&>*]:pointer-events-none md:flex-col md:gap-8",
    {
      "border-cgray-300": !isChecked,
      "bg-cgray-200": isChecked,
      "border-cblue-600": isChecked,
      "scale-95": isChecked,
      "hover:bg-cgray-200": !isChecked,
    }
  );
  const isYearly = payingMethod === PayingMethod.YEAR;
  const extraClasses = classNames("text-base text-cblue-600 transition-all origin-top", {
    "scale-y-0": !isYearly,
    "scale-y-1": isYearly,
  });

  return (
    <div className="pointer">
      <input className="hidden" type="radio" value={label} name={name} checked={isChecked} {...rest} readOnly />
      <label htmlFor={label} className={classes} data-value={label} onClick={onClick}>
        {img && <img src={img.src} alt={img.alt} className="md:w-1/2 self-center" />}
        <div className="flex flex-col">
          <h2 className="text-l font-bold capitalize text-cblue-600 md:text-2xl">{label}</h2>
          <p className="text-cgray-400 md:text-xl">
            {payingMethod === PayingMethod.MON ? `$${priceM}/mo` : `$${priceY}/yr`}
          </p>
          <p className={extraClasses}>{extra}</p>
        </div>
      </label>
    </div>
  );
}
