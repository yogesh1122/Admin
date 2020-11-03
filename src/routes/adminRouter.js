import express from 'express';

import { adminController } from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.get('/ping', adminController.ping);
adminRouter.get('/addExcel', adminController.addExcel);

export default adminRouter;
