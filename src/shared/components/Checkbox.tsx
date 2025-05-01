import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Filters } from "../../types/opportunities.ts";

interface CheckBoxProps {
  formHook: UseFormRegisterReturn;
  errors: FieldErrors<{
    semesters: never[];
    years: never[];
    credits: never[];
    hourlyPay: string;
    majors: never[];
  }>;
  errorMessage: string;
  name: string;
  label: string;
  options: string[];
  type?: "checkbox" | "radio";
  filters?: Filters
};


export default function CheckBox({
  formHook,
  errors,
  errorMessage,
  name,
  label,
  options,
  type,
  filters,
}: CheckBoxProps) {
  return (
    <div>
      <div className="check-input">
        <div className="label">
          <span className="label-text font-medium">{label}</span>
        </div>
        {errors && errors[name as keyof typeof errors] && (
          <p className="text-red-500">{errorMessage}</p>
        )}

        <div className="flex2">
          {options &&
            options.map((item) => {
              return (
                <div key={item} className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">{item}</span>
                    <input
                      type={type === "radio" ? "radio" : "checkbox"}
                      value={item}
                      {...formHook}
                      id={item}
                      className={type === "radio" ? "radio" : "checkbox"}
                      defaultChecked={(name === "semesters" && filters?.semesters?.includes(item)) || (name === "years" && filters?.years?.includes(Number(item))) || (name === "credits" && filters?.credits?.includes(item) ? true : false)}
                    />
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
