import express from "express";
import { registerUserController , verifyUserController } from "../controllers/user.controllers";
import { validateRegisterUser } from "../validators/user.validators";

const router = express.Router()

router.post('/register',validateRegisterUser,registerUserController)
router.get('/verify-email/:token',verifyUserController)
export default router;
