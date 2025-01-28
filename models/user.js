import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1737994090~exp=1737997690~hmac=370f45ee2e7eeffff7d4ed9204ec45a14f05d3458c02d520772abf5ad3122ae2&w=740"
    }
})

const User = mongoose.model("users",userSchema)

export default User;