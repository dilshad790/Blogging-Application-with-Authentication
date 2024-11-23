const multer=require("multer");
const path=require("path");

// configure storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const uploadDir=path.resolve("./public/upload");
        cb(null,uploadDir); // no error and destination

    },
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}+${file.originalname}`
        cb(null,uniqueName);
    }
})

// configure multer
const upload=multer({
    storage:storage,
    limit:{fileSize:5*1024*1025} // file must be of 5MB
})

module.exports=upload;