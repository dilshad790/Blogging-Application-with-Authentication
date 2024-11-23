const express = require("express");
const app = express();
const PORT = 8001;
const path = require("path");
const userRouter = require("./routes/userRouter");
const staticRouter = require("./routes/staticRouter")
const connectMongoDB = require("./connection")
const USER=require("./models/user")
const cookieParser=require("cookie-parser")
const checkForAuthentication=require("./middleware/authentication");
const blogRoutes=require("./routes/blog")
const Blog=require("./models/blog")
// connect mongodb
connectMongoDB("mongodb://127.0.0.1:27017/blogApp").then(() => console.log("Database connected")
)
    .catch(() => console.log("Failed to connect")
    )

// middleware
app.use(express.urlencoded({ extended: false })); // handle form data
app.use(cookieParser());
app.use(checkForAuthentication("token"));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// routes
app.use("/", staticRouter);

app.use("/user",userRouter);

app.use("/blog",blogRoutes);
app.use(express.static(path.resolve("./public")))


app.get("/test", async (req, res) => {
    // console.log(req.user)
    const allBlogs=await Blog.find({})
     res.render("home",{
        user:req.user,
        blogs:allBlogs

    })
})

// app.get("/test",(req,res)=>{
//     return res.render("home")
// })



app.listen(PORT, (req, res) => console.log("server started at", PORT)
)
