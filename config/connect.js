const mongose = require("mongoose")


const connectDB = async () => {
    try{
        await mongose.connect("mongodb+srv://yahyatijjani99:Jctvioq81PTgPAzg@cluster0.9sfmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('mongose connected 😎')
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }

}

module.exports = connectDB
