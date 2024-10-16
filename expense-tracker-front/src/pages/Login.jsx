import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !lastName || !age || !email || !phone || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const response = await axios.post(
        "https://9b8d-2800-484-9a77-1000-ada8-3039-63b0-643c.ngrok-free.app/api/users/register",
        {
          username,
          lastName,
          age,
          email,
          phone,
          password,
        }
      );

      if (response.status === 200) {
        alert("Datos guardados exitosamente.");
      } else {
        alert("Error al guardar los datos.");
      }
    } catch (error) {
      alert("Error al guardar los datos.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const response = await axios.post(
        "https://83e1-2800-484-9a77-1000-8c44-9e9-b3c6-172d.ngrok-free.app/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("Respuesta del servidor:", response.headers); // Ver toda la respuesta

      const token = response.headers.get("Authorization");

      if (response.status === 200 && token) {
        const actualToken = token.split(" ")[1]; // Obtener el token real
        localStorage.setItem("jwtToken", actualToken);
        console.log("Token guardado:", actualToken);
        navigate("/dashboard");
      } else {
        alert("Error al iniciar sesión o no se recibió el token.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response ? error.response.data : error.message);
      alert("Error al iniciar sesión. Por favor verifica tus credenciales.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={isLogin ? handleLogin : handleSignUp}
        >
          <div className="space-y-4">
            {isLogin ? (
              <SignIn
                username={username}
                password={password}
                setName={setName}
                setPassword={setPassword}
              />
            ) : (
              <SignUp
                username={username}
                lastName={lastName}
                email={email}
                age={age}
                phone={phone}
                password={password}
                setName={setName}
                setLastName={setLastName}
                setEmail={setEmail}
                setAge={setAge}
                setPhone={setPhone}
                setPassword={setPassword}
              />
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-black hover:text-gray-800"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
