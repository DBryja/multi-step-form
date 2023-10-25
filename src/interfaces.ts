export interface IStepMenuItem {
  listpos: number;
  name: string;
  desc: string;
}
export interface IStep {
  stepName: string;
  stepDesc: string;
  fields: ((key: string | number) => JSX.Element)[];
  menuItem: IStepMenuItem;
}

export enum Plan {
  ARC = "arcade",
  ADV = "advanced",
  PRO = "pro",
}

export enum PayingMethod {
  MON = "Monthly",
  YEAR = "Yearly",
}

export enum AddOns {
  OS = "onlineService",
  LS = "largerStorage",
  CP = "customizableProfile",
}

export interface AddOnsObject {
  [AddOns.CP]: boolean;
  [AddOns.LS]: boolean;
  [AddOns.OS]: boolean;
}

export interface IFormFields {
  name: string;
  email: string;
  phone: string;
  payingMethod: PayingMethod;
  plan: Plan;
  addOns: AddOnsObject;
}

interface ITextInput {
  name: string;
  label: string;
  placeholder: string;
}
interface IRadioInput {
  name: string;
  img: {
    src: string;
    alt: string;
  };
  label: string;
  price: number;
  extra: string;
}
interface ICheckboxes {
  name: string;
  label: string;
  heading: string;
  desc: string;
  price: number;
}
export interface IFieldValues {
  textInputs: {
    [key: string]: ITextInput;
  };
  radioInputs: {
    [key: string]: IRadioInput;
  };
  checkboxes: {
    [key: string]: ICheckboxes;
  };
}
