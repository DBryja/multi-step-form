import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import { useMultiStepForm } from "./hooks/useMultistepForm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { IStepMenuItem, IStep, Plan, PayingMethod } from "./interfaces";
import TextInput from "./components/inputs/TextInput";
import RadioInput from "./components/inputs/RadioInput";
import { required, isEmail } from "./utils/validators";
import PayToggle from "./components/inputs/PayToggle";

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
  plan: Plan;
  payingMethod: PayingMethod;
}
const extra = "2 months free";

function App() {
  const {
    formState,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });
  const { currentStep, goTo, next, back, setPayingMethod, setPlan, currentPayingMethod, currentPlan } =
    useMultiStepForm(menuSteps.length);

  const steps: IStep[] = [
    {
      stepName: "Personal info",
      stepDesc: "Please provide your name, email address, and phone number.",
      fields: [
        (key) => (
          <Controller
            key={key}
            name="name"
            control={control}
            rules={{
              required,
              maxLength: { value: 32, message: "Max lenght is 32" },
            }}
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
              required,
              validate: {
                isEmail,
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
    {
      stepName: "Select your plan",
      stepDesc: "You have the option of monthly or yearly billing",
      fields: [
        (key) => (
          <Controller
            key={key}
            name="plan"
            control={control}
            render={() => (
              <RadioInput
                type="radio"
                name="plan"
                img={{ src: "/images/icon-arcade.svg", alt: "Arcade" }}
                onClick={setPlan}
                currentPlan={currentPlan}
                payingMethod={currentPayingMethod}
                value={Plan.ARC}
                label={Plan.ARC}
                priceM={9}
                priceY={90}
                extra={extra}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="plan"
            control={control}
            render={() => (
              <RadioInput
                type="radio"
                name="plan"
                img={{ src: "/images/icon-advanced.svg", alt: "Advance" }}
                onClick={setPlan}
                currentPlan={currentPlan}
                payingMethod={currentPayingMethod}
                value={Plan.ADV}
                label={Plan.ADV}
                priceM={12}
                priceY={120}
                extra={extra}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="plan"
            control={control}
            render={() => (
              <RadioInput
                type="radio"
                name="plan"
                img={{ src: "/images/icon-pro.svg", alt: "Pro" }}
                onClick={setPlan}
                currentPlan={currentPlan}
                payingMethod={currentPayingMethod}
                value={Plan.PRO}
                label={Plan.PRO}
                priceM={15}
                priceY={150}
                extra={extra}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="payingMethod"
            control={control}
            render={() => <PayToggle isActive={currentPayingMethod === PayingMethod.YEAR} onClick={setPayingMethod} />}
          />
        ),
      ],
      menuItem: menuSteps[1],
    },
    {
      stepName: "Pick add-ons",
      stepDesc: "Add-ons help enhance your gaming experience.",
      fields: [],
      menuItem: menuSteps[2],
    },
    {
      stepName: "Finishing up",
      stepDesc: "Double-check everything looks OK before confirming.",
      fields: [],
      menuItem: menuSteps[3],
    },
  ];

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);

  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-cgray-400">
      <div className="w-full max-md:min-h-screen md:p-4 md:h-screen md:max-h-[800px] md:max-w-[1024px] bg-white md:flex md:items-center md:rounded-2xl md:shadow-lg">
        <div className="h-screen w-full grid max-md:grid-rows-[1fr_400px_60px] md:grid-cols-[1fr_2fr] bg-cgray-200">
          <StepMenu menuSteps={menuSteps} onClick={goTo} currentStep={currentStep} />
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <FormPage step={steps[currentStep]} />
          </form>
          <div className="w-full h-full bg-red-500 flex flex-row justify-between px-6">
            {currentStep === 0 ? (
              <div />
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  back();
                }}
              >
                Back
              </button>
            )}

            {currentStep === steps.length - 1 ? (
              <input type="submit" value="Submit" onClick={() => console.log(formState.errors)} form="form" />
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
