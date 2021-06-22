import { Service } from 'egg';

/**
 * Auth Service
 */
export default class Auth extends Service {
  /**
   * 生成 Token,默认一天
   * @param {Object} data
   * @param time string 时间 1m,6h,12d等 默认单位为ms
   */
  public createToken(data, time: string = '1d') {
    const { app } = this.ctx;

    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: time,
    });
  }
  /**
   * 验证token的合法性
   * @param {String} token
   */
  public async verifyToken(token) {
    const { app } = this.ctx;
    return await app.jwt.verify(token, app.config.jwt.secret);
  }
}
