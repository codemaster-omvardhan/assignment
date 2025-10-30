import express from 'express';
import { upload } from '../controller/uploadController.js';
const router = express.Router();

router.post('/', upload)

export default router;