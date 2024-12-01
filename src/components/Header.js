import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [usuario, setUsuario] = useState(null); // Estado del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Verifica si hay datos del usuario
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Intenta parsear el JSON
        setUsuario(parsedUser); // Actualiza el estado con los datos del usuario
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
        setUsuario(null); // Si hay un error, establece el usuario como null
      }
    }
  }, []);

  const handleLogout = () => {
    // Elimina datos del usuario y token del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null); // Actualiza el estado
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Reporte Vial</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Si el usuario está autenticado */}
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Bienvenido, {usuario.nombre}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => navigate('/register')}
                  >
                    Registrarse
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
