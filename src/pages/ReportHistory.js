import React, { useState, useEffect } from 'react';
import { getReports } from '../services/api';

const ReportHistory = () => {
  const [reportes, setReportes] = useState([]); // Estado inicial como arreglo vacío
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports(); // Llamada a la API
        setReportes(response); // Actualizar el estado con los reportes
      } catch (err) {
        setError('Error al cargar los reportes.');
        console.error(err);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Cargando reportes...</div>; // Mensaje mientras carga
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Mostrar mensaje de error
  }

  if (reportes.length === 0) {
    return <div className="alert alert-info">No hay reportes disponibles.</div>; // Mensaje si no hay reportes
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Historial de Reportes</h1>
      <ul className="list-group">
        {reportes.map((reporte, index) => (
          <li key={index} className="list-group-item">
            <h4>{reporte.tipo_problema}</h4>
            <p>{reporte.descripcion}</p>
            <h6>Estado: {reporte.estado}</h6>
            <small>
              Fecha: {new Date(reporte.fecha_reporte).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportHistory;
