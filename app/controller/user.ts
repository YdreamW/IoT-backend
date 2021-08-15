import { Controller } from 'egg';

export default class UserController extends Controller {
  public async register(ctx) {
    const { userName: username, password, mail: email } = ctx.request.body;
    const userCheck1 = await ctx.model.User.findOne({ username });
    if (userCheck1 !== null) {
      ctx.body = {
        code: 400,
        msg: '用户名已存在',
      };
    } else {
      const userCheck2 = await ctx.model.User.findOne({ email });
      if (userCheck2 !== null) {
        ctx.body = {
          code: 401,
          msg: '邮箱已注册',
        };
      } else {
        const user = await ctx.model.User({ username, password, email }).save();
        if (user !== null) {
          const { _id } = user;
          const token = await ctx.service.auth.createToken({ _id });
          ctx.body = {
            code: 0,
            data: {
              token,
            },
          };
        } else {
          ctx.body = {
            code: -1,
            msg: 'error!',
          };
        }
      }
    }
  }

  public async fetch() {
    const { ctx } = this;
    ctx.body = {
      msg: 'hello',
    };
  }

  public async currentUser(ctx) {
    const { user: _id } = ctx.state;
    const user = await ctx.model.User.findOne({ _id });
    ctx.body = {
      name: user.username,
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: user.email,
    };
  }

  public async login(ctx) {
    console.log(13);
    const { userName: username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({ username });
    console.log(user);
    if (user === null) {
      console.log(user);
      ctx.body = {
        code: 400,
        msg: '用户名不存在',
      };
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch === true) {
      const { _id } = user;
      const token = await ctx.service.auth.createToken({ _id });
      ctx.body = {
        code: 0,
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '密码错误！',
      };
    }
  }
}
