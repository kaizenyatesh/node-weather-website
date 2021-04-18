console.log('client side script')

// fetch('http://localhost:3000/weather?address=new%20delhi').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//         if(data.error){
//             console.log(data.error)
//         } else{
//             console.log(data.temperature)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector('#error')
const message = document.querySelector('#message')

// error.textContent = 'error'
// message.textContent = 'message'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    error.textContent = 'Loading..'
    message.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            error.textContent = data.error
            message.textContent = ''
        } else{
            //console.log(data.temperature)
            error.textContent = ''
            message.textContent = data.temperature
        }
    })
})
    //console.log(location)
}) 