import {FiMapPin} from "react-icons/fi";
import {AiOutlineLink} from "react-icons/ai";
import {CgBulb} from "react-icons/cg";
import {BsCalendar4Week} from "react-icons/bs";
//descripcion mas generales
export default function ProfileInfo ({infoUser}) {
    return (
        <div className="profileinfo">
                <div className="username">
                <span>{infoUser.Username}</span>
                <p>@{infoUser.Username}</p>
                </div>

                <div className="description">
                <p>{infoUser.about_me}</p>
                </div>

                <div className="inner-info">
                  <div><span><FiMapPin /> </span> <p>Your Country</p></div> 
                  <div><span><AiOutlineLink/> </span> <a>Linked-Social-Media</a></div>
                  <div><span><CgBulb /> </span> <p>Born April 27, 1999</p></div>
                  <div><span><BsCalendar4Week /> </span> <p>Joined March 2014</p></div>
                </div>

                <div className="followers">
                    <a>106 <span>Following  </span></a>
                    <a>  46 <span>Followers</span></a>
                </div>

              </div>
    )
}