export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    context: 'register' | 'login' | 'logout' | 'productExist' | 'addProduct' | 'buy' | 'errorLogin' | 'errorRegister' | 'denyAccess' | 'order' | 'errorOrder' | 'errorGetOrder';
  }

  export interface ModalMessage {
    headerMessage: string;
    bodyMessage: string;
  }