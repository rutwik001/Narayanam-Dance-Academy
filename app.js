const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require('hbs'); 
const bodyparser = require("body-parser");

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RegisterDance', {useNewUrlParser: true});

//schema
const registerSchema = new mongoose.Schema({
    username : String,
    age : String,
    phone : String,
    address : String,
    more : String
 });

//modal
  const Register = mongoose.model('Register', registerSchema);

//EXPRESS SPECIFIC STUFF
app.use('/public', express.static('public')); 
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

app.set('view engine', 'hbs'); // set TEMPLATE ENGINE as hbs
app.set('views', path.join(__dirname, 'templates/views'));  //set views directory

const partials_path = path.join(__dirname, 'templates/partials')
hbs.registerPartials(partials_path);

//routing
app.get("/", (req,res)=>{
    const content = "This is Wani's best Music Class";
    const params = {'title':'Music Class' , 'content':content}
    res.status(200).render('index.hbs' , params);
      }); 
app.get("/join", (req,res)=>{
          res.render('join');
        });
app.get("/admited", (req,res)=>{
            res.render('admited');
          });
        
app.post("/join", (req,res)=>{
     var myData = new Register(req.body);
     var name = req.body.username;
     myData.save().then(()=>{
        res.render('admited',{
            name
        });
    }).catch(()=>{
        res.status(400).send("Student has not been be registered to Database")
    });
        });

app.get("/about", (req,res)=>{
                res.render('about');
            });     
app.get("*", (req,res)=>{
        res.render('404error');
    });    
app.listen(port, ()=>{
        console.log(`The application started successfully on port ${port}`);
    });     