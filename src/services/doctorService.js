import db from '../models/index'
require('dotenv').config();
import _ from "lodash"
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limitInput,
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users

            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctors = () => {
    // Promise 
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: doctor
            });
        } catch (e) {
            reject(e);
        }

    })
}


let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // selectectedPrice: this.state.selectectedPrice.value,
            // selectectedPayment: this.state.selectectedPayment.value,
            // selectectedAddress: this.state.selectectedAddress.value,
            // note: this.state.note,
            if (!inputData.doctorId || !inputData.contentHTML ||

                !inputData.contentMarkdown
                || !inputData.selectectedPrice || !inputData.selectectedPayment || !inputData.selectectedAddress


            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })

                await db.Doctor_Infor.create({
                    doctorId: inputData.doctorId,
                    priceId: inputData.selectectedPrice,
                    addressId: inputData.selectectedAddress,
                    paymentId: inputData.selectectedPayment,
                    note: inputData.note

                })
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed'
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing doctor id'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password', 'image']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi'] },

                        {
                            model: db.Doctor_Infor, attributes: {
                                exclude: ['id', 'doctorId', 'updatedAt', 'createdAt']
                            }, 
                            include: [
                                { model: db.Allcode, as: 'Price', attributes: ['valueVi'] },
                                { model: db.Allcode, as: 'PaymentData', attributes: ['valueVi'] },
                                { model: db.Allcode, as: 'AddressData', attributes: ['valueVi'] },
                            ]
                        },




                    ],
                    raw: true,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;

                    })
                }

                //get all existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })


                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                //create datab
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }



                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [

                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueVi'] },


                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule,
                })
                console.log(data)
            }



        } catch (e) {
            reject(e)
        }
    })
}

let getExtraInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!doctorId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }else {
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'Price', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'PaymentData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'AddressData', attributes: ['valueVi'] },

                    ],
                    raw: false,
                    nest: true
                    
                })
                if(!data){
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                })
            }
            
        }catch (e) {
            reject(e)
        }
    })

}


let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!doctorId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
             
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi'] },

                        {
                            model: db.Doctor_Infor, attributes: {
                                exclude: ['id', 'doctorId', 'updatedAt', 'createdAt']
                            }, 
                            include: [
                                { model: db.Allcode, as: 'Price', attributes: ['valueVi'] },
                                { model: db.Allcode, as: 'PaymentData', attributes: ['valueVi'] },
                                { model: db.Allcode, as: 'AddressData', attributes: ['valueVi'] },
                            ]
                        },




                    ],
                    raw: true,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })



            }
        }catch (e) {
            reject(e)
        }
    })
}

let getAllSchedule = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                       
                    },
                    include: [

                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueVi'] },


                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    data: dataSchedule,
                })
                console.log(data)
            



        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {

    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById:getExtraInforDoctorById,
    getProfileDoctorById:getProfileDoctorById,
    getAllSchedule:getAllSchedule
}