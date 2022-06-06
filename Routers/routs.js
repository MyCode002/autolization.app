import express from "express";
import checkToken from '../middlewares/ChekToken.js'
import controlles from "../controllers/controlles.js";
const router = express.Router()


router.get('/users',checkToken,controlles.GET)
router.post('/login',controlles.LOGIN)
router.post('/register',controlles.REGISTER)


export default router