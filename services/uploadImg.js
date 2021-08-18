const multer = require("multer");
const {v4:uuidv4} = require("uuid");
// const uid = uuidv4();
const path = require("path");
const destinationFolder = `./public/tmp/`;
const fs = require("fs");

const imgFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    } else {
        cb("El archivo que está intentando subir no es una imagen", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const deleteTemp = (img) => fs.unlink(img, (e) => e);

const createImg = (img, imgFinal) => {
    try {
        const folder = `./public/images`;
        fs.createReadStream(img).pipe(fs.WriteStream(`${folder}/${imgFinal}`))
        deleteTemp(img)
    } catch (error) {
        console.log(error)
    };
};


const upload = multer({storage:storage, fileFilter:imgFilter});

const getImg = (img) => {
    const folder = `./public/images`;
    try {
        const data = fs.readFileSync(`${folder}/${img}`)
        const file = {estado: "Success", avatar: `${folder}/${img}`}
        return file
    } catch (error) {
        return error
    }  

}

module.exports = {upload, createImg, deleteTemp, getImg};