from flask import Flask, request, jsonify
import sqlite3
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # habilitar CORS para React en localhost:3000

# ------------------ Configuración DB ------------------

DB_PATH = os.path.join(os.path.dirname(__file__), "instance", "app.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ------------------ Rutas Usuarios ------------------

@app.route("/signup", methods=["POST"])
def signup():
    """Registrar un nuevo usuario"""
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO user (email, password_hash, name, username, dni, localidad, telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data["email"],
            data["password"],  # guardamos en la columna password_hash
            data.get("name"),
            data.get("username"),
            data.get("dni"),
            data.get("localidad"),
            data.get("telefono")
        ))
        conn.commit()
        user_id = cur.lastrowid
        conn.close()
        return jsonify({"id": user_id, "email": data["email"]}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "El email ya existe"}), 409


@app.route("/users", methods=["GET"])
def list_users():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user")
    users = [dict(row) for row in cur.fetchall()]
    conn.close()
    return jsonify(users)


@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM user WHERE id = ?", (user_id,))
    row = cur.fetchone()
    conn.close()
    if row:
        return jsonify(dict(row))
    return jsonify({"error": "Usuario no encontrado"}), 404


@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE user
        SET email=?, password_hash=?, name=?, username=?, dni=?, localidad=?, telefono=?
        WHERE id=?
    """, (
        data.get("email"),
        data.get("password"),  # sigue usando password_hash
        data.get("name"),
        data.get("username"),
        data.get("dni"),
        data.get("localidad"),
        data.get("telefono"),
        user_id
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Usuario actualizado ✅"})


@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM user WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Usuario eliminado ✅"})

# ------------------ Rutas Productos ------------------

@app.route("/products", methods=["GET"])
def list_products():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM product")
    products = [dict(row) for row in cur.fetchall()]
    conn.close()
    return jsonify(products)


@app.route("/products", methods=["POST"])
def add_product():
    data = request.get_json()
    if not data.get("name") or not data.get("price") or not data.get("stock"):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO product (name, description, price, stock)
        VALUES (?, ?, ?, ?)
    """, (
        data["name"],
        data.get("description", ""),
        float(data["price"]),
        int(data["stock"])
    ))
    conn.commit()
    product_id = cur.lastrowid
    conn.close()
    return jsonify({"id": product_id, **data}), 201


@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM product WHERE id = ?", (product_id,))
    row = cur.fetchone()
    conn.close()
    if row:
        return jsonify(dict(row))
    return jsonify({"error": "Producto no encontrado"}), 404


@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        UPDATE product
        SET name=?, description=?, price=?, stock=?
        WHERE id=?
    """, (
        data["name"],
        data.get("description", ""),
        float(data["price"]),
        int(data["stock"]),
        product_id
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Producto actualizado ✅"})


@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM product WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Producto eliminado ✅"})

# ------------------ Main ------------------

if __name__ == "__main__":
    print("\n*** Servidor ejecutándose (SQLite + Flask + CORS) ***\n")
    app.run(host="0.0.0.0", port=5000, debug=True)
