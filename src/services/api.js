const baseURL = 'http://localhost:5000/api'; // Ajusta la URL según el backend

// Función genérica para manejar solicitudes HTTP
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error.message);
    throw error;
  }
};

// Ejemplo: Registrar un usuario
export const registerUser = async (data) => {
  return await fetchAPI('usuarios/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const loginUser  = async (data) => {
  return await fetchAPI('usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const createReport = async (data) => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  return await fetchAPI('reportes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
    },
    body: JSON.stringify(data),
  });
};


export const getReports    = async (data) => {
  return await fetchAPI('reportes/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};