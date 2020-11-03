import { SERVER } from '../config';
const { PORT } = SERVER;
export const startServer = (app) => {
	const port = process.env.PORT || PORT;
	app.listen(port, (_) => console.log(`server listening on port ${port}`));
};
