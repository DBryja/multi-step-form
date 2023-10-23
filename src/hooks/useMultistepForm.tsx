import { useState } from "react";
import { PayingMethod } from "../interfaces";

export function useMultiStepForm(length: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [payingMethod, setPayingMethod] = useState(PayingMethod.MON);

  const next = () => {
    if (currentStep >= length - 1) setCurrentStep(currentStep);
    else setCurrentStep(currentStep + 1);
  };
  const back = () => {
    if (currentStep <= 0) setCurrentStep(0);
    else setCurrentStep(currentStep - 1);
  };
  const goTo = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setCurrentStep(parseInt(target.dataset?.listpos!));
  };
  const updatePayingMethod = () => {
    setPayingMethod(payingMethod === PayingMethod.MON ? PayingMethod.YEAR : PayingMethod.MON);
  };

  return {
    currentStep,
    goTo,
    next,
    back,
    payingMethod,
    updatePayingMethod,
  };
}
