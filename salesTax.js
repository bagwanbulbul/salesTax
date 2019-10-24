var express = require('express');
var app = express();
const knex=require("./knex.js")
var bodyParser = require('body-parser')
app.use(bodyParser.json());

function getTax(price,tax){
    return price*tax/100
}
app.post("/products",function(req,res){
    var catagries=["book","medician","food"]
    var productDetails = {"product":req.body.product,"imported":req.body.imported,"catagries":req.body.catagries,"price":req.body.price}
    var tax=0.0
    if(productDetails.imported){
        tax = tax+getTax(productDetails["price"],5.0)
    }
    if(!productDetails.catagries){
        tax = tax+getTax(productDetails["price"],10.0)
    }
    productDetails["Tax"]=tax
    productDetails["Total"]=tax+productDetails["price"]
    productDetails["imported"]=productDetails.imported.toString()
    knex("products").insert(productDetails)
        .then((data)=>{
            res.send(data)
            
        })
    .catch((err)=>{
        console.log(err)
    })
});

app.get("/getproduct",function(req,res){
    knex.select("product","price","Tax","Total").from("products")
    .then((data)=>{
        sales_tax = [],price_list=[],total_list=[],product_list=[]
        for (var k of data){
            total_list.push(k["Total"])
            sales_tax.push(k["Tax"])
            price_list.push(k["price"])
            product_list.push(k["product"])
        }
        var sum = 0
        list=[]
        tax = 0
        price=0
        totalAmount={}
        for (var index=0; (index<sales_tax.length);index++){
            amount = {}
            amount.product=product_list[index]
            amount.price=price_list[index]
            amount.tax=sales_tax[index]
            amount.totalPrice=total_list[index]
            sum = sum+total_list[index]
            price=price+price_list[index]
            tax=tax+sales_tax[index]
            list.push(amount)
            
        }   
        totalAmount.grandTotal=price
        totalAmount.sales_tax=tax
        totalAmount.totalprise=sum
        list.push(totalAmount)
        res.send(list)
        
    }).catch((err)=>{
        console.log("oops!! something went wrong")
    })
})

app.listen(4500, function () {
    console.log('Express server is listening on port 45000');
});