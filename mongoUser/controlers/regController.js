
const UserModel=require('../models/userModel');
const session=require('express-session');
const bcrypt=require('bcrypt')

const saltRounds = 10;
let userExists="";
let user;
let email;
let signup=false;

class RegController{
    constructor(){
    }

 

async SignupImport(req,res){       
           console.log("req.body.user",req.body.user)
          userExists="";      
          if(req.body.user!=""){
                                 user=await UserModel.CheckUser(req.body.user.email);                  
                               if(user.length>0){                   
                                                 userExists="nman emailov mard ka grancvac";         
                                                 res.redirect('signup')                   
                               }        
                               else
                                     {   
                                        bcrypt.hash(req.body.user.password, saltRounds, function(err, hash) {                
                                        UserModel.InsertUser(req.body.user,hash)
                                        });                                          
                                        res.writeHead(200, {"Content-Type": "application/json"});
                                        var json = JSON.stringify({        
                                         error:userExists,                 
                                        });
                                       res.end(json);  
                                }   
          }         
 }
      

async loginImport(req,res){
           let useremail=req.query.user;
           let userdata=JSON.parse(useremail)        
           let loginuserExists="";
           user=await UserModel.CheckUser(userdata.email);                
           if(!user.length){
                              loginuserExists="nman mailov grancum chka";
                              res.writeHead(200, {"Content-Type": "application/json"});
                              var json = JSON.stringify({        
                              error:loginuserExists,                                               
                              });
                              res.end(json);                                   
                           }
            else{
                    bcrypt.compare(userdata.password, user[0].password, function(err, result) {            
                       if(result){                                
                                  res.status(201).send(user);                                        
                                 }
                            else {                      
                                   loginuserExists =false;                    
                                    res.status(201).send(loginuserExists);                                    
                                 }        
                     });
            }                   
  }
  UploadImage(req,res,next){ 
   const file = req.file 
   email=req.body.txt;  
   if (!file) {
     const error = new Error('Please upload a file')
     error.httpStatusCode = 400
     return next(error)
   }  
   UserModel.UpdateUser(email,file.filename)
   res.redirect("http://localhost:3000/profile")   
  }

  async GetUserInfo(req,res){       
      const userData=await UserModel.CheckUser(email)      
      res.writeHead(200, {"Content-Type": "application/json"});
                 var json = JSON.stringify({        
                 user:userData,                                             
                 });
                 res.end(json);
  }
      
}

module.exports=new RegController();

        