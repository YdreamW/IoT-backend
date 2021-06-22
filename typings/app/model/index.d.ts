// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDevice from '../../../app/model/Device';
import ExportMessage from '../../../app/model/Message';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Device: ReturnType<typeof ExportDevice>;
    Message: ReturnType<typeof ExportMessage>;
    User: ReturnType<typeof ExportUser>;
  }
}
