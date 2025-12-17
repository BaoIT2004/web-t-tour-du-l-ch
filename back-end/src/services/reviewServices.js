const db = require('../models/index.js');

let handlNewReview = (data) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      // Tạo review trong bảng Reviews
      const created = await db.Review.create({
        userId: data.userId,
        tourId: data.tourId,
        comment: data.comment,
        reviewDate: data.reviewDate || new Date()
      }, { transaction: t });  //nghĩa là việc tạo bản ghi này được thực hiện trong transaction t, giúp đảm bảo tính toàn vẹn dữ liệu.

      await t.commit(); // xác nhận transaction để các thay đổi thực sự được lưu vào database

      resolve({
        errCode: 0,
        errMessage: 'Tạo đánh giá thành công!',
        review: created
      });
    } catch (err) {
      if (t) await t.rollback();
      console.error('Lỗi trong handlNewReview:', err);
      reject({
        errCode: -1,
        errMessage: 'Tạo đánh giá thất bại',
        error: err
      });
    }
  });
};

module.exports = {
  handlNewReview
};
