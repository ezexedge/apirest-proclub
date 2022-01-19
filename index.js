const express = require('express')

const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors');
const admin = require('firebase-admin')
var multer = require('multer');
var upload = multer();
const  fs  = require('fs-extra')
const swaggerUI  = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const   options  = require('./options')
const cloudinary  = require('cloudinary')

require('dotenv').config({path: 'variables.env'});

const db = require('./config/db')

const app = express()

const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

fs.readdirSync('./models').map((r)=> require(`./models/${r}`))

db.sync({alter:true})
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));




const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Admin SDK Firebase
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser());


app.use('/api', routes() );

app.use(express.static('uploads'))




app.get('/api', (req, res) => {
  fs.readFile('docs/apidocs.json', (err, data) => {
      if (err) {
          res.status(400).json({
              error: err
          });
      }
      const docs = JSON.parse(data);
      res.json(docs);
  });
})


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})




app.post('/api/uploadimages',(req,res)=>{
  cloudinary.uploader.upload(req.body.image, result =>{
      res.send({
          url: result.url,
          public_id: result.public_id
      })
  },{
      public_id: `${Date.now()}`,
      resource_type: 'auto'
  })
})





app.use((req, res, next) => {
  res.locals.usuario = {...req.user} || null;
  next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized'});
    }
  });

  app.use(function(req,res,next){
    console.log('sssss',req.auth)
    next()
  })


  io.on("connect", (socket) => {
     console.log("SOCKET>IO", socket.id);
    socket.on("new-post", (newPost) => {
       console.log("socketio new post => ", newPost);
   //   socket.broadcast.emit("new-post", newPost);
    });
  });
  

const host = process.env.HOST || '0.0.0.0'
var port = process.env.PORT || 5000;


app.listen(port,function() {
    console.log(`app running en el puerto ${port}`); 
});