const productModel = require("../models/productModel")

exports.CreateProduct=async (req,res)=>{
    try {
        let data = req.body
        let {name,category,price,currencyformat,image}=data
        if(!name)return res.status(400).send({status:false,message:"Pls provide name"})
        if(!category)return res.status(400).send({status:false,message:"Pls provide category"})
        if(!["Fruits","Vegetables"].includes(category))return res.status(400).send({status:false,message:"Pls provide category only from [Fruits,Vegetables]"})
        if(!price)return res.status(400).send({status:false,message:"Pls provide price"})
        if(!currencyformat)return res.status(400).send({status:false,message:"Pls provide currencyformat"})
        if(!['₹','$'].includes(currencyformat))return res.status({status:false,message:"Pls provide currency Format only from - [ ₹ , $ ]"})
        if(!image)return res.status(400).send({status:false,message:"Pls provide image"})
        const CreateList = await productModel.create(data)
        return res.status(201).send({status:true,message:"Created Successfully",data:CreateList})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.GetProduct = async (req,res)=>{
    try {
        let {name,category}=req.body
        if(!name)return res.status(400).send({status:false,message:"Pls provide name"})
        if(!category)return res.status(400).send({status:false,message:"Pls provide category"})

        const GetList = await productModel.findOne({name,category})
        if(!GetList)return res.status(404).send({status:false,message:"No List with this name in this category"})

        return res.status(200).send({status:true,message:"Get Data Successfully",data:GetList})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.UpdateProduct = async (req,res)=>{
    try {
        let data = req.body
        let {id,price,currencyformat,totalprice,totalquantity}=data
        let UpdateList = await productModel.findOneAndUpdate({_id:id},{$set:{price,currencyformat,totalprice,totalquantity}},{new:true})
        return res.status(200).send({status:true,message:"Updated Successfully",data:UpdateList})
    } catch (error){
        res.status(500).send({status:false,message:error.message})
    }
}