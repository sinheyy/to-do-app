const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const { userId } = req;
        const newTask = new Task({ task, isComplete, author: userId });
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }

};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findById(req.params.id);
        if (!updateTask) {
            throw new Error("can not find th task");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (updateTask[item] = req.body[item]));
        await updateTask.save();
        res.status(200).json({ status: 'ok', data: updateTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

taskController.deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'ok', data: deleteTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

module.exports = taskController;