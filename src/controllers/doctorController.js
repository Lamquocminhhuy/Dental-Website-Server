import doctorService from "../services/doctorService";




let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;

    try{
        let response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(response);

    }catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }


}

let getAllDoctors = async (req, res) => {
    try{
        let doctor = await doctorService.getAllDoctors();
        return res.status(200).json(doctor)
    }catch (e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }

}


let postInforDoctors = async (req, res) => {
    try{
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    }catch (e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}



let getDetailDoctorById = async (req,res) => {
    try{
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(
            infor
        )
    }catch (e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }

}
module.exports ={

    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctors:postInforDoctors,
    getDetailDoctorById:getDetailDoctorById


}
  