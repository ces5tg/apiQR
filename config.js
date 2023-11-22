const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    mongodbURL:process.env.MONGODB_URL || "mongodb+srv://admin:g9CuxmY2dZ72H5AX@apiqr.s0gdkma.mongodb.net/apiQR?retryWrites=true&w=majority"
}
/* export const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/tasksdb"; */