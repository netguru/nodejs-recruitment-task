import {app, port} from "./app";
import mongoose from "mongoose";

// mongoDB server connection
mongoose.connect(process.env.databaseUrl)
const db = mongoose.connection
db.on("open", ()=>{
    console.log("mongodb connected");
})

app.listen(port, ()=>{
    console.log(process.env.secret)
    console.log(`listening on port ${port}`);
})