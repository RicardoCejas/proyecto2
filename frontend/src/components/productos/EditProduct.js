import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos del producto
  useEffect(() => {
    console.log("🟢 Editando producto con id:", id);

    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then((res) => {
        console.log("🔵 Respuesta API status:", res.status);
        if (!res.ok) throw new Error("No se encontró el producto");
        return res.json();
      })
      .then((data) => {
        console.log("📦 Datos recibidos:", data);
        if (!data || Object.keys(data).length === 0) {
          setError("Producto no encontrado en la base de datos");
        } else {
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price || "");
          setStock(data.stock || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error al cargar producto:", err);
        setError("No se pudo cargar el producto.");
        setLoading(false);
      });
  }, [id]);

  // Guardar cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    console.log("✏️ Enviando actualización:", updatedProduct);

    fetch(`http://127.0.0.1:5000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar producto");
        return res.json();
      })
      .then(() => {
        alert("✅ Producto actualizado con éxito");
        navigate("/products");
      })
      .catch((err) => {
        console.error("❌ Error al actualizar producto:", err);
        alert("No se pudo guardar el producto.");
      });
  };

  if (loading) {
    return <p className="text-center mt-10">⏳ Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

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
            Editar Producto
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                className="border rounded-lg w-full py-2 px-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Descripción</label>
              <input
                className="border rounded-lg w-full py-2 px-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Precio</label>
              <input
                className="border rounded-lg w-full py-2 px-4"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Stock</label>
              <input
                className="border rounded-lg w-full py-2 px-4"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg"
              type="submit"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
