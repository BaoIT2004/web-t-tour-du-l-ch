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
                    attributes: ['email', 'roleid', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    // 3. So sánh password
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Successfully logged in`;

                        delete user.password; // ẩn cột password
                        userData.user = {
                            id: user.id,
                            email: user.email,
                            role: user.roleid, // 1=Admin, 2=User
                        };


                    } else if (user) {

                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user's not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system, please ttry other email`;
            }
            resolve(userData)

        } catch (e) {
            reject(e);
        }
    })
}

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

let creatNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Please try another email!',
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
                    //roleid: data.roleid
                    roleid: 2
                })
                resolve({
                    errCode: 0,
                    errMessage: 'User created successfully!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({  //https://www.youtube.com/watch?v=due4C4J53gs&t=4s  23:50
            where: { id: id }
        })
        if (!user) {
            return resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }

        await db.User.destroy({
            where: { id: id }
        });  // 26:08

        return resolve({
            errCode: 0,
            message: `The user is deleted`
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

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
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
                user.phonenumber = data.phoneNumber; 
                user.gender      = data.gender;
                user.roleid      = data.type;       

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
    handleGetAllUser: handleGetAllUser,
    creatNewUser: creatNewUser,
    deleteUser: deleteUser,
    countUser: countUser,
    updateUserData: updateUserData
}