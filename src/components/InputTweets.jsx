import React, { useState, useMemo, useRef } from "react";
import { MentionsInput, Mention } from "react-mentions";
import {
  Stack,
  Icon,
  StackDivider,
  Button,
  CircularProgress,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import UserImage from "./UserImage";
import { BsStar, BsImage } from "react-icons/bs";
import {
  AiOutlineCalendar,
  AiOutlineGif,
  AiOutlineSmile,
} from "react-icons/ai";
import ImgTweetPreview from "./ImgTweetPreview";


const InputTweets = ({ onSubmit, allUsers }) => {
  
  const progressColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const [textTweet, setTextTweet] = useState("");
  const [image, setImage] = useState([]);
  const [imagenCargar, setImagenCargar] = useState(null);
  const [isLoadingInput, setIsLoadingInput] = useState(false)

  const setearImagenCargar = (e) => {
    setImage(e.target.files);
    setImagenCargar(URL.createObjectURL(e.target.files[0]));
    setIsLoadingInput(false)
  };

  const imgInput = useRef()

  const discardImage = () =>{
    setImage('');
    setImagenCargar('');
    imgInput.current.value = '';
  }

  function UsersClass(id, nombre, img) {
    this.id = id;
    this.display = nombre;
    this.urlimg = img;
  }

 const allUsersToSuggest = useMemo(() => {
  return allUsers.map(
    item => {
      return new UsersClass(item.Userid, item.Username, item.user_img)
    }
  )
 }, [allUsers])
   const ActSpinner = () =>{
    setIsLoadingInput(true)
   }


  const uploadHandler = () => {
    onSubmit({ textTweet, image });
    setTextTweet("");
    setImagenCargar('');
  };

  function renderSuggestion(entry, search, highlightedDisplay, index, focused) {
    // Modify the suggestion dropdown by returning valid JSX
    return (
      <>
        <span className='suggestion-item'><UserImage userImg= {entry.urlimg}/>
        <div className='suggestion-item-right'><h5>{entry.display}</h5><p>@{entry.display}</p></div>
        </span>
      </>
    );
  }
  
  return (
    <>
      <Stack
        className="inputTweets"
        spacing={3}
        divider={<StackDivider></StackDivider>}
      >
        <MentionsInput
          onChange={(e) => setTextTweet(e.target.value)}
          value={textTweet}
          fontSize={"xl"}
          fontWeight="500"
          placeholder={"What's going on?"}
          maxLength="140"
        >
          <Mention
            data={allUsersToSuggest}
            appendSpaceOnAdd={true}
            displayTransform={(id, display) => `@${display}`}
            renderSuggestion={renderSuggestion}
          />
        </MentionsInput>
        {isLoadingInput && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
            margin="auto"
            display="block"
            mb={3}
            mt={1}
          />
        )}
        
          <ImgTweetPreview discardImage={discardImage} img={imagenCargar} ></ImgTweetPreview>
       
        <Stack
        className="iconbar"
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Stack  direction={"row"} color={"primary.500"} spacing={4}>
            <input
              onClick={() => ActSpinner()}
              onChange={(e) => setearImagenCargar(e)}
              type="file"
              name="file"
              id="file"
              className="inputfile"
              accept="image/png,image/jpeg"
              ref={imgInput}
            />
            <label className="imgIcon" htmlFor="file">
              <Icon as={BsImage}  height={"5"} width={"5"} />{" "}
            </label>

            <Icon as={AiOutlineGif} height={"5"} width={"5"}></Icon>
            <Icon as={RiBarChartHorizontalFill} height={"5"} width={"5"}></Icon>
            <Icon as={AiOutlineSmile} height={"5"} width={"5"}></Icon>
            <Icon as={AiOutlineCalendar} height={"5"} width={"5"}></Icon>
          </Stack>
          <Stack direction={"row"} spacing={3}>
            <Stack
              direction={"row"}
              alignItems="center"
              spacing={4}
             // divider={<StackDivider></StackDivider>}
            >
              <CircularProgress
                trackColor={progressColor}
                color={"primary.500"}
                value={20}
                size={6}
              />
              <Button
                colorScheme={"primary"}
                fontSize={"2xl"}
                borderRadius={"50%"}
                width={10}
                height={10}
                fontWeight={"normal"}
                variant={"outline"}
              >
                +
              </Button>
            </Stack>
          </Stack>
          <Button onClick={textTweet.length > 0 ? uploadHandler : console.log('not Able to Tweet')} colorScheme={"primary"} className={textTweet.length > 0 ? 'abletoTw' : 'notAbletoTweet'}>
            Twittear
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default InputTweets;
