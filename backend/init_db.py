import sqlite3
import os

# Asegurar que la carpeta instance exista
os.makedirs("instance", exist_ok=True)

# Ruta absoluta a la base de datos
DB_PATH = os.path.join("instance", "app.db")

# Conectar (se crea si no existe)
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Crear tabla user
cursor.execute("""
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    username TEXT,
    dni TEXT,
    localidad TEXT,
    telefono TEXT
);
""")

# Crear tabla product
cursor.execute("""
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
);
""")

conn.commit()
conn.close()

print("✅ Base de datos creada con tablas 'user' y 'product'")
