import { where } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcryptjs'
import { RAW } from 'sequelize/lib/query-types';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // dùng bcrypt để hash password
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            // 1. Check email
            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id','email', 'roleid', 'firstName','lastName','address','gender','phonenumber','password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    // 3. So sánh password
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `đăng nhập thành công`;

                        delete user.password; // ẩn cột password
                        userData.user = {
                            id: user.id,
                            email: user.email,
                            role: user.roleid,    // 1=Admin, 2=User
                            firstName: user.firstName,
                            lastName: user.lastName,
                            address: user.address,
                            gender: user.gender,
                            phonenumber: user.phonenumber
                        };
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = `sai mật khẩu`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `không tìm thấy người dùng`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `email không tồn tại trong hệ thống. Vui lòng thử lại.`;
            }
            resolve(userData)

        } catch (e) {
            reject(e);
        }
    })
}

let getUserProfile = async (userId) => {
    // Lấy thông tin user từ DB
    const user = await db.User.findByPk(userId, {
        attributes: ['id', 'name', 'email'] // chỉ lấy các field cần thiết
    });
    return user;
};

let checkEmail = (Email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: Email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleGetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (!userId) {
                return resolve([]);
            } else if (userId === 'ALL') { 
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            } else {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


// tạo
let creatNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email đã được sử dụng, vui lòng chọn email khác',
                })
            } else {
                let hashPasswordfrombcryptjs = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPasswordfrombcryptjs,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleid: 2
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo người dùng thành công',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

// xóa
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({  //https://www.youtube.com/watch?v=due4C4J53gs&t=4s  23:50
            where: { id: id }
        })
        if (!user) {
            return resolve({
                errCode: 2,
                errMessage: `nguời dùng không tồn tại`
            })
        }

        await db.User.destroy({
            where: { id: id }
        });  // 26:08

        return resolve({
            errCode: 0,
            message: `người dùng đã được xóa thành công`
        })
    });
}

let countUser = async () => {
    try {
        let total = await db.User.count();
        return total;
    } catch (e) {
        throw e;
    }
}


//edit 
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    errCode: 2,
                    errMessage: 'thiếu thông tin người dùng'
                });
            }

            const id = Number(data.id);
            console.log('ID sau khi Number():', id);

            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            });
            console.log('USER tìm được trong updateUserData:', user);

            if (user) {
                user.firstName   = data.firstName;
                user.lastName    = data.lastName;
                user.email       = data.email;
                user.address     = data.address;
                user.phonenumber = data.phone; 
                user.gender      = data.gender;
                user.roleid      = data.roleid;       

                await user.save();

                return resolve({
                    errCode: 0,
                    message: 'Update người dùng thành công'
                });
            } else {
                return resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy người dùng'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    handleLogin: handleLogin,
    getUserProfile: getUserProfile,
    handleGetAllUser: handleGetAllUser,
    creatNewUser: creatNewUser,
    deleteUser: deleteUser,
    countUser: countUser,
    updateUserData: updateUserData
}