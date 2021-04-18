const http = require('http')

const weather = (lattitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=1b6b1dfb9311e75a853cca49c77d9b9b&query=' + lattitude +',' + longitude + '&units=f' 
    const request = http.request(url, (response)=>{
        var data = ''
        response.on('data', (chunk)=>{
            data = data + chunk.toString() 
        })
        response.on('end', ()=>{
            jsonData = JSON.parse(data)
            if(jsonData.error){
                callback(jsonData.error.info, undefined)
            }
            else{
                callback(undefined, jsonData.current.temperature)
            }
        })
    })
request.on('error', (error) =>{
    callback('api not found', undefined)
})    
request.end()
}

module.exports = weather