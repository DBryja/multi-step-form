import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import { useMultiStepForm } from "./hooks/useMultistepForm";

import { IStepMenuItem, IStep } from "./interfaces";
import TextInput from "./components/inputs/TextInput";

const menuSteps: IStepMenuItem[] = [
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
const steps: IStep[] = [
  {
    stepName: "Personal info",
    stepDesc: "Please provide your name, email address, and phone number.",
    inputs: [
      (key) => <TextInput name="name" label="Name" placeholder="e.g. Stephen King" key={key} />,
      (key) => <TextInput name="email" label="Email Address" placeholder="e.g. email@lorem.com" key={key} />,
      (key) => <TextInput name="phone" label="Phone Number" placeholder="e.g. +12 345 678 90" key={key} />,
    ],
    menuItem: menuSteps[0],
  },
];

function App() {
  const { currentStep, goTo, next, back } = useMultiStepForm(steps.length);

  return (
    <div className="h-screen flex flex-row justify-center items-center bg-cgray-400">
      <div className="w-full max-md:min-h-screen md:p-4 md:h-screen md:max-h-[800px] md:max-w-[1024px] bg-white md:flex md:items-center md:rounded-2xl md:shadow-lg">
        <div className="min-h-full h-screen w-full grid max-md:grid-rows-[1fr_3fr_60px] md:grid-cols-[1fr_2fr] bg-cgray-200">
          <StepMenu menuSteps={menuSteps} onClick={goTo} currentStep={currentStep} />
          <div></div>
          <FormPage step={steps[currentStep]} />
          <div className="w-full h-full bg-red-500"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
