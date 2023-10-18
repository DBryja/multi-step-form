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
