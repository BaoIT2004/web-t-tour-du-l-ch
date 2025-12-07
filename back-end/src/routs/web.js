import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import tourController from "../controller/tourController";
import upload from "../config/multerConfig.js";

const router = express.Router();  // định nghĩa routerr riêng biệt cho một phần của ứng dụng 

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomeController);
    router.get('/crud', homeController.getCRUD); // thêm người dùng
    router.post('/post-crud', homeController.postCRUD);  
    router.get('/get-crud', homeController.displayGetCRUD); // hiển thị danh sách thông tin người dùng
    router.get('/edit-crud', homeController.editCRUD); // chỉnh sửa thông tin người đùn
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
     

     //----------------- API USER -------------------------------------------
    
    router.post('/api/login', userController.handleLogin);  //1 - KH
    router.get('/api/getUser', userController.handleGetAllUser); //2 -  AM
    router.post('/api/creat-new-user', userController.handleSignup) //3 ; KH đăng kí tài khoản 
    router.put('/api/edit-user', userController.handleEdituser) //4 ; Admin sửa tài khoản 
    router.delete('/api/delete-user', userController.handleDeleteuser) //5 ; Admin xóa tài khoản 
    router.get('/api/count', userController.handleCount)  // Dasboard đếm số người dùng


       //----------------- API TOUR -------------------------------------------

    router.post('/api/creat-new-tour', upload.single('image'), tourController.handlNewtour);
    router.get('/api/view-new-tour', tourController.handleGetAlltoure); // xem
    router.get('/api/view-tour', tourController.handleGetTourById);// xem chi tiết tour theo id
    router.put('/api/update-tour', tourController.handleUpdateToure); // sửa
    router.put('/api/update-tour-image',   upload.single('image'),  tourController.handleUpdateImageToure); // sửa
    router.delete('/api/delete-tour', tourController.handleDelete);
 
 


    return app.use('/', router); // nexpress biết nạp route nào 
}


export default initWebRoutes;


