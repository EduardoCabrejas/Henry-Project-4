export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    context: 'register' | 'signin' | 'signout' | 'productExist' | 'addProduct' | 'buy' | 'errorSignIn' | 'errorRegister' | 'denyAccess' | 'createOrder' | 'errorOrder' | 'errorGetOrder';
  }

  export interface ModalMessage {
    headerMessage: string;
    bodyMessage: string;
  }