import db from '../models/index';
import CRUDservices from '../services/CRUDservices';

let getHomeController = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("home.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.js')
}

let getCRUD = async  (req, res) => {
    let data = await CRUDservices.getAllUser();
    return res.render('crud.ejs',{
        dataTable: data
    })
}

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    let data = await CRUDservices.getAllUser();
    return res.render('displayCURD.ejs',{
        dataTable: data
    });
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUser();
    return res.render('displayCURD.ejs', {
        dataTable: data
    })
}

let editCRUD = async (req, res) => {
    let UserID = req.query.id;
    console.log(UserID)
    if(UserID) {
        let userData = await CRUDservices.getUserInfoById(UserID);
        // check user data not found
        return res.render('editcrud.ejs',{
            dataTable: userData 
        });
    }else{
        return res.send('user not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDservices.updateUserData(data);
    return res.render('displayCURD.ejs', {
        dataTable: allUser 
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservices.deleteCRUD(id);
        let allUser = await CRUDservices.getAllUser();
        return res.render('displayCURD.ejs',{
            dataTable: allUser
        })
    } else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomeController: getHomeController,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}