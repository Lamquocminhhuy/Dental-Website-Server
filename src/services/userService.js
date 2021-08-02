import db from "../models/index"
import bcrypt from 'bcryptjs';

let handleUserLogin = (email,password) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exists
                

                let user = await db.User.findOne({ 
                    where: {email : email},
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })

                if(user){
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        // xóa password trước khi show ra api
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }

                }else{
                    userData.errCode = 2;
                    userData.errMessage = `Users not found`;
                }
               
            }else{
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist `;
                
            }

            resolve(userData)
        }catch(e){
            reject(e);
        }
    })

}

let checkUserEmail = (userEmail) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })

            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
        }
    })

}


let getAllUsers = (userId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let users = '';
            if (userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                });
            }if (userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where : {id : userId}, 
                    exclude : ['password']
        
                    
                })
            }
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}