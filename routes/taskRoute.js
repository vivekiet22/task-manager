const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../models/task");

const JWT_TOKEN = "VivekMaddeshiya";


// Ensure user is signed in
router.use(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
});

// get all task of the user
// GET "/task/fetchall".login required

router.get("/fetchall", async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// create a new task
// POST "/task/create".login required

router.post("/create", async (req, res) => {
  try {
    const { name, description, assignee, expireOn } = req.body;
    task = await Task.create({
      name,
      description,
      assignee: req.user.id,
      expireOn,
    });
    res.status(201).json({ status: "success", data: { task } });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
});

// update a task
// PUT "task//updatetask/:id".login required

router.put("/updatetask/:id", async (req, res) => {
  const { name, description, expireOn,completed } = req.body;
  try {
    // Create a New Task Object
    const newTask = {};
    if (name) {
      newTask.name = name;
    }
    if (description) {
      newTask.description = description;
    }
    if (expireOn) {
      newTask.expireOn = expireOn;
    }
    if (completed){
        newTask.completed = completed
    }

    // Find the task to be updated and  update it
    let task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).send("Not Found");
    }
    if (task.assignee.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Delete a task by its id
// Delete "task.deletetask/:id".login required

router.delete('/deletetask/:id',async (req,res)=>{
    try {
      
      // Find the task to be deleted and  delete it
      let task =await Task.findById(req.params.id)
      if(!task){
        return res.status(404).send("Not Found")
      }
      // Allow deletion only if user owns this task
      if(task.assignee.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")      
      }
      note = await Task.findByIdAndDelete(req.params.id)
      res.json({"Success":"Task has been deleted"})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
   })
  


module.exports = router;
