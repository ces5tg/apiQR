const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    mongodbURL:process.env.MONGODB_URL || "mongodb://localhost:27017/tasksdb"
}
/* export const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/tasksdb"; */