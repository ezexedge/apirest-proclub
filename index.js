const express = require('express')

const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors');
const admin = require('firebase-admin')
var multer = require('multer');
var upload = multer();
const  {fs , readdirSync } = require('fs')


require('dotenv').config({path: 'variables.env'});

const db = require('./config/db')


readdirSync('./models').map((r)=> require(`./models/${r}`))

db.sync({alter:true})
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));


const app = express()



// Admin SDK Firebase
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



app.use(cors());
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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


app.use((req, res, next) => {
  res.locals.usuario = {...req.user} || null;
  next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized'});
    }
  });



const host = process.env.HOST || '0.0.0.0'
var port = process.env.PORT || 3000;


app.listen(port,function() {
    console.log(`app running en el puerto ${port}`); 
});