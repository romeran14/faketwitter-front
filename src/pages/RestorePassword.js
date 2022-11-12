import {
    Box,
    Stack,
    Input,
    Button,
    Text,
    Spinner
  } from '@chakra-ui/react';
import {useState }from 'react'
import Axios from 'axios';
import AlertMessage from '../components/AlertMessage';
import { motion } from 'framer-motion';
  export default function RestorePasword() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username,SetUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const PasswordReq = async () => {
      setLoading(true)
      if (username.trim() === "") {
        setLoading(false)
        setErrorMessage("Empty username");
      } else {
        Axios.post(`${SERVER_URL}user/restorepassword`, {
          username: username
        }).then((response) => {
          if (response.data.emailSent === true) {
            setLoading(false)
            setErrorMessage(response.data.message)
          } else {
            setLoading(false)
            setErrorMessage(response.data.message);
          }
        });
      }
    };



    return (
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >

          <Stack
         
          className="restorePassword-box"
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
              <h2>Recover your password</h2>
              <Text className="subtitle">Tell us your username</Text>
            <Box as={'form'} className="half-box" mt={10}>
              <Stack spacing={4}>
              <Input
                  onChange={(val) => SetUsername(val.target.value)}
                  placeholder="Username"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                

              </Stack>
              {loading && (
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
              <Button onClick={ PasswordReq }
                fontFamily={'heading'}
                mt={4}
                mb={4}
                w={'full'}
                colorScheme='primary'>
                Restore Password
              </Button>
              {errorMessage && <AlertMessage message={errorMessage} />}
            </Box>
            form
          </Stack>
</motion.div>
    );
  }
