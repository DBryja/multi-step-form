import { useMultiStepForm } from "./hooks/useMultistepForm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { IStepMenuItem, IStep, Plan, PayingMethod, AddOns, IFieldValues } from "./interfaces";
import { required, isEmail, isPhoneNumber } from "./utils/validators";
import StepMenu from "./components/StepMenu";
import FormPage from "./components/FormPage";
import TextInput from "./components/inputs/TextInput";
import RadioInput from "./components/inputs/RadioInput";
import PayToggle from "./components/inputs/PayToggle";
import CheckboxInput from "./components/inputs/CheckboxInput";
import ButtonsBar from "./components/inputs/ButtonsBar";
import SummaryPage from "./components/SummaryPage";

import _fieldValues from "./content.json";
import Footer from "./components/Footer";
import SuccessPage from "./components/SuccessPage";
const fieldValues = _fieldValues as IFieldValues;

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

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
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
            rules={{
              required,
              minLength: { value: 7, message: "Must be at least 7 characters" },
              maxLength: { value: 18, message: "Max length is 18 characters" },
              validate: { isPhoneNumber },
            }}
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
        (key) => (
          <PayToggle key={key} name="payingMethod" handleChange={updatePayingMethod} payingMethod={data.payingMethod} />
        ),
      ],
      menuItem: menuSteps[2],
    },
    {
      stepName: "Finishing up",
      stepDesc: "Double-check everything looks OK before confirming.",
      fields: [
        (key) => (
          <SummaryPage
            key={key}
            data={data}
            fieldValues={fieldValues}
            updatePayingMethod={updatePayingMethod}
            printPricing={printPricing}
          />
        ),
        (key) => (
          <div key={key} className="flex flex-row justify-between px-4 text-cgray-400 text-l md:text-2xl">
            Total: (per {isYearly ? "year" : "month"})<p className="text-cblue-700 font-bold">{printPricing(price)}</p>
          </div>
        ),
      ],
      menuItem: menuSteps[3],
    },
  ];

  const onSubmit: SubmitHandler<IFormInput> = () => console.log(data);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-cgray-400">
      <div className="h-full w-full md:p-4 md:h-csreen md:max-h-[800px] md:max-w-[1200px] bg-white md:flex md:items-center md:rounded-2xl md:shadow-lg">
        <div className="h-[calc(100%-20px)] md:w-full grid max-md:grid-rows-[min-content_1fr_min-content] md:grid-cols-[1fr_2fr] md:grid-rows-[1fr_60px] md:h-full md:relative md:gap-x-12 md:pr-12">
          <StepMenu menuSteps={menuSteps} onClick={goTo} currentStep={currentStep} />
          {isSubmitSuccessful ? (
            <SuccessPage />
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} id="form" className="relative max-md:max-h-[400px] transition">
                <FormPage step={steps[currentStep]} />
              </form>
              <ButtonsBar currentStep={currentStep} length={menuSteps.length} next={next} back={back} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
