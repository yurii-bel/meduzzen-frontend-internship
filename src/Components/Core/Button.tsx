import React from "react";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default Button;
