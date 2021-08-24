import patientService from "../services/patientService";

let postBookAppointment =  async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body)
        return res.status(200).json(
            infor
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let updateSlotSchedule =  async (req, res) => {
    try {
        let infor = await patientService.updateSlotSchedule(req.body)
        return res.status(200).json(
            infor
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getBookingList =  async (req, res) => {
    try {
        let infor = await patientService.getBookingList()
        return res.status(200).json(
            infor
        )
        
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
module.exports = {
    postBookAppointment:postBookAppointment,
    updateSlotSchedule:updateSlotSchedule,
    getBookingList:getBookingList
}