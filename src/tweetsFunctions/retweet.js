
import Axios from 'axios'


const retweet = (id, retweetId, retweetAlready, text, img, Retweet_state, likesId, likeAlready, OwnTw = false, Is_comment, Comment_original_username) => {
       //Con retweetAlready se distingue si el tweet clikeado ya ha sido retwitteado o no

        var hoy = new Date();
        var fecha =
        hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        const fechaYHora = fecha + " " + hora;

        const SERVER_URL = process.env.REACT_APP_SERVER_URL

        //obteniendo tweet de referencia
        const laik =  likeAlready === null ? likesId : likeAlready
        const retuit = retweetAlready === null ? retweetId : retweetAlready
        let originTw = null
        if (OwnTw === false){
          if (laik>retuit) {
            originTw = retuit
          } else if (laik<retuit) {
           originTw = laik
          }else{
           originTw = retuit
          }
        }else{
          originTw = retuit
        
        }
      
        const uploadRetweet = async () => {
          Axios.post(`${SERVER_URL}upload/uploadretweet`, {
            userid: id,
            creationDate: fechaYHora,
            retweetId: originTw,
            text: text,
            img: img,
            retweet_state: Retweet_state,
            Is_comment: Is_comment,
            Comment_original_username: Comment_original_username
          }).then((response) => {
            console.log('response retweet' ,response.data.message);
          });
        };
    
            uploadRetweet();

      };


export default retweet