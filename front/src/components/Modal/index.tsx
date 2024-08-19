"use client";
import styles from "./Modal.module.css";
import { ModalProps } from "@/interfaces/IModal";
import { getModalMessage } from "./utils";
import { ModalMessage } from "@/interfaces/IModal";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, context }) => {
  const modalMessage: ModalMessage = getModalMessage(context);

  if (!isOpen) {
    return null;
  }

  const renderButtons = () => {
    switch (context) {
      case "logout":
      case "addProduct":
      case "buy":
      case "order":
        return (
          <>
            <button className={styles.closeButton} onClick={onClose}>No</button>
            {onConfirm && <button className={styles.acceptButton} onClick={onConfirm}>Yes</button>}
          </>
        );
      default:
        return <button className={styles.closeButton} onClick={onClose}>Close</button>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 outline-none focus:outline-none">
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full border-2 border-lightblue1 rounded-md shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex flex-col items-center justify-between p-5 bg-darkviolet rounded-t">
            <h1 className="text-3xl font-semibold font-sans stroke-dv text-center underline gradient-text">{modalMessage.headerMessage}</h1>
            <button
              className="absolute top-0 right-0 m-2 p-2 rounded-md bg-darkblue2 text-white border-2 border-lightviolet transition-colors duration-500 hover:bg-gradient-to-r from-red-400 via-red-600 to-red-400"
              onClick={onClose}
            >
              X
            </button>
          </div>
          {/* Body */}
          <div className="bg-gray2 relative p-6 flex-auto">
            <p className="my-4 text-xl leading-relaxed text-center text-darkblue1">
              {modalMessage.bodyMessage}
            </p>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between p-6 bg-darkviolet rounded-b">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
