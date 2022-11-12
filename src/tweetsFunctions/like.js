
import Axios from 'axios'


const like = (id, likeId, likeAlready, text, img, Like_state, retweetId, retweetAlready, OwnTw = false,  Is_comment, Comment_original_username) => {
       //Con likeAlready se distingue si el tweet es ya ha sido likeado o no
        
        var hoy = new Date();
        var fecha =
        hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        const fechaYHora = fecha + " " + hora;

        //obteniendo tweet de referencia
      const laik =  likeAlready === null ? likeId : likeAlready
      const retuit = retweetAlready === null ? retweetId : retweetAlready
       let originTw = null

       const SERVER_URL = process.env.REACT_APP_SERVER_URL


       if (OwnTw === false){
        if (laik>retuit) {
          originTw = retuit
        } else if (laik<retuit) {
         originTw = laik
        }else{
         originTw = laik
        }
       }else{
         originTw = laik
        
       }
        
        const uploadLike = async () => {
          Axios.post(`${SERVER_URL}upload/uploadlike`, {
            userid: id,
            creationDate: fechaYHora,
            likeId: originTw,
            text: text,
            img: img,
            like_state: Like_state,
            Is_comment:Is_comment,
             Comment_original_username: Comment_original_username
          }).then((response) => {
            console.log('response like' ,response.data.message);
          });
        };
    
            uploadLike();

      };


export default like