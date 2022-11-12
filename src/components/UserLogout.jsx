import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import LogoutButton from "./logoutButton";
import UserImage from "./UserImage";
import { BsThreeDots } from "react-icons/bs";

const UserLogout = ({ loginState }) => {
  return (
    <Popover matchWidth={true}  placement="top">
      <PopoverTrigger>
        <Stack
          // paddingX={4}
          alignItems={"center"}
          // paddingY={4}
          direction={"row"}
          justifyContent={"space-between"}
          className={'UserLogout'}
        >
          <Stack className="popovertrigger" alignItems={"center"} direction={"row"}>
            <UserImage userImg={loginState.userImg} />
            <Stack >
              <Text fontWeight={"bold"} fontSize={"sm"}>
                {loginState.Username}
              </Text>
              <Text fontWeight={"500"} color="gray.600" marginTop={0} fontSize={"sm"}>
                @{loginState.Username}
              </Text>
            </Stack>
          </Stack>
          <Icon display={{xl:'block',sm:'none' }} as={BsThreeDots}></Icon>
        </Stack>
      </PopoverTrigger>
      <PopoverContent width={'fit-content'}>
        <PopoverBody>
          <LogoutButton />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default React.memo(UserLogout) ;
