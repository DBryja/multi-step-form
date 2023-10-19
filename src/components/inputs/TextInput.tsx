// import { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames";

interface ITextInput {
  name: string;
  label: string;
  placeholder: string;
  [x: string]: any;
}

export default function TextInput({ name, label, placeholder, isValid, ...rest }: ITextInput) {
  const inputClasses = classNames(
    "font-medium text-base border p-2 pl-4 rounded-md text-lg md:text-xl md:p-4 md:pl-6",
    {
      "text-cred-400": !isValid,
    }
  );
  const labelClasses = classNames("text-base font-normal text-lg md:text-xl", { "text-cred-400": !isValid });
  return (
    <div className="flex flex-col">
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} type="text" name={name} placeholder={placeholder} {...rest} />
    </div>
  );
}
