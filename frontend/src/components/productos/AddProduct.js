import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones antes de enviar
    if (!name || !price || !stock) {
      alert("⚠️ Debes completar Nombre, Precio y Stock");
      return;
    }

    const newProduct = {
      name: name,
      description: description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    fetch("http://127.0.0.1:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
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
        console.log("✅ Producto añadido:", data);
        navigate("/products");
      })
      .catch((err) => {
        console.error("❌ Error al crear producto:", err.message);
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
            Añadir Nuevo Producto
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre del Producto
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                id="name"
                type="text"
                placeholder="Ingrese el nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Descripción
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                id="description"
                type="text"
                placeholder="Ingrese la descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Precio
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                id="price"
                type="number"
                step="0.01"
                placeholder="Ingrese el precio del producto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                id="stock"
                type="number"
                placeholder="Ingrese el stock del producto"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                type="submit"
              >
                Añadir Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
