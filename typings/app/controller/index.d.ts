// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDashboard from '../../../app/controller/dashboard';
import ExportDevice from '../../../app/controller/device';
import ExportHome from '../../../app/controller/home';
import ExportMessage from '../../../app/controller/message';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    dashboard: ExportDashboard;
    device: ExportDevice;
    home: ExportHome;
    message: ExportMessage;
    user: ExportUser;
  }
}
