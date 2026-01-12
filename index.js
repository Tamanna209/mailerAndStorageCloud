require("dotenv").config();
const express=require("express");
const dbConfig = require("./config/db");
const userRouter = require("./routes/users.route");
const app=express();
const PORT=process.env.PORT;

//middleware
app.use(express.json());


//routes
app.use('/api/v1', userRouter)

app.listen(PORT, async()=>{
    await dbConfig();
    console.log(`Server started at http://localhost:${PORT}`);
    
})