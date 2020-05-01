var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect("mongodb://localhost:27017/demos",{useUnifiedTopology: true}, function(err, database) {
  if(err) throw err;
  db = database.db('demos');

});

class UserModel{
    constructor(){
    } 

    InsertUser(a,hash){ 
        db.collection("user").insertOne({name:a.name,surName:a.surName,birthday:a.birthday,
        gender:a.gender,phone:a.phone,email:a.email,password:hash})       
     }

     async CheckUser(a){      
        const user = await (db.collection("user")).find({email:a}).toArray()        
        return user;        
    }
    UpdateUser(userEmail,imgName){      
      const user=(db.collection("user"));      
      user.updateOne(
        {email:userEmail},
        {
          $set: { "image":'/images/'+imgName },        
          
        }
      )
    }
}

module.exports=new UserModel();

