import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-12 text-center bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Sistema de Gestión</h1>
        <p className="text-gray-600 mb-10">Elija una sección para administrar</p>
        <div className="flex justify-center space-x-6">
          <Link to="/login">
            <button className="w-48 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              Login
            </button>
          </Link>
          <Link to="/users">
            <button className="w-48 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              Administrar Usuarios
            </button>
          </Link>
          <Link to="/products">
            <button className="w-48 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              Administrar Productos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
