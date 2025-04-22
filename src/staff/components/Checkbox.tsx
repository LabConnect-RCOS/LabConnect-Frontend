import React from "react";
import PropTypes from "prop-types";

const CheckBox = ({
  formHook,
  errors,
  errorMessage,
  name,
  label,
  options,
  type,
}) => {
  return (
    <div className="mb-2">
      {label && (
        <div className="mb-1">
          <span className="font-semibold text-gray-800">{label}</span>
        </div>
      )}
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {options &&
          options.map((item) => (
            <label key={item} className="inline-flex items-center space-x-2">
              <input
                type={type === "radio" ? "radio" : "checkbox"}
                value={item}
                {...formHook}
                id={item}
                className={type === "radio" ? "radio" : "checkbox"}
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

CheckBox.propTypes = {
  formHook: PropTypes.object,
  errors: PropTypes.object,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};

export default CheckBox;