const mongoose = require('mongoose')
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGOOSE CONNECTED")
  }
  catch(err) {
    console.log(err , "cannot connect to MongoDB")
    process.exit(1);
  }
}
module.exports = connectDB