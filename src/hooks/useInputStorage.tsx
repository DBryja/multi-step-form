import { useLocalStorage } from "usehooks-ts";
import { useEffect, useRef } from "react";
import { Plan } from "../interfaces";

export function useValueStorage(name: string) {
  const [inputValue, setInputValue] = useLocalStorage(name, "");
  const ref = useRef<HTMLInputElement>(null);
  const updateStorage = (e: React.SyntheticEvent) => {
    const node = e.target as HTMLInputElement;
    setInputValue(node.value);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.value = inputValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, updateStorage };
}

export function useCheckStorage(name: string) {
  const [isChecked, setIsChecked] = useLocalStorage(name, false);
  const ref = useRef<HTMLInputElement>(null);
  const updateStorage = (e: React.SyntheticEvent) => {
    const node = e.target as HTMLInputElement;
    setIsChecked(node.checked);
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.checked = isChecked;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, updateStorage };
}

export function useRadioStorage(name: string) {
  const [currentPlan, setCurrentPlan] = useLocalStorage(name, Plan.ARC);
  const ref = useRef<HTMLInputElement>(null);
  const updateStorage = (value: Plan) => {
    setCurrentPlan(value);
  };

  return { ref, updateStorage, currentPlan };
}
