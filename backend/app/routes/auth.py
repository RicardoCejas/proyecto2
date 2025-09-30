from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User, Product
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if User.query.filter_by(email=data["email"]).first():
        return jsonify(msg="Email ya registrado"), 400

    user = User(email=data["email"],
                name=data.get("name"),
                username=data.get("username"),
                dni=data.get("dni"),
                localidad=data.get("localidad"),
                telefono=data.get("telefono"))
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify(msg="Credenciales inválidas"), 401

    token = create_access_token(identity=user.email)
    return jsonify(access_token=token), 200

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    return jsonify(user.to_dict())


@auth_bp.route("/users", methods=["GET"])
@jwt_required()
def list_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@auth_bp.route("/users/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(msg="Usuario no encontrado"), 404
    return jsonify(user.to_dict())


@auth_bp.route("/users/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(msg="Usuario no encontrado"), 404

    data = request.get_json()
    user.email = data.get("email", user.email)
    user.name = data.get("name", user.name)
    user.username = data.get("username", user.username)
    user.dni = data.get("dni", user.dni)
    user.localidad = data.get("localidad", user.localidad)
    user.telefono = data.get("telefono", user.telefono)
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify(user.to_dict()), 200

@auth_bp.route("/users/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(msg="Usuario no encontrado"), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify(msg="Usuario eliminado correctamente"), 200

# Product routes

@auth_bp.route("/products", methods=["POST"])
@jwt_required()
def create_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        stock=data['stock']
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@auth_bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@auth_bp.route("/products/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify(msg="Producto no encontrado"), 404
    return jsonify(product.to_dict())

@auth_bp.route("/products/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify(msg="Producto no encontrado"), 404
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    db.session.commit()
    return jsonify(product.to_dict())

@auth_bp.route("/products/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify(msg="Producto no encontrado"), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify(msg="Producto eliminado correctamente")
