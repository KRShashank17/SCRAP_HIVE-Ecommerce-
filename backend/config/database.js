const mongoose = require('mongoose');



const connectDatabase=async ()=>{
        // RTAhfdXmdb1MDbyj
    try {
    const uri = process.env.MONGODB_URI;
    const connect = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected: ",connect.connection.host);
    }
     catch (error) {
            console.log(error);
            process.exit(1);
    }
    
    
}

module.exports=connectDatabase;