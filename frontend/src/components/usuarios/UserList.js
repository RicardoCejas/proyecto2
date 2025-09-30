import { Link } from "react-router-dom";

const UserList = ({ users, loading, deleteUser }) => {
  if (loading) {
    return <p className="text-center text-gray-500">Cargando usuarios...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {user.name || "Sin nombre"} (@{user.username || "?"})
              </p>
              <p className="text-md text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">DNI: {user.dni}</p>
              <p className="text-sm text-gray-500">Localidad: {user.localidad}</p>
              <p className="text-sm text-gray-500">Teléfono: {user.telefono}</p>
            </div>
            <div className="space-x-4">
              <Link to={`/users/edit/${user.id}`}>
                <button className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                  EDITAR
                </button>
              </Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                ELIMINAR
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
