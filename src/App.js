//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col } from 'react-bootstrap';
import Login from './components/Login/Login';
import Image from './components/Login/Image';


function App() {
  return (
    <div className="App">
      <Row className="login" style={{paddingBottom:"0"}}>
       <Col><Image /></Col>

       <Col><Login /></Col>
       </Row>
    </div>
  );
}

export default App;
