import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="fondo-imagen">
      <div className="bg-light text-center p-5 panel-bienvenida">
        <h1 className="display-4 text-primary">Bienvenido a Reporte Vial</h1>
        <p className="lead">
          Contribuye a mejorar las vías de Florencia, Caquetá. Reporta y consulta
          incidentes viales fácilmente.
        </p>
        <div className="mt-4">
          <Link className="btn btn-primary btn-lg me-3" to="/register">
            Regístrate
          </Link>
          <Link className="btn btn-outline-primary btn-lg" to="/login">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
