import express from 'express';
import { SERVER } from '../config';
const { BASE_URL } = SERVER;

import adminRouter from '../routes/adminRouter';

const RouteData = [{ path: '/admin', router: adminRouter }];

export const Routes = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	RouteData.forEach((route) => app.use(BASE_URL + route.path, route.router));
};
