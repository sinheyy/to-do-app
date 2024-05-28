const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require("../controller/auth.controller");
const router = express.Router();

// 라우터 정의
router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;