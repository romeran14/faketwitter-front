import {
    Box,
    Stack,
    Heading,
    Text,
    Spinner,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    useColorModeValue,
    useColorMode
  } from '@chakra-ui/react';
import {useState ,  useContext}from 'react'
import Axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';
import { motion } from 'framer-motion';


  export default function Login() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username,SetUsername] = useState('')
    const [password,SetPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const logoColor = useColorModeValue('primary.500','red.500')


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const { signIn, singOut } = useContext(AuthContext);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    

    const loginFunction = async () => {
      setLoading(true)
      if (username.trim() === "") {
        setErrorMessage("El nombre esta vacio");
      } else if (password.trim() === "") {
        setErrorMessage("La contraseña esta vacia");
      } else {
        console.log(`${SERVER_URL}user/login`)
        Axios.post(`${SERVER_URL}user/login`, {
          username: username,
          password: password,
        }).then((response) => {
          if (response.data.loggedIn === true) {
            console.log(response)
            signIn(response);
            setLoading(false)
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
        className="login-box"
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            What is happening now
          </Heading>
          <Text className="subtitle">Join Twitter Today.</Text>
          <Text className="signup">
            {" "}
            Sign up <Link to={"register"}>Here</Link>
          </Text>
        </Stack>
        <Box className="half-box" as={"form"} mt={10}>
          <Stack spacing={4}>
            <Input
              focusBorderColor="blue.400"
              type={"text"}
              onChange={(val) => SetUsername(val.target.value)}
              placeholder="Username"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(val) => SetPassword(val.target.value)}
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                focusBorderColor="blue.400"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          {loading && (
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
            />
          )}

          <Button
            onClick={loginFunction}
            colorScheme={"primary"}
            fontFamily={"heading"}
            mt={8}
            w={"full"}
          >
            Login
          </Button>

          <Link style={{ color: logoColor }} to={"/restorepassword"}>
            Did you forget your password?
          </Link>
          {errorMessage && <AlertMessage message={errorMessage} />}
        </Box>
        form
      </Stack>
      </motion.div>
    );
  }
