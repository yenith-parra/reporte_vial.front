import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData); // Muestra los datos en consola
    try {
      // Agregar automáticamente el tipo de usuario "ciudadano"
      const userData = { ...formData, tipo_usuario: 'ciudadano' };
      console.log('Datos enviados al backend:', userData);
      const response = await registerUser(userData);
      setMensaje(response.mensaje);
      console.log("El usuario es: ", response.nombre );

      // Guardar el token en el almacenamiento local o cookies
      localStorage.setItem('user', JSON.stringify(response.nombre));
      // Redirigir al Panel del Ciudadano
      setTimeout(() => {
        window.dispatchEvent(new Event('storage')); // Dispara el evento 'storage'
        navigate('/citizen');
      }, 1000); // Agregar un pequeño retraso para mostrar el mensaje
    } catch (error) {
      setMensaje('Error al registrar usuario');
    }
  };

  return (
    <div className="container-register">
      <h1>Formulario de registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
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
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary boton-register">Registrarse</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default Register;
