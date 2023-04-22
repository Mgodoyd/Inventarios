//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../src/Routes/AppRoutes';

/*import {Row, Col } from 'react-bootstrap';
import Image from './components/Login/Images';
import Login from './components/Login/Login';*/
//import AppRoutes from './components/Login/Routes';
/*import Administrador from './components/Login/Administrador';
import Operador from './components/Login/Operador';*/

/*<Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<Administrador />} />
      <Route path="operador" element={<Operador />} />
    </Routes>*/

function App() {
  return (
     <BrowserRouter>
        <AppRoutes />
     </BrowserRouter>
  );
}

export default App;
