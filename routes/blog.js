const express=require("express")
const routes=express.Router();
const upload=require("../middleware/uploadeMiddleware")
const Blog=require("../models/blog")
const Comment=require("../models/comments")

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
    console.log(req.file);
    const {title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        coverImageUrl:`/upload/${req.file.filename}`,
        createdBy:req.user._id,
    })
    return res.redirect(`/blog/${blog._id}`);
})

routes.get("/:id",async (req,res)=>{
    // blog id find kro aur us blog id ka user ko show kro
    const blog=await Blog.findById(req.params.id).populate("createdBy") 
    // console.log("blog",blog);
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
    // console.log("comment",comments);
    
    return res.render("blogInfo",{
        user:req.user,
        blog,
        comments,

    })
})

routes.post("/comments/:id",async (req,res)=>{
    // console.log(req.params.id);
    // console.log("req.params.id",req.params.id);
    
    
await Comment.create({
    content:req.body.content,
    blogId:req.params.id,
    createdBy:req.user._id
})
// console.log("comment",comments);

return res.redirect(`/blog/${req.params.id}`)
})

module.exports=routes;


