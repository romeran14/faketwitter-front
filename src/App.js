import "./App.css";
import Layout from "./components/layout";
import { useEffect, useState, useMemo, useReducer } from "react";
import Axios from 'axios';
import { AuthContext } from "./context/AuthContext";
import LayoutLogin from "./components/LayoutLogin";
import AnimatedRoutesAuth from "./components/AnimatedRoutesAuth";


function  App() {
  Axios.defaults.withCredentials = true
   const SERVER_URL = process.env.REACT_APP_SERVER_URL
  
   //Implementando LoginReducer
  const initialLoginState = {
    isLoading: true,
    token: null,
    id:null,
    Username: null,
    userImg:null,
    about_me: null,
    allUsers:[]
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          id: action.id,
          Username: action.Username,
          userImg: action.img,
          about_me: action.about_me,
          allUsers: action.allUsers
        };
      case "LOGIN":
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          id: action.id,
          Username: action.Username,
          userImg: action.img,
          about_me: action.about_me,
          allUsers: action.allUsers
        };
      case "LOGOUT":
        return {
          ...prevState,
          token: null,
          isLoading: false,
          id: null,
          Username: null,
          userImg: null,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: (response) => {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.loginResponse.Username);
        localStorage.setItem("id", response.data.loginResponse.Userid);
        dispatch({
          type: "LOGIN",
          token: response.data.loginResponse.Username,
          id: response.data.loginResponse.Userid,
          Username: response.data.loginResponse.Username,
          img: response.data.loginResponse.user_img,
          about_me : response.data.loginResponse.about_me,
          allUsers: response.data.allUsers
        });
      },
      signOut: () => {
        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("username");
        localStorage.removeItem("id"); //yisus 
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );


  useEffect(() => {
    Axios.get(`${SERVER_URL}user/login`).then((response) => {
      if (response.data.loggedIn === true) {
        console.log('verificacion de sesion',response.data);
        dispatch({
          type: "RESTORE_TOKEN",
          token: response.data.loginResponse.Username,
          id: response.data.loginResponse.Userid,
          Username: response.data.loginResponse.Username,
          img: response.data.loginResponse.user_img,
          about_me : response.data.loginResponse.about_me,
          allUsers: response.data.allUsers
        });
        
      } else {
        console.log(response.data.message);
      }
    });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={authContext}>
        
        {loginState.token === null ? (
          <LayoutLogin>
           <AnimatedRoutesAuth/>
          </LayoutLogin>
        ) : (
          <>
            <Layout loginState={loginState} />         
          </>
        )}
      </AuthContext.Provider>
    </div>
  );
}


export default App;
