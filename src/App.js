import React from 'react';
import AppRoutes from './routes'; // Rutas de la aplicación
import Header from './components/Header'; // Barra de navegación
import Footer from './components/Footer'; // Pie de página

const App = () => {
  console.log("Se renderiza la App.")
  return (
    <div className="custom-div">
      <Header className="custom-header"/>
      <main className="container my-4 custom-main">
        <AppRoutes /> {/* Aquí se cargan las rutas */}
      </main>
      <Footer className="custom-footer"/>
    </div>
  );
};

export default App;
