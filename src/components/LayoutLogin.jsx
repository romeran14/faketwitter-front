import {  Stack, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {FaTwitter} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import bannerbackground from "../images/bg-auth.jpg";
import twitterlogo from "../images/twitter-auth.png";
import { useDisclosure } from "@chakra-ui/react";


const LayoutLogin = ({ children }) => {


   const {toggleColorMode} = useColorMode();
   const {pathname} = useLocation()
   const logoColor = useColorModeValue('primary.500',undefined)
   const userColor = useColorModeValue( undefined, 'white')
  


  return (
  
      <div className="LayoutLogin" >
        <div className="banner-auth">
            <img src={bannerbackground} className="bannerbackground" alt="twitter-banner" />
            <img src={twitterlogo} className="twitterlogo" alt="twitter-logo" />
        </div>
        <div className="box-auth" >
        <Stack className="icon-login" minWidth={72} paddingX={6} paddingY={0} spacing={6}>
            <Link to="/">
              <Icon
                width={12}
                height={12}
                as={FaTwitter}
                onClick={toggleColorMode}
                color={logoColor}
              />
            </Link>

          </Stack>
        
          {children}
    
        </div>

      </div>

  );
};

export default LayoutLogin;