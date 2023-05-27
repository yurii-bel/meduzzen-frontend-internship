import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title = "Modal title",
}) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg h-2/3 overflow-scroll w-11/12 md:max-w-md">
        <div className="flex justify-between items-center border-b p-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <button
            className="text-black close-modal"
            onClick={onClose}
            aria-label="Close Modal"
          >
            close
          </button>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
