const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({}, { strict: false, strictPopulate:false }); // Allow any fields


const Table = mongoose.model("Table", TableSchema);
module.exports = Table
