const express=require("express")
const routes=express.Router();
const upload=require("../middleware/uploadeMiddleware")
const Blog=require("../models/blog")
routes.get("/add-new",(req,res)=>{
    res.render("blog")
})

// routes.post("/",(req,res)=>{
//     console.log("form submitted");
//     console.log(req.body);
    
    
//     res.redirect("/test")
// })

// handling profileImage

routes.post("/",upload.single("coverImage"),async (req,res)=>{
    console.log(req.body);
    console.log(req.file)
    const {title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        coverImageUrl:`/upload/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
})


module.exports=routes;