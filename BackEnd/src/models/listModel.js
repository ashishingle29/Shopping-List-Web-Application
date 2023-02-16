const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    category:{type:String,required:true,enum:["Fruits","Vegetables"]},
    price:{type:Number,required:true},
    currencyformat:{type:String,required:true,enum:["₹","$"]},
    image:{type:String,required:true},
    totalprice:{type:Number},
    totalquantity:{type:Number,default:1}
})

module.exports = mongoose.model("list",listSchema)