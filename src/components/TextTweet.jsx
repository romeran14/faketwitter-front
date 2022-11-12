import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMentionParser from "react-mention-parser";


const TextTweet = ({tweettext}) => {
  const navigate = useNavigate();
  const textInParentesis = (cadena) => {
    let rex = /\(([\w]+)\)/;
    let replacing = cadena.match(rex)[0].replace(rex, "$1");
    return replacing;
  };

  const goToUserProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let string = e.target.getAttribute("data-mention");

    //encuentra el texto entre paréntesis
    let idProfile = textInParentesis(string);
    navigate(`/profile/${idProfile}`);
  };

  return (
    <p className="text-tweet" onClick={(e) => e.stopPropagation()}>
      <ReactMentionParser
        renderMention={(mentionValue) => (
          <span
            key={Math.random()}
            className="mention"
            onClick={(e) => goToUserProfile(e)}
            data-mention={mentionValue}
          >
            {mentionValue.replace(/\[(\w+)\]\(\d+\)/i, "$1")}
          </span>
        )}
      >
        {tweettext}
      </ReactMentionParser>
    </p>
  );
};

export default React.memo(TextTweet);
