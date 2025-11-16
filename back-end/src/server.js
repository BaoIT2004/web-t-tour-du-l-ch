import express from 'express';
import configureViewEngine from './configs/viewEngine.js';
import initWebRoutes from './routs/web.js';
import bodyParser from 'body-parser';
import connectDB from './configs/connectDB.js'
require('dotenv').config(); // su dung file .env (lấy các biến môi trường từ file .env)


let app = express();
let PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // Parse JSON từ body
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

//config viwe engine
configureViewEngine(app);
// init web routes
initWebRoutes(app);  // khai báo biến rout sẽ dùng

connectDB();

app.listen(PORT, () => {
    console.log("Backend nodejs is running on the port : " + PORT);
});