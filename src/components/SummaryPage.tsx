import { AddOns } from "../interfaces";
import SummaryItemRow from "./SummaryItemRow";
interface ISummaryPage {
  data: any;
  fieldValues: any;
  updatePayingMethod: () => void;
  printPricing: (num: number) => React.ReactNode;
}
export default function SummaryPage({ data, fieldValues, updatePayingMethod, printPricing }: ISummaryPage) {
  return (
    <div className="bg-cgray-100 p-4 md:p-8 rounded-xl md:text-xl">
      <div className="flex flex-row justify-between pb-2 md:pb-6 text-cblue-600">
        <div>
          <p className="capitalize font-medium">
            {data.plan} ({data.payingMethod})
          </p>
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              updatePayingMethod();
            }}
            className="underline decoration-2 text-cgray-400 transition-colors hover:text-cblue-600"
          >
            Change
          </button>
        </div>
        <p>{printPricing(fieldValues.radioInputs[data.plan].price)}</p>
      </div>

      <div className="flex flex-col text-cgray-400 gap-3 md:gap-6 [&:has(div)]:border-t [&:has(div)]:pt-3 [&:has(div)]:md:pt-6">
        {Object.keys(data.addOns).map((addOn, index) =>
          data.addOns[addOn as AddOns] ? (
            <SummaryItemRow
              key={index}
              heading={fieldValues.checkboxes[addOn].heading}
              price={printPricing(fieldValues.checkboxes[addOn].price)}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
