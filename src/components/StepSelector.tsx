import { useState } from "react";
import { IStep } from "../interfaces";
import Step from "./Step";

const steps: IStep[] = [
  {
    listpos: 0,
    name: "step 1",
    desc: "your info",
  },
  {
    listpos: 1,
    name: "step 2",
    desc: "select plan",
  },
  {
    listpos: 2,
    name: "step 3",
    desc: "add-ons",
  },
  {
    listpos: 3,
    name: "step 4",
    desc: "summary",
  },
];

export default function StepSelector() {
  const [currentStep, setCurrentStep] = useState(0);
  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setCurrentStep(parseInt(target.dataset?.listpos!));
  };

  return (
    <div className="bg-sidebarMobile w-full h-48 bg-cover flex flex-row p-12 justify-center items-top gap-6">
      {steps.map((step) => (
        <Step step={step} onClick={onClick} current={currentStep} key={step.listpos} />
      ))}
    </div>
  );
}
