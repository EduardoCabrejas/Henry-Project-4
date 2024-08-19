"use client";
import React, { useState, useEffect } from "react";
import { IUser } from "@/interfaces/IUser";
import Modal from "@/components/Modal";
import { ProductProps } from "@/interfaces/IProducts";
import Image from "next/image";

const Checkout: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        setShowErrorModal(true);
        setLoading(false);
      }

      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, []);

  const handleCreateOrder = async () => {
    if (!user) {
      setShowErrorModal(true);
      return;
    }

    const orderData = {
      userId: user.id,
      products: products.map((product) => product.id),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is not available");
      }
      console.log(token);
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }
  
      const newOrder = await response.json();
      setShowOrderModal(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating order:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setShowErrorModal(true);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  if (loading) {
    return <h1 className="m-auto p-2 text-center text-3xl text-lightblue1">Loading...</h1>;
  }

  if (!user) {
    return (
      <div className="m-4 flex items-center justify-center">
        <Modal
          isOpen={showErrorModal}
          onClose={() => {
            setShowErrorModal(false);
            window.location.href = "/login";
          }}
          context="denyAccess"
        />
      </div>
    );
  }

  return (
    <div className="m-4">
      <h1 className="text-xl text-center m-auto text-lightblue1 stroke-dv font-bold md:text-3xl">Checkout</h1>
      {products.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="grid grid-cols-4 bg-darkblue2 border-2 border-lightblue1 m-6 p-2 rounded-md">
            <h2 className="m-auto text-white stroke-dv text-xl font-bold text-center md:text-3xl">{product.name}</h2>
            <p className="text-white stroke-lb font-bold text-xl m-auto md:text-2xl">${product.price}</p>
            <Image src={product.image} alt="product" width={100} height={100} className="m-auto" />
            <button
              className="m-auto p-4 flex flex-justify-center bg-red-600 border-2 border-lightblue1 rounded-md transition-colors duration-500 hover:bg-gradient-to-r from-red-400 via-red-600 to-red-400"
              onClick={() => handleRemoveProduct(product.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <button
        className="flex justify-center m-auto w-1/2 text-2xl p-2 bg-green-950 text-lightblue1 border-2 border-lightblue1 rounded-md transition-colors duration-500 hover:bg-gradient-to-r from-lightblue2 via-darkblue1 to-lightblue2"
        onClick={handleCreateOrder}
      >
        Place Order
      </button>
      <Modal
        isOpen={showOrderModal}
        onConfirm={() => {
          localStorage.removeItem("products");
          setProducts([]);
          window.location.href = "/orders";
        }}
        onClose={() => {
          setShowOrderModal(false);
        }}
        context="order"
      />
      <Modal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
        }}
        context="errorOrder"
      />
    </div>
  );
};

export default Checkout;