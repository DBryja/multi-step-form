import classNames from "classnames";
import Toggle from "./Toggle";

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
    <div className="flex justify-center items-center md:col-span-3 md:w-80 md:justify-self-center md:scale-110 ">
      <input type="checkbox" name="payinhMethod" className="hidden" />
      <label
        htmlFor="payingMethod"
        onClick={onClick}
        className="flex flex-row w-full justify-evenly [&>p]:leading-8 [&>*]:pointer-events-none md:cursor-pointer md:bg-cgray-200 py-4 rounded-xl"
      >
        <p className={leftClasses}>Monthly</p>
        <Toggle isActive={isActive} />
        <p className={rightClasses}>Yearly</p>
      </label>{" "}
    </div>
  );
}
