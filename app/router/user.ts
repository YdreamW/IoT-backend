import {Application} from 'egg';

export default (app: Application) => {
	const {controller, router} = app;
	const {jwtAuth} = app.middleware;

	router.post('/user/register', controller.user.register);
	router.get('/user/fetch', jwtAuth(), controller.user.fetch);
	router.post('/user/login',controller.user.login)
}
