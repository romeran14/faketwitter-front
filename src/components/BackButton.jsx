import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

const BackButton = (props) => {
    let navigate = useNavigate();
     //USANDO LA RAMA JESUS
    let goBack = () => {
      navigate(-1);
    };
  return (
    <div className="backbtn navbarsticky">
    <BsArrowLeftShort onClick={goBack} />
    <h3>{props.children}</h3>
  </div>
    
  )
}

export default BackButton