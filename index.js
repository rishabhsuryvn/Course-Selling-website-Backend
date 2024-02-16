const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const adminRouter = require('./route/admin')
const userRouter = require('./route/user')

app.use(bodyParser.json())
app.use('/admin', adminRouter)
app.use('/user', userRouter)

const PORT = 3002;




app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`)
})

