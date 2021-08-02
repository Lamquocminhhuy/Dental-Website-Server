import bcrypt from 'bcryptjs';
import db from '../models/index';



const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
               
            })
            resolve('create new user success')

        }catch(e){
            reject(e);
        }
    });
}



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


let getAllUsers = () => {

    return new Promise(async (resolve, reject) =>{
        try{
            let users = db.User.findAll({
                raw:true
            });
            resolve(users);
        }catch(e){
            reject(e);
        }


    })

}


let getUserInfoById =  (userId) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let user = await db.User.findOne({   // Chờ t lấy thông tin hả chạy tiếp dòng khác :v
                where: { id: userId }, raw:true
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }

        }catch(e){
            reject(e)
        }

    })
}


let updateUserData = (data) =>{
    return new Promise (async (resolve, reject) => {

        try{
         let user = await db.User.findOne({
             where: { id: data.id }
         })
         
         if (user){
             user.firstName = data.firstname;
             user.lastName = data.lastname;
             user.address = data.address;

             await user.save();

             let allUsers = await db.User.findAll();
             resolve(allUsers);
         }else{
             resolve();
         }
        }catch(e){
            reject(e);
        }

    })  
}    

let deleteUserById = (userId) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
               wher: {id: userId} 
            })

            if(user){
                user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};