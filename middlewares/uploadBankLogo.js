const multer = require("multer");

const storage = multer.diskStorage({
  //Ruta desde el main.jsx del frontend a la carpeta public donde se almacenarán las imagenes editadas.
  destination: "../Practica_DEINT_UD2/public/banks-logos/",
  filename: (req, file, cb) => {
    const id = req.params.id; 
    const extension = file.originalname.split(".").pop();
    cb(null, `${id}.${extension}`);
  }
});


const upload = multer({ storage });

module.exports = upload;
