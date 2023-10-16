import { IStep } from "../interfaces";
interface IFormCard {
  step: IStep;
}

export default function FormCard({ step }: IFormCard) {
  return (
    <div className="absolute w-[90%] bg-white top-32 left-1/2 -translate-x-1/2 px-6 py-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{step.stepName}</h1>
      <p className="text-cgray-400 leading-6 text-lg mb-6 font-regular">{step.stepDesc}</p>
      <div className="flex flex-col gap-4">{step.inputs.map((inputFn, index) => inputFn(index))}</div>
    </div>
  );
}
