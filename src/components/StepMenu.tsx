import StepMenuItem from "./StepMenuItem";
import { IStepMenuItem } from "../interfaces";

interface IStepMenu {
  menuSteps: IStepMenuItem[];
  onClick: (e: React.MouseEvent) => void;
  currentStep: number;
}
export default function StepMenu({ menuSteps, onClick, currentStep }: IStepMenu) {
  return (
    <div className="max-md:bg-sidebarMobile w-full h-48 bg-cover flex flex-row px-12 py-8 justify-center items-top gap-4 md:bg-sidebarDesktop md:flex-col md:h-full md:justify-start md:items-start md:p-8 md:rounded-xl md:gap-10">
      {menuSteps.map((step) => (
        <StepMenuItem step={step} onClick={onClick} current={currentStep} key={step.listpos} />
      ))}
    </div>
  );
}
