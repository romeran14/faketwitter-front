import React from 'react'
import {Routes,Route,Navigate,useLocation} from "react-router-dom";
import Register from '../pages/Register';
import RestorePasword from '../pages/RestorePassword';
import Login from '../pages/Login';
import EmailVerify from '../pages/EmailVerify';
import NewPassword from '../pages/NewPassword';
import { AnimatePresence } from 'framer-motion';


const AnimatedRoutesAuth = ({loginState, FeedState}) => {
    const location = useLocation()
  return (
   <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Login />} />
            <Route path="/restorepassword" element={<RestorePasword/>} />
            <Route
              path="/user/:id/verify/:token"
              element={<EmailVerify></EmailVerify>}
            />
                        <Route
              path="/user/:id/restore/:token"
              element={<NewPassword></NewPassword>}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
              </AnimatePresence>
  )
}

export default AnimatedRoutesAuth