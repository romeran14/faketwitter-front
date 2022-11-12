import React, { useState, useMemo, useEffect , useContext} from "react";
import Axios from "axios";
import Tweet from "../components/Tweet";
import { FeedContext } from "../context/FeedContext";
import InfiniteScroll from "react-infinite-scroll-component";
import {Spinner, Stack} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Center } from '@chakra-ui/react'
import FeedSkelentons from "./FeedSkelentons";

const FeedingTray = ({FeedState, loginState, twMother, userFeed}) => {
   //skelentons

   const location = useLocation()

   const SERVER_URL = process.env.REACT_APP_SERVER_URL



    const [limitInf, setlimitInf] = useState(0);
    let limitSup=15;

    let baseUrl = 'upload/'
//Aqui se especifica que el req del FeedTray es para la pagina de TweetView
    if(twMother){
      baseUrl = `upload/commentsof/${twMother.idtwetts}`
      limitSup=10;
    }
//Aqui se especifica que el req del FeedTray es para la pagina de usuario


    if(location.pathname === '/home'){
      baseUrl = 'upload/'
      limitSup=15;
    }
    if(userFeed){
      baseUrl = `tweetsof/${userFeed}`

    }


    const dispatchFeed = useContext(FeedContext);


    const reqTweets = async () => {
      dispatchFeed({ type: "SET_LOADING_SKELETONS"})
      Axios.get(`${SERVER_URL}${baseUrl}/${limitInf}/${limitSup}`).then(
        (req) => {
          if(req.data.hasResults === true){

            setTimeout(() => {
              dispatchFeed({ type: "LOAD_FEED", payload: req });
            }, 500);
           
          }else{
            dispatchFeed({ type: "HIDE_FEED" })
          }
         
        }
      );
    };
    const reqMoreTweets = async () => {
      dispatchFeed({ type: "SET_LOADING"})
      setlimitInf(limitInf + 15);
      

      Axios.get(
        `${SERVER_URL}${baseUrl}/${limitInf + limitSup}/${limitSup}`
      ).then((req) => {
        dispatchFeed(
          req.data.hasMore === true
            ? { type: "LOAD_MORE", payload: req }
            : { type: "LOAD_LAST", payload: req }
        );
      });
    };
  
   useEffect(() => {
     reqTweets();
   }, [location.pathname]);
  
  return (
    <>
    {FeedState.isLoading === true ? (
        <FeedSkelentons/>
      ) : (<>
      {FeedState.isLoadingSpinner &&     
      <Center>   
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
        
      /> </Center>}

      
          <InfiniteScroll
            dataLength={FeedState.tweetsFeed.length}
            next={reqMoreTweets}
            hasMore={FeedState.hasMore}
            loader={        <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
              margin="auto"
              display="block"
              mb={3}
              mt={1}
              
            />}
           scrollableTarget='App'
           scrollThreshold={0.80}
            endMessage={
              <p style={{ textAlign: "center", borderTop: "1px #e2e8f0 solid", padding:'10px' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {FeedState.tweetsFeed.map((item) => (
              <Tweet
                key={item.idtwetts}
                item={item}
                loginStateId={loginState.id}

              />
            ))}
          </InfiniteScroll>
          <Stack width={'100%'} height={'53px'} display={{md:'none', sm: 'block'}} ></Stack>
          </>
      )}
    </>)
}

export default FeedingTray