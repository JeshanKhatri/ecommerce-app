import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import paymentRouter from './routes/paymentRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send("API running")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})