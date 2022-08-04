require('dotenv').config({path: __dirname + '/.env'});
const express = require('express')

const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cors = require('cors')

const connectDB = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAMEA}:${process.env.DB_PASSWORDA}@cluster0.vtrkbrj.mongodb.net/?retryWrites=true&w=majority`,
        {
           
				useNewUrlParser: true,
				useUnifiedTopology: true,
				
        })
    console.log('MongoDB connected')
}
    catch(error){
console.log(error.message)
process.exit(1)    }
}
connectDB()
const app = express()
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true,
    })
);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Sever Started on ${PORT}`))


