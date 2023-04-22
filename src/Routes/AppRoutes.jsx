import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Operador from '../components/Operador/Operador';
import Admin from '../components/Administrador/Administrador';
import View from '../components/Views/View';
import ProtectRoute from './ProtectRoute';

const AppRoutes = () => {
 return( 
 <Routes>
    <Route exact path="/" element={<View />} />
    <Route exact path="/operador" element={<ProtectRoute />}> 
       <Route index element={<Operador />} />
     </Route>
     <Route exact path="/admin" element={<ProtectRoute />}> 
        <Route index element={<Admin />} />
     </Route>
  </Routes>
  );
};

export default AppRoutes;