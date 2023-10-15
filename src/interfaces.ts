export interface IStepMenuItem {
  listpos: number;
  name: string;
  desc: string;
}
export interface IStep {
  stepName: string;
  stepDesc: string;
  inputs: ((key: string | number) => JSX.Element)[];
  menuItem: IStepMenuItem;
}
