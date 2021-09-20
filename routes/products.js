
var express = require('express');
var router = express.Router();
const Product = require('../models/productModel');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgfileDB/');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.email+'-'+ Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });

function createDataUrl(filepath) {
  // read binary data
  try{
    var bitmap = fs.readFileSync(filepath);
  }
  catch{
    return null;
  }
  // create img data url
  var ext = filepath.split('.').pop();
  return 'data:image/'+ext+';base64,'+bitmap.toString('base64');
}

router.get('/', isLoggedin, async function (req, res, next) {
  const products = await Product.find({userid:req.user.id})
  
  var clientProducts = [];
  var count=0;
  products.forEach((product)=>{
      var imgClass={
      dataUrl: createDataUrl(product.imgurl),
      filepath: product.imgurl,
      id: 'pic'+count
      }
      count++;
      clientProducts.push(imgClass);
   })
  res.render('productcontainer', { products: clientProducts });
});

router.post('/addproduct', upload.array('image'),isLoggedin, async function (req, res, next) {
  console.log(req.file);
  for (let i = 0; i < req.files.length; i++) {
    var product = new Product({ imgurl: req.files[i].path, userid:req.user.id});
    await product.save();
  }
  res.redirect('/products');
});

router.post('/deleteproduct', isLoggedin, async function (req, res, next) {
  await Product.deleteOne({ imgurl: req.body.imgurl});
  fs.unlink(req.body.imgurl,(err)=>{
    if(err){
      console.log(err);
    }
  });
  res.redirect('/products');
});


function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.redirect('/login');
}
function isLoggedout(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  }
  next()
}

module.exports = router;
