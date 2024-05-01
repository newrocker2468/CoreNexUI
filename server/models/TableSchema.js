const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
    weeklyAttendance:{
    startDate: Date,
    endDate: Date,
    attendance: [
      {
        date: Date,
        status: String,
        time: String,
      },
    ],
    }
}, { strict: false, strictPopulate:false }); // Allow any fields


const Table = mongoose.model("Table", TableSchema);
module.exports = Table
