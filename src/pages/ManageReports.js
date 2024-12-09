import React, { useEffect, useState } from 'react';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos o llamada a la API para obtener los reportes
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reportes');
        const data = await response.json();
        setReports(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleUpdate = async () => {
    if (!selectedReport) return;

    try {
      const updatedReport = {
        estado: statusUpdate,
        comentario: comment,
      };

      const response = await fetch(
        `http://localhost:5000/api/reportes/${selectedReport._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedReport),
        }
      );

      if (response.ok) {
        alert('Reporte actualizado exitosamente');
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === selectedReport._id
              ? { ...report, ...updatedReport }
              : report
          )
        );
        setSelectedReport(null);
        setStatusUpdate('');
        setComment('');
      } else {
        console.error('Error al actualizar el reporte');
      }
    } catch (error) {
      console.error('Error al realizar la actualización:', error);
    }
  };

  if (isLoading) return <div>Cargando reportes...</div>;

  return (
    <div className="container mt-5 report-management-container">
      <h1 className="text-center mb-4">Gestionar Reportes</h1>
      <div className="report-table">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <td>{index + 1}</td>
                <td>{report.tipo_problema}</td>
                <td>{report.descripcion}</td>
                <td>{report.estado}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedReport(report)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal o Sección para Editar */}
      {selectedReport && (
        <div className="update-section mt-4">
          <h3>Actualizar Reporte</h3>
          <p>
            <strong>Reporte seleccionado:</strong> {selectedReport.descripcion}
          </p>
          <div className="form-group">
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              className="form-control"
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
            >
              <option value="">Selecciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En Proceso</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="comment">Comentario:</label>
            <textarea
              id="comment"
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            className="btn btn-success mt-3"
            onClick={handleUpdate}
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageReports;
