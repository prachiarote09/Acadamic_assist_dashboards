const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    religion: { type: String },
    caste: { type: String },
    motherTongue: { type: String },
    annualIncome: { type: Number },
    grNumber: { type: String, required: true, unique: true, sparse: true }, // ✅ Fixed
    abcId: { type: String },
    courseName: { type: String },
    year: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    district: { type: String },
    pinCode: { type: String }, // ✅ Ensure it's a string
    mobileNo: { type: String, required: true }, // ✅ Changed to String
    email: { type: String },
    parentMobileNo: { type: String }, // ✅ Changed to String
    emergencyMobileNo: { type: String }, // ✅ Changed to String
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Fixed Virtual Field for Date Formatting
FormSchema.virtual('formattedDate').get(function () {
  return this.dateOfBirth ? this.dateOfBirth.toISOString().split('T')[0].split('-').reverse().join('-') : '';
});

const FormModel = mongoose.model('student', FormSchema);
module.exports = FormModel;
