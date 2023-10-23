import { useMultiStepForm } from "./hooks/useMultistepForm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useReadLocalStorage } from "usehooks-ts";

import { IStepMenuItem, IStep, Plan, PayingMethod, AddOns } from "./interfaces";
import { required, isEmail } from "./utils/validators";
import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import TextInput from "./components/inputs/TextInput";
import RadioInput from "./components/inputs/RadioInput";
import PayToggle from "./components/inputs/PayToggle";
import CheckboxInput from "./components/inputs/CheckboxInput";
import ButtonsBar from "./components/inputs/ButtonsBar";

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
  addOns: AddOns;
}
const extra = "2 months free";

function App() {
  const {
    formState,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });
  const { currentStep, goTo, next, back, payingMethod, updatePayingMethod } = useMultiStepForm(menuSteps.length);

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
              maxLength: { value: 32, message: "Max length is 32 characters" },
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
                payingMethod={payingMethod}
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
                payingMethod={payingMethod}
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
                payingMethod={payingMethod}
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
            render={() => (
              <PayToggle name="payingMethod" handleChange={updatePayingMethod} payingMethod={payingMethod} />
            )}
          />
        ),
      ],
      menuItem: menuSteps[1],
    },
    {
      stepName: "Pick add-ons",
      stepDesc: "Add-ons help enhance your gaming experience.",
      fields: [
        (key) => (
          <Controller
            key={key}
            name="addOns"
            control={control}
            render={() => (
              <CheckboxInput
                name="addOns"
                label={AddOns.OS}
                heading="Online service"
                desc="Access to multiplayer games"
                price={1}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="addOns"
            control={control}
            render={() => (
              <CheckboxInput
                name="addOns"
                label={AddOns.LS}
                heading="Larger storage"
                desc="Extra 1TB of cloud save"
                price={2}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            key={key}
            name="addOns"
            control={control}
            render={() => (
              <CheckboxInput
                name="addOns"
                label={AddOns.CP}
                heading="Customizable profile"
                desc="Custom theme on your profile"
                price={2}
              />
            )}
          />
        ),
      ],
      menuItem: menuSteps[2],
    },
    {
      stepName: "Finishing up",
      stepDesc: "Double-check everything looks OK before confirming.",
      fields: [
        (key) => (
          <Controller
            key={key}
            name="addOns"
            control={control}
            render={() => (
              <CheckboxInput
                name="addOns"
                label={AddOns.OS}
                heading="Online service"
                desc="Access to multiplayer games"
                price={1}
              />
            )}
          />
        ),
        (key) => (
          <div
            key={key}
            onClick={() => {
              const formData = new FormData(document.querySelector("#form") as HTMLFormElement);
              const values = [...formData.entries()];
              console.log(values);
            }}
          >
            AAAA
          </div>
        ),
      ],
      menuItem: menuSteps[3],
    },
  ];

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);

  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-cgray-400">
      <div className="w-full max-md:min-h-screen md:p-4 md:h-screen md:max-h-[800px] md:max-w-[1200px] bg-white md:flex md:items-center md:rounded-2xl md:shadow-lg">
        <div className="max-md:min-h-screen w-full grid max-md:grid-rows-[min-content_1fr_min-content] md:grid-cols-[1fr_2fr] md:grid-rows-[1fr_60px] md:h-full md:relative md:gap-x-12 md:pr-12">
          <StepMenu menuSteps={menuSteps} onClick={goTo} currentStep={currentStep} />
          <form onSubmit={handleSubmit(onSubmit)} id="form" className="relative max-md:max-h-[500px] transition">
            <FormPage step={steps[currentStep]} />
          </form>
          <ButtonsBar
            currentStep={currentStep}
            length={menuSteps.length}
            errors={formState.errors}
            next={next}
            back={back}
          />
          <div className="absolute left-4 top-4 text-red-500" onClick={() => console.log(errors)}>
            ERRORS
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
