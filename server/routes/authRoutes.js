import express from 'express';
import { generateToken } from '../controllers/tokenController.js';
import { checkLogin, signUp } from '../controllers/authController.js';
import { loadUserPassData } from '../models/passwordModel.js';
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/logIn', async (req, res) => {
    const { email, password } = req.body;
    
    const result = await checkLogin(email, password);
console.log(result);
    if (!result) {
        // Send a JSON response even for failure
        res.status(401).json({ error: 'Login failed' });
        return;
    }
    const user = await loadUserPassData(email);
   
    
    if(user && result){
        
        const token = generateToken(user._id);

        // const token = jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"1h"})
      

        res.send({token})
    }
   /* if (tokenMethod === "cookie") {
        res.cookie('serverAuth', token, { httpOnly: true, expires: new Date(Date.now() + 900000) });
    } else {
        res.send(JSON.stringify({ token })).end();
        return;
    }
    res.end('login ok, get a token in cookie/text');
    return;*/
});

router.post('/signUp', async(req, res) => {
    const { userName,newemail, newPassword } = req.body;
    console.log(req.body)
    console.log(userName,newemail,newPassword);
const result =  await signUp(userName,newemail, newPassword);
    console.log("result",result);
    if (!result) {
        res.status(400).json({ success: false, message: 'Signup failed' });
        return;
    }
    res.end("user added successfuly");
    return;
});
export default router;