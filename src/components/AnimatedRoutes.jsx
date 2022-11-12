import React, {useReducer} from 'react'
import {Routes,Route,Navigate,useLocation} from "react-router-dom";
import FeedScreen from "../screen/feed"
import MessagesScreen from "../screen/Messages";
import TweetView from '../screen/TweetView';
import Profile from '../screen/Profile';
import { AnimatePresence } from 'framer-motion';
import FeedSkelentons from './FeedSkelentons';
import ScrollToTop from './ScrollToTop';
import Notifications from '../screen/notifications'; //yisus


const AnimatedRoutes = ({ loginState, FeedState }) => {
  const location = useLocation();
 
  return (
    <AnimatePresence>
      <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route
            path="/home"
            element={
              <FeedScreen loginState={loginState} FeedState={FeedState} />
            }
          />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/notifications" element={<Notifications />} /> {/*yisus */}
          <Route
            path="/tweetview/:idtweet/:focus"
            element={
              <TweetView loginState={loginState} FeedState={FeedState} />
            }
          />
          <Route
            path="/profile/:id"
            element={<Profile loginState={loginState} FeedState={FeedState} />}
          />
          <Route path="*" element={<Navigate to="/home" replace />}></Route>
        </Routes>
     
    </AnimatePresence>
  );
};

export default React.memo(AnimatedRoutes); 