import React from "react";
import { FieldErrors, UseFormRegisterReturn, FieldValues} from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues> {
  type?: string;
  errorMessage: string;
  errors: FieldErrors<TFieldValues>;
  name: keyof TFieldValues & string;
  formHook: UseFormRegisterReturn;
  label: string;
  options?: string[];
  placeHolder?: string;
}

/*
const errors: FieldErrors<{
    id: string;
    title: string;
    application_due: string;
    type: string;
    hourlyPay: number;
    credits: never[];
    description: string;
    recommended_experience: string;
    location: string;
    years: string[];
}>

const errors: FieldErrors<{
    years: never[];
    credits: never[];
    hourlyPay: number;
    majors: never[];
}>

const errors: FieldErrors<{
    id: string;
    name: string;
    email: string;
    role: string;
    description: string;
    department: string;
    researchCenter: string;
}>

*/

const Input = <TFieldValues extends FieldValues>({
  type,
  errorMessage,
  errors,
  name,
  formHook,
  label,
  options,
  placeHolder,
}: InputProps<TFieldValues>) => {
  // if (!formHook) {
  //   return <h1>FormHook Not Given</h1>;
  // }

  const inputElement = (
    <input
      {...formHook}
      type={type || "text"}
      list={options && name}
      placeholder={placeHolder || "Type Here"}
      className="input input-bordered w-full"
    />
  );

  const textAreaElement = (
    <textarea
      {...formHook}
      placeholder={placeHolder || "Type Here"}
      cols={Number(50)}
      rows={Number(7)}
      className="border-2 rounded p-2 m-0"
    ></textarea>
  );

  const selectElement = (
    <select
      {...formHook}
      defaultValue="Select a department"
      className="select select-bordered w-full"
    >
      <option value="" selected disabled hidden>Select a department</option>
      {options ? (
        options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })
      ) : (
        <option value="default">Any</option>
      )}
    </select>
  );

  return (
    <div>
      <label className="check-input">
        <div className="label">
          <span className="label-text font-medium">{label}</span>
        </div>
        {type === "select"
          ? selectElement
          : type === "textarea"
          ? textAreaElement
          : inputElement}

        {errors && errors[name] && (
          <p className="text-red-500">{errorMessage}</p>
        )}
      </label>
    </div>
  );
};

export default Input;
