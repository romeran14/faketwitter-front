import Axios from "axios";

const deleteTw = async (idtwetts, retweetId, likesId, is_comment) => {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL


  return await Axios.post(`${SERVER_URL}upload/deletetweet`, {
    idtwetts: idtwetts,
    retweetId: retweetId,
    likesId: likesId,
    is_comment : is_comment
  }).then((response) => {
    return response.data;
  });
};

export default deleteTw;
