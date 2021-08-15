import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { jwtAuth } = app.middleware;

  router.get('/device/fetchdevices', jwtAuth(), controller.device.fetchDevices);

  router.get('/device/query', jwtAuth(), controller.device.queryDevices);
  router.post('/device/updatename', jwtAuth(), controller.device.updatename);
  router.post('/device/delete', jwtAuth(), controller.device.delete);
};
