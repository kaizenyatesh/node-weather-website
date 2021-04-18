const geoCode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname,'..', 'templates/views')
const partialsPath = path.join(__dirname,'..', 'templates/partials')

//setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res)=>{
    res.render('index', {
        name: 'yat',
        title:'index',
        age: 20
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'about',
        name: 'him'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'yat'
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'where is search'
        })
    }
    res.send({
        products:[]
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'where is address'
        })
    }
    geoCode(req.query.address, (error, {lattitude, longitude}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        else{
            weather(lattitude, longitude, (error,response)=>{
                if(error){
                    return res.send({
                        error: error
                    })  
                }
                else{
                    res.send({
                        temperature: 'temperature' + response
                    })
                }
            }) 
        }
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'help not found',
        error:'not found help'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404 page',
        error: 'not found'
    })
})

// app.get('', (req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res)=>{
//     res.send({
//         name:'abc',
//         age:27
//     })
// })

// app.get('/about', (req,res)=>{
//     res.send('about page')
// })

app.listen(port,()=>{
    console.log('server running')
})