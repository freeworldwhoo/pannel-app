const io = require('socket.io')(5000,{
    cors:{
        origin:['http://localhost:3000',]
    }
})


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
    console.log('starting server')
    io.on('connection', socket =>{
        console.log(socket.id)
        socket.on('get_info',async() =>{
            const reading = await sensor.read()
            io.emit('send_info',reading)
            
        })
    })
}

getSensor()