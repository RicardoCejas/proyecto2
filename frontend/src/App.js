import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserManagement from "./components/usuarios/UserManagement";
import AddUser from "./components/usuarios/AddUser";
import EditUser from "./components/usuarios/EditUser";
import ProductList from "./components/productos/ProductList";
import AddProduct from "./components/productos/AddProduct";
import EditProduct from "./components/productos/EditProduct";
import Login from "./components/auth/Login";

function App() {
  // User State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Product State
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data || []);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });

    fetch("http://127.0.0.1:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* User Routes */}
        <Route
          path="/users"
          element={<UserManagement users={users} setUsers={setUsers} loading={loadingUsers} />}
        />
        <Route path="/users/add" element={<AddUser setUsers={setUsers} users={users} />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        {/* Product Routes */}
        <Route
          path="/products"
          element={<ProductList products={products} setProducts={setProducts} loading={loadingProducts} />}
        />
        <Route path="/products/add" element={<AddProduct setProducts={setProducts} products={products} />} />
        <Route path="/products/:id/edit" element={<EditProduct />} /> {/* ✅ corregido */}
      </Routes>
    </div>
  );
}

export default App;
