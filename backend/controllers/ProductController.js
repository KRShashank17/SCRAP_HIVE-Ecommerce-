const Product=require("../models/productModel")
const ErrorHander=require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchSyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//creating product --admin

exports.createProduct= catchAsyncErrors(async (req,res,next)=>{
   
    const product=await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });


});

//get all products

exports.getAllProducts= catchAsyncErrors(async (req,res)=>{

    const resultPerPage=5;
    const productCount=await Product.countDocuments();


    const apiFeature=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);

   
    const products=await apiFeature.query;

    res.status(200).json({
        success:true,
        products
    });


});


//get product details by id
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{ 
    const product=await Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product,
        productCount,
    });

});

//update the products

exports.updateProduct=catchAsyncErrors(async (req,res,next)=>{

    let product=await Product.findById(req.params.id);

    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//delete the product

exports.deleteProduct= catchAsyncErrors(async (req,res,next)=>{
   
 

    const product=await Product.findById(req.params.id);

    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        success:true,
        message:"Product succesfully deleted"
    })

//   }catch(error)
//   {
//     console.log(error);
//     console.log("found error");
//   }
    

})