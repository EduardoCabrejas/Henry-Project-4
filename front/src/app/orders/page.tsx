"use client";
import { useState, useEffect } from "react";
import { IUser } from "@/interfaces/IUser";
import { IOrder } from "@/interfaces/IOrder";
import Modal from "@/components/Modal";
import Image from "next/image";

const Orders: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

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
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setShowErrorModal(true);
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/users/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to get orders");
        }
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error("Error getting orders:", error);
        setShowErrorModal(true);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <h1 className="m-4 text-center text-3xl text-lightblue1">Loading...</h1>;
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
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <h2>Order ID: {order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <div>
              <h3>Products:</h3>
              {order.products.map((product) => (
                <div key={product.id} className="product-item">
                  <p>Name: {product.name}</p>
                  <p>Price: ${product.price}</p>
                  <Image src={product.image} alt={product.name} width={50} height={50} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Modal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
        }}
        context="errorGetOrder"
      />
    </div>
  );
};

export default Orders;