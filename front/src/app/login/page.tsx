"use client";
import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../helpers/loginValid";
import Image from "next/image";
import { LogForm } from "@/interfaces/IForm";
import { LogErrors } from "@/interfaces/IErrors";
import { postLogin } from "@/lib/server/fetchUser";
import Modal from "@/components/Modal";
import eyeO from "../../../public/images/eyeV.png";
import eyeC from "../../../public/images/eyeNv.png";

const Login: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LogForm>({email: "", password: ""});
  const [errors, setErrors] = useState<LogErrors>({ email: "", password: "" });
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormFilled = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    if (emailError || passwordError) {
      setErrors({
        email: emailError || "",
        password: passwordError || "",
      });
      return;
    }
    try {
      const result = await postLogin(formData);
      if (typeof window !== 'undefined') {
        const { user } = result;
        const { ...userData } = user; // Excluir id y contraseña
        localStorage.setItem("token", user.credential.password); // Guardar la contraseña como "token"
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 750);
    } catch (error) {
      console.error('It was an error:', error);
      setShowErrorModal(true);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center p-2 w-full">
      <div className="bg-darkblue1 m-2 p-2 rounded-sm border-2 border-lightblue1 w-80% md:w-1/2 flex flex-col justify-center items-center">
        <h1 className="mb-4 text-center text-lightblue1 font-bold underline lg:text-3xl md:text-xl sm:text-lg">
          Iniciar Sesión
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Nombre de Usuario"
            value={formData.email}
            onChange={handleChange}
            required
            className="focus:border-lightblue1 focus:ring-lightblue2"
          />
          {errors.email && <p className="errors">{errors.email}</p>}

          <label htmlFor="password">Contraseña:</label>
          <div className="flex items-center justify-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="focus:border-lightblue1 focus:ring-lightblue2 text-darkviolet"
            />
            <Image
              className="right-2 ml-2 mb-2 w-9 h-9 bg-white rounded-md cursor-pointer p-1 border-2 border-lightblue1 hover:border-violet-900 hover:bg-lightblue1"
              src={showPassword ? eyeO : eyeC}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <p className="errors" style={{ whiteSpace: 'pre-line' }}>{errors.password}</p>}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={!isFormFilled()}
              className={`m-2 p-2 text-center rounded-md text-white ${
                isFormFilled()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray2 cursor-not-allowed"
              }`}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
      }}
        context="errorLogin"
      />
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = '/home';
        }}
        context="login"
      />
    </div>
  );
};

export default Login;