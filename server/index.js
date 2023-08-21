import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session';
import cookieParser from 'cookie-parser'
import Routes from './routes/routes.js'
import multer from 'multer'
import path from 'path'
import Book from './models/book.js'

// Configurations

dotenv.config()
const app = express()
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }));
  
  //cors setup
  
  app.use(cors({
    origin: 'http://localhost:5173', // Update with the correct origin of your frontend
    methods: 'GET, POST, PUT, DELETE', 
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, 
  }));
  
  //File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


  //Routes
   app.use('/', Routes)


  //MongoDb set up
   mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'studyshack'
  })
    .then(() => {
      console.log("Connected to MongoDB")
      // Start the server once the MongoDB connection is successful
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`Server is connected and listening on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error); // Log the error for debugging
      // If there's an error connecting to MongoDB, stop the server from starting
      process.exit(1);
    });
  
  