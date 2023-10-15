import classNames from "classnames";
import { IStepMenuItem } from "../interfaces";
import { isMedium } from "../utils";

interface IStepMenuItemElement {
  step: IStepMenuItem;
  onClick: (e: React.MouseEvent) => void;
  current: number;
}

export default function StepMenuItem({ step, onClick, current }: IStepMenuItemElement) {
  let active = current === step.listpos ? true : false;
  const classes = classNames(
    "w-10 h-10 md:w-12 md:h-12 rounded-full border text-center relative md:cursor-pointer md:text-xl",
    {
      "text-white": !active,
      "border-white": !active,
      "bg-none": !active,
      "text-black": active,
      "border-cblue-200": active,
      "bg-cblue-200": active,
    }
  );

  const button = (
    <button className={classes} onClick={onClick} data-listpos={step.listpos}>
      <span className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none">
        {step.listpos + 1}
      </span>
    </button>
  );
  return isMedium(window) ? (
    <div className="flex flex-row w-full gap-5 items-center">
      {button}
      <div className="flex flex-col">
        <p className="uppercase text-cgray-400">{step.name}</p>
        <p className="uppercase text-white font-bold tracking-wider text-xl">{step.desc}</p>
      </div>
    </div>
  ) : (
    button
  );
}
