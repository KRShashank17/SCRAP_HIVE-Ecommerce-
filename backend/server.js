const app=require("./app");
const dotenv=require("dotenv");
//config
dotenv.config({path:"backend/config/config.env"});


//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})



//connect database here
const connectDatabase=require("./config/database");


//connecting to database

connectDatabase();
// const port=4000;
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost :${process.env.PORT}`);
});


//unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled rejection`);

    server.close(()=>{
        process.exit(1);
    });


}); 