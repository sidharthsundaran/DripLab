import express from "express";
import { 
        registerUserController , 
        verifyUserController,
        refreshAccessTokenController ,
        loginUserController,
        logoutUserController
 } 
 from "../controllers/user.controllers";
import { validateRegisterUser } from "../validators/user.validators";

const router = express.Router()

router.post('/register',validateRegisterUser,registerUserController)
router.get('/verify-email/:token',verifyUserController)
router.post('/login',loginUserController)
router.get('/refresh-token', refreshAccessTokenController);
router.post('/logout', logoutUserController);

export default router;
