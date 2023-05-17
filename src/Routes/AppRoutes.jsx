import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Operador from '../components/Operador/Operador';
import Admin from '../components/Administrador/Administrador';
import View from '../components/Views/View';
import ProtectRoute from './ProtectRoute';
import Productslist from '../components/Administrador/Productslist';
import Movimientos from '../components/Administrador/Movimientos';

const AppRoutes = () => {
 return( 
 <Routes>
    <Route exact path="/" element={<View />} />
    <Route exact path="/operador" element={<ProtectRoute />}> 
       <Route index element={<Operador />} />
     </Route>
     <Route path="/admin" element={<ProtectRoute />}> 
        <Route index element={<Admin />} />
        <Route path="tables" element={<Productslist />} />
        <Route path="movimientos" element={<Movimientos />} />
     </Route>
  </Routes>
  );
};

export default AppRoutes;