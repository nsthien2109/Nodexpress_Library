import db from '../../models/index'

let createTask = async(req, res) =>{
    const {taskName,taskDue} = req.body;
    if (!taskName) {
        return res.status(412).json({status : "ERR", msg : "Please enter task name"});
    }else if(!taskDue){
        return res.status(412).json({status : "ERR", msg : "Please enter task due"});
    }
    await db.Task.create({
        taskName, taskDue
    }).then((result) => {
        return res.status(200).json({status : "OK", data : result});
    }).catch((err) => {
        return res.status(412).json({status : "ERR", msg : err});
    });
}

let getAllTasks = async(req, res) =>{
    await db.Task.findAll({}).then((result) => {
        return res.status(200).json({status : "OK", data : result});
    }).catch((err) => {
        return res.status(412).json({status : "ERR", msg : err});
    });
} 

let getTask = async(req, res) =>{s
    return res.status.json({status : "OK", data : ""})
}

let updateTask = async(req, res) =>{s
    return res.status.json({status : "OK", data : ""})
}

let deleteTask = async(req, res) =>{s
    return res.status.json({status : "OK", data : ""})
}

export default {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}