const { required, ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name:{type:String,required:true},
    dateOfBirth:{type:Date,required:true},
    religion: {type:String},
    caste: {type:String},
    motherTongue: {type:String},
    annualIncome: {type:Number},
    grnumber:  {type:String},
    abcId: {type:String},
    courseName:{type:String},
    year: {type:String},
    address:{type:String},
    city:  {type:String},
    state: {type:String},
    district:{type:String},
    pinCode:{type:String},
    mobileNo:{type:Number},
    email:{type:String},
    parentMobileNo:{type:Number},
    emergencyMobileNo:{type:Number},
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'UserModel',
        required:true
    },
    grNumber: { type: String, unique: true, sparse: true }
},{
    timestamps:true,
});
FormSchema.virtual("formattedDate").get(function () {
    return this.date.toISOString().split("T")[0].split("-").reverse().join("-");
});

const FormModel= mongoose.model('student',FormSchema);
module.exports = FormModel;