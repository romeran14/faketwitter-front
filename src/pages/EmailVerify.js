import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Text} from "@chakra-ui/react";
import { CheckCircleIcon , WarningIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion";


const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(null);
  const param = useParams();
  const [loading, setLoading] = useState(true);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${SERVER_URL}user/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        
        if (data.verified === true) {
          setValidUrl(true);
          setLoading(false);
        } else {
          setValidUrl(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setValidUrl(false);
        setLoading(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      {loading ? (
        <Spinner
		  margin='auto'
		  display='block'
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <div style={{padding:'15px'}} className="verified-box">
          {validUrl ? (
            <>
              <h2>Email verified successfully <CheckCircleIcon color='green.400'  /></h2>
              <h3 className="subtitle">Please Login and Enjoy!</h3>
              <h3 className="login">
                Log in <span> </span>
                <Link color="blue.500" to={"/"}>
                   Here
                </Link>
              </h3>
            </>
          ) : (
            <h2>Error de autenticacion <WarningIcon color='red.400' /> </h2>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EmailVerify;
