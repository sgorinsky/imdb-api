require('dotenv').config()

const PORT = process.env.PORT
const RDS_URI = process.env.RDS_URI

module.exports = {
    RDS_URI,
    PORT
}