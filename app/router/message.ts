import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { jwtAuth } = app.middleware;

  // router.get('/message/fetchmessages', jwtAuth(), controller.message.fetchMessages);

  router.get('/message/query', jwtAuth(), controller.message.queryMessages);
};
