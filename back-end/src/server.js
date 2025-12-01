import express from 'express';
import configureViewEngine from './config/viewEngine.js';
import initWebRoutes from './routs/web.js';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB.js'
import cors from 'cors'
import multer from "multer";
import path from "path";

import dotenv from 'dotenv'; // su dung file .env (lấy các biến môi trường từ file .env)
dotenv.config();

let app = express();


app.use(cors({ origin: 'http://localhost:5173' })); // front-end reactjs trên máy cục bộ của tôi có thể truy cập vào back-end api được lưu trữ trên azure:
//https://stackoverflow.com/questions/46337471/how-to-allow-cors-in-react-js

let PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // Parse JSON từ body
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Cho FE truy cập ảnh lưu trong src/image
app.use("/image", express.static("src/image"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/image");       // nơi MULTER lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage });



initWebRoutes(app);  // khai báo biến rout sẽ dùng
//cấu hình view ( không cần thiết   )
configureViewEngine(app);

connectDB(); // kết nối db

app.listen(PORT, () => {
    console.log("Backend nodejs is running on the port : " + PORT);
});

