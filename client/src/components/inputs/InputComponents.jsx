import React from "react";

const InputComponents = ({
  label,
  labelFor,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={labelFor}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-box"
      />
    </div>
  );
};

export default InputComponents;
