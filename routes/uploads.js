const { Router, request } = require('express');
const multer = require('multer');

const router = Router();

const filesStorageEngine = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: filesStorageEngine }).single('image');

router.post('/', upload, (req = request, res) => {
  console.log(req.file); // JSON Object

  if(req.file){
      const { originalname } = req.file;
      res.status(200).json({
          msg: `Se ha guardado el archivo ${originalname}`
      })
  }
});

module.exports = router;