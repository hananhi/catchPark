import mongoose from "mongoose";

const userSchema= new mongoose.Schema(

    {
        username: {
            type:String,
            required: [true, "userName is required"],
        },
        email:{
            type:String ,
            required: [true, "email is required"],
            unique: [true, "Email must be unique"]
         },
       
         password:{
            type:String ,
            required: [true, "password is required"]
         }


    }
)

 const User=mongoose.model('User',userSchema);

 export default User;

