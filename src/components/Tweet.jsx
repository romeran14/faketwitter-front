import React, {useContext} from "react";
import { Image } from "cloudinary-react";
import {
  FaRetweet,
  FaCommentDots,
  FaComment,
  FaRegHeart,
  FaHeart
} from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import UserImage from "./UserImage";
import moment from "moment";
import retweet from "../tweetsFunctions/retweet";
import like from "../tweetsFunctions/like";
import { FeedContext } from "../context/FeedContext";
import deleteTw from "../tweetsFunctions/deleteTw";
import {CgClose} from "react-icons/cg"
import {BsThreeDots} from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import ProfileLink from "./ProfileLink";
import TextTweet from "./TextTweet";

const Tweet = ({ item, loginStateId }) => {
  const timeAgo = moment(item.creationDate, ["YYYY", moment.ISO_8601]).fromNow(true);
  const navigate = useNavigate()

  const dispatchFeed = useContext(FeedContext);
  let twName = null;

  if (item.Retweet > item.LikesId) {
    twName = item.Retweet_original_username;
  } else if (item.Retweet < item.LikesId) {
    twName = item.Like_original_username;
  } else {
    twName = item.Username;
  }
  

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
    e.stopPropagation()
    retweet(
      loginStateId,
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
        idtwetts: item.idtwetts,
        retweet_state: item.Retweet_state,
      },
    });
  };

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
    e.stopPropagation()
    like(
      loginStateId,
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
        idtwetts: item.idtwetts,
        like_state: item.Like_state,
      },
    });
  };

  const deleteHandler = async (e, idtwetts, retweetId,  likesId, Is_comment) => {
    e.preventDefault()
    e.stopPropagation()
    dispatchFeed({ type: "SET_LOADING"})
    const deletedCheck =   await  deleteTw(idtwetts, retweetId,  likesId , Is_comment);
  
    if(deletedCheck.status){
      dispatchFeed({
        type: "DELETE",
        payload: {
          idtwetts: item.idtwetts,
          deletedCheck: deletedCheck
        },
      });
    }else{
      console.log('deletecheK Error', deletedCheck)
      //CREAR DISPACTH PARA ERRORES GENERALES
    }
  };

  const goToReplied = (e) =>{
    e.preventDefault();
    e.stopPropagation()
    navigate(`/tweetview/${item.Is_comment}/${false}`)
  }

  const commentHandler = (e) => {
    e.preventDefault();
    e.stopPropagation()
    let ref = null;
    if (item.Retweet !== null) {
      ref = item.Retweet;
    } else if (item.LikesId !== null) {
      ref = item.LikesId;
    } else {
      ref = item.idtwetts;
    }
    navigate(`/tweetview/${ref}/true`);
  };
  //estas condiciones son para que las clases del rt o like se activen si fueron hechos por el usuario actual
  if (loginStateId === item.users_Userid && item.Retweet !== null) {
    item.Retweet_state = true;
  }

  if (loginStateId === item.users_Userid && item.LikesId !== null) {
    item.Like_state = true;
  }

  const controladorPropioRTw = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    if(item.LikesId !== null){
           //Si es tu like
           retweetHandler(e,
             loginStateId,
             item.idtwetts,
             item.LikesId,
             item.text,
             item.img,
             item.Retweet_state,
             item.idtwetts,
             item.Retweet,
             true,
             item.Is_comment,
             item.Comment_original_username)
      
         }else if(item.Retweet !== null ){
         
           deleteHandler(e,item.idtwetts,
             item.Retweet,
             item.LikesId,
             item.Is_comment
             )
         }else{
          console.log('no se cumplio ninguna condicion')
         }
       }
       const controladorPropioLk = (e) =>{
        e.preventDefault()
        e.stopPropagation();


        if(item.Retweet !== null){
               //Caso de Rt sin like
               likeHandler(e,
                 loginStateId,
                 item.idtwetts,
                 item.Retweet,
                 item.text,
                 item.img,
                 item.Like_state,
                 item.idtwetts,
                 item.LikesId,
                 true,
                 item.Is_comment,
                 item.Comment_original_username
                 )
                
             }else if ( item.LikesId !== null ){
         
               deleteHandler(e,item.idtwetts,
                 item.Retweet,
                 item.LikesId,
                 item.Is_comment
                 )
             }else{
              console.log('no se cumplio ninguna condicion')
             }
           }


           const goToTweetView = (e)=>{
            e.preventDefault()
            e.stopPropagation()
           navigate(`/tweetview/${item.idtwetts}/${false}`)
         
         }


  return (
    <div
      onClick={(e) => {
        goToTweetView(e);
      }}
      className="tweet-body"
    >
      <div className="left-piece">
        {item.Retweet !== null ? (
          <FaRetweet />
        ) : (
          <span className="emptyTweetState"></span>
        )}
        {item.LikesId !== null ? (
          <FaHeart />
        ) : (
          <span className="emptyTweetState"></span>
        )}
      </div>
      <div className="right-piece">
        {item.Retweet !== null ? (
          <h6>{item.Username} Retweet's</h6>
        ) : (
          <span className="emptyTweetState"></span>
        )}

        {item.LikesId !== null ? (
          <h6>{item.Username} Like's</h6>
        ) : (
          <span className="emptyTweetState"></span>
        )}
      </div>
      <div className="left-piece">
        <ProfileLink
          idProfile={item.Userid}
          idRt={item.rtwUserid}
          idLk={item.lkUserid}
        >
          <UserImage userImg={item.user_img}></UserImage>
        </ProfileLink>
      </div>
      <div className="right-piece">
        <div className="head-tweet">
          <div>
            <ProfileLink
              idProfile={item.Userid}
              idRt={item.rtwUserid}
              idLk={item.lkUserid}
            >
              <h5>{twName}</h5> <p className="arrobaName">{`@${twName}`}</p>
            </ProfileLink>
            <p className="date-tweet">&nbsp;&middot;&nbsp;{timeAgo}</p>
          </div>
          {loginStateId === item.users_Userid ? (
            <CgClose
              className="closeBtn"
              onClick={(e) =>
                deleteHandler(
                  e,
                  item.idtwetts,
                  item.Retweet,
                  item.LikesId,
                  item.Is_comment
                )
              }
            />
          ) : (
            <BsThreeDots className="closeBtn" />
          )}
        </div>
        {item.Is_comment && (
          <p className="linkreply" onClick={(e) => goToReplied(e)}>
            in Reply to  <span className="usernameref">@{item.Comment_original_username}</span>
          </p>
        )}

        <TextTweet tweettext={item.text} />
        {item.img && (
          <div className={"tweet-img"}>
            <Image cloudName="dynrpipqv" publicId={item.img}></Image>
          </div>
        )}
        <div className="socialoptions">
          <span onClick={(e) => commentHandler(e)} className="comments-icon">
            <span className="icon-bg">
              <AiOutlineComment />
            </span>
            {item.Comments_count > 0 ? item.Comments_count : null}
          </span>
          <span
            onClick={(e) =>
              loginStateId === item.users_Userid
                ? controladorPropioRTw(e)
                : retweetHandler(
                    e,
                    loginStateId,
                    item.idtwetts,
                    item.Retweet,
                    item.text,
                    item.img,
                    item.Retweet_state,
                    item.idtwetts,
                    item.LikesId,
                    false,
                    item.Is_comment,
                    item.Comment_original_username
                  )
            }
            className={`retweet-icon ${
              item.Retweet_state ? "retweet-icon-active" : ""
            }`}
          >
            <span className="icon-bg">
              <FaRetweet />
            </span>
            {item.Retweet_count > 0 ? item.Retweet_count : null}
          </span>
          <span
            onClick={(e) =>
              loginStateId === item.users_Userid
                ? controladorPropioLk(e)
                : likeHandler(
                    e,
                    loginStateId,
                    item.idtwetts,
                    item.LikesId,
                    item.text,
                    item.img,
                    item.Like_state,
                    item.idtwetts,
                    item.retweet,
                    false,
                    item.Is_comment,
                    item.Comment_original_username
                  )
            }
            className={`like-icon ${item.Like_state ? "like-icon-active" : ""}`}
          >
            <span className="icon-bg">
              <FaRegHeart />
            </span>
            {item.Like_count > 0 ? item.Like_count : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tweet, (prevProps, nextProps) => {

  return prevProps.item.Like_count === nextProps.item.Like_count && prevProps.item.Retweet_count === nextProps.item.Retweet_count && prevProps.item.Comments_count === nextProps.item.Comments_count
});
