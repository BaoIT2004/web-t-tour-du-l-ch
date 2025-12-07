import db from '../models/index.js';

let handlNewtour = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Parse schedules nếu client gửi dưới dạng chuỗi JSON
            const schedules = data.itinerary ? JSON.parse(data.itinerary) : [];


            // Tạo Tour kèm lịch trình
            const newTour = await db.Tours.create({
                tourName: data.tourName,
                tourPrice: data.tourPrice,
                description: data.description,
                image: file ? `/image/${file.filename}` : null,
                policy: data.policy,
                included: data.included,
                excluded: data.excluded,
                activeid: data.activeid,
                schedules: schedules // thêm schedules
            }, {
                include: [{ model: db.schedule, as: 'schedules' }] // alias phải trùng model
            });

            for (let item of schedules) {
                await db.schedule.create({
                    tourId: newTour.id,
                    itinerary: item.schedule,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    status: item.status,
                    notes: item.note
                });
            }


            resolve({
                errCode: 0,
                errMessage: 'Tour created successfully with schedules!',
                tour: newTour
            });
        } catch (err) {
            console.error("Error in handlNewtour:", err);
            reject({
                errCode: -1,
                errMessage: 'Failed to create tour',
                error: err
            });
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

let  updateTourData = async (data, file) => {
    try {
        const schedules = Array.isArray(data.itinerary) ? data.itinerary : (data.itinerary ? JSON.parse(data.itinerary) : []);

        const newTour = await db.Tours.create({
            tourName: data.tourName,
            tourPrice: data.tourPrice,
            description: data.description,
            image: file ? `/image/${file.filename}` : null,
            policy: data.policy,
            included: data.included,
            excluded: data.excluded,
            activeid: Boolean(Number(data.activeid))
        });

        for (let item of schedules) {
            await db.schedule.create({
                tourId: newTour.id,
                itinerary: item.schedule,
                startDate: item.startDate,
                endDate: item.endDate,
                status: item.status === undefined ? false : Boolean(Number(item.status)),
                notes: item.note
            });
        }

        return {
            errCode: 0,
            errMessage: 'Tour created successfully with schedules!',
            tour: newTour
        };

    } catch (err) {
        console.error("Error in handlNewtour:", err);
        return {
            errCode: -1,
            errMessage: 'Failed to create tour',
            error: err
        };
    }
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
