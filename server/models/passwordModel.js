import User from "./userModel.js";


async function loadUserPassData(email) {

try {

    const user= await User.findOne({email});

    // console.log(user.password);
    console.log(user);
       return user ? user.toObject():null ;
    
} catch (error) {
    
    console.error(error.message);
    throw error;
}
}

async function addUser(userObj) {
   
    try {
        
        const newUser= await User.create(userObj);
        return true

    } catch (error) {
        console.error(error.massage)
    }
}

export { loadUserPassData, addUser };