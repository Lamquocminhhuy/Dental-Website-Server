import db from "../models/index";
require("dotenv").config();

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //upsert patient

        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            phonenumber: data.phoneNumber,
            gender: data.gender,
            firstName: data.fullName,
            roleId: "R3",
          },
        });
        console.log("check user", user[0]);
        // create a booking
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              patientId: user[0].id,
              doctorId: data.doctorId,
              date: data.date,
              serviceId: data.service,
              timeType: data.timeType,
              // them vao dich vu 
            },
          });

          await db.Schedule.findOrCreate
          
        }
       
        resolve({
          errCode: 0,
          errMessage: "Save patient booking success",
        });
      }
    } catch (e) {
       
      reject(e);
    }
  });
};


let updateSlotSchedule = (data) =>{
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.doctorId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter!'
                })
            }
            let slot = await db.Schedule.findOne({
                where: { doctorId: data.doctorId, date : data.date, timeType : data.timeType, },
                raw: false
            })
            console.log(slot)
            if (slot) {
                    slot.currentNumber = 1
                    
                    await slot.save();
                // await db.User.save({ 
                //     firstName : data.firstname,
                //     lastName : data.lastname,
                //     address : data.address,
                // })

                resolve({
                    errCode: 0,
                    message: 'Update the user success!'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }

        } catch (e) {
            reject(e)
        }
    })

}


let getBookingList = () =>{
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.Booking.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'statusId', 'doctorId', 'patientId']
                },
                include: [

                    { model: db.Allcode, as: 'Time', attributes: ['valueVi'] },
                    { model: db.Allcode, as: 'Status', attributes: ['valueVi'] },
                    { model: db.Allcode, as: 'Service', attributes: ['valueVi'] },
                    { model: db.User, as: 'PatientData' },
                    { model: db.User, as: 'DoctorData' },


                ],
                raw: false,
                nest: true
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


let updateBookingStatus = (data) =>{
  return new Promise(async(resolve, reject) => {
      try {
          if (!data.statusId) {
              resolve({
                  errCode: 2,
                  message: 'Missing required parameter!'
              })
          }
          let slot = await db.Booking.findOne({
              where: { patientId : data.patientId },
              raw: false
          })
          console.log(slot)
          if (slot) {
                  slot.statusId = data.statusId
                  
                  await slot.save();
    

              resolve({
                  errCode: 0,
                  message: 'Update the status success!'
              })
          } else {
              resolve({
                  errCode: 1,
                  message: 'User not found!'
              });
          }

      } catch (e) {
          reject(e)
      }
  })

}
module.exports = {
  postBookAppointment: postBookAppointment,
  updateSlotSchedule:updateSlotSchedule,
  getBookingList:getBookingList,
  updateBookingStatus:updateBookingStatus
};
