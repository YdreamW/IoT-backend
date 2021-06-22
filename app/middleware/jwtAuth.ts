import { Context } from 'egg';

/**
 *  JWT 鉴权中间件
 *  如果用户通过校验则将 user 信息放入 ctx.state.user 中
 *  如果不通过则返回 401 权限错误
 */
export default () => async (ctx: Context, next) => {
  const user = await ctx.helper.verifyToken();
  if (user) {
    ctx.state.user = user;
  }
  await next();
};
