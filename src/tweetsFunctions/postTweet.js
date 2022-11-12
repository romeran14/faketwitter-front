import React from 'react'

function postTweet() {
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[image, setImage] = useState([])
 
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

   
 
    const upload = () => {
 
        const formData = new FormData()
        formData.append('file', image[0])
        formData.append('upload_preset', 'nocm22xb')
 
        Axios.post('https://api.cloudinary.com/v1_1/dynrpipqv/image/upload', formData).then((response) =>{
            const fileName = response.data.public_id
 
            Axios.post(`${SERVER_URL}upload`,{title: title, description: description, image: fileName, author: localStorage.getItem("username")}).then(() =>{
                navigate('/')
            })
        })
    }
}

export default postTweet