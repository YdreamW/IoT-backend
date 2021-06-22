// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwtAuth from '../../../app/middleware/jwtAuth';

declare module 'egg' {
  interface IMiddleware {
    jwtAuth: typeof ExportJwtAuth;
  }
}
