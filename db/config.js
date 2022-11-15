const mongoose = require("mongoose");

const dbConection = async() => {
    // try{
    //     await mongoose.connect(process.env.BD_CNN, {useNewUrlParser: true, useUnifiedTopology: true})
    //     console,log('DB online')
    // }catch(error){
    // }
    await mongoose.connect(process.env.BD_CNN,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('DB Online 🤖'))
        .catch(e => console.log('error db: ', e))
}

module.exports = {
   dbConection 
}

