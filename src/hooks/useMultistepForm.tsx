import { useState } from "react";

export function useMultiStepForm(length: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep >= length - 1) setCurrentStep(currentStep);
    else setCurrentStep(currentStep + 1);
  };
  const back = () => {
    if (currentStep <= 0) setCurrentStep(0);
    else setCurrentStep(currentStep + 1);
  };
  const goTo = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setCurrentStep(parseInt(target.dataset?.listpos!));
  };

  return {
    currentStep,
    goTo,
    next,
    back,
  };
}
