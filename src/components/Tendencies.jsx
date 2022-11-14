import React, {useEffect} from 'react'
import { uniqueId } from 'lodash'
import {BsThreeDots} from "react-icons/bs"

const Tendencies = () => {

 
      let alltrends =  []

   const tendencies = {
     cantidadTw: 1000,
     toptext: ' Lorem ipsum dolor sit',
     text:'trends in your country'
   }
 
  let contador =0
  do {
    contador ++;

    alltrends.push(tendencies)
    
  } while (contador < 10);
  
  useEffect(() => {
  console.log('alltrends',alltrends)
  }, [])
  
  return (
    <div  className='Tendencias'>
        <div className="graybg">
        <h3>trends for you</h3>
        {alltrends.map(  item => (
            <div key={Math.random()} className='tendencies-item' >
                <div className="left">
                    <p className="toptext">{item.text}</p>
                    <p className="text">{item.toptext}</p>
                    <p className="tweetqty">{Math.round(Math.random()*1000)} Tweets</p>
                </div>
                <BsThreeDots/>
            </div>
        ))}
        <a className='show-more'>Show More</a>
</div>
    </div>
    
  )
}

export default Tendencies