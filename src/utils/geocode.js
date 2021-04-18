const http = require('http')

const geoCode = (address, callback) =>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWF0ZXNobmFnYXJybyIsImEiOiJja2JydnJobnEyMjd0MnhwbzRoNGFhcW10In0.SxvIQQ2_6TQbWxzBBcLbCg&limit=1' 
    const request = http.request(url, (response)=>{
        var data = ''
        response.on('data', (chunk)=>{
            data = data + chunk.toString() 
        })
        response.on('end', ()=>{
            jsonData = JSON.parse(data)
            if(jsonData.features.length === 0){
                callback('location is not good', undefined)
            }else{
                callback(undefined, {
                    lattitude: jsonData.features[0].center[1],
                    longitude: jsonData.features[0].center[0],
                })
            }
        })
    })
request.on('error', (error) =>{
    callback('api not found', undefined)
})    
request.end()
}

module.exports = geoCode