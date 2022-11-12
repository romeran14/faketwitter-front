import React from 'react'
import { CgClose } from "react-icons/cg";

const ImgTweetPreview = ({ discardImage, img }) => {
  const discardHandler = () => {
    discardImage();
  };
  return (
    img && (
    <div className="ImgTweetPreview">
     <span><CgClose className="discardBtn" onClick={discardHandler} /></span> 
      <img alt="img-preview" className="img-preview" src={img}></img>
    </div>)
  );
};

export default ImgTweetPreview