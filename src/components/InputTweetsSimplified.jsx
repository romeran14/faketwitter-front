import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { Stack, StackDivider, Button } from "@chakra-ui/react";
import Axios from "axios";
import UserImage from "./UserImage";
import { FeedContext } from "../context/FeedContext";
import { useParams } from "react-router-dom";
import { MentionsInput, Mention } from "react-mentions";

const InputTweetsSimplified = ({ loginState, twMother }) => {
  const [textTweet, setTextTweet] = useState("");
  const dispatchFeed = useContext(FeedContext);
  const textArea = useRef(null);
  let { focus } = useParams();

  const addFocus = () => {
    if (focus === "true") {
      textArea.current.focus();
    }
  };

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  function UsersClass(id, nombre, img) {
    this.id = id;
    this.display = nombre;
    this.urlimg = img;
  }

  const allUsersToSuggest = useMemo(() => {
    return loginState.allUsers.map((item) => {
      return new UsersClass(item.Userid, item.Username, item.user_img);
    });
  }, [loginState.allUsers]);

  useEffect(() => {
    addFocus();
  }, []);

  const uploadHandler = () => {
    var hoy = new Date();
    var fecha =
      hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fechaYHora = fecha + " " + hora;

    const uploadComment = async (fileName = null, retweet = null) => {
      dispatchFeed({ type: "SET_LOADING" });

      Axios.post(`${SERVER_URL}upload/uploadcomment`, {
        userid: loginState.id,
        creationDate: fechaYHora,
        image: fileName,
        text: textTweet,
        ref: twMother,
      }).then((response) => {
        console.log(
          response,
          "mensaje de req comentario ",
          response.data.results[1].insertId
        );
        Axios.put(
          `${SERVER_URL}upload/tweetbyid/${response.data.results[1].insertId}`
        ).then((req) => {
          setTextTweet("");
          console.log("req", req);
          dispatchFeed({
            type: "NEW_COMMENT",
            payload: req,
            message: response.data.message,
          });
        });
      });
    };

    if (textTweet.trim() === "") {
      setErrorMessage("Field empty");
    } /*else if (textTweet.trim().length() > 140 ) {
  
          setErrorMessage("Too many characters");
        
        }*/ else {
      uploadComment();
    }
  };
  function renderSuggestion(entry, search, highlightedDisplay, index, focused) {
    // Modify the suggestion dropdown by returning valid JSX
    return (
      <>
        <span className="suggestion-item">
          <UserImage userImg={entry.urlimg} />
          <div className="suggestion-item-right">
            <h5>{entry.display}</h5>
            <p>@{entry.display}</p>
          </div>
        </span>
      </>
    );
  }

  return (
    <Stack
      className="inputTweetsView"
      direction={"row"}
      paddingX={"4"}
      paddingY={"2"}
      spacing={4}
    >
      <UserImage userImg={loginState.userImg} />

      <Stack spacing={3} divider={<StackDivider></StackDivider>}>
        <MentionsInput
          onChange={(e) => setTextTweet(e.target.value)}
          value={textTweet}
          fontSize={"xl"}
          fontWeight="500"
          inputRef={textArea}
          placeholder={"Tweet your answer"}
          maxLength="140"
        >
          <Mention
            data={allUsersToSuggest}
            appendSpaceOnAdd={true}
            displayTransform={(id, display) => `@${display}`}
            renderSuggestion={renderSuggestion}
          />
        </MentionsInput>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={3}>
            <Stack direction={"row"} alignItems="center" spacing={4}></Stack>
          </Stack>
          <Button onClick={uploadHandler} colorScheme={"primary"}>
            Reply
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InputTweetsSimplified;
