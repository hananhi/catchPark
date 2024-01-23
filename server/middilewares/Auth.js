import  Jwt  from "jsonwebtoken"
import User from "../models/userModel.js"
import "dotenv/config.js";


export const isAuth=async(req,res,next)=>{

    try {
        let token
        const authHeader=req.headers.Authorization || req.headers.authorization ;

        if(authHeader){
            token=authHeader.split('')[1];
            console.log(token);

            Jwt.verify(token,process.env.SECRET ,async (error,decoded)=>{
                if(error){
                    console.error('error decoding')
                    return res.status(401).send('invalid token')
                }

                const {id}=decoded

                const user = await User.findById(id);

                if(!user){
                    return res.status(401).send('user not found')  
                }
                req.user=user ;
                next()
            })
        }else{
            next();
        }
        
    } catch (error) {
        next(error)
    }

}
export const details=async(req,res,next)=>{
try {
    
    const{UserName,Email}=req.user;
    
    next();
} catch (error) {

    next(error);
    
}
}