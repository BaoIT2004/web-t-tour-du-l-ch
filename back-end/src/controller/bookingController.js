import db from '../models/index';
import bookingServices from '../services/bookingServices.js';

let handlNewBookingtour = async (req, res) => {
  try {
    console.log('Available models:', Object.keys(db));
    console.log('db.Tours:', db.Tours);
    console.log('db.Schedule:', db.Schedule);
    console.log('db.Booking:', db.Booking);

    // gộp dữ liệu từ body (không có file nhưng giữ cấu trúc giống)
    let data = {
      ...req.body,
    };

    // gọi service để tạo booking
    let message = await bookingServices.handleNewBooking(data);

    console.log('Booking created:', message);

    //hiển thị chi tiết lịch trình nếu có
    if (message.booking?.tour?.schedules) {
      message.booking.tour.schedules.forEach((schedule, index) => {
        console.log(`Schedule ${index + 1}:`);
        console.log(`ID: ${schedule.id_schedule}`);
        console.log(`Itinerary: ${schedule.itinerary}`);
        console.log(`Start Date: ${schedule.startDate}`);
        console.log(`Status: ${schedule.status}`);
        console.log(`Notes: ${schedule.notes || 'N/A'}`);
        console.log('---');
      });
    }

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
