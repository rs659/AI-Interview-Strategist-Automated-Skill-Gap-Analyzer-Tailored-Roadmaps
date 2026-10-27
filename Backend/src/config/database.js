const mongoose = require('mongoose')

async function connectTODB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to Database')
    }
    catch(err){
        console.error('Error connecting to Database:', err)
    }
}

module.exports = connectTODB