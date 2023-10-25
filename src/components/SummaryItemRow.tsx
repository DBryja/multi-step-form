interface ISummaryRow {
  heading: string;
  price: React.ReactNode;
}
export default function SummaryItemRow({ heading, price }: ISummaryRow) {
  return (
    <div className="flex flex-row justify-between">
      {heading}
      <p className="text-cblue-600">+{price}</p>
    </div>
  );
}
