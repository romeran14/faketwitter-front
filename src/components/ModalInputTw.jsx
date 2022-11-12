import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  StackDivider,
  Progress,
  Icon,
  Spinner,
  CircularProgress,
  Text,
  Box,
} from "@chakra-ui/react";
import { RiBarChartHorizontalFill, RiQuillPenLine } from "react-icons/ri";
import UserImage from "./UserImage";
import { BsStar, BsImage } from "react-icons/bs";
import {
  AiOutlineCalendar,
  AiOutlineGif,
  AiOutlineSmile,
} from "react-icons/ai";
import Axios from "axios";
import { FeedContext } from "../context/FeedContext";
import { MentionsInput, Mention } from "react-mentions";
import ImgTweetPreview from "./ImgTweetPreview";

const ModalInputTw = ({ loginState }) => {
  const dispatchFeed = useContext(FeedContext);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL



  const { isOpen, onOpen, onClose } = useDisclosure();

  const [progressLoading, setProgressLoading] = useState(false);

  const [textTweet, setTextTweet] = useState("");
  const [imageModal, setImageModal] = useState([]);
  const [imagenCargarModal, setImagenCargarModal] = useState(null);
  const [isLoadingInputModal, setIsLoadingInputModal] = useState(false);

  const setearImagenCargarModal = (e) => {
    setImageModal(e.target.files);
    setImagenCargarModal(URL.createObjectURL(e.target.files[0]));
    setIsLoadingInputModal(false);
  };
  const imgInputModal = useRef();

  const discardImageModal = () => {
    setImageModal("");
    setImagenCargarModal("");
    imgInputModal.current.value = "";
  };

  const ActSpinnerModal = () => {
    
    setIsLoadingInputModal(true);
  };

  const uploadHandler = useCallback(() => {
    setProgressLoading(true);
    var hoy = new Date();
    var fecha =
      hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fechaYHora = fecha + " " + hora;


    const uploadTweet = async (fileName = null, retweet = null) => {
      dispatchFeed({ type: "SET_LOADING" });

      Axios.post(`${SERVER_URL}upload`, {
        userid: loginState.id,
        creationDate: fechaYHora,
        image: fileName,
        text: textTweet,
        retweet: retweet,
      }).then((response) => {
        Axios.get(`${SERVER_URL}upload/${0}/${1}`).then((req) => {
          //setTextTweet('')
          dispatchFeed({
            type: "NEW_TWEETT",
            payload: req,
            message: response.data.message,
          });
          setTimeout(() => {
            onClose();
            setProgressLoading(false);
            setTextTweet("");
            discardImageModal();
          }, 500);

          //setProgressLoading(false)
        });
      });
    };

    if (textTweet.trim() === "") {
      console.log("Field empty");
      //setErrorMessage("Field empty");
    } /*else if (textTweet.trim().length() > 140 ) {

        setErrorMessage("Too many characters");
      
      }*/ else {
      if (imageModal[0]) {
        const formData = new FormData();
        formData.append("file", imageModal[0]);
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
  }, [textTweet]);

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
    <>
      <Button
        colorScheme="primary"
        size="lg"
        width={{ sm: "50px", xl: "90%" }}
        height={{ sm: "50px", xl: "initial" }}
        className="tweetbtn"
        marginBottom={"16px"}
        marginTop={"16px"}
        onClick={() => {
          onOpen();
        }}
        position={{md: "initial", sm: "absolute" }}
        bottom={'70px'}
        right={'20px'}
      >
        <Text display={{ xl: "block", sm: "none" }} className="tweetear">
          Twittear
        </Text>
        <Box
          display={{ xl: "none", sm: "block" }}
          style={{ transform: "scale(1.5)" }}
          width={{ sm: "40px", xl: "0" }}
        >
          <RiQuillPenLine className="pen" />
        </Box>
      </Button>

      <Modal
        className={"modalinputtw"}
        onClose={onClose}
        size={{ sm: "full", md: "xl" }}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          {progressLoading && (
            <Progress size="xs" isIndeterminate colorScheme="primary" />
          )}

          <ModalCloseButton />
          <ModalBody>
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
                  placeholder={"What happen?"}
                  maxLength="140"
                >
                  <Mention
                    data={allUsersToSuggest}
                    appendSpaceOnAdd={true}
                    displayTransform={(id, display) => `@${display}`}
                    renderSuggestion={renderSuggestion}
                  />
                </MentionsInput>
                {isLoadingInputModal && (
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
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <ImgTweetPreview
                    discardImage={discardImageModal}
                    img={imagenCargarModal}
                  ></ImgTweetPreview>
                  <Stack direction={"row"} spacing={3}>
                    <Stack
                      direction={"row"}
                      alignItems="center"
                      spacing={4}
                    ></Stack>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems="center"
                    spacing={4}
                  ></Stack>
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack direction={"row"} color={"primary.500"} spacing={4}>
              <input
                onClick={() => ActSpinnerModal()}
                onChange={(e) => setearImagenCargarModal(e)}
                type="file"
                name="filemodal"
                id="filemodal"
                className="inputfile"
                accept="image/png,image/jpeg"
                ref={imgInputModal}
              />
              <label className="imgIcon" htmlFor="filemodal">
                <Icon as={BsImage} height={"5"} width={"5"} />{" "}
              </label>

              <Icon as={AiOutlineGif} height={"5"} width={"5"}></Icon>
              <Icon
                as={RiBarChartHorizontalFill}
                height={"5"}
                width={"5"}
              ></Icon>
              <Icon as={AiOutlineSmile} height={"5"} width={"5"}></Icon>
              <Icon as={AiOutlineCalendar} height={"5"} width={"5"}></Icon>
            </Stack>
            <Button
              onClick={
                textTweet.length > 0
                  ? uploadHandler
                  : console.log("not Able to Tweet")
              }
              colorScheme={"primary"}
              className={textTweet.length > 0 ? "abletoTw" : "notAbletoTweet"}
            >
              Tweet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(ModalInputTw);
