import db from '../models/index';

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


module.exports = {
    getHomeController: getHomeController,
}