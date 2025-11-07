import express from "express";

const router = express.Router();  // định nghĩa routerr riêng biệt cho một phần của ứng dụng 

const initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send("hello world"); // render file ejs
    });

    

    return app.use('/', router); // nexpress biết nạp route nào 
}


export default initWebRoutes;