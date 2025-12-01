import db from '../models/index';
import tourServices from '../services/tourServices';

let handlNewtour = async (req, res) => {
  try {

    console.log("FILE RECEIVED:", req.file);
    console.log("BODY RECEIVED:", req.body);
    // xử lý đường dẫn ảnh từ multer
    console.log("FILE RECEIVED:", req.file);
    let imagePath = null;
    if (req.file) {
      imagePath = `/image/${req.file.filename}`;
    }

    // gộp vào body để truyền sang service
    let data = {
      ...req.body,
      image: imagePath,
    };

    let message = await tourServices.handlNewtour(req.body, req.file);

    console.log(message);

    return res.status(200).json(message);
  } catch (err) {
    console.error("loi",err);
    return res.status(500).json({
      errCode: -1,
      message: 'Error from server',
    });
  }
};

let handleGetAlltoure = async (req, res) => {
    let id = req.query.id;
    const alltours = await db.Tours.findAll();
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            tours: alltours
        })
    }

    let tours = await tourServices.getAllTours(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'find user',
        tours
    })
};


module.exports = {
  handlNewtour,
  handleGetAlltoure,
};
