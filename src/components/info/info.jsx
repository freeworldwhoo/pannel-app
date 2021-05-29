import {useState,useEffect} from 'react'

import './info.css'

function Info(){
    const d = new Date();
    const [time,setTime]=useState(d.getHours() + ':' + d.getMinutes())
    const [secondes,setSecondes] = useState(d.getSeconds())
    const [temp,setTemp] = useState(0+' °C')
    const [pressure,setPressure] =  useState(0+' hPa')
    const [hum,setHum] = useState(0 + ' %')
    const [wSensor,setWSensor] = useState(NaN)

    const format = number => (Math.round(number * 100) / 100).toFixed(2);
    
    useEffect(()=>{
        const bme280 = require('bme280')
        const getSensor = async ()=>{
            const sensor = await bme280.open({
                    i2cBusNumber: 1,
                    i2cAddress: 0x76,
                    humidityOversampling: bme280.OVERSAMPLE.X1,
                    pressureOversampling: bme280.OVERSAMPLE.X16,
                    temperatureOversampling: bme280.OVERSAMPLE.X2,
                    filterCoefficient: bme280.FILTER.F16
                  })
            setWSensor(sensor)
        }
        getSensor()
    },[])

    const readSensor = async ()=>{
        const reading = await wSensor.read()
        setTemp(`${format(reading.temperature)} °C, `)
        setPressure(`${format(reading.pressure)} hPa, `)
        setHum(`${format(reading.humidity)} %`)
    }

    useEffect(()=>{
        setTimeout(()=>{
            setSecondes(d.getSeconds())
            setTime(d.getHours() + ':' + d.getMinutes())
            readSensor()
        },1500)
    },[secondes,time])

    return(
        <div className="infos-container">
            <div className="left-info">
                <div className="info">26.90 °C<img src="/icons/t_icon.png" alt="temp" className="icon" width='96' height='96' /></div>
                <div className="info">927.49 hPa<img src="/icons/b_icon.png" alt="b" className="icon" width='96' height='96' /></div>
                <div className="info">44.55 %<img src="/icons/h_icon.png" alt="h" className="icon" width='96' height='96' /></div>
            </div>
            <div className="right-info">
                <div className="info"><img src="/icons/time_icon.png" alt="time" className="icon" width='96' height='96' />{time} </div>
                <div className="info"><img src="/icons/w_icon.png" alt="wind" className="icon" width='96' height='96' />40 km/h </div>
                <div className="info"><img src="/icons/s_icon.png" alt="speed" className="icon" width='96' height='96' />30 km/h </div>
            </div>
        </div>
    )

}

export default Info