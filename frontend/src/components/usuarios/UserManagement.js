import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserList from "./UserList";

const UserManagement = () => {
  const [users, setUsers] = useState([]);   // 🔑 Estado local para usuarios
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔑 Al cargar el componente, pedir usuarios al backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        setLoading(false);
      });
  }, []);

  // 🔑 Eliminar usuario
  const deleteUser = (id) => {
    fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Administración de Usuarios
        </h1>
        <div className="flex space-x-4">
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
          <Link to="/users/add">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              + Añadir Usuario
            </button>
          </Link>
        </div>
      </div>
      <UserList users={users} loading={loading} deleteUser={deleteUser} />
    </div>
  );
};

export default UserManagement;
