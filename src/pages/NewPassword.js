import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { Spinner, Button ,Input , Text, Box, Stack} from "@chakra-ui/react";
import AlertMessage from "../components/AlertMessage";
import { WarningIcon } from "@chakra-ui/icons";
import { ScaleFade, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";

const NewPassword = () => {
	const [validUrl, setValidUrl] = useState(null);
	const param = useParams();
    const [loading, setLoading] = useState(true)
    const [loadingForm, setLoadingForm] = useState(false)
    const [password,SetPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [passwordChanged, SetPasswordChanged] = useState(false)
    const { isOpen, onToggle } = useDisclosure()
    Axios.defaults.withCredentials = false

    const SERVER_URL = process.env.REACT_APP_SERVER_URL



    const  newPasswordReq = async () =>{
   
        Axios.post(`${SERVER_URL}user/newpassword`, {
          username: param.id,
          password: password,
          token: param.token
        }).then((response) => {
       
          if (response.data.passwordChanged === true){
            setLoadingForm(false)
            SetPasswordChanged(true)
            setErrorMessage(response.data.message);
       
          }else{
            setLoadingForm(false)
            setErrorMessage(response.data);
     
          }
        });
      }

    const createNewPassword = async () =>{
      setLoadingForm(true)
        if (password.trim() === "") {
          setLoadingForm(false)
            setErrorMessage("La contraseña esta vacia");
          }else{
            newPasswordReq()
          }
    }

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${SERVER_URL}user/${param.id}/restore/${param.token}`;
				const { data } = await Axios.get(url);
                
				if ( data.passwordAble === true){
					setValidUrl(true);
					setLoading(false)
                    setErrorMessage(data.message)
				}else{
					setValidUrl(false);
					setLoading(false)
                    setErrorMessage(data.message)
				}
			} catch (error) {
				console.log(error);
				setValidUrl(false);
                setLoading(false)
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
        { loading? (
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            display={'block'}
            margin='auto'
          />
        ) : (
            <>
			{validUrl ? (
			
					    <Stack
      className="newPassword-box"
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
    >
					<h2>Email verified successfully</h2>
          <Text className="subtitle">Write your new password</Text>
          <Box className="half-box" as={"form"} mt={10}>
                    <Input
                  type={"password"}
                  onChange={(val) => SetPassword(val.target.value)}
                  placeholder="Password"
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                              {loadingForm && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size='md'
            margin='auto'
            display='block'
            mb={3}
            mt={1}
          />
        )}
                              <Button onClick={ createNewPassword }
                fontFamily={'heading'}
                mt={8}
                mb={4} 
                w={'full'}
                colorScheme='primary'
               
>
                Save Password
              </Button>
              {
                passwordChanged && 
                <ScaleFade initialScale={0.9} in={onToggle}>
                <Button mb={4}  bg='gray.200' size={'md'}>	<Link color={'white'}  className="button-login"  to="/">Please Login and Enjoy! </Link></Button>
                 </ScaleFade>
              }
                  {errorMessage && <AlertMessage message={errorMessage} />}
              </Box>

				</Stack>
			) : (
        <Stack padding={5}>
				<h2>Error de autenticacion <WarningIcon color='red.400' /> </h2>
        </Stack>
			)}
		</>
        )}
        </motion.div>

	);
};

export default NewPassword;
