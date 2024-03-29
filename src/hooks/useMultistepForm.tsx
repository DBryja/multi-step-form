import { useState } from "react";
import { AddOns, PayingMethod, Plan, IFormFields } from "../interfaces";

const INIT_VALUES = {
  name: "",
  email: "",
  phone: "",
  payingMethod: PayingMethod.MON,
  plan: Plan.ARC,
  addOns: {
    [AddOns.CP]: false,
    [AddOns.LS]: false,
    [AddOns.OS]: false,
  },
};
export function useMultiStepForm(length: number) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<IFormFields>(INIT_VALUES);

  const updateData = (fields: Partial<IFormFields>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
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
    updateData({ payingMethod: data.payingMethod === PayingMethod.MON ? PayingMethod.YEAR : PayingMethod.MON });
  };

  return {
    currentStep,
    goTo,
    next,
    back,
    data,
    updateData,
    updatePayingMethod,
  };
}
