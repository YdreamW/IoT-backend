import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const devices = ctx.model.Device.find();
    console.log(devices);
    const data = devices.map((item) => ({
      ID: item.ID,
      value: item.messages.length,
    }));
    console.log(data);
    ctx.body = await ctx.service.test.sayHi('IoT-backend');
  }
}
