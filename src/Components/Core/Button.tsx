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
      className={`${
        disabled ? "cursor-not-allowed bg-purple-400" : ""
      } relative w-full min-w-[100px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
    >
      {label}
    </button>
  );
};

export default Button;
