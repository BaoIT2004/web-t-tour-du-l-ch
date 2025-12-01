import db from '../models/index.js';

let handlNewtour = (data, file) => {  
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tours.create({
                tourName: data.tourname,
                tourPrice: data.tourprice,
                description: data.description,
                image: file ? `/image/${file.filename}` : null,
                policy: data.policy,
                included: data.included,
                excluded: data.excluded,
                activeid: data.activeid,
            });

            resolve({
                errCode: 0,
                errMessage: 'Tour created successfully!'
            });
        } catch (err) {
            reject(err);
        }
    });
};


let getAllTours = (tourId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tours;
            if (!tourId) {
                return resolve([]);
            } 
            if (tourId === 'ALL') {
                const tours = await db.Tours.findAll({});
                return resolve(tours);
            } 
                
            tours = await db.Tours.findOne({
                where: { id: tourId },
            });

            resolve(tours);
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    handlNewtour,
    getAllTours,
};
