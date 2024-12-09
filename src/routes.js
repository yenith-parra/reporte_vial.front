import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Página de inicio
import Register from './pages/Register'; // Registro
import Login from './pages/Login'; // Inicio de sesión
import CitizenPanel from './pages/CitizenPanel'; // Panel del ciudadano
import AdminPanel from './pages/AdminPanel'; // Panel del administrador
import Settings from './pages/Settings'; // Configuración y datos
import CreateReport from './pages/CreateReport';  // Asegúrate de que esta ruta esté correcta
import ReportHistory from './pages/ReportHistory';  // Asegúrate de que esta ruta esté correcta
import InteractiveMap from './pages/InteractiveMap';
import ManageReports from './pages/ManageReports';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/citizen" element={<CitizenPanel />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create-report" element={<CreateReport />} /> 
      <Route path="/report-history" element={<ReportHistory />} /> 
      <Route path="/interactive-map" element={<InteractiveMap />} />
      <Route path="/manage-reports" element={<ManageReports />} />
    </Routes>
  );
};

export default AppRoutes;
