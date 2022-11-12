import React from "react";
import { motion } from "framer-motion";
const MessagesScreen = () =>{
    return <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >{'<MessagesScreen/>'}</motion.div>
}

export default MessagesScreen;