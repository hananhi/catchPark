
//import User from "../models/userModel.js"
//import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import "dotenv/config.js";


export function checkTokenValidity(token) {
    
  console.log(token);
      
      const secretKey = process.env.SECRET;
      console.log(secretKey)
     
      try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        return decoded;
      } catch (error) {
        throw new Error('Invalid token');
      }
    
  }
/*
export const createUser = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        //* if the user correctly filled the fields or no field missing

        console.log("from req.body: ",username, email, password)
        if (!(email && password)) {
            res.status(402);
            throw new Error(" Emaill & password & role are required");
        }
        const founduser = await User.findOne({ email });

        if (founduser) {
            res.status(402);
            throw new Error(" User exist in the DB");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,

        })
        console.log('newUser',newUser);
        res.status(201).send(newUser);

    } catch (error) {
        next(error);
    }

}

export const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        console.log(email);
        if (!(email && password)) {
            res.status(404)
            throw new Error('email and password are required');

        }

        const founduser = await User.findOne({ email });
        console.log(founduser);


        if (!founduser) {
            res.status(402);
            throw new Error(" User not found");
        }


        const match = await bcrypt.compare(password, founduser.password);

        if (match) {

            const token = jwt.sign(
                {
                    id: founduser._id,
                    username: founduser.username,
                    email: founduser.email,
                },
                process.env.SECRET,
                {
                    expiresIn: "15m",
                }
            )
            res.send(token);
        } else {
            res.status(400).send("email or password incorrect");
        }

    } catch (error) {
        next(error);
    }

}
export const userProfile = async (req, res, next) => {
    res.send("My Profile Data");
};
*/
