import db from '../models/index';
import tourServices from '../services/tourServices';

let handlNewtour = async (req, res) => {
  try {

    console.log('CONTENT-TYPE:', req.headers['content-type']);
    console.log('req.file =', req.file);
    console.log('req.files =', req.files);
    console.log('req.body =', req.body);


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

let handleBooktour = async (req, res) => {
  let data = req.body;
  console.log("BODY GỬI LÊN TỪ CLIENT:", req.body);
  let message = await tourServices.bookDataTour(data);
  return res.status(200).json(message)
}

let handleEditour = async (req, res) => {
  let data = req.body;
  console.log("BODY GỬI LÊN TỪ CLIENT:", req.body);
  let message = await tourServices.updateTour(data);
  return res.status(200).json(message)
}

let handleUpdateToure = async (req, res) => {
    let data = req.body;
    console.log("BODY GỬI LÊN TỪ CLIENT:", req.body);
    let message = await tourServices.updateTourData(data);
    return res.status(200).json(message)
}


let handleDelete = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!"
    });
  }
  let message = await tourServices.deletetour(req.query.id)
  console.log(message);
  return res.status(200).json(message);
}


let handleUpdateImageToure = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { id } = req.body;
    const file = req.file;

    const result = await tourServices.updateTourImage(id, file);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Controller Error:", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server"
    });
  }
};


export default {
  handlNewtour,
  handleGetAlltoure,
  handleBooktour,
  handleEditour,
  handleUpdateToure,
  handleUpdateImageToure,
  handleDelete
};
