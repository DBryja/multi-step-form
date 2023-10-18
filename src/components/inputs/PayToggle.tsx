import classNames from "classnames";
import Toggle from "./Toggle";
import { PayingMethod } from "../../interfaces";

interface IPayToggle {
  isActive: boolean;
  onClick: () => void;
}
export default function PayToggle({ isActive, onClick }: IPayToggle) {
  const leftClasses = classNames("transition-colors font-medium", {
    "text-cgray-400": isActive,
    "text-cblue-600": !isActive,
  });
  const rightClasses = classNames("transition-colors font-medium", {
    "text-cgray-400": !isActive,
    "text-cblue-600": isActive,
  });
  return (
    <div className="flex justify-center items-center">
      <input type="checkbox" name="payinhMethod" className="hidden" />
      <label
        htmlFor="payingMethod"
        onClick={onClick}
        className="flex flex-row w-full justify-evenly [&>p]:leading-8 [&>*]:pointer-events-none"
      >
        <p className={leftClasses}>Monthly</p>
        <Toggle isActive={isActive} />
        <p className={rightClasses}>Yearly</p>
      </label>{" "}
    </div>
  );
}
