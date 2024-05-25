const express = require('express')
const router = express.Router();
const userController = require('../controller/user.controller');

// 1. 회원가입 endpoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);
// 왜 post? get은 requst body를 사용할 수 없음, post는 사용 가능 -> 사용해서 이메일, 패스워드 정보 읽어오기
// get 사용시에는 uri에 넣어줘야 하는 경우 발생

module.exports = router;