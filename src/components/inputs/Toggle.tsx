import classNames from "classnames";

interface IToggle {
  isActive: boolean;
}
export default function Toggle({ isActive }: IToggle) {
  const ballClasses = classNames(
    "w-5 h-5 rounded-full block bg-white shadow-[0_0_2px_0_rgba(255,255,255,0.5)] absolute top-1/2 -translate-y-1/2 transition-transform",
    { "translate-x-[0%]": !isActive, "translate-x-[140%]": isActive }
  );
  return (
    <div className="bg-cblue-600 w-16 h-8 p-2 rounded-3xl shadow-[inset_0_0_5px_0_rgba(0,0,0,0.5)] relative">
      <span className={ballClasses}> </span>
    </div>
  );
}
