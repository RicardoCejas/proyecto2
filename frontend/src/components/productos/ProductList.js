import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Cargar productos desde el backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products") // asegurate de que el backend esté en 5000
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Error:", err));
  }, []);

  // 🔹 Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      fetch(`http://127.0.0.1:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar producto");
          return res.json();
        })
        .then(() => {
          setProducts(products.filter((p) => p.id !== id));
        })
        .catch((err) => console.error("❌ Error:", err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
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
          <Link to="/products/add">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              + Añadir Producto
            </button>
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Administración de Productos
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay productos registrados.
          </p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-center">Precio</th>
                <th className="py-3 px-6 text-center">Stock</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{product.name}</td>
                  <td className="py-3 px-6 text-left">
                    {product.description}
                  </td>
                  <td className="py-3 px-6 text-center">${product.price}</td>
                  <td className="py-3 px-6 text-center">{product.stock}</td>
                  <td className="py-3 px-6 text-center flex justify-center space-x-2">
                    {/* Botón Editar */}
                    <Link to={`/products/${product.id}/edit`}>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                        Editar
                      </button>
                    </Link>
                    {/* Botón Eliminar */}
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
