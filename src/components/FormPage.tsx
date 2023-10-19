import { IStep } from "../interfaces";
import classNames from "classnames";

interface IFormPage {
  step: IStep;
}

export default function FormPage({ step }: IFormPage) {
  const isPlan = step.menuItem.listpos === 1 && window.innerWidth > 768; //yes i know its a terrible way to handle this
  const classes = classNames("", {
    "md:h-full md:grid md:grid-cols-3 md:grid-rows-[250px_200px] md:gap-x-8": isPlan,
    "flex flex-col gap-4 md:gap-8": !isPlan,
  });
  return (
    <div className="relative -top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white px-6 py-8 rounded-lg shadow-lg text-cblue-600 md:static md:translate-x-0 md:w-full md:shadow-none md:bg-transparent">
      <h1 className="text-2xl font-bold mb-4 md:text-4xl">{step.stepName}</h1>
      <p className="text-cgray-400 leading-6 text-lg mb-6 font-regular">{step.stepDesc}</p>
      <div className={classes}>{step.fields.map((inputFn, index) => inputFn(index))}</div>
    </div>
  );
}
