
import express from 'express';
// import * as tweetController from '../controller/tweet.js';///
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js'

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()  //띄어쓰기 안댐
        .notEmpty()
        .isLength({min: 4})
        .withMessage('아이디는 최소 4자 이상 입력하세요'),
    body('password')
        .trim()
        .isLength({min: 4})
        .withMessage('비밀번호는 최소 4자 이상 입력하세요'),
    validate
]

const validateSignup = [
    ...validateCredential,   //이 객체 전부 넣어줬음
    body('name').notEmpty().withMessage('이름은 꼭 입력하세요'),
    body('email').isEmail().normalizeEmail().withMessage('이메일을 입력하세요'),
    body('url').isURL().withMessage('url을 입력하세요').optional({nullable: true, checkFalsy: true}),
    validate
]


router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
