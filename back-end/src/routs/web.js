import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();  // định nghĩa routerr riêng biệt cho một phần của ứng dụng 

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomeController);

    return app.use('/', router); // nexpress biết nạp route nào 
}


export default initWebRoutes;