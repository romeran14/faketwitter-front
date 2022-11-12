import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Axios from "axios";
import BackButton from "../components/BackButton";
import { useState } from "react";
import Verified from "../icons/Verified";
import UserImage from "../components/UserImage";
import { Spinner } from "@chakra-ui/react";
import ProfileTools from "../components/profileTools";
import ProfileInfo from "../components/ProfileInfo";
import FeedingTray from "../components/FeedingTray";

const Profile = ({ loginState, FeedState }) => {
  const { id } = useParams();
  const [infoUser, setInfoUser] = useState({});
  const [infoTwits, setInfoTwits] = useState({});

  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    Axios.get(`${SERVER_URL}user/infouser/${id}`).then((response) => {
      setInfoUser(response.data.infouser[0]);
      setInfoTwits(response.data.twsUser);
    });
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        {!infoUser ? (
          <Spinner></Spinner>
        ) : (
          <>
            <div className="profile">
              <div className="header">
                <BackButton />
                <div className="username-box">
                  <div className="username">
                    <span>{infoUser.Username}</span>
                    <Verified />
                  </div>
                  {infoTwits.length === 1 ? (
                    <span className="tweets"> {infoTwits.length} tweet </span>
                  ) : (
                    <span className="tweets"> {infoTwits.length} tweets </span>
                  )}
                </div>
              </div>
              <img
                className="img-banner"
                src="https://source.unsplash.com/random"
                alt="Banner de perfil"
              />
              <UserImage userImg={infoUser.user_img} />
              <ProfileTools className="profileTools" />
              <ProfileInfo className="profileInfo" infoUser={infoUser}/> 
            </div>


            <FeedingTray
              loginState={loginState}
              FeedState={FeedState}
              userFeed={id}
            ></FeedingTray>

          </>
        )}
      </div>
    </motion.div>
  );
};
export default Profile
