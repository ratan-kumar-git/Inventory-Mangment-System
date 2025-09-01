import React from "react";

const Input = ({ label, labelFor, icon:Icon, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
            id={labelFor}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
