import db from '../models/index';
import bookingServices from '../services/bookingServices.js';

let handlNewBookingtour = async (req, res) => {
  try {
    console.log('CONTENT-TYPE:', req.headers['content-type']);
    console.log('req.file =', req.file);
    console.log('req.files =', req.files);
    console.log('req.body =', req.body);

    // gộp dữ liệu từ body (không có file nhưng giữ cấu trúc giống)
    let data = {
      ...req.body,
    };

    // gọi service để tạo booking
    let message = await bookingServices.handleNewBooking(data);

    console.log('Booking created:', message);

    return res.status(200).json(message);
  } catch (err) {
    console.error('Lỗi tạo booking:', err);
    return res.status(500).json({
      errCode: -1,
      message: 'Error from server',
    });
  }
};


export default {
  handlNewBookingtour
};
