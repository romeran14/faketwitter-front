import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { BiEnvelope } from "react-icons/bi";

export default function ProfileTools() {
  const loggedUserId = localStorage.getItem("id");
  const params = useParams();
  const { id } = params;

  if (loggedUserId === id) {
    return (
      <div className="profileTools">
        <button className="btn-profile">Edit profile</button>
      </div>
    );
  }

  return (
    <div className="profileTools">
      <div className="icon"><BsThreeDots /></div>
      <div className="icon"><BiEnvelope /></div>
      <div className="followBtn">Follow</div>
    </div>
  );
}
