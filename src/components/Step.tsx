import classNames from "classnames";
import { IStep } from "../interfaces";

interface IStepElement {
  step: IStep;
  onClick: (e: React.MouseEvent) => void;
  current: number;
}

export default function Step({ step, onClick, current }: IStepElement) {
  let active = current === step.listpos ? true : false;
  const classes = classNames("w-10 h-10 rounded-full border  text-center relative md:cursor-pointer", {
    "text-white": !active,
    "border-white": !active,
    "bg-none": !active,
    "text-black": active,
    "border-cblue-200": active,
    "bg-cblue-200": active,
  });
  return (
    <button className={classes} onClick={onClick} data-listpos={step.listpos}>
      <span className="left-1/2 top-1/2 -translate-x-[50%] -translate-y-[60%] absolute pointer-events-none">
        {step.listpos + 1}
      </span>
    </button>
  );
}
