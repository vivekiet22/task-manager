const express = require("express");
const mongoose = require("mongoose");



const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");



const app = express();



const DB = 'mongodb://127.0.0.1:27017/taskmanager'
try {
    mongoose.connect(DB).then(()=>console.log("Connected to DB Successfully"));
  } catch (error) {
    handleError(error);
  }

app.use(express.json());



app.use("/user", userRoute);
app.use("/task", taskRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});