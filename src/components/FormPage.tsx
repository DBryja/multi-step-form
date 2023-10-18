import { IStep } from "../interfaces";
interface IFormPage {
  step: IStep;
}

export default function FormPage({ step }: IFormPage) {
  return (
    <div className="relative -top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white px-6 py-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-cblue-600">{step.stepName}</h1>
      <p className="text-cgray-400 leading-6 text-lg mb-6 font-regular">{step.stepDesc}</p>
      <div className="flex flex-col gap-4">{step.fields.map((inputFn, index) => inputFn(index))}</div>
    </div>
  );
}
