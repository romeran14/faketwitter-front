import { Container, Text, Stack, Icon, Box, Button, useColorMode, useColorModeValue, Image } from "@chakra-ui/react";
import React,{useMemo, useReducer} from "react";
import {FaTwitter} from "react-icons/fa";
import {BsEnvelope, BsHash, BsBell, BsBookmark, BsList, BsThreeDots, BsPerson, BsHouseFill, BsHouse, BsBellFill, BsEnvelopeFill, BsBookmarkFill, BsPersonFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import UserImage from "./UserImage";
import AnimatedRoutes from "./AnimatedRoutes";
import UserLogout from "./UserLogout";
import ModalInputTw from "./ModalInputTw";
import { initialFeedState,  feedReducer } from '../reducers/feedReducer';
import { FeedContext } from '../context/FeedContext';
import Tendencies from "./Tendencies";

const Layout = (props) => {
  
  const [FeedState, dispatchFeed] = useReducer(feedReducer, initialFeedState);

  const LINKS =  useMemo(() => {
    const links =
  [{
    href:'/home',
    text: 'Home',
    activeIcon: BsHouseFill,
    inactiveIcon : BsHouse,
    avaliableLink : true,
    toMobile:true
  },
  {
    href:'/explore',
    text: 'Explore',
    activeIcon: BsHash,
    inactiveIcon : BsHash,
    avaliableLink : false,
    toMobile:false
  },
  {
    href:'/notifications',
    text: 'Notifications',
    activeIcon: BsBellFill,
    inactiveIcon : BsBell,
    avaliableLink : true,
    toMobile:true
  },
  {
    href:'/messages',
    text: 'Messages',
    activeIcon: BsEnvelopeFill,
    inactiveIcon : BsEnvelope,
    avaliableLink : false,
    toMobile:false
  },
  {
    href:'/bookmarks',
    text: 'Bookmarks',
    activeIcon: BsBookmarkFill,
    inactiveIcon : BsBookmark,
    avaliableLink : false,
    toMobile:false
  },
  {
    href:'/lists',
    text: 'Lists',
    activeIcon: BsList,
    inactiveIcon : BsList,
    avaliableLink : false,
    toMobile:false
  },
  {
    href:`/profile/${props.loginState.id}`,
    text: 'Profile',
    activeIcon: BsPersonFill,
    inactiveIcon : BsPerson,
    avaliableLink : true,
    toMobile:true
  },
  {
    href:'/options',
    text: 'More Options',
    activeIcon: BsThreeDots,
    inactiveIcon : BsThreeDots,
    avaliableLink : false,
    toMobile:false
  },
]
return links
}, [])
  

   const {toggleColorMode} = useColorMode();
   const {pathname} = useLocation()
   const logoColor = useColorModeValue('primary.500',undefined)
   const userColor = useColorModeValue( undefined, 'white')


  return (
    <FeedContext.Provider value={dispatchFeed}>
    <Container paddingInline={{sm:'0' ,md:'initial'} }   maxWidth={{sm:'100%' ,md:'fit-content'} } className="container-layout" alignSelf="center">
      <Stack direction={{sm:'column' ,md:'row'} }  >
        <Stack
          justifyContent={"space-between"}
          paddingY="4"
          spacing={6}
          borderRightWidth={1}
          paddingRight={{sm:1 ,xl:8 }}
          paddingLeft={{sm:1 ,xl:8 }}
          className={'sidebar'}
        >
          <Stack className="sidebar-menu" paddingX={0} paddingY={3} spacing={4}>
            <Link to="/">
              <Icon
                width={6}
                height={6}
                as={FaTwitter}
               // onClick={toggleColorMode}
                color={logoColor}
                display={ {sm:'none' ,md:'initial'}}
              />
            </Link>
            {LINKS.map((link) => (
              <Link   className={link.avaliableLink ? 'avaliablelink' : 'notavaliablelink'} style={{'marginTop': 0, 'height': '50px'}} key={link.href} to={link.href}>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={5}
                  color={pathname === link.href ? "primary.500" : "inherit"}
                >
                  <Icon
                    as={
                      pathname === link.href
                        ? link.activeIcon
                        : link.inactiveIcon
                    }
                    height={6}
                    width={6}
                  />
                  <Text  fontSize="lg" fontWeight={pathname === link.href ? "bold" : "normal"}>
                    {link.text}
                  </Text>
                </Stack>
              </Link>
            ))}

          <ModalInputTw loginState={props.loginState}></ModalInputTw>
          </Stack>
       <UserLogout loginState={props.loginState}/>
        </Stack>
        <Box styles={{'margin-inline-start': 0}}  className='feeds-container'>
          <AnimatedRoutes loginState={props.loginState} FeedState={FeedState}/>
        </Box>
        <Tendencies/>
      </Stack>
 
    </Container>
    </FeedContext.Provider>
  );
};

export default React.memo(Layout, (prevProps, nextProps) => {
   return prevProps.loginState === nextProps.loginState 
 });
