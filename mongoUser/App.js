const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const RegController=require('./controlers/regController');
const UserModel=require('./models/userModel');
const session=require('express-session');


app.use('/static',express.static('public'))

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/images");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+file.originalname)
    }
  });  
var upload = multer({ storage : storage });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post("/userSignupInputs",RegController.SignupImport)
app.get("/login",RegController.loginImport)
app.post("/upload_image",upload.single('avatar'),RegController.UploadImage)
app.get("/userProfile",RegController.GetUserInfo)








app.listen(8000);
