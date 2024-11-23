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
    <div>
      <div className="check-input">
        <div className="label">
          <span className="label-text font-medium">{label}</span>
        </div>
        {errors && errors[name] && (
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
