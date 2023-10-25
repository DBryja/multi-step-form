import { IStep } from "../interfaces";
import classNames from "classnames";
import Card from "./Card";
import { isMedium } from "../utils/utils";

interface IFormPage {
  step: IStep;
}

export default function FormPage({ step }: IFormPage) {
  const isPlan = step.menuItem.listpos === 1 && !isMedium(window);
  const classes = classNames("", {
    "md:h-full md:grid md:grid-cols-3 md:grid-rows-[250px_200px] md:gap-x-8": isPlan,
    "flex flex-col gap-4 md:gap-8  w-full": !isPlan,
  });
  return (
    <Card runAnim={step.stepName}>
      <h1 className="text-2xl font-bold mb-2 md:text-4xl md:mb-4">{step.stepName}</h1>
      <p className="text-cgray-400 leading-6 text-lg mb-3 font-regular md:text-xl md:mb-8">{step.stepDesc}</p>
      <div className={classes}>{step.fields.map((inputFn, index) => inputFn(index))}</div>
    </Card>
  );
}
