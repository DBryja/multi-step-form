interface IButtonsBar {
  currentStep: number;
  length: number;
  back: () => void;
  next: () => void;
}

export default function ButtonsBar({ currentStep, length, back, next }: IButtonsBar) {
  return (
    <div className="w-full pb-2 h-16 flex flex-row justify-between place-self-end px-8 md:px-24 font-medium items-center">
      {currentStep === 0 ? (
        <div />
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            back();
          }}
          className="bg-cgray-200 h-[90%] px-8 rounded-xl cursor-pointer"
        >
          Go Back
        </button>
      )}

      {currentStep === length - 1 ? (
        <button
          // onClick={(e) => e.preventDefault()}
          type="submit"
          value="Submit"
          form="form"
          className="bg-cblue-700 h-[90%] px-8 text-white rounded-xl cursor-pointer transition-opacity hover:opacity-95"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          className="bg-cblue-600 h-[90%] px-8 text-white rounded-xl transition-opacity hover:opacity-95"
        >
          Next Step
        </button>
      )}
    </div>
  );
}
