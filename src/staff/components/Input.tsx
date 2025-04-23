import React from "react";

interface InputProps {
  type?: "text" | "number" | "select" | "textarea";
  errorMessage?: string;
  errors?: Record<string, any>;
  name: string;
  formHook: any; // Can be made more specific with `UseFormRegisterReturn`
  label?: string;
  options?: string[];
  placeHolder?: string;
  min?: number;
  step?: number;
}

const Input: React.FC<InputProps> = ({
  type,
  errorMessage,
  errors,
  name,
  formHook,
  label,
  options,
  placeHolder,
  min,
  step,
}) => {
  const inputElement = (
    <input
      {...formHook}
      type={type || "text"}
      list={options && name}
      placeholder={placeHolder || "Type Here"}
      className="input input-bordered w-full appearance-none bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
      min={type === "number" ? min : undefined}
      step={type === "number" ? step : undefined}
    />
  );

  const textAreaElement = (
    <textarea
      {...formHook}
      placeholder={placeHolder || "Type Here"}
      cols={50}
      rows={7}
      className="border-2 rounded p-2 m-0 w-full bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
    ></textarea>
  );

  const selectElement = (
    <select
      {...formHook}
      defaultValue=""
      className="select select-bordered w-full bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
    >
      <option value="" disabled hidden>
        Select a department
      </option>
      {options ? (
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option value="default">Any</option>
      )}
    </select>
  );

  return (
    <div>
      <label className="check-input">
        <div className="label">
          <span className="label-text font-medium text-black dark:text-white">
            {label}
          </span>
        </div>
        {type === "select"
          ? selectElement
          : type === "textarea"
          ? textAreaElement
          : inputElement}

        {errors && errors[name] && (
          <p className="text-red-500 mt-1">{errorMessage}</p>
        )}
      </label>
    </div>
  );
};

export default Input;
