import {useState,useEffect} from 'react'
import {io} from 'socket.io-client'
import './info.css'

const socket = io.connect('http://localhost:5000')

function Info(){
    const d = new Date()
    const [t,setTime]=useState(d.toLocaleTimeString())
    const [temp,setTemp] = useState(0+' °C')
    const [pressure,setPressure] =  useState(0+' hPa')
    const [hum,setHum] = useState(0 + ' %')

    const format = number => (Math.round(number * 100) / 100).toFixed(2);
    useEffect(()=>{
        setInterval(() => {
            
            socket.emit('get_info')
        }, 1000);
        socket.on('send_info',reading=>{
            const d = new Date()
            console.log(d.toLocaleTimeString())
            setTime(d.toLocaleTimeString())
            setTemp(`${format(reading.temperature)} °C`)
            setPressure(`${format(reading.pressure)} hPa`)
            setHum(`${format(reading.humidity)} %`)
        })
    },[])
    return(
        <div className="infos-container">
            <div className="left-info">
                <div className="info">{temp}<img src="/icons/t_icon.png" alt="temp" className="icon" width='96' height='96' /></div>
                <div className="info">{pressure}<img src="/icons/b_icon.png" alt="b" className="icon" width='96' height='96' /></div>
                <div className="info">{hum}<img src="/icons/h_icon.png" alt="h" className="icon" width='96' height='96' /></div>
            </div>
            <div className="right-info">
                <div className="info"><img src="/icons/time_icon.png" alt="time" className="icon" width='96' height='96' />{t}</div>
                <div className="info"><img src="/icons/w_icon.png" alt="wind" className="icon" width='96' height='96' />40 km/h </div>
                <div className="info"><img src="/icons/s_icon.png" alt="speed" className="icon" width='96' height='96' />30 km/h </div>
            </div>
        </div>
    )

}

export default Info