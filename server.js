require('dotenv').config({path:'config/.env'})
require('./config/connection')
const cors=require('cors')
const express =require('express')
const authRouter=require('./router/authRouter')

const app=express()

const corsOptions={
    origin:['http://localhost:3000']
}

app.use(cors(corsOptions))

const port=process.env.PORT||3000

app.use(express.json()) 

app.get('/',(req,res)=>{
   return res.status(200).send({'message':'Hello From Server'})
})

app.use('/api',authRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})