import db from "../models/index"
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) =>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

let handleUserLogin = (email,password) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exists
                

                let user = await db.User.findOne({ 
                    where: {email : email},
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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


let createNewUser = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            //check email is exist

            let check = await checkUserEmail(data.email);
            if(check===true){
                resolve({
                    errCode: 1,
                    errmessage: 'Your email is already in used!'
                })

            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                   
                })
                resolve({
                    errCode: 0,
                    errmessage: 'OK'
                })
            }
            

        }catch(e){
            reject(e)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
       
            let user = await db.User.findOne({
                where: {id: userId}
            })

            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: 'The user is not exist!'
                })
            }
            // if(user){
            //     await user.destroy();
            // }
            await db.User.destroy({
                where : {id: userId}
            });
            resolve({
                errCode: 0,
                errMessage: 'The user is deleted!'
            })
        
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.id ){
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            
            if (user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,
                user.roleId = data.roleId,
                user.positionId = data.positionId,
                user.gender = data.gender,
                user.phonenumber = data.phonenumber,
                await user.save();
                // await db.User.save({ 
                //     firstName : data.firstname,
                //     lastName : data.lastname,
                //     address : data.address,
                // })
   
                resolve({
                    errCode: 0,
                    message: 'Update the user success!'
                })
            }else{
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }

        }catch(e){
            reject(e)
        }
    })

}

let getAllCodeService = (typeInput) =>{
    return new Promise(async(resolve, reject) =>{

        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let res = {};
                let allcode = await db.Allcode.findAll(
                    {where:{type : typeInput}}
                );
                res.errCode = 0;
                res.data = allcode;
                resolve(res);

            }
           

            
        }catch(e){
            reject(e)
        }

    })
}

let getService = () => {
    return new Promise(async(resolve, reject) =>{

        try{
                let res = {};
                let service = await db.Service.findAll();
                res.data = service;
                resolve(res);

        }catch(e){
            console.log(e);
            reject(e)
        }

    })

}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser:deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    getService : getService,
}