import React from "react";
import Image from "../ViewImage/Images";
import Login from "../Login/Login";
import { Row, Col } from "react-bootstrap";

//Dividimos la pantalla en dos partes, una para la imagen y otra para el formulario del login
const View = () => {
    return (
        <div className="App">
        <Row className="login" style={{paddingBottom:"0"}}>
         <Col><Image /></Col>
         <Col><Login /></Col>
         </Row>
      </div>
    );
}  


export default View;