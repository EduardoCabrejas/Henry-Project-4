"use client";
import React, { useState, useEffect } from "react";
import {
  validateName,
  validateEmail,
  validateAddress,
  validatePhone,
  validatePassword,
} from "../helpers/registerValid";
import Image from "next/image";
import eyeO from "../../../public/images/eyeV.png";
import eyeC from "../../../public/images/eyeNv.png";
import Modal from "@/components/Modal";
import { postRegister } from "@/lib/server/fetchUser";
import { RegForm } from "@/interfaces/IForm";
import { RegErrors } from "@/interfaces/IErrors";

const Register: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegForm>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<RegErrors>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      address: validateAddress(formData.address),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      console.error("Form has errors:", newErrors);
      return;
    }

    try {
      await postRegister(formData);
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 750);
    } catch (error) {
      console.error("It was an unknown error:", error);
    }
  };

  const isFormFilled = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-2 w-full">
        <div className="bg-darkblue1 m-2 p-2 rounded-sm border-2 border-lightblue1 w-1/2">
          <h1 className="mb-4 text-center text-lightblue1 font-bold underline lg:text-3xl md:text-xl sm:text-lg">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="focus:border-lightblue1 focus:ring-lightblue2"
            />
            {formSubmitted && errors.name && (
              <p className="errors" style={{ whiteSpace: 'pre-line' }}>
                {errors.name}
              </p>
            )}

            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="focus:border-lightblue1 focus:ring-lightblue2"
            />
            {formSubmitted && errors.email && (
              <p className="errors">{errors.email}</p>
            )}

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleFormChange}
              required
              className="focus:border-lightblue1 focus:ring-lightblue2"
            />
            {formSubmitted && errors.address && (
              <p className="errors" style={{ whiteSpace: 'pre-line' }}>{errors.address}</p>
            )}

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleFormChange}
              required
              className="focus:border-lightblue1 focus:ring-lightblue2"
            />
            {formSubmitted && errors.phone && (
              <p className="errors">{errors.phone}</p>
            )}

            <label htmlFor="password">Contraseña:</label>
            <div className="flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleFormChange}
                required
                className="focus:border-lightblue1 focus:ring-lightblue2 text-darkviolet"
              />
              <Image
                className="right-2 ml-2 mb-2 w-9 h-8 bg-white rounded-md cursor-pointer p-1 border-2 border-lightblue1 hover:border-violet-900 hover:bg-lightblue1"
                src={showPassword ? eyeO : eyeC}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={togglePasswordVisibility}
              />
            </div>
            {formSubmitted && errors.password && (
              <p className="errors" style={{ whiteSpace: 'pre-line' }}>{errors.password}</p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isFormFilled()}
                className={`m-2 p-2 text-center rounded-md text-white ${
                  isFormFilled()
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray2 cursor-not-allowed"
                }`}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = '/home';
        }}
        context="register"
      />
    </div>
  );
};

export default Register;