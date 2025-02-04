import express from "express";
import morgan from "morgan";
import connect from './db/db.js'
import userRoute from './routes/user.routes.js'
import projectRoute from './routes/project.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

connect();

const app = express();

app.use(cors());
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users',userRoute);
app.use('/projects',projectRoute);

app.get('/', (req,res) => {
    res.send("hello world");
})

export default app;
