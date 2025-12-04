import db from '../models/index.js';

let handlNewtour = (data, file) => {  
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tours.create({
                tourName: data.tourName,
                tourPrice: data.tourPrice,
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

let updateTourData = (data, file) => {
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

            let tour = await db.Tours   .findOne({
                where: { id: id },
                raw: false
            });
            console.log('TOUR tìm được trong updateTourData:', tour);

            if (tour) {
                if (file) {
                    tour.image = `/image/${file.filename}`;
                }
                tour.tourName = data.tourName;
                tour.tourPrice = data.tourPrice;
                tour.description = data.description;
                tour.excluded = data.excluded;
                tour.activeid = data.activeid;

                await tour.save();

                return resolve({
                    errCode: 0,
                    message: 'Cập nhật tour thành công'
                });
            } else {
                return resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy tour'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deletetour = (id) => {
    return new Promise(async (resolve, reject) => {
        let tour = await db.Tours.findOne({
            where: { id: id }
        })
        if (!tour) {
            return resolve({
                errCode: 2,
                errMessage: `the tour isn't exist`
            })
        }

        await db.Tours.destroy({
            where: { id: id }
        });  // 26:08

        return resolve({
            errCode: 0,
            message: `The tour is deleted`
        })
    });
}



module.exports = {
    handlNewtour: handlNewtour,
    getAllTours: getAllTours,
    updateTourData: updateTourData,
    deletetour: deletetour
};
