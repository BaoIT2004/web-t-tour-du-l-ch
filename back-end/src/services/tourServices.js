const db = require('../models/index.js');

function parseSchedules(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    try {
        return JSON.parse(payload);
    } catch (e) {
        return [];
    }
}

function buildSchedulePayload(tourId, item) {
    return {
        tourId,
        itinerary: item.schedule ?? null,
        startDate: item.startDate ?? null,
        endDate: item.endDate ?? null,
        status: item.status === undefined ? false : Boolean(Number(item.status)),
        notes: item.note ?? null
    };
}

let handlNewtour = (data, file) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const schedules = parseSchedules(data.itinerary);

            const created = await db.Tours.create({
                tourName: data.tourName,
                tourPrice: data.tourPrice,
                description: data.description,
                image: file ? `/image/${file.filename}` : (data.image || null),
                policy: data.policy,
                included: data.included,
                excluded: data.excluded,
                activeid: Boolean(Number(data.activeid))
            }, { transaction: t });

            if (schedules.length) {
                const createPromises = schedules.map(it => db.schedule.create(buildSchedulePayload(created.id, it), { transaction: t }));
                await Promise.all(createPromises);
            }

            await t.commit();

            // Lấy lại tour và schedules để trả về
            const tour = await db.Tours.findOne({ where: { id: created.id } });
            const schedulesArr = await db.schedule.findAll({ where: { tourId: created.id } });


            const result = (tour && typeof tour.toJSON === 'function') ? tour.toJSON() : tour;
            result.schedules = schedulesArr;

            resolve({
                errCode: 0,
                errMessage: 'Tạo tour thành công kèm lịch trình!',
                tour: result
            });
        } catch (err) {
            if (t) await t.rollback();
            console.error('Lỗi trong handlNewtour:', err);
            reject({
                errCode: -1,
                errMessage: 'Tạo tour thất bại',
                error: err
            });
        }
    });
};

let getAllTours = (tourId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!tourId) {
                return resolve([]);
            }

            if (tourId === 'ALL') {
                const tours = await db.Tours.findAll();
                return resolve(tours);
            }

            const tour = await db.Tours.findOne({ where: { id: tourId } });
            if (!tour) return resolve(null);

            const schedules = await db.schedule.findAll({ where: { tourId } });
            const result = (typeof tour.toJSON === 'function') ? tour.toJSON() : tour;
            result.schedules = schedules;

            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};


let updateTourData = async (data, file) => {
    const t = await db.sequelize.transaction();
    try {
        const schedules = parseSchedules(data.itinerary);
        // Kiểm tra tồn tại tour 
        const tour = await db.Tours.findOne({ where: { id: data.id }, transaction: t });
        if (!tour) {
            await t.rollback();
            return { errCode: 2, errMessage: 'Tour không tồn tại' };
        }

        // Cập nhật (
        await db.Tours.update({
            tourName: data.tourName,
            tourPrice: data.tourPrice,
            description: data.description,
            image: file ? `/image/${file.filename}` : tour.image,
            policy: data.policy,
            included: data.included,
            excluded: data.excluded,
            activeid: Boolean(Number(data.activeid))
        }, {
            where: { id: data.id },
            transaction: t
        });

        // Xóa lịch trình cũ rồi thêm lịch trình mới (trong cùng transaction)
        await db.schedule.destroy({ where: { tourId: data.id }, transaction: t });

        if (schedules.length) {
            const createPromises = schedules.map(it => db.schedule.create(buildSchedulePayload(data.id, it), { transaction: t }));
            await Promise.all(createPromises);
        }

        await t.commit();

        // Lấy lại tour & schedules (tách query để tránh lỗi include/separate)
        const updatedTour = await db.Tours.findOne({ where: { id: data.id } });
        const schedulesArr = await db.schedule.findAll({ where: { tourId: data.id } });

        console.log(">>> updatedTour:", updatedTour);
        console.log(">>> schedulesArr:", schedulesArr);
        console.log(">>> schedules parsed:", schedules);

        const result = (updatedTour && typeof updatedTour.toJSON === 'function') ? updatedTour.toJSON() : updatedTour;
        result.schedules = schedulesArr;

        return {
            errCode: 0,
            errMessage: 'Cập nhật tour thành công kèm lịch trình!',
            tour: result
        };
    } catch (err) {
        if (t) await t.rollback();
        console.error('Lỗi trong updateTourData:', err);
        return {
            errCode: -1,
            errMessage: 'Cập nhật tour thất bại',
            error: err
        };
    }
};

let updateTourImage = async (id, file) => {
    try {
        const tour = await db.Tours.findOne({ where: { id } });
        if (!tour) {
            return { errCode: 2, errMessage: 'Tour không tồn tại' };
        }

        await db.Tours.update(
            { image: file ? `/image/${file.filename}` : tour.image },
            { where: { id } }
        );

        const updatedTour = await db.Tours.findOne({ where: { id } });
        const result = updatedTour?.toJSON ? updatedTour.toJSON() : updatedTour;

        return {
            errCode: 0,
            errMessage: 'Cập nhật ảnh tour thành công!',
            tour: result
        };
    } catch (err) {
        console.error('Lỗi trong updateTourImage:', err);
        return { errCode: -1, errMessage: 'Cập nhật ảnh tour thất bại', error: err };
    }
};

//  * Xóa tour (và schedules liên quan)
let deletetour = (id) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const tour = await db.Tours.findOne({ where: { id }, transaction: t });
            if (!tour) {
                await t.rollback();
                return resolve({ errCode: 2, errMessage: 'Tour không tồn tại' });
            }
            // Xóa schedules trước (nếu muốn)
            await db.schedule.destroy({ where: { tourId: id }, transaction: t });
            await db.Tours.destroy({ where: { id }, transaction: t });
            await t.commit();
            return resolve({ errCode: 0, message: 'Xóa tour thành công' });
        } catch (err) {
            if (t) await t.rollback();
            console.error('Lỗi trong deletetour:', err);
            return reject({ errCode: -1, errMessage: 'Xóa tour thất bại', error: err });
        }
    });
};

module.exports = {
    handlNewtour,
    getAllTours,
    updateTourData,
    deletetour,
    updateTourImage 
};
