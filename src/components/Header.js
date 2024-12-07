import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [usuario, setUsuario] = useState(null); // Estado del usuario
  const navigate = useNavigate();

  // Función para cargar el usuario desde localStorage
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    console.log("El usuario en el LocalStorage es: ",storedUser);
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsuario(parsedUser); // Actualiza el estado con los datos del usuario
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
        setUsuario(null);
      }
    } else {
      setUsuario(null); // Si no hay usuario, establece null
    }
  };

  useEffect(() => {
    // Carga inicial del usuario
    loadUserFromStorage();

    // Escucha cambios en localStorage
    const onStorageChange = () => loadUserFromStorage();
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Elimina datos del usuario y token del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null); // Actualiza el estado
    navigate('/login'); // Redirige al login
  };

  const handleHomeClick = (e) => {
    if (usuario) {
      e.preventDefault(); // Previene la navegación
      const storedTipoUsuario = localStorage.getItem('tipo');
      console.log("El tipo de usuario es ", storedTipoUsuario);
      navigate(storedTipoUsuario === 'ciudadano' ? '/admin' : '/citizen'); // Redirige al panel correspondiente
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link 
          className="navbar-brand" 
          to="/" 
          onClick={handleHomeClick} // Lógica para el clic en "Reporte Vial"
        >
          Reporte Vial
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Si el usuario está autenticado */}
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link usuario-header">Bienvenido, {usuario}</span>
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
