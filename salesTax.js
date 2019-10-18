var express = require('express');
var app = express();
const knex=require("./knex.js")

app.post("/products",function(req,res){
    var data = {"product":req.body.product,"country":req.body.country,"stages":req.body.stages,"price":req.body.price}
    if(["book","food","medician"].includes(data["stages"])&& ["india"].includes(data["country"])){
        data["Tax"]=0.0
        a = data["price"]
        data["Total"] = a
    }
    else if(["book","food","medician"].includes(data["stages"])&&["imported"].includes(data["country"])){
        var a = data["Tax"]
        var b = 5.00
        var c = data["price"]
        var d = b*c
        var e = d/100
        var f = e+c
        data["Tax"] = e
        data["Total"] = f

    }
    else if (["genral"].includes(data["stages"])&& ["india"].includes(data["country"])){
        var a = data["Tax"]
        var b = 10.00
        var c = data["price"]
        var d = b*c
        var e = d/100
        var f = e+c
        data["Tax"] = e
        data["Total"] = f
    }
    else{
        var a = data["Tax"]
        var b = 15.00
        var c = data["price"]
        var d = b*c
        var e = d/100
        var f = e+c
        data["Tax"] = e
        data["Total"] = f
    }
    knex.select("*").from("products").insert(data)
        .then((data)=>{
            res.send(data)
            
        })
    .catch((err)=>{
        console.log(err)
    })
});

app.get("/get_product",function(req,res){
    knex.select("product","price","Tax","Total").from('products')
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
        grand_obj={}
        for (var index=0; (index<sales_tax.length);index++){
            bill = {}
            bill.product=product_list[index]
            bill.price=price_list[index]
            bill.tax=sales_tax[index]
            bill.grandTotal=total_list[index]
            sum = sum+total_list[index]
            price=price+price_list[index]
            tax=tax+sales_tax[index]
            list.push(bill)
            
        }   
        grand_obj.grandTotal=price
        grand_obj.sales_tax=tax
        grand_obj.totalBill=sum
        list.push(grand_obj)
        res.send(list)
        
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(3500, function () {
    console.log('Express server is listening on port 35000');
});