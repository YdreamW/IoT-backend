import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);



  app.emqtt.route('testapp',app.mqtt.controller.home.index);

};
