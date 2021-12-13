const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const configuracionMulter = {
    //100kb
    limits : { fileSize : 5 * 1024 * 1024 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../archivos/');
        },
        filename: (req, file, cb) => {
          
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
       if(file.mimetype === 'application/pdf' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
    
  }
  
  const upload = multer(configuracionMulter).single('documento');
  
  exports.subirArchivos = (req, res, next) => {
      upload(req, res, function(error) {
  
        
        if(error) {
            if(error instanceof multer.MulterError) {
                if(error.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({message : 'El archivo es muy grande: Máximo 5MB '});
                } else {
                    res.status(400).json({message : error.message});
                }
            } else {
                res.status(400).json({ message: error.message});
            }
        }
         
          return next()
      })
  }
  
  
  exports.getArchivo =  (req,res) => {
    let id = req.params.nombre
    res.sendFile(path.join(__dirname, `../archivos/${id}`));
  }
  


