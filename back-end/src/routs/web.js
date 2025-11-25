import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();  // định nghĩa routerr riêng biệt cho một phần của ứng dụng 

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomeController);
    router.get('/crud', homeController.getCRUD); // thêm người dùng
    router.post('/post-crud', homeController.postCRUD);  
    router.get('/get-crud', homeController.displayGetCRUD); // hiển thị danh sách thông tin người dùng
    router.get('/edit-crud', homeController.editCRUD); // chỉnh sửa thông tin người đùn
    router.post('/put-crud', homeController.putCRUD);
     router.get('/delete-crud', homeController.deleteCRUD);

    return app.use('/', router); // nexpress biết nạp route nào 
}


export default initWebRoutes;