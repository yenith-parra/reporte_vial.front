import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container mt-5 admin-panel-container">
      <h1 className="text-center mb-4 titulo-admin">Herramientas de Gestión Centralizadas</h1>
  
      {/* Botones de funcionalidades */}
      <div className="d-flex flex-wrap justify-content-around mt-4">
        {/* Gestionar reportes */}
        <Link
          to="/manage-reports"
          className="btn btn-primary admin-btn d-flex align-items-center"
        >
          <i className="fas fa-tasks me-2"></i> Gestionar Reportes
        </Link>

        {/* Generar estadísticas */}
        <Link
          to="/generate-statistics"
          className="btn btn-info admin-btn d-flex align-items-center"
        >
          <i className="fas fa-chart-pie me-2"></i> Generar Estadísticas
        </Link>

        {/* Administrar usuarios */}
        <Link
          to="/manage-users"
          className="btn btn-warning admin-btn d-flex align-items-center"
        >
          <i className="fas fa-users-cog me-2"></i> Administrar Usuarios
        </Link>

      </div>
    </div>
  );
};

export default AdminPanel;
