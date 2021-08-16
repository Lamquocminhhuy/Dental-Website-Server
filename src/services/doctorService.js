import db from '../models/index'


let getTopDoctorHome = (limitInput) =>{
    return new Promise( async (resolve, reject) => {
        try{

            let users = await db.User.findAll({
                where: { roleId : 'R2' },
                limit : limitInput,
                order:  [["createdAt", "DESC"]],
                attributes: {
                    exclude : ['password']
                },
                include: [
                    {model: db.Allcode, as: 'positionData', attributes:['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']},
                ],
                raw:true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users

            })
        }catch(e){
            reject(e);
        }
    })
}

let getAllDoctors = () => {
    // Promise 
    return new Promise( async (resolve, reject) => {
        try{
            let doctor = await db.User.findAll({
                where: {roleId: "R2"},
                attributes: {
                    exclude : ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: doctor
            });
        }catch(e){
            reject(e);
        }

    })
}


let saveDetailInforDoctor = (inputData) =>{
    return new Promise( async (resolve, reject) => {
        try {
            if(!inputData.doctorId || inputData.contentHTML || inputData.contentMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else{
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed'
                })
            }



        }catch(e){
            reject(e)
        }
    })
}
module.exports = {

    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor:saveDetailInforDoctor
}