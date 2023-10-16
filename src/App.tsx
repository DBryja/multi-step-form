import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import { useMultiStepForm } from "./hooks/useMultistepForm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import {TextField, Checkbox} from "@material-ui/core"

import { IStepMenuItem, IStep } from "./interfaces";
import TextInput from "./components/inputs/TextInput";
// import { minmaxLen, isEmail } from "./utils/validators";

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

interface IFormInput {
  name: string;
  email: string;
  phone: string;
}

function App() {
  const {
    formState,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });

  const steps: IStep[] = [
    {
      stepName: "Personal info",
      stepDesc: "Please provide your name, email address, and phone number.",
      inputs: [
        (key) => (
          <Controller
            key={key}
            name="name"
            control={control}
            rules={{ required: true, maxLength: { value: 32, message: "Max lenght is 32" } }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                name="name"
                label={errors.name?.message || "Name"}
                placeholder="e.g. Stephen King"
                isValid={errors.name ? false : true}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="email"
            control={control}
            rules={{
              required: true,
              validate: {
                isEmail: (e) =>
                  e.includes("@") && !e.includes(" ") ? true : "Input value must be a proper email address",
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                name="email"
                label={errors.email?.message || "Email Address"}
                placeholder="e.g. email@lorem.com"
                isValid={errors.email ? false : true}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            name="phone"
            key={key}
            control={control}
            rules={{ required: true, minLength: 7, maxLength: 12 }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                name="phone"
                label={errors.phone?.message || "Phone Number"}
                placeholder="e.g. +12 345 678 90"
                isValid={errors.phone ? false : true}
              />
            )}
          />
        ),
      ],
      menuItem: menuSteps[0],
    },
  ];

  const { currentStep, goTo, next, back } = useMultiStepForm(steps.length);
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);

  return (
    <div className="h-screen flex flex-row justify-center items-center bg-cgray-400">
      <div className="w-full max-md:min-h-screen md:p-4 md:h-screen md:max-h-[800px] md:max-w-[1024px] bg-white md:flex md:items-center md:rounded-2xl md:shadow-lg">
        <div className="min-h-full h-screen w-full grid max-md:grid-rows-[1fr_3fr_60px] md:grid-cols-[1fr_2fr] bg-cgray-200">
          <StepMenu menuSteps={menuSteps} onClick={goTo} currentStep={currentStep} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormPage step={steps[currentStep]} />
            <input
              type="submit"
              value="submit"
              className="absolute left-1/2 top-3/4 cursor-pointer"
              onClick={() => console.log(formState.errors)}
            />
          </form>
          <div className="w-full h-full bg-red-500 flex flex-row justify-between px-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                back();
              }}
            >
              Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
