const listModel = require("../models/listModel")

exports.UpdateCart = async (req,res)=>{
    try {
        let data = req.body
        let {name,category,price,currencyformat,image, totalprice, totalquantity}=data
        if(!name)return res.status(400).send({status:false,message:"Pls provide name"})
        if(!category)return res.status(400).send({status:false,message:"Pls provide category"})
        if(!["Fruits","Vegetables"].includes(category))return res.status(400).send({status:false,message:"Pls provide category only from [Fruits,Vegetables]"})
        if(!price)return res.status(400).send({status:false,message:"Pls provide price"})
        if(!currencyformat)return res.status(400).send({status:false,message:"Pls provide currencyformat"})
        if(!['₹','$'].includes(currencyformat))return res.status({status:false,message:"Pls provide currency Format only from - [ ₹ , $ ]"})
        if(!image)return res.status(400).send({status:false,message:"Pls provide image"})

        const UpdateCart = await listModel.findOneAndUpdate({name,category},{$set:{name,category,price,currencyformat,image, totalprice, totalquantity}},{new:true,upsert:true})
        return res.status(200).send({status:true,message:"Update Successful",data:UpdateCart})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.GetCart = async (req,res)=>{
    try {
        const GetCart = await listModel.find()
        return res.status(200).send({status:true,message:"All Data",data:GetCart})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.DeleteCart = async (req,res)=>{
    try {
        let id = req.body.id
        const DeleteCart = await listModel.deleteOne({_id:id})
        return res.status(200).send({status:true,message:"Deleted Successfully",data:DeleteCart})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}