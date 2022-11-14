import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { motion } from "framer-motion";


function validarEmail(valor) {
  if (
    /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
      valor
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export default function Register() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [aboutMe, SetAboutMe] = useState(null);
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imagenCargar, setImagenCargar] = useState(null);
  const [loading, setLoading] = useState(false)

  const setearImagenCargar = (e) => {
    setImage(e.target.files);
    setImagenCargar(URL.createObjectURL(e.target.files[0]));
  };
  const SERVER_URL = process.env.REACT_APP_SERVER_URL


  Axios.defaults.withCredentials = false

  const register = () => {
    setLoading(true)
    var hoy = new Date();
    var fecha =
      hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    const fechaYHora = fecha + " " + hora;

    const serverRegisterReq = async (fileName = null) => {
      Axios.post(`${SERVER_URL}user/register`, {
        username: username,
        password: password,
        email: email,
        creationDate: fechaYHora,
        image: fileName,
        aboutMe: aboutMe,
      }).then((response) => {
        if (response.data.emailSent === true) {

          setLoading(false)
          setErrorMessage(response.data.message);
        } else {
          setLoading(false)
          setErrorMessage(response.data.message);
        }
      });
    };

    if (username.trim() === "") {
      setLoading(false)
      setErrorMessage("the nickname is empty");
    }else if(username.split(' ').length>=2){
      setLoading(false)
      setErrorMessage("Invalid NickName. Must be a single word");
    }
     else if (email.trim() === "") {
      setLoading(false)
      setErrorMessage("Email input empty");
    } else if (validarEmail(email.trim()) === false) {
      setLoading(false)
      setErrorMessage("invalid Email ");
    } else if (password.trim() === "") {
      setLoading(false)
      setErrorMessage("The password is empty");
    } else {
      if (image[0]) {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "nocm22xb");

        Axios.post(
          "https://api.cloudinary.com/v1_1/dynrpipqv/image/upload",
          formData
        ).then((response) => {
          const fileName = response.data.public_id;
          serverRegisterReq(fileName);
        });
      } else {
       
        serverRegisterReq();
      }
    }
  };

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
    <Stack
      className="register-box"
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
          Register Now!
        </Heading>
        <Text className="subtitle">Do you already have an account?</Text>
        <Text className="login">
       
          Log in <Link to={"register"}>Here</Link>
        </Text>
      </Stack>
      <Box className="half-box" as={"form"} mt={10}>
        <Stack spacing={4}>
          <Input
            onChange={(val) => SetUsername(val.target.value)}
            placeholder="NickName"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            type={"password"}
            onChange={(val) => SetPassword(val.target.value)}
            placeholder="Password"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            onChange={(val) => setEmail(val.target.value)}
            placeholder="email@mail.com"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Input
            onChange={(val) => SetAboutMe(val.target.value)}
            placeholder="Something About Me..."
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          {imagenCargar && (
            <img className="img-preview" src={imagenCargar}></img>
          )}

          <Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
            <input
              onChange={(e) => setearImagenCargar(e)}
              type="file"
              name="file"
              id="file"
              className="inputfile"
              accept="image/png,image/jpeg" 
            />
            <label htmlFor="file">Upload Profile Image</label>
          </Button>
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
        <Button
          className="submit-button"
          onClick={register}
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          colorScheme={"primary"}
        >
          Register
        </Button>
        {errorMessage && <AlertMessage message={errorMessage} />}
      </Box>
      form
    </Stack>
    </motion.div>
  );
}
