import express from 'express';
import { urlencoded, json } from 'body-parser';
import 'dotenv/config';
import connectDB from './configs/connectDB';
import initialApiRouter from './routers/apiRouter'
import initialWebRouter from './routers/webRouter'
import configViewEngine from './configs/viewEngine';
const port = process.env.PORT||8080;
const app = express();

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json());

// if you use view engine 
configViewEngine(app);

//connectDB();
initialApiRouter(app);
initialWebRouter(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});