import React from 'react'
import { Link } from "react-router-dom";

const ProfileLink = (props) => {
  
  let ref = props.idProfile;
  if (props.idRt ) {
    ref = props.idRt;
  } else if (props.idLk ) {
    ref = props.idLk;
  } 

  const goToUserProfile = (e) =>{
    e.stopPropagation()
  }
  
  return (
    <Link className='profilelink' onClick={(e) => goToUserProfile(e)} to={`/profile/${ref}`} >{props.children}</Link>
  )
}

export default ProfileLink