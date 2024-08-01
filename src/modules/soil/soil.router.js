import {Router} from "express";
import multer from 'multer';
import * as soilController from "./controller/soil.js";
import {auth} from '../../middleware/authMiddleware.js'
const router =Router();
const upload = multer({ dest: 'uploads/' });


router.post('/upload',auth,upload.single('file'),soilController.uploadSoil);
router.get("/history",auth,soilController.history);
router.delete("/delete",auth,soilController.deleteSoil);




export default router;





