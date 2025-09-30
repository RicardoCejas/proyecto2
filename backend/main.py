from app import create_app

app = create_app()

if __name__ == "__main__":
    print("\n*** Servidor ejecutándose desde main.py (el archivo correcto) ***\n")
    app.run(host="127.0.0.1", port=8000, debug=True)
