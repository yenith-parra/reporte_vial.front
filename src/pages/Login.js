import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para autenticar al usuario
      const response = await loginUser(credentials); // Llamada al backend
      const { token, usuario_id, tipo_usuario, nombre } = response;
      console.log("El token es: ",{ token, usuario_id, tipo_usuario, nombre })

      // Guardar el token en el almacenamiento local o cookies
      localStorage.setItem('token', token);
      localStorage.setItem('id', usuario_id);
      localStorage.setItem('tipo', JSON.stringify(tipo_usuario));
      localStorage.setItem('user', JSON.stringify(nombre));

      // Redirigir según el tipo de usuario
      window.dispatchEvent(new Event('storage')); // Dispara el evento 'storage'
      if (tipo_usuario === 'ciudadano') {
        navigate('/citizen');
      } else if (tipo_usuario === 'administrador') {
        navigate('/admin');
      }
    } catch (error) {
      setMensaje('Error en las credenciales. Por favor, verifica tus datos.');
    }
  };

  return (
    <div className="container-register">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            value={credentials.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
      {mensaje && <div className="alert alert-danger mt-3">{mensaje}</div>}
    </div>
  );
};

export default Login;