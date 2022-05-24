import express  from "express";
import morgan from "morgan";
import cors from "cors";
import c from './config';
import path from 'path';
const app = express();

//setings
app.set('port', c.port || 3000); 

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());




//Routes
// app.use(studentsroutes)

app.use(require('./routes'))

app.use('/uploads', express.static(path.resolve('uploads')));


export default app;