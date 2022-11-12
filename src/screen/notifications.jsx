import { motion } from "framer-motion";
import { FiSettings } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

export default function Notifications() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="header-notifications">
        <div className="flex">
          <h3>Notifications</h3>
          <span>
            <FiSettings />
          </span>
        </div>
        <div className="flex-category ">
          <div className="category">
            <p>All</p>
          </div>
          <div className="category">
            <p>Mentions</p>
          </div>
        </div>
      </div>
      <div className="twit-notification">
        <div className="icon">
          <FaTwitter />
        </div>
        <div>
          <p>
            your @Account was logged in from a new device on Nov 2
            <sup>nd</sup>, 2022. See more details.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
