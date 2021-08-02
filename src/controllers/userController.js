import userService from "../services/userService";


let handleLogin = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    //check email & psw co null hay k 
   
    if(!email ||!password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    } 

    let userData = await userService.handleUserLogin(email, password)
    //check email exists
    //compare password
    //access_token: JWT
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        // toán tử ternary
        user: userData.user ? userData.user : {}
    
    })
}


let handleGetAllUsers = async (req, res) =>{
    let id = req.query.id; //ALL, id

    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}



module.exports ={

    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}