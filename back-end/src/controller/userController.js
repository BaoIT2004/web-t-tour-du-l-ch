import userServices from '../services/userServices'
import db from '../models/index.js';

// chức năng đăng nhập
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {  //dấu "!" check rỗng , null , undefine
        return res.status(500).json({
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userServices.handleLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {} //Nếu userData.user tồn tại (không phải null, undefined, false, 0, ""…) → gán giá trị của userData.user vào field user.
    })
}


// Hiển thị các user trong chức năng quản lí người dùng
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    const allUsers = await db.User.findAll(); 
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: allUsers
        })
    }

    let tours = await userServices.handleGetAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'find user',
        users
    })
}


let handleSignup = async (req, res) => {
    let message = await userServices.creatNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleDeleteuser = async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode : 1,
            errMessage: "Missing required parameters!"
            
        })
    }
    let message = await userServices.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

let handleEdituser = async (req, res) => {
    let data = req.body;
    console.log("BODY GỬI LÊN TỪ CLIENT:", req.body);
    let message = await userServices.updateUserData(data);
    return res.status(200).json(message)
}

let handleCount = async (req, res)=> {
    try{
        let toltal = await userServices.countUser();
         return res.status(200).json({
            errCode: 0,
            toltal: toltal,
            errMessage: "Count users successfully!"
        });

    }catch(err){
        console.log("Error in handleCountUsers:", err);
        return res.status(500).json({
            errCode: 1,
            errMessage: "Server error!"
        });
    }
}

export default {
    handleLogin,
    handleGetAllUser,
    handleSignup,
    handleEdituser,
    handleDeleteuser,
    handleCount
};
