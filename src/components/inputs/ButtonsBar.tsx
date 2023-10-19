interface IButtonsBar {
  currentStep: number;
  length: number;
  errors: any;
  back: () => void;
  next: () => void;
}
export default function ButtonsBar({ currentStep, length, errors, back, next }: IButtonsBar) {
  return (
    <div className="w-full pb-2 h-16 flex flex-row justify-between place-self-end px-8 md:px-24 font-medium">
      {currentStep === 0 ? (
        <div />
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            back();
          }}
          className="bg-cgray-200 px-8 rounded-xl cursor-pointer"
        >
          Go Back
        </button>
      )}

      {currentStep === length - 1 ? (
        <input
          type="submit"
          value="Submit"
          onClick={() => console.log(errors)}
          form="form"
          className="bg-cblue-700 px-8 text-white rounded-xl cursor-pointer transition-opacity hover:opacity-95"
        />
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          className="bg-cblue-600 px-8 text-white rounded-xl transition-opacity hover:opacity-95"
        >
          Next Step
        </button>
      )}
    </div>
  );
}
