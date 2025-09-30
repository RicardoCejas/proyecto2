import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setName(data.name || "");
        setUsername(data.username || "");
        setDni(data.dni || "");
        setLocalidad(data.localidad || "");
        setTelefono(data.telefono || "");
      })
      .catch((err) => {
        console.error("❌ Error cargando usuario:", err);
        alert("No se pudo cargar el usuario");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { email, password, name, username, dni, localidad, telefono };

    fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(() => navigate("/users"))
      .catch((err) => {
        console.error("❌ Error al actualizar usuario:", err);
        alert("Error al actualizar usuario");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Volver Atrás
          </button>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">
              Menú Principal
            </button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center pt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Editar Usuario
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Correo"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Nueva contraseña (opcional)"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="DNI"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              placeholder="Localidad"
            />
            <input
              className="mb-3 w-full border rounded-lg p-2"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
