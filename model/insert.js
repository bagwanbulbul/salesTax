const knex = require("../knex.js")
let insertData = (productDetails)=>{
    return knex("Allproduct").insert(productDetails)

}

let selectData = (productName)=>{
    return knex.select("*").from("Allproduct").where("name",productName)

}
module.exports={insertData,selectData}