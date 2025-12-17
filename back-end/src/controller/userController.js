import userServices from '../services/userServices'
import db from '../models/index.js';
import jwt from 'jsonwebtoken';



// chức năng đăng nhập
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {  //dấu "!" check rỗng , null , undefine
        return res.status(500).json({
            message: 'Thiếu thông tin đầu vào!'
        })
    }

    let userData = await userServices.handleLogin(email, password);

    if (userData.errCode === 0) {
        const token = jwt.sign(
            {
                id: userData.user.id,
                email: userData.user.email,
                role: userData.user.role,
                firstName: userData.user.firstName,
                lastName: userData.user.lastName,
                address: userData.user.address,
                gender: userData.user.gender,
                phonenumber: userData.user.phonenumber
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // token lưu trong 1 ngày
        );
        userData.token = token;
        //console.log('TOKEN SERVER TẠO:', token);

        userData.user = {
        id: userData.user.id,
        email: userData.user.email,
        role: userData.user.role,
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        address: userData.user.address,
        gender: userData.user.gender,
        phonenumber: userData.user.phonenumber
    };
    }

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}, //Nếu userData.user tồn tại (không phải null, undefined, false, 0, ""…) → gán giá trị của userData.user vào field user.
        token: userData.token
    })
}

let getProfile = async (req, res) => {
    try {
        const userId = req.user.id;  // req.user được verifyToken gán
        const user = await getUserProfile(userId);

          if (!user) {
            return res.status(404).json({ errCode: 1, errMessage: "không tìm thấy người dùng" });
        }

        // truy vấn database lấy thông tin user
        res.status(200).json({ errCode: 0, data: { id: userId } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errCode: 1, errMessage: "Internal server error" });
    }
};


// Hiển thị các user trong chức năng quản lí người dùng
let handleGetAllUser = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        let allUsers = await db.User.findAll();
        console.log("Dữ liệu từ DB:", allUsers);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get all users successfully',
            users: allUsers
        })
    }


    let users = await userServices.handleGetAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'find user',
        users: users
    })
}


let handleSignup = async (req, res) => {
    let message = await userServices.creatNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleDeleteuser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
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

let handleCount = async (req, res) => {
    try {
        let toltal = await userServices.countUser();
        return res.status(200).json({
            errCode: 0,
            toltal: toltal,
            errMessage: "Count users successfully!"
        });

    } catch (err) {
        console.log("Error in handleCountUsers:", err);
        return res.status(500).json({
            errCode: 1,
            errMessage: "Server error!"
        });
    }
}

export default {
    handleLogin,
    getProfile,
    handleGetAllUser,
    handleSignup,
    handleEdituser,
    handleDeleteuser,
    handleCount
};
