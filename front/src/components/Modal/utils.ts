import { ModalMessage } from "@/interfaces/IModal";
export const ModalMessages: Record<string, ModalMessage> = {
  register: {
    headerMessage: "Successful Register!",
    bodyMessage: "You will be redirected to the Login Page.",
  },
  signin: {
    headerMessage: "Successful Log In!",
    bodyMessage: "You will be redirected to the Home Page.",
  },
  signout: {
    headerMessage: "Are you sure to log out?",
    bodyMessage: "You will be redirected to the Login Page.",
  },
  addProduct: {
    headerMessage: "Are you sure to add this product?",
    bodyMessage: "Your product will be add to your cart",
  },
  buy: {
    headerMessage: "Are you sure to buy this product?",
    bodyMessage: "You will be redirect to the Checkout Page.",
  },
  errorRegister: {
    headerMessage: "Failed to register.",
    bodyMessage: "Invalid data for register. Please try again.",
  },
  errorLogin: {
    headerMessage: "Failed to log in",
    bodyMessage: "Invalid credentials or this user not exist. Please try again.",
  },
  denyAccess: {
    headerMessage: "Access Denied",
    bodyMessage: "Only users or admin have access to this page. You will be redirect to the Login Page",
  },
  productExist: {
    headerMessage: "Product already added before",
    bodyMessage: "You only can add one type of product to the Checkout"
  },
  createOrder: {
    headerMessage: "Create Order",
    bodyMessage: "Please confirm to create a purchase order with the products present"
  },
  errorOrder: {
    headerMessage: "Failed to create order",
    bodyMessage: "There was an error creating the order. Please, check and try again",
  },
  errorGetOrder: {
    headerMessage: "Failed to get order",
    bodyMessage: "There was an error getting the order. Please try again",
  },
  genericError: {
    headerMessage: "Something went wrong",
    bodyMessage: "An unexpected error occurred. Please try again later.",
  },
};

export const getModalMessage = (context: string): ModalMessage => {
  return ModalMessages[context] || ModalMessages.genericError;
};