import * as bcrypt from 'bcrypt';
import { addUser,loadUserPassData } from '../models/passwordModel.js';



async function hashPassword(password, salt = 10) {
   const hashed = await bcrypt.hash(password, salt);
    console.log('hashed', hashed);
    return hashed;
}

async function checkPassword(givenPassword, storedPassword) {

    console.log(givenPassword,storedPassword);
   const res = await bcrypt.compare(givenPassword, storedPassword);
   console.log(res);

   return res;
}

async function checkLogin(email, givenPassword) {

    console.log(email,givenPassword);
    try {
        const userDataPromise = loadUserPassData(email);
        const userData = await userDataPromise; // Wait for the promise to resolve

        console.log(userData);
        if (!userData) {
            return false;
        }
        const result = await checkPassword(givenPassword.toString(), userData.password);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

async function signUp(username,email, password) {
    
    const storedData = await loadUserPassData(email);
         console.log(`storedData`,storedData);
    if (storedData) {
        console.log(`user with email: ${email} is already found`);
        return false;
    }
    const hashedPassword = await hashPassword(password);
    console.log(`hashedPassword`,hashedPassword);
    const newUser = addUser({ username,email, password: hashedPassword });
    console.log(`newUser`,newUser);
    return newUser
}

export { checkLogin, signUp };
