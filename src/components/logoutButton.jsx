import { AuthContext } from '../context/AuthContext';
import { useContext}from 'react';
import Axios from 'axios'
import { Button } from '@chakra-ui/react';



 export default function LogoutButton() {
    const { signOut } = useContext(AuthContext);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    
    const logout = () =>{
        Axios.delete(`${SERVER_URL}user/logout`).then((response) =>{
          console.log(response)
          signOut()
         })
      }

    return(
       <Button onClick={logout}> Log Out</Button>
    )

  }