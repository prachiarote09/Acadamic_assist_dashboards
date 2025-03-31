const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoticeSchema = new Schema(
  {
    className: { type: String, required: true }, // ✅ Renamed 'class' to 'className'
    title: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt fields
);

// Optional: Virtual to format the date
NoticeSchema.virtual("formattedDate").get(function () {
  return this.date.toISOString().split("T")[0].split("-").reverse().join("-");
});

// ✅ Ensure virtuals are included in JSON output
NoticeSchema.set("toJSON", { virtuals: true });
NoticeSchema.set("toObject", { virtuals: true });

const NoticeModel = mongoose.model("Notice", NoticeSchema); // ✅ Capitalized model name for consistency
module.exports = NoticeModel;
