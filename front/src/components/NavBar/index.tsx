"use client";
import Image from 'next/image';
import logo from "../../../public/images/logo.png";
import searchIcon from "../../../public/images/searchIcon.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from "./NavBar.module.css";
import Modal from "@/components/Modal";

const NavBar: React.FC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            router.push(`/search?q=${searchTerm}`);
        }
    };

    return (
        <div className="w-full grid grid-cols-2 md:justify-between items-center bg-gradient-to-br from-darkblue2 via-lightblue2 to-darkblue1 font-semibold p-2 overflow-auto">
            <div className="">
                <div className='flex flex-col justify-center items-center m-auto md:flex-row'>
                    <Image src={logo} alt="Logo" width={50} height={50} className="ml-2 object-cover rounded-full" />
                    <h1 className="w-full text-xl md:text-2xl text-center m-auto">Panda Apple</h1>
                    <input
                        className="w-3/4 text-darkblue1 text-sm border-2 border-lightblue1 rounded-md m-1 md:w-full"
                        type="text"
                        placeholder="Search the products by the name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                            }}}
                    />
                    <Image
                        src={searchIcon}
                        alt='Search Icon'
                        width={40}
                        height={40}
                        onClick={handleSearch}
                    />
                </div>
            </div>
            <div className="text-center grid grid-cols-2 gap-2 md:flex flex-row justify-around">
                <Link href="/home" className={styles.link}>Home</Link>
                {token ? (
                    <>
                        <Link href="/profile" className={styles.link}>Profile</Link>
                        <Link href="/checkout" className={styles.link}>Checkout</Link>
                        <Link href="/orders" className={styles.link}>Orders</Link>
                        <button onClick={() => setShowSuccessModal(true)} className={styles.link}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link href="/register" className={styles.link}>Register</Link>
                        <Link href="/signin" className={styles.link}>Sign In</Link>
                    </>
                )}
            </div>
            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                onConfirm={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("products");
                    setToken(null);
                    window.location.href = '/signin';
                }}
                context="signout"
            />
        </div>
    );
}

export default NavBar;