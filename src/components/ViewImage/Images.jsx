import React from "react";
import { Image } from "react-bootstrap";
import { MdOutlineFacebook } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import './Image.css';

const Images = () => {
  return(
<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
  <Image src="./Images/logobatres.png" style={{width:"100%", height:"100%", objectFit: "cover"}} />
  <div style={{
    position: 'absolute',
    display: 'inline-block',
    width: '85px',
    height: '85px',
    border: '7px solid white',
    borderRadius: '25px',
    background: 'rgba(255, 255, 255, 0.2)',
    marginRight: '30px',
    top: '40%',
    left: '33%',
    transform: 'translate(-50%, -50%)',
    }}>
      <div style={{
      position: 'absolute',
      top: '29%',
      left: '70%',
      transform: 'translate(-50%, -50%)',
      width: '55px',
      height: '55px',
      borderRadius: '45%',
      border: '8px solid white',
      backgroundColor: 'transparent'
    }}>
    </div>
  </div>
  <div style={{ position: 'absolute', color: 'white', top: '40%', left: '72%', transform: 'translate(-50%, -50%)' }}>
    <h1 style={{ fontSize: '4vw' , fontFamily:"cursive"}}>ELBOD2i</h1>
 </div>
  <div style={{ position: 'absolute', top: '92%', left: '22%', transform: 'translate(-50%, -50%)' }}>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white', marginRight: '50px', display: 'inline-block', marginTop:"-200px" }}>
    <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '43px' }}>
    <MdOutlineFacebook size={40} />
  </div>
    </div>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white', display: 'inline-block', marginRight: '50px', marginTop:"-200px" }}>
    <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '44px' }}>
      <AiFillInstagram size={40} />
      </div>
    </div>
    <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white', display: 'inline-block',marginTop:"-200px" }}>
    <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '42px' }}>
      <BsTwitter size={30} />
      </div>
    </div>
  </div>
</div>
  );
}

export default Images;