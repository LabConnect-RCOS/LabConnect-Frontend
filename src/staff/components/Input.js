import React from "react";

const Input = ({

  type,
  errorMessage,
  errors,
  name,
  formHook,
  label,
  options,
  placeHolder,
  min,

}) => {

  const inputElement = (
    
    <input
      {...formHook}
      type={type || "text"}
      list={options && name}
      placeholder={placeHolder || "Type Here"}
      className="input input-bordered w-full"
      min={type === "number" ? min : undefined}
    />

  );

  const textAreaElement = (
    <textarea
      {...formHook}
      placeholder={placeHolder || "Type Here"}
      cols="50"
      rows="7"
      className="border-2 rounded p-2 m-0"
    ></textarea>
  );

  const selectElement = (
    <select
      {...formHook}
      defaultValue="Select a department"
      className="select select-bordered w-full"
    >
      <option value="" selected disabled hidden>
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
