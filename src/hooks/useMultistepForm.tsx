import { useState } from "react";
import { PayingMethod, Plan } from "../interfaces";

export function useMultiStepForm(length: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPlan, setCurrentPlan] = useState(Plan.ARC);
  const [currentPayingMethod, setCurrentPayingMethod] = useState(PayingMethod.MON);

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

  const setPlan = (e: React.MouseEvent) => {
    const target = e.target as HTMLInputElement;
    setCurrentPlan(target.dataset.value as Plan);
  };
  const setPayingMethod = () => {
    if (currentPayingMethod === PayingMethod.MON) setCurrentPayingMethod(PayingMethod.YEAR);
    if (currentPayingMethod === PayingMethod.YEAR) setCurrentPayingMethod(PayingMethod.MON);
  };

  return {
    currentStep,
    currentPlan,
    currentPayingMethod,
    setPlan,
    setPayingMethod,
    goTo,
    next,
    back,
  };
}
