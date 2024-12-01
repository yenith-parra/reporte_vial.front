import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import { createReport } from '../services/api';

const CreateReport = () => {
  const [formData, setFormData] = useState({
    tipo_problema: '',
    descripcion: '',
    lat: '',
    long: '',
    imagenes: [],
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Redirigir a otras páginas
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA70RnPKg_vYtNCB1zJKkh7Dua_3q3tj8Y', // Reemplaza con tu API key
    libraries: ['places'],
  });

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
      alert("Geolocalización no disponible en este navegador.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar la carga de imágenes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePaths = files.map(file => URL.createObjectURL(file)); // Generar ruta de la imagen
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, ...imagePaths], // Añadir la imagen a la lista de imágenes
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
    try {
      const response = await createReport(formData);
      setMensaje('Reporte creado exitosamente.');

      // Redirigir al panel del ciudadano
      setTimeout(() => {
        navigate('/citizen'); // Volver al panel del ciudadano
      }, 1000);
    } catch (error) {
      setMensaje('Error al crear el reporte');
    }
  };

  return (
    <div className="container">
      <h1>Crear Reporte</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipo_problema" className="form-label">Tipo de Problema</label>
          <input
            type="text"
            name="tipo_problema"
            className="form-control"
            value={formData.tipo_problema}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mapa interactivo para obtener la ubicación */}
        <div className="mb-3">
          <label className="form-label">Selecciona tu ubicación:</label>
          <LoadScript googleMapsApiKey="AIzaSyA70RnPKg_vYtNCB1zJKkh7Dua_3q3tj8Y">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={markerPosition || { lat: 1.6144, lng: -75.6137 }} // Valor por defecto
                zoom={15}
                onClick={handleMapClick}
              >
                {markerPosition && (
                  <Marker position={markerPosition} draggable={true} />
                )}
              </GoogleMap>
            )}
          </LoadScript>
        </div>

        {/* Botón para cargar imágenes */}
        <div className="mb-3">
          <label htmlFor="imagenes" className="form-label">Cargar Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {/* Mostrar las imágenes seleccionadas */}
        <div className="mb-3">
          <label className="form-label">Imágenes Seleccionadas:</label>
          <div className="d-flex flex-wrap">
            {formData.imagenes.map((image, index) => (
              <img key={index} src={image} alt={`imagen-${index}`} style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }} />
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
