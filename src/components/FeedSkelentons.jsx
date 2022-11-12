import React from "react";
import {
  Stack,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";

const TWEETS = new Array(15).fill(true).map((_, index) => index);

const FeedSkelentons = () => {
  return (
    <Stack width={"100%"} spacing={2}>
      {TWEETS.map((index) => (
        <Stack key={index} paddingInline={3} paddingTop={2}  spacing={0} >
          <Stack alignItems={"center"} direction="row" spacing={4}>
            <SkeletonCircle height={12} width={12} />
        
          <Stack>
          <Skeleton height={3} width={"80px"}></Skeleton>
            <Skeleton height={4} width={"120px"}></Skeleton>
          </Stack>
          </Stack>
          <Stack direction="row"  >
          <Stack  width={{"md":'10%', "sm":"56px"}} >
          
            </Stack>
            <SkeletonText  width={'80%'} height={'auto'} noOfLines={2} ></SkeletonText>
          </Stack>
         
        </Stack>
      ))}
    </Stack>
  );
};

export default FeedSkelentons;
