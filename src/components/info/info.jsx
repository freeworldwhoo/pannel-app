import {useState,useEffect} from 'react'
import {io} from 'socket.io-client'
import './info.css'
import axios from 'axios'

const socket = io.connect('http://localhost:5000')

function Info({ tougle_get_id,get_id}){
    const d = new Date()
    const [t,setTime]=useState(d.toLocaleTimeString())
    const [temp,setTemp] = useState(0)
    const [pressure,setPressure] =  useState(0)
    const [hum,setHum] = useState(0)
    const [sendData,setSendData] = useState(false)

    const device_id = localStorage.getItem('id')
    
    const format = number => (Math.round(number * 100) / 100).toFixed(2);

    useEffect(()=>{
        setInterval(() => {
            
            socket.emit('get_info')
        }, 1000);
        socket.on('send_info',reading=>{
            const d = new Date()
            setTime(d.toLocaleTimeString())
            setTemp(format(reading.temperature))
            setPressure(format(reading.pressure) )
            setHum(format(reading.humidity))
        })

        
        

    },[])

    const device_send_data = async(send_data)=>{
        const data = {"temperature":temp,
                        "humidity":hum,
                        "speed":40,
                        "pressure":pressure}
        console.log(data)
        await axios({
          method:'post',
          url:`http://192.168.137.1:8080/devices/${device_id}/`,
          data:data
        }).then(res => {
          console.log(res.data)
        }).catch(()=>{
            tougle_get_id(!get_id)
          })
      }
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setSendData(!sendData)
        },6000)
        device_send_data(sendData)
        return ()=> clearTimeout(timer)
    },[sendData])

    return(
        <div className="infos-container">
            <div className="left-info">
                <div className="info">{`${temp} °C`}<img src="/icons/t_icon.png" alt="temp" className="icon" width='96' height='96' /></div>
                <div className="info">{`${pressure} hPa`}<img src="/icons/b_icon.png" alt="b" className="icon" width='96' height='96' /></div>
                <div className="info">{`${hum} %`}<img src="/icons/h_icon.png" alt="h" className="icon" width='96' height='96' /></div>
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