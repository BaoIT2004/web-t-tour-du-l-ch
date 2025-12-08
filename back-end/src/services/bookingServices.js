const db = require('../models/index.js');

let handleNewBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const createdBooking = await db.Booking.create({
                userId: data.userId,
                tourId: data.tourId,
                bookingDate: data.bookingDate ? new Date(data.bookingDate) : new Date(),
                totalAdults: data.totalAdults || 0,
                totalChildren: data.totalChildren || 0,
                notes: data.notes || null,
                acceptTerms: Boolean(data.acceptTerms),
                totalPrice: data.totalPrice || 0,
                statusid: data.statusid || 1
            }, { transaction: t });

            const booking = await db.Booking.findOne({
                where: { id: createdBooking.id },
                include: [
                    { model: db.Tours, as: 'tour' },
                    { model: db.User, as: 'user' }
                ],
                transaction: t
            });
            await t.commit();
            resolve({
                errCode: 0,
                errMessage: 'Tạo booking thành công!',
                booking
            });
        } catch (err) {
            if (t) await t.rollback();
            console.error('Lỗi trong handleNewBooking:', err);
            reject({
                errCode: -1,
                errMessage: 'Tạo booking thất bại',
                error: err
            });
        }
    });
};

module.exports = {
    handleNewBooking
};
