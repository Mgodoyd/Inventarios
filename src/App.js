import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../src/Routes/AppRoutes';

function App() {
  return (
     <BrowserRouter>
        <AppRoutes />
     </BrowserRouter>
  );
}

export default App;
