import express from 'express';
import configureViewEngine from './configs/viewengine.js';
import initWebRoutes from './routs/web.js';
require('dotenv').config(); // su dung file .env (lấy các biến môi trường từ file .env)


const app = express();
const PORT = process.env.PORT || 8080;



//config viwe engine
configureViewEngine(app);
// init web routes
initWebRoutes(app);  // khai báo biến rout sẽ dùng

app.listen(PORT, () => {
    console.log("Backend nodejs is running on the port : " + PORT);
});