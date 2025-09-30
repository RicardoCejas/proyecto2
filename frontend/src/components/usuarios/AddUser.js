import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUser = ({ setUsers, users }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Error en el servidor");
          });
        }
        return res.json();
      })
      .then((data) => {
        const nuevoUsuario = {
          id: data.id,
          name: data.email,
          username: data.email,
        };

        setUsers([...users, nuevoUsuario]);
        navigate("/users");
      })
      .catch((err) => {
        console.error("❌ Error al crear usuario:", err.message);
        alert("❌ " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            Volver Atrás
          </button>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              Menú Principal
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center pt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Añadir Nuevo Usuario
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Ingrese el correo del usuario"
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Ingrese una contraseña"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                type="submit"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
