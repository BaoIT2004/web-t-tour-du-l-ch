import db from '../models/index';
import tourServices from '../services/reviewServices.js';


let handlReviewtour = async (req, res) => {
    try {
        console.log('req.body =', req.body);
        const { tourId, userId, comment } = req.body;

        if (!tourId || !userId || !comment) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu các trường bắt buộc: tourId, userId, comment',
            });
        }

        const review = await tourServices.handlNewReview({
            tourId,
            userId,
            comment,
            reviewDate: new Date(), // ngày đánh giá tự tạo
        });
        return res.status(200).json({
            errCode: 0,
            message: 'Đánh giá đã được tạo thành công',
            data: review,
        });
    } catch (err) {
        console.error("loi", err);
        return res.status(500).json({
            errCode: -1,
            message: 'Error từ server',
        });
    }
};

export default {
    handlReviewtour
};
