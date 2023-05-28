import { FC, useState } from "react";
import Modal from "../Components/Modal/Modal";

const ErrorPage: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-32 bg-red-300 gap-4">
      <h1 className="text-5xl text-center">Error 404: Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        className="bg-blue-500 text-white p-1 rounded-md m-1"
        onClick={handleShowModal}
      >
        Show Modal
      </button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <p>Something went wrong. Please try again later.</p>
      </Modal>
    </section>
  );
};

export default ErrorPage;
