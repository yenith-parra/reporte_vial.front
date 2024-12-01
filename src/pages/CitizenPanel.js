import React from 'react';
import { Link } from 'react-router-dom';

const CitizenPanel = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 titulo-ciudadano">Panel del Ciudadano</h1>
      <div className="d-flex justify-content-around">
        {/* Botón para Crear Reporte */}
        <Link
          to="/create-report"
          className="btn btn-primary d-flex align-items-center"
          style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '1.2rem' }}
        >
          <i className="fas fa-plus-circle me-2"></i> Crear Reporte
        </Link>

        {/* Botón para Historial de Reportes */}
        <Link
          to="/report-history"
          className="btn btn-secondary d-flex align-items-center"
          style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '1.2rem' }}
        >
          <i className="fas fa-history me-2"></i> Historial de Reportes
        </Link>
      </div>
    </div>
  );
};

export default CitizenPanel;
