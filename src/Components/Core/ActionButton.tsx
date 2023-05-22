import React from "react";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: string;
};

const ActionButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  color = "blue",
}) => {
  const buttonStyles = {
    backgroundColor: color,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={buttonStyles}
      className="relative min-w-[100px] flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {label}
    </button>
  );
};

export default ActionButton;
