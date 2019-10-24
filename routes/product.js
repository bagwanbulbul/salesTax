const express = require('express');
var product = express.Router();
product.use(express.json())
const add = require("../model/insert");

product.post("/add",function (req,res){
    let productDetails = {
        "product":req.body.product,
        "imported":req.body.imported,
        "catagries":req.body.catagries,
        "price":req.body.price
    }
    data = productDetails.imported.toString();
    productDetails.imported = data
    let response = add.insertData(productDetails).then((data)=>{
        return res.send({success:true,message:"ok"})
    }).catch((err)=>{
        console.log(err);
    })
});
module.exports=product;