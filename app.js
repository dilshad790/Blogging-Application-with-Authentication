require('dotenv').config()
const express = require("express");
const app = express();

const PORT =process.env.PORT || 8000;

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
connectMongoDB(process.env.MONGO_URL).then(() => console.log("Database connected")
)
    .catch(() => console.log("Failed to connect")
    )

    // mongodb://127.0.0.1:27017/blogApp

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
    console.log(req.user)
    const allBlogs=await Blog.find({})
     res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

// app.get("/test",(req,res)=>{
//     return res.render("home")
// })

// console.log("My name is",process.env.myname);
console.log("My name is",process.env.myname);


app.listen(PORT, (req, res) => console.log("server started at", PORT)
)
