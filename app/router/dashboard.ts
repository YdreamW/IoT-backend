import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { jwtAuth } = app.middleware;

  router.get(
    '/dashboard/fetchMsgPerDev',
    jwtAuth(),
    controller.dashboard.fetchMsgPerDev
  );

  router.post(
    '/dashboard/fetchMsgPerDay',
    jwtAuth(),
    controller.dashboard.fetchMsgPerDay
  );

  router.get(
    '/dashboard/fetchMapData',
    jwtAuth(),
    controller.dashboard.fetchMap
  );

  router.get(
    '/dashboard/fetchMapPoints',
    jwtAuth(),
    controller.dashboard.fetchMapPoints
  );

  router.get(
    '/dashboard/fetchSunburst',
    jwtAuth(),
    controller.dashboard.fetchSunburst
  )
};
