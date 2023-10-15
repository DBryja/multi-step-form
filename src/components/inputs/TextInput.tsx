interface ITextInput {
  name: string;
  label: string;
  placeholder: string;
}

export default function TextInput({ name, label, placeholder }: ITextInput) {
  return (
    <div className="flex flex-col">
      <label className="text-base font-normal">{label}</label>
      <input
        className="font-medium text-base border p-2 pl-4 rounded-md"
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
