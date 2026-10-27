require('dotenv').config({ path: __dirname + '/.env' })
const app = require('./src/app')
const connectTODB = require('./src/config/database')

connectTODB();
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})