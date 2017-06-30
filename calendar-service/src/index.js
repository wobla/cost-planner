'use strict'
const server = require('./server/server')

console.log('--- Calendar Service ---')

process.on('uncoughtException', (err)=>{
    console.error('Unhandled Exception', err)
})

process.on('uncoughtRejection', (err, promise)=>{
    console.error('Unhandled Rejection', err)
})

server.start({
    port: 8090
})
.then(app=>{
    console.log('Server started succesfully, running on port: 8090')
})