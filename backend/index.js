// import package
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
// import files
import { connectDB } from './src/config/db.js';
import authRoute from './src/routes/authRoute.js';
import dashboardRoute from './src/routes/dashboardRoute.js';
import productRoutes from './src/routes/productRoutes.js';
import billingRoutes from './src/routes/billingRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// configration
const app = express()
dotenv.config()
connectDB()

// middleware
app.use(cors({
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())


// routes middlwaer + routes
app.use('/api/auth', authRoute) //done
app.use('/api/dashboard', dashboardRoute) //done
app.use('/api/products', productRoutes) //done
app.use('/api/billing', billingRoutes) //done
app.use('/api/users', userRoutes) //done


app.get('/', (req, res) => {
    res.send("Hello from Server")
})


//start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} | http://localhost:${PORT}`)
})