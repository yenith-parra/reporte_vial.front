import React, { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsContext = createContext();
// Fuera del componente, define las bibliotecas de Google Maps
const libraries = ['places', 'maps'];

export const GoogleMapsProvider = ({ children }) => {
    const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: libraries, // Incluye todas las bibliotecas necesarias
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
