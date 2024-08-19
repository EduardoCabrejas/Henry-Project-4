"use client";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { IUser } from "@/interfaces/IUser";
import Modal from "@/components/Modal";
import avatar from "../../../public/images/avatar.png";
import Image from "next/image";

const Profile: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
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
                        window.location.href = '/login';
                    }}
                    context="denyAccess"
                />
            </div>
        );
    }

    return (
      <div className="flex justify-center items-center p-2 w-full">
          <div className="m-4 bg-darkblue1 p-2 rounded-sm border-2 border-lightblue1 w-3/4 overflow-hidden md:w-1/2">
              <h1 className="mb-4 text-center text-lightblue1 font-bold underline lg:text-3xl md:text-xl sm:text-lg">
                  My Profile
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                      <h2 className={styles.data}>Name:</h2>
                      <p className={styles.info}>{user.name}</p>
                      <h2 className={styles.data}>Email:</h2>
                      <p className={styles.info}>{user.email}</p>
                      <h2 className={styles.data}>Address:</h2>
                      <p className={styles.info}>{user.address}</p>
                      <h2 className={styles.data}>Phone:</h2>
                      <p className={styles.info}>{user.phone}</p>
                  </div>
                  <div className="m-auto">
                  <Image src={avatar} alt="Logo" width={150} height={100} className="bg-white object-cover rounded-full"/>
                  </div>
              </div>
          </div>
      </div>
  );
};  

export default Profile;