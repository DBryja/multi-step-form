import Card from "./Card";
export default function SuccessPage() {
  return (
    <Card runAnim={""} className="flex flex-col p-6 gap-6 items-center justify-center">
      <img src="/images/icon-thank-you.svg" alt="checkmark icon" className="w-1/4" />
      <h1 className="text-cblue-600 text-3xl font-bold">Thank you!</h1>
      <p className="text-cgray-400 text-lg text-center">
        Thanks for confirming your subscription! We hope you have fun using our platfon. if you ever need support,
        please feel free to email us at suppport@loremgaming.com
      </p>
    </Card>
  );
}
