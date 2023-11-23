const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const sendOtp = require("./SendOTP")
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express() ;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/project", {useNewUrlParser: true}).then((res) => console.log("Database Connected Successfully")).catch((err) => {console.error(err);})   

const productSchema = new mongoose.Schema({
    product: String,
    quantity: String,
    price: String,
    discount:String,
    productThumbnail:String,
    createdAt:String,
    image: String,
    email: String
  });
  app.use(bodyParser.json());
  // Create a model based on the schema
  const Product = mongoose.model('Product', productSchema);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Specify allowed origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  const postSchema = new mongoose.Schema({
    name : String, 
    email: String, 
    phone : String, 
    dob: String, 
    password : String,
    image: String
  });
  const crypto = require('crypto');

  const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };
  
  const secretKey = generateSecretKey();
  console.log('Generated Secret Key:', secretKey);

  function authorizationFunction (req, res, next) {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

  const Users = mongoose.model('users', postSchema);

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  app.post('/posts',  async (req, res) => {  
    const creactedData = await Users.create(req.body)
    res.status(201).json(creactedData);
  });

  app.post('/signin',  async (req, res) => {
 const data = req.body
    const Post = new mongoose.Schema({
        email: String,
        password: String,
      });
      Users.find(data).then(posts => {
        if(posts.length === 1){
          
            res.status(200).json(data)
        } else {
            res.send(400).json({message:"Invalied credentials"})
        }
      }).catch(err => {
        console.error('Error fetching posts:', err);
      });
      
  });


  
app.get('/products/:email',  async (req, res) => {
    try {
      const email = req.params.email ;
      const products = await Product.find({email : email} );
      
      res.json(products); // Send the products as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  app.put('/changePassword',  async (req, res) => {
    try {
      const {email, oldPassword, newPassword, retype} = req.body 
      // const password = oldPassword ;
      if(newPassword == retype){
        Users.find({email : email}).then(data => {
          if(data[0].password == req.body.oldPassword){
            Users.findOneAndUpdate({email : email},{ $set: { password : newPassword } }).then(data => {
            res.status(200).json({ message: 'Password changed Successfully' });
             
            }).catch(err => {
              console.error('Error fetching posts:', err);
            });
          }else{
            res.status(401).json({ message: 'your old password and password doesnt match' });
  
          }
        })
        
       
      }else{
        res.status(401).json({ message: 'your new password and retype password doesnt match' });

      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  app.post('/addProduct',  async (req, res) => {  
    const products = await Product.find({product : req.body.product});
    if(products.length > 0) {
      res.status(401).json({ message: "Product Already Exist" });
    }else{
const {base64} = req.body.image
      await Product.create(req.body).then(()=>{
        
        res.status(200).json({ message: "Product Added" });
      })

    }
  });




  app.post('/otp', async (req, res) => {  
    const {email} = req.body 
    Users.find({email : email}).then(data => {
      if(data.length > 0 ){
        res.send(400).json({message:"User already Exists"})
      } else {
        const otp = sendOtp.sendOtp(email)
        res.status(201).json({otp: otp});
      }
    }).catch(err => {
      console.error('Error fetching posts:', err);
    });
    
   
  });




  app.put('/updateProduct/:id', async (req, res)=> {
    const id = req.params.id ;
    const {product, quantity, price, discount, productThumbnail} = req.body
    const data = {
product : product,
quantity : quantity,
price : price,
discount : discount,
productThumbnail : productThumbnail
    }
    Product.findOneAndUpdate(
      { _id: id },
       { $set: {  
          product : product,
          quantity : quantity,
         price : price,
         discount : discount,
       productThumbnail : productThumbnail
    } },
     { new: true }
       ).then(data => {
      res.status(200).json({ message: 'product changed Successfully' });
       
      }).catch(err => {
        console.error('Error fetching posts:', err);
      });

  })

  
  
  app.get('/searchproducts/:productname/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const productName = req.params.productname
      const products = await Product.find({product : productName, email: email});
      
      res.json(products); // Send the products as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




app.listen(5000, function() {
    console.log("Server started on port 5000");
  });