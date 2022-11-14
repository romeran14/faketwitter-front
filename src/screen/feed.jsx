import React, { useState, useContext, useCallback} from "react";
import { Stack,Divider,Text, Icon,StackDivider,useColorModeValue,Spinner,} from "@chakra-ui/react";
import { BsStar, BsImage } from "react-icons/bs";
import Axios from "axios";
import UserImage from "../components/UserImage";
import { FeedContext } from "../context/FeedContext";
import FeedingTray from "../components/FeedingTray";
import InputTweets from "../components/InputTweets";
import { motion } from "framer-motion";

const FeedScreen = ({ loginState, FeedState }) => {

  const progressColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const [errorMessage, setErrorMessage] = useState(null);

  //Probando cambio
  const dispatchFeed = useContext(FeedContext);
  Axios.defaults.withCredentials = false

  const SERVER_URL = process.env.REACT_APP_SERVER_URL



  const uploadHandler = useCallback(({textTweet, image}) => {
    var hoy = new Date();
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fechaYHora = fecha + " " + hora;

    const uploadTweet = async (fileName = null, retweet = null) => {
      dispatchFeed({ type: "SET_LOADING"})
      Axios.post(`${SERVER_URL}upload`, {
        userid: loginState.id,
        creationDate: fechaYHora,
        image: fileName,
        text: textTweet,
        retweet: retweet,
      }).then((response) => {
      
      Axios.get(`${SERVER_URL}upload/${0}/${1}`).then(
          (req) => {
            //setTextTweet('')
            dispatchFeed({ type: "NEW_TWEETT", payload: req, message : response.data.message });
          }
        );
      });
    };

    if (textTweet.trim() === "") {
      setErrorMessage("Field empty");
    } /*else if (textTweet.trim().length() > 140 ) {

        setErrorMessage("Too many characters");
      
      }*/
      
      
      else {
      if (image[0]) {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "nocm22xb");

        Axios.post(
          "https://api.cloudinary.com/v1_1/dynrpipqv/image/upload",
          formData
        ).then((response) => {
          const fileName = response.data.public_id;
          uploadTweet(fileName);
        });
      } else {
        uploadTweet();
      }
    }
  },[],)

  return (
    <motion.div
      id='feed'
      width={"100%"}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
    
      <Stack
        
        maxWidth={600}
        spacing={0}
        width={"100%"}
      >
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingX={4}
          paddingY={2}
          direction={"row"}
          className={'navbarsticky'}
        >
          <Text fontSize={"20px"} fontWeight={"bold"}>
            Inicio
          </Text>
          <Icon as={BsStar} height={5} color={"primary.500"} width={5}></Icon>
        </Stack>
        <Stack display={{sm:'none' ,md:'flex'} } direction={"row"} paddingX={"4"} paddingY={"2"} spacing={4}>
          <UserImage userImg={loginState.userImg} />

        <InputTweets  onSubmit={uploadHandler} allUsers={loginState.allUsers} />
        </Stack>
       
     
     <FeedingTray loginState={loginState} FeedState={FeedState} />
      </Stack>
    </motion.div>
  );
};

export default  React.memo(FeedScreen);
