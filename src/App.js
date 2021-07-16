import Slider from './components/slider/slider.jsx'
import Info from './components/info/info.jsx'
import {useState,useEffect} from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [tougleGetId, setTougleGetId] = useState(false)
  const [deviceId,setDeviceId] = useState("")
  
  useEffect(()=>{
    const storage_id = localStorage.getItem('id')
    const device_id =storage_id  ? storage_id  : ""
    
    const get_device_id = async()=>{
      let data = new FormData()
      data.append("auth_id",device_id)
      await axios({
        method:'post',
        url:'http://192.168.137.1:8080/auth/',
        data:data
      }).then(res => {
        try{
          setDeviceId(res.data.auth_id)
          localStorage.setItem('id',res.data.auth_id)

        }
        catch{
          setDeviceId(device_id)
        }
      }).catch(()=>{
        setDeviceId(device_id)})
    }
    get_device_id()
   },[tougleGetId])

   useEffect(()=>{
    const update_device_info = async()=>{
      if (deviceId.length > 6){

        let data = new FormData()
        data.append("name",'test')
        data.append("latitude",'33.57310000')
        data.append("longitude",'7.58900000')
        await axios({
          method:'put',
          url:`http://192.168.137.1:8080/devices/${deviceId}/`,
          data:data
        }).then(res => {
            console.log(res.data)
        }).catch(()=>{
          setTougleGetId(!tougleGetId)
        })
      }
    }
    update_device_info()

   },[deviceId])
  return (
    <div className="App">
      {/* <h1>{deviceId}</h1> */}
      <Slider device_id = {deviceId} tougle_get_id = {setTougleGetId} get_id = {tougleGetId}></Slider>
      <Info device_id = {deviceId} tougle_get_id = {setTougleGetId} get_id = {tougleGetId}></Info>
    </div>
  );
}

export default App;
