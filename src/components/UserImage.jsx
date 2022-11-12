import React from 'react'
import { Image } from 'cloudinary-react'
import imgDefault from '../images/user_default.jpeg'
const UserImage = ({userImg}) => {
  
  return (
    <>
    {   
        userImg === null ? (
          <img src={imgDefault}   className={"user-img-default"}
          style={{ borderRadius: "50%" }}></img>
        ) : (

          <Image
          cloudName="dynrpipqv"
          publicId={userImg}
          className={"user-img"}
          style={{ borderRadius: "50%" }}
        ></Image>
        )}
        </>
  )
}

export default React.memo(UserImage) 