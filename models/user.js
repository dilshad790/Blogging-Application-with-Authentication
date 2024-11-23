const mongoose = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const {createTokenForUser}=require("../services/authentication")
const Userschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        // required:true,
    },
    userProfileUrl: {
        type: String,
        default: "/images/u1.jpeg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",

    }

}, { timestamps: true })

Userschema.pre("save", function (next) {
    const user = this;
    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    // const salt ="Hello";
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest('hex')

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

Userschema.static("matchPassword", async function (email, password) {
    const user =await this.findOne({ email })
    if (!user)
        throw new Error("User Not Found");
// console.log(user)

    const hashedPassword = user.password;
    const salt = user.salt;
    const userProvideHash = createHmac("sha256", salt)
    .update(password)
    .digest('hex')


    if (userProvideHash !== hashedPassword)
        throw new Error("Incorrect Password")

    // return ({ ...user, password: undefined, salt: undefined })
    const token=createTokenForUser(user)
    // console.log("token",token);
    return token;    
})

const User = mongoose.model('user', Userschema);

module.exports = User;

