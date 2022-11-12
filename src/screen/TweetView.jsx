
import { useParams } from 'react-router-dom'
import React, { useContext, useMemo} from "react";
import { Image } from "cloudinary-react";
import {FaRetweet,FaRegHeart,FaHeart} from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import UserImage from '../components/UserImage';
import moment from "moment";
import retweet from "../tweetsFunctions/retweet";
import like from "../tweetsFunctions/like";
import { FeedContext } from "../context/FeedContext";
import deleteTw from "../tweetsFunctions/deleteTw";
import {CgClose} from "react-icons/cg"
import {BsThreeDots} from "react-icons/bs"
import { useNavigate, useLocation } from 'react-router-dom';
import {BsArrowLeftShort} from 'react-icons/bs'
import InputTweetsSimplified from '../components/InputTweetsSimplified';
import FeedingTray from '../components/FeedingTray';
import { motion } from 'framer-motion';
import TextTweet from '../components/TextTweet';
import BackButton from '../components/BackButton';

const TweetView = ({loginState,FeedState}) => {
    const { idtweet } = useParams();

    const allTw = useMemo(() => FeedState.allTw, []);
    const location = useLocation();
    const twMother = useMemo(
      () => allTw.find((item) => Number(idtweet) === item.idtwetts),
      [location]
    );
   
    const timeAgo = moment(twMother.creationDate, [ "YYYY",moment.ISO_8601,]).format('h:mm a [·] Do MMM  YYYY ');

    const dispatchFeed = useContext(FeedContext);
    let twName = null;

    if (twMother.Retweet > twMother.LikesId) {
      twName = twMother.Retweet_original_username;
    } else if (twMother.Retweet < twMother.LikesId) {
      twName = twMother.Like_original_username;
    } else {
      twName = twMother.Username;
    }

///////////
const retweetHandler = (e,
  loginStateId,
  idtwetts,
  Retweet,
  text,
  img,
  Retweet_state,
  likesId,
  likeAlready,
  OwnTw = false,
  Is_comment,
  Comment_original_username
) => {
 
  e.preventDefault()

  retweet(
    loginState.id,
    idtwetts,
    Retweet,
    text,
    img,
    Retweet_state,
    likesId,
    likeAlready,
    OwnTw,
    Is_comment,
    Comment_original_username
  );

  dispatchFeed({
    type: "RETWEET",
    payload: {
      id: loginStateId,
      idtwetts: twMother.idtwetts,
      retweet_state: twMother.Retweet_state,
    },
  });
};
/////////////
const likeHandler = (e,
  loginStateId,
  idtwetts,
  Like,
  text,
  img,
  Like_state,
  retweetId,
  retweetAlready,
  OwnTw = false,
  Is_comment,
  Comment_original_username
) => {

  e.preventDefault()
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
 
  like(
    loginState.id,
    idtwetts,
    Like,
    text,
    img,
    Like_state,
    retweetId,
    retweetAlready,
    OwnTw,
    Is_comment,
    Comment_original_username
  );

  dispatchFeed({
    type: "LIKE",
    payload: {
      id: loginStateId,
      idtwetts: twMother.idtwetts,
      like_state: twMother.Like_state,
    },
  });
};

const deleteHandler = async (e, idtwetts, retweetId,  likesId, Is_comment) => {
  e.preventDefault()

  dispatchFeed({ type: "SET_LOADING"})
  const deletedCheck =   await  deleteTw(idtwetts, retweetId,  likesId, Is_comment );

  if(deletedCheck.status){
    dispatchFeed({
      type: "DELETE",
      payload: {
        idtwetts: twMother.idtwetts,
        deletedCheck: deletedCheck
      },
    });
  }else{
    console.log('deletecheK Error', deletedCheck)
    //CREAR DISPACTH PARA ERRORES GENERALES
  }
};
//estas condiciones son para que las clases del rt o like se activen si fueron hechos por el usuario actual
if (loginState.id=== twMother.users_Userid && twMother.Retweet !== null) {
  twMother.Retweet_state = true;
}

if (loginState.id === twMother.users_Userid && twMother.LikesId !== null) {
  twMother.Like_state = true;
}

const controladorPropioRTw = (e) =>{
  e.preventDefault()

  if(twMother.LikesId !== null){
         //Si es tu like
         retweetHandler(e,
           loginState.id,
           twMother.idtwetts,
           twMother.LikesId,
           twMother.text,
           twMother.img,
           twMother.Retweet_state,
           twMother.idtwetts,
           twMother.Retweet,
           true,
           twMother.Is_comment,
           twMother.Comment_original_username,
           )
          
       }else if(twMother.Retweet !== null ){
       
         deleteHandler(e,twMother.idtwetts,
           twMother.Retweet,
           twMother.LikesId,
           twMother.Is_comment
           )
       }else{
        console.log('no se cumplio ninguna condicion')
       }
     }
     const controladorPropioLk = (e) =>{
   

      if(twMother.Retweet !== null){
             //Caso de Rt sin like
             likeHandler(e,
               loginState.id,
               twMother.idtwetts,
               twMother.Retweet,
               twMother.text,
               twMother.img,
               twMother.Like_state,
               twMother.idtwetts,
               twMother.LikesId,
               true,           
               twMother.Is_comment,
               twMother.Comment_original_username,)
              
           }else if ( twMother.LikesId !== null ){
           
             deleteHandler(e,twMother.idtwetts,
               twMother.Retweet,
               twMother.LikesId,
               twMother.Is_comment
               )
           }else{
            console.log('no se cumplio ninguna condicion')
           }
         }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackButton>Tweet</BackButton>
      <div className="tweetViewBody">
        <div className="topbox">     
           <div className="left-piece">
          {twMother.Retweet !== null ? (
            <FaRetweet />
          ) : (
            <span className="emptyTweetState"></span>
          )}
          {twMother.LikesId !== null ? (
            <FaHeart />
          ) : (
            <span className="emptyTweetState"></span>
          )}
        </div>
        <div className="right-piece">
          {twMother.Retweet !== null ? (
            <h6>{twMother.Username} Retweet's</h6>
          ) : (
            <span className="emptyTweetState"></span>
          )}

          {twMother.LikesId !== null ? (
            <h6>{twMother.Username} Like's</h6>
          ) : (
            <span className="emptyTweetState"></span>
          )}
        </div>
        </div>


        <div className="ownerTwInfo">
          <div className="left-piece">
            <UserImage userImg={twMother.user_img}></UserImage>
            <div className="head-tweet">
                <h5>{twName}</h5>
                <p className="arrobaName">{`@${twName}`}</p>
            </div>
          </div>
          <div className="right-piece">

            <BsThreeDots className="closeBtn" />
          </div>
        </div>
        <TextTweet tweettext={twMother.text} />
        
        {twMother.img && (
          <div className={"tweet-img"}>
            <Image cloudName="dynrpipqv" publicId={twMother.img}></Image>
          </div>
        )}
          <time className="date-tweet">{timeAgo} · Twitter Fake App</time>
          <div className="socialStadistics">
          {twMother.Comments_count > 0 ? <p className="stadistic"><span>{twMother.Comments_count}</span> Comments </p> : null}
          {twMother.Retweet_count > 0 ? <p className="stadistic"><span>{twMother.Retweet_count}</span> Retweets</p> : null}
          {twMother.Like_count > 0 ? <p className="stadistic"><span>{twMother.Like_count}</span> Likes</p> : null}
          </div>
          <div className="socialoptions">
            <span className="comments-icon">
              <AiOutlineComment />
            </span>
            <span
              onClick={(e) =>
                loginState.id === twMother.users_Userid
                  ? controladorPropioRTw(e)
                  : retweetHandler(
                      e,
                      loginState.id,
                      twMother.idtwetts,
                      twMother.Retweet,
                      twMother.text,
                      twMother.img,
                      twMother.Retweet_state,
                      twMother.idtwetts,
                      twMother.LikesId,
                      false,
                      twMother.Is_comment,
                      twMother.Comment_original_username
                    )
              }
              className={`retweet-icon ${
                twMother.Retweet_state ? "retweet-icon-active" : ""
              }`}
            >
              <span className="icon-bg">
                <FaRetweet />
              </span>
              
            </span>
            <span
              onClick={(e) =>
                loginState.id === twMother.users_Userid
                  ? controladorPropioLk(e)
                  : likeHandler(
                      e,
                      loginState.id,
                      twMother.idtwetts,
                      twMother.LikesId,
                      twMother.text,
                      twMother.img,
                      twMother.Like_state,
                      twMother.idtwetts,
                      twMother.retweet,
                      false,
                      twMother.Is_comment,
                      twMother.Comment_original_username
                    )
              }
              className={`like-icon ${
                twMother.Like_state ? "like-icon-active" : ""
              }`}
            >
              <span className="icon-bg">
                <FaRegHeart />
              </span>
             
            </span>
          </div>
      </div>
      <InputTweetsSimplified loginState={loginState} twMother={twMother} />

      {FeedState.hideFeed === false ? (
        <FeedingTray
          loginState={loginState}
          FeedState={FeedState}
          twMother={twMother}
        />
      ) : (
        <h5>No Results</h5>
      )}
    </motion.div>
  );
}

export default React.memo(TweetView)