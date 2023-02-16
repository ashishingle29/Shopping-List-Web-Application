const express = require("express")
const { UpdateCart, GetCart, DeleteCart } = require("../controllers/listController")
const { CreateProduct, GetProduct, UpdateProduct } = require("../controllers/productController")
const router = express.Router()

router.get("/test-me",(req,res)=>{
    res.send("Hi there this is the test api   ????")
})

router.post("/createproduct",CreateProduct)
router.post("/getproduct",GetProduct)
router.post("/updateproduct",UpdateProduct)

router.post("/updatelist",UpdateCart)
router.get("/getlist",GetCart)
router.post("/deletelist",DeleteCart)

module.exports = router