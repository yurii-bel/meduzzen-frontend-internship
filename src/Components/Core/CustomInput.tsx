import React from "react";

type InputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  value: string;
  type: string;
  name: string;
  id: string;
};

const CustomInput = ({
  label,
  onChange,
  disabled,
  value,
  type,
  name,
  id,
}: InputProps) => {
  return (
    <div className="block">
      <label htmlFor={name} className="text-gray-700 font-bold">
        {label}
      </label>
      {disabled ? (
        <div
          id={id}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {value}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
    </div>
  );
};

export default CustomInput;
