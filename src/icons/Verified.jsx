import { GoVerified } from "react-icons/go";
import { IconContext } from "react-icons/lib";

export default function Verified () {
    return (
    <IconContext.Provider value={{ color: "rgb(29, 155, 240)", className: "global-class-name", size:"1.07em" }}> 
        <div>
            <GoVerified />
        </div>
    </IconContext.Provider> 
    )
}
   