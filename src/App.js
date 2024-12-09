import React, { useEffect, useState } from 'react';
import { GoogleMapsProvider } from './contexts/GoogleMapsContext';
import AppRoutes from './routes'; // Rutas de la aplicación
import Header from './components/Header'; // Barra de navegación
import Footer from './components/Footer'; // Pie de página

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Verifica si es la primera vez que se inicia el frontend
    const serverStarted = localStorage.getItem('serverStarted');
    
    if (!serverStarted) {
      // Si el flag no existe, significa que el frontend acaba de iniciarse
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.setItem('serverStarted', 'true'); // Establece el flag para evitar futuras limpiezas
    }
    // Permite el renderizado una vez completada la lógica
    setIsLoading(false);
  }, []);

  // Muestra un mensaje de carga mientras se completa la lógica
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMapsProvider>
      <div className="custom-div">
        <Header className="custom-header" />
        <main className="container my-4 custom-main">
          <AppRoutes />
        </main>
        <Footer className="custom-footer" />
      </div>
    </GoogleMapsProvider>
  );
};

export default App;
