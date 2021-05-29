import {useEffect, useState} from 'react'
// import {motion} from 'framer-motion'
import './slider.css'


function Slider(){
    const imList = ['/1.jpg','/2.jpg','/3.jpg']
    const [current,setCurrent] = useState(0)
    const len = imList.length
    useEffect(()=>{
        setTimeout(()=>{
            setCurrent((current+1)%len)
        },5000)
        
    },[current,len])

    return(

            <img className = 'slider-content' src={imList[current]} alt={imList[current]} />
    )

}

export default Slider