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
      } else {
        setShowErrorModal(true);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setShowErrorModal(true);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is not available");
        }

        const response = await fetch('http://localhost:3000/users/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
          },
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
    <div className="m-4">
      <h1 className="text-xl text-center m-2 text-lightblue1 stroke-dv font-bold md:text-3xl">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="m-6">
            <table className="w-full border-2 border-lightblue1 bg-lightblue2">
              <tbody>
                <tr>
                  <td className="border-lightblue1 border-2 p-2 font-bold">Order ID:</td>
                  <td className="border-lightblue1 border-2 p-2">{order.id}</td>
                </tr>
                <tr>
                  <td className="border-lightblue1 border-2 p-2 font-bold">Status:</td>
                  <td className="border-lightblue1 border-2 p-2">{order.status}</td>
                </tr>
                <tr>
                  <td className="border-lightblue1 border-2 p-2 font-bold">Date:</td>
                  <td className="border-lightblue1 border-2 p-2">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td className="border-lightblue1 border-2 p-2 font-bold">Products:</td>
                  <td className="border-lightblue1 border-2 p-2">
  <div className="grid grid-cols-5 gap-4 mt-4">
    {order.products.map((product) => (
      <div key={product.id} className="flex flex-col items-center bg-darkblue2 p-2 border border-gray-200 rounded-md">
        <Image src={product.image} alt={product.name} width={100} height={100} className="mb-2" />
        <p className="font-bold text-center">{product.name}</p>
        <p className="text-center">Price: ${product.price}</p>
      </div>
    ))}
  </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
