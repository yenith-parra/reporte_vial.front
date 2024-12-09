import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMaps } from '../contexts/GoogleMapsContext';

const InteractiveMap = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Usa el contexto para verificar si Google Maps está cargado
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    // Simulación de datos; puedes reemplazarlo con una llamada a tu API
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reportes');
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error("Error al obtener los incidentes:", error);
      }
    };
    fetchIncidents();
  }, []);

  if (loadError) {
    return <div>Error al cargar Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="map-container" style={{ height: '80vh', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{ lat: 1.6144, lng: -75.6137 }} // Ajusta la ubicación inicial
        zoom={14}
      >
        {incidents.map((incident) => (
          <Marker
            key={incident._id}
            position={{
              lat: incident.ubicacion.lat,
              lng: incident.ubicacion.long,
            }}
            onClick={() => setSelectedIncident(incident)}
          />
        ))}

        {selectedIncident && (
          <InfoWindow
            position={{
              lat: selectedIncident.ubicacion.lat,
              lng: selectedIncident.ubicacion.long,
            }}
            onCloseClick={() => setSelectedIncident(null)}
          >
            <div>
              <h5>{selectedIncident.tipo_problema}</h5>
              <p>{selectedIncident.descripcion}</p>
              <p>
                Estado: <strong>{selectedIncident.estado}</strong>
              </p>
              {selectedIncident.imagenes &&
                selectedIncident.imagenes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Incidente ${idx}`}
                    style={{ width: '100px', margin: '5px' }}
                  />
                ))}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default InteractiveMap;
