import db from '../models/index.js';

const handleNewBooking = async (data) => {
    let t = await db.sequelize.transaction();
    let createdBooking = null;
    
    try {
        // Bước 1: Tạo booking trong transaction
        createdBooking = await db.Booking.create({
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

        // Bước 2: Commit transaction
        await t.commit();
        console.log('✅ Transaction committed successfully');
        
        // Bước 3: Set transaction = null để tránh rollback
        t = null;

        // Bước 4: Fetch booking và related data riêng biệt
        try {
            const booking = await db.Booking.findOne({
                where: { id: createdBooking.id }
            });

            if (!booking) {
                console.warn('⚠️ Booking not found after creation');
                return {
                    errCode: 0,
                    errMessage: 'Tạo booking thành công!',
                    booking: {
                        id: createdBooking.id,
                        userId: createdBooking.userId,
                        tourId: createdBooking.tourId,
                        bookingDate: createdBooking.bookingDate,
                        totalAdults: createdBooking.totalAdults,
                        totalChildren: createdBooking.totalChildren,
                        totalPrice: createdBooking.totalPrice,
                        statusid: createdBooking.statusid
                    }
                };
            }

            // ✅ FETCH RIÊNG TỪNG PHẦN - CÁCH AN TOÀN NHẤT
            
            // Fetch tour (không include)
            const tour = await db.Tours.findOne({
                where: { id: booking.tourId },
                raw: false  // Lấy instance, không phải plain object
            });

            // Fetch schedules riêng với đầy đủ thông tin
            let schedules = [];
            try {
                schedules = await db.schedule.findAll({
                    where: { tourId: booking.tourId },
                    order: [['startDate', 'ASC']],  // ← Sắp xếp theo ngày
                    raw: false
                });
                
                // Log chi tiết schedules để debug
                console.log(`📅 Found ${schedules.length} schedules for tour ${booking.tourId}`);
                if (schedules.length > 0) {
                    console.log('📅 Schedule details:', JSON.stringify(
                        schedules.map(s => s.toJSON ? s.toJSON() : s), 
                        null, 
                        2
                    ));
                }
            } catch (scheduleError) {
                console.warn('⚠️ Error fetching schedules:', scheduleError.message);
            }

            // Fetch user
            const userInfo = await db.User.findOne({
                where: { id: booking.userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'phonenumber'],
                raw: false
            });

            // Gộp dữ liệu theo đúng cấu trúc
            const result = booking.toJSON ? booking.toJSON() : booking;
            
            // Gắn tour với schedules
            if (tour) {
                const tourData = tour.toJSON ? tour.toJSON() : tour;
                tourData.schedules = schedules.map(s => s.toJSON ? s.toJSON() : s);
                tourData.totalSchedules = schedules.length;  // ← Thêm tổng số lịch trình
                result.tour = tourData;
            } else {
                result.tour = null;
            }
            
            // Gắn user
            result.user = userInfo ? (userInfo.toJSON ? userInfo.toJSON() : userInfo) : null;

            console.log('✅ Booking fetched successfully with related data');
            console.log(`   - Tour: ${result.tour?.tourName}`);
            console.log(`   - Schedules: ${result.tour?.totalSchedules || 0}`);
            console.log(`   - User: ${result.user?.firstName} ${result.user?.lastName}`);

            return {
                errCode: 0,
                errMessage: 'Tạo booking thành công!',
                booking: result
            };
        } catch (includeError) {
            console.error('⚠️ Error fetching related data:', includeError);
            // Vẫn trả về booking cơ bản nếu lỗi include
            return {
                errCode: 0,
                errMessage: 'Tạo booking thành công!',
                booking: {
                    id: createdBooking.id,
                    userId: createdBooking.userId,
                    tourId: createdBooking.tourId,
                    bookingDate: createdBooking.bookingDate,
                    totalAdults: createdBooking.totalAdults,
                    totalChildren: createdBooking.totalChildren,
                    totalPrice: createdBooking.totalPrice,
                    statusid: createdBooking.statusid
                }
            };
        }
        
    } catch (err) {
        console.error('❌ Error in handleNewBooking:', err);
        
        // Chỉ rollback nếu transaction chưa commit
        if (t && !t.finished) {
            await t.rollback();
            console.log('Transaction rolled back');
        }
        
        // Nếu đã tạo booking nhưng lỗi ở phần fetch, vẫn trả về success
        if (createdBooking && createdBooking.id) {
            console.log('Booking created but error in fetching details');
            return {
                errCode: 0,
                errMessage: 'Tạo booking thành công!',
                booking: {
                    id: createdBooking.id,
                    userId: createdBooking.userId,
                    tourId: createdBooking.tourId,
                    bookingDate: createdBooking.bookingDate,
                    totalAdults: createdBooking.totalAdults,
                    totalChildren: createdBooking.totalChildren,
                    totalPrice: createdBooking.totalPrice,
                    statusid: createdBooking.statusid
                }
            };
        }
        
        // Lỗi thật sự trong quá trình tạo booking
        return {
            errCode: -1,
            errMessage: 'Tạo booking thất bại',
            error: err.message
        };
    }
};

export default {
    handleNewBooking
};