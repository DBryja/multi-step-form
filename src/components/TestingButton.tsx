export default function TestingButton({ data, errors }: any) {
  return (
    <div className="absolute left-4 top-4 text-red-500" onClick={() => console.log(data, errors)}>
      Testing button
    </div>
  );
}
