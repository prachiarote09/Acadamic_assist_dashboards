
const FormModel = require("../Models/Students");

const createStudent = async(req,res) =>{
    try {
        let{name,
            dateOfBirth,
            religion,
            caste,
            motherTongue,
            annualIncome,
            grnumber,
            abcId,
            courseName,
            year,
            address,
            city,
            state,
            district,
            pinCode,
            mobileNo,
            email,
            parentMobileNo,
            emergencyMobileNo,
            user} = req.body;

        if(!name || !grnumber ||!user){
            return res.status(400).json({message:"Please fill all fields"});
        }

        //const newStudent = new FormModel(req.body);
        const newStudent = new FormModel( req.body );
        await newStudent.save();

        res.status(201).json({message:'Data Added', success: true, data: newStudent });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
}

const fetchAllData = async (req,res) =>{
    try {
        const student = await FormModel.find().sort({createdAt: -1});
        res.json(student);
    } catch (error) {
        res.json(error)
    }
}

const fetchSingleData = async (req,res) =>{
    const {id} = req?.params;
    try {
        const student = await FormModel.findById(id);
        res.json(student);
    } catch (error) {
        res.json(error)
    }
    
}
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await FormModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


module.exports={
    createStudent,
    fetchAllData,
    fetchSingleData,
    deleteStudent
}                                                                                                                                                                        