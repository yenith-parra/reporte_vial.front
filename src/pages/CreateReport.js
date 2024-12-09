import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { createReport } from '../services/api';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';

const CreateReport = () => {
  const [formData, setFormData] = useState({
    tipo_problema: '',
    descripcion: '',
    lat: '',
    long: '',
    imagenes: [],
  });
  const [mensaje, setMensaje] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const navigate = useNavigate();

  // Usa el contexto para verificar si Google Maps está cargado
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ lat: latitude, lng: longitude });
        setFormData((prevData) => ({
          ...prevData,
          lat: latitude,
          long: longitude,
        }));
      });
    } else {
      alert('Geolocalización no disponible en este navegador.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePaths = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, ...imagePaths],
    });
  };

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
    setFormData((prevData) => ({
      ...prevData,
      lat,
      long: lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reporte = {
      ...formData,
      ubicacion: { lat: formData.lat, long: formData.long },
    };

    try {
      const response = await createReport(reporte);
      setMensaje('Reporte creado exitosamente: ', response);
      setTimeout(() => {
        navigate('/citizen');
      }, 2000);
    } catch (error) {
      setMensaje('Error al crear el reporte', error);
    }
  };

  if (loadError) return <div>Error al cargar Google Maps</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <div className="container report-container">
      <h1>Crear Reporte</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipo_problema" className="form-label">Tipo de Problema</label>
          <input
            type="text"
            name="tipo_problema"
            className="form-control input-large"
            value={formData.tipo_problema}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control input-large"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 mapa">
          <label className="form-label">Selecciona tu ubicación:</label>
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={markerPosition || { lat: 1.6144, lng: -75.6137 }}
            zoom={15}
            onClick={handleMapClick}
          >
            {markerPosition && <Marker position={markerPosition} draggable />}
          </GoogleMap>
        </div>

        <div className="mb-3">
          <label htmlFor="imagenes" className="form-label">Cargar Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-control input-large"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imágenes Seleccionadas:</label>
          <div className="d-flex flex-wrap">
            {formData.imagenes.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`imagen-${index}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Crear Reporte</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default CreateReport;
