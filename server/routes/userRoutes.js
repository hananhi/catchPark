import express from "express";
import { checkTokenValidity} from "../controllers/userController.js";
import { isAuth } from "../middilewares/Auth.js";


const router = express.Router();


router.get('/header' , (req,res)=>{
    //if the request have a token inside authorization
    const authHeader=req.get('authorization')
    console.log(authHeader);
    if(!authHeader){
        res.status(403).end('no auth header')
        return
    }

    const token =authHeader.split(' ')[1]

    try {
       
        const decodedToken =  checkTokenValidity(token);
        console.log( decodedToken);
    
       
        res.status(200).end('OK');
      } catch (error) {
         
        res.status(403).end('Invalid token');
      }
   // res.end('there are the student using header')
})
/*
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", isAuth, userProfile)

*/
export default router;

