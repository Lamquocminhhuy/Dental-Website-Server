import db from '../models/index';
import CRUDServices from "../services/CRUDServices";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }catch(e) {

        console.log(e)
    }

}
let getAboutPage = (req, res) => {
    return res.render('about.ejs')
}


let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}


let postCRUD = async (req, res) => {

    let message =  await CRUDServices.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server');
}
 
let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUsers()
    return res.render('displayCRUD.ejs', {
        datatable: data
    }); 
}


let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    
    if(userId){
        let userdata = await CRUDServices.getUserInfoById(userId);
        //check user data not found

        // console.log(userdata);
        return res.render("editCRUD.ejs", {
            user: userdata
        })
    }  
    else{
        return res.send("User not found");

    }    
    
}

let putCRUD = async (req, res) =>{
    // gửi qua form data vào body
    let data = req.body;
    let allUsers = await CRUDServices.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        datatable: allUsers,
    }); 

}

let deleteCRUD = async (req, res) =>{
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id)
        return res.send("Delete the user succeed")
    }else{
        return res.send('User not found')
    }
    
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,


}