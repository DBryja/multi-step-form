import { useMultiStepForm } from "./hooks/useMultistepForm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { IStepMenuItem, IStep, Plan, PayingMethod, AddOns } from "./interfaces";
import { required, isEmail, isPhoneNumber } from "./utils/validators";
import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import TextInput from "./components/inputs/TextInput";
import RadioInput from "./components/inputs/RadioInput";
import PayToggle from "./components/inputs/PayToggle";
import CheckboxInput from "./components/inputs/CheckboxInput";
import ButtonsBar from "./components/inputs/ButtonsBar";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  payingMethod: PayingMethod;
  addOns: AddOns;
}
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
const extra = "2 months free";
const fieldValues: any = {
  textInputs: {
    name: {
      name: "name",
      label: "Name",
      placeholder: "e.g Stephen King",
    },
    email: {
      name: "email",
      label: "Email Address",
      placeholder: "e.g stephen@lorem.com",
    },
    phone: {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g. +12 345 678 90",
    },
  },
  radioInputs: {
    arcade: {
      name: "plan",
      img: { src: "/images/icon-arcade.svg", alt: "Arcade" },
      label: Plan.ARC,
      price: 9,
      extra,
    },
    advanced: {
      name: "plan",
      img: { src: "/images/icon-advanced.svg", alt: "Advance" },
      label: Plan.ADV,
      price: 12,
      extra,
    },
    pro: {
      name: "plan",
      img: { src: "/images/icon-pro.svg", alt: "Pro" },
      label: Plan.PRO,
      price: 15,
      extra,
    },
  },
  checkboxes: {
    onlineService: {
      name: "addOns",
      label: AddOns.OS,
      heading: "Online service",
      desc: "Access to multiplayer games",
      price: 1,
    },
    largerStorage: {
      name: "addOns",
      label: AddOns.LS,
      heading: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: 2,
    },
    customizableProfile: {
      name: "addOns",
      label: AddOns.CP,
      heading: "Customizable profile",
      desc: "Custom theme on your profile",
      price: 2,
    },
  },
};

function App() {
  const {
    formState,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });
  const { currentStep, goTo, next, back, data, updateData, updatePayingMethod } = useMultiStepForm(menuSteps.length);
  const isYearly = data.payingMethod === PayingMethod.YEAR;
  const printPricing = (price: number) => `$${price * (isYearly ? 10 : 1)}/${isYearly ? "yr" : "mo"}`;

  const addOnsPrice = Object.keys(data.addOns)
    .map((key) => {
      return (data.addOns[key as AddOns] && fieldValues.checkboxes[key].price) || 0;
    })
    .reduce((partialSum, a) => partialSum + a, 0);
  const price: number = fieldValues.radioInputs[data.plan].price + addOnsPrice;

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
                {...fieldValues.textInputs.name}
                label={errors.name?.message || fieldValues.textInputs.name.label}
                isValid={errors.name ? false : true}
                handleChange={updateData}
                value={data.name}
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
                {...fieldValues.textInputs.email}
                label={errors.email?.message || fieldValues.textInputs.email.label}
                isValid={errors.email ? false : true}
                handleChange={updateData}
                value={data.email}
              />
            )}
          />
        ),
        (key) => (
          <Controller
            name="phone"
            key={key}
            control={control}
            rules={{ required: true, minLength: 5, maxLength: 18, validate: { isPhoneNumber } }}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                {...fieldValues.textInputs.phone}
                label={errors.phone?.message || fieldValues.textInputs.phone.label}
                isValid={errors.phone ? false : true}
                handleChange={updateData}
                value={data.phone}
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
          <RadioInput
            key={key}
            type="radio"
            {...fieldValues.radioInputs.arcade}
            handleChange={updateData}
            payingMethod={data.payingMethod}
            currentPlan={data.plan}
          />
        ),
        (key) => (
          <RadioInput
            key={key}
            type="radio"
            {...fieldValues.radioInputs.advanced}
            handleChange={updateData}
            payingMethod={data.payingMethod}
            currentPlan={data.plan}
          />
        ),
        (key) => (
          <RadioInput
            type="radio"
            key={key}
            {...fieldValues.radioInputs.pro}
            handleChange={updateData}
            payingMethod={data.payingMethod}
            currentPlan={data.plan}
          />
        ),
        (key) => (
          <PayToggle key={key} name="payingMethod" handleChange={updatePayingMethod} payingMethod={data.payingMethod} />
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
                {...fieldValues.checkboxes.onlineService}
                payingMethod={data.payingMethod}
                handleChange={updateData}
                checked={data.addOns.onlineService}
                data={data.addOns}
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
                {...fieldValues.checkboxes.largerStorage}
                payingMethod={data.payingMethod}
                handleChange={updateData}
                checked={data.addOns.largerStorage}
                data={data.addOns}
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
                {...fieldValues.checkboxes.customizableProfile}
                payingMethod={data.payingMethod}
                handleChange={updateData}
                checked={data.addOns.customizableProfile}
                data={data.addOns}
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
          <div key={key} className="flex flex-row justify-between">
            <div>
              <p className="capitalize font-medium">
                {data.plan} ({data.payingMethod})
              </p>
              <button
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  updatePayingMethod();
                }}
              >
                Change
              </button>
            </div>
            <p>{printPricing(fieldValues.radioInputs[data.plan].price)}</p>
          </div>
        ),
        (key) => (
          <div key={key}>
            {Object.keys(data.addOns).map((addOn, index) =>
              data.addOns[addOn as AddOns] ? (
                <div key={index} className="flex flex-row justify-between">
                  {fieldValues.checkboxes[addOn].heading}
                  <p>{printPricing(fieldValues.checkboxes[addOn].price)}</p>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        ),
        (key) => (
          <div key={key} className="flex flex-row justify-between">
            Total: <p>{printPricing(price)}</p>
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
