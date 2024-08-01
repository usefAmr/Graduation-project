import {Router} from "express";
import { auth } from '../../middleware/authMiddleware.js'
import * as userController from "./controller/user.js";
import * as validators from "./user.validation.js"
import {validation} from "../../middleware/validation.js"
import { fileUpload, fileValidation } from '../../utils/cloudMulter.js'
import {isAdmin} from '../../middleware/isAdmin.js'
const router =Router();


router.get('/getuser',isAdmin,userController.getAllUsers);
router.post("/getuserById",auth,userController.profile);
router.put("/updateuser",auth,isAdmin,validation(validators.updateUser),userController.updateUser);
router.delete("/deleteuser",auth,isAdmin,userController.deleteUser);


export default router;





