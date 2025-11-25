import bcrypt from 'bcryptjs'
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';



const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordfrombcryptjs = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.FirstName,
                lastName: data.LastName,
                email: data.Email,
                password: hashPasswordfrombcryptjs,
                address: data.Address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid
            })

            resolve('create new user successed')

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            console.log(e);
        }
    })
}


let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findAll({
                raw: true,
            });
            resolve(User)
        } catch (e) {
            reject(e);
        }
    })
}


let getUserInfoById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID },
                raw: true
            });

            if (user) {
                resolve(user);
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.FirstName;
                user.lastName = data.LastName;
                user.email = data.Email;
                user.address = data.Address;
                user.phoneNumber = data.phoneNumber;
                await user.save();
                let allUser = await db.User.findAll({raw: true});
                resolve(allUser);
            } else {
                resolve({});
            }
        } catch (e) {
                console.log(e);
        }
    })
}

let deleteCRUD = (userid) => {
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: userid}
            })

            if(user){
               await user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteCRUD: deleteCRUD
}

