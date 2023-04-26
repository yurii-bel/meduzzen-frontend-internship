import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [modalClass, setModalClass] = useState(
    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  );

  const handleClose = () => {
    setModalClass("opacity-0 pointer-events-none");
    onClose();
  };

  return (
    <div className={modalClass}>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg w-11/12 md:max-w-md">
          <div className="flex justify-between items-center border-b p-2">
            <h3 className="font-bold text-lg">{title}</h3>
            <button
              className="text-black close-modal"
              onClick={handleClose}
              aria-label="Close Modal"
            >
              <svg viewBox="0 0 40 40" className="h-6 w-6 fill-current">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </button>
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
