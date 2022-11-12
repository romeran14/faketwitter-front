import React, {useMemo, useEffect} from 'react'
import { useToast } from '@chakra-ui/react'


const Toasted = ({msg}) => {
  
//const msg = useMemo(() => toastMessage, [toastMessage])
    const toast = useToast()
useEffect(() => {


  return () => {
    toastMessage !== null ? (
      toast({
       title: msg,
       status: 'success',
       duration: 9000,
       isClosable: true,
       variant: 'left-accent',
     })): <></>
  }
}, [msg])

 
}

export default React.memo(Toasted)

