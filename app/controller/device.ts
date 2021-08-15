import { Controller } from 'egg';

export default class UserController extends Controller {
  public async fetchDevices(ctx) {
    const devices = await ctx.model.Device.find();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: devices,
    };
  }

  public async queryDevices(ctx) {
    const { _timestamp, current, pageSize, ...query } = ctx.query;
    const devicesTmp = await ctx.model.Device.find(query).lean();
    const devices = devicesTmp.map((item: any) => ({
      ...item,
      msgCount: item.messages.length,
    }));
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        devices,
        total: devices.length,
      },
    };
  }

  public async updatename(ctx) {
    const { ID, name } = ctx.request.body;
    await ctx.model.Device.findOneAndUpdate({ ID }, { name });
    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }

  public async delete(ctx) {
    const { ID } = ctx.request.body;
    await ctx.model.Device.findOneAndRemove({ ID });
    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }

  public async fetchDataDevicesMessages(ctx) {
    const devices = await ctx.model.Device.find().lean();
    const x = devices.map((device) => device.ID);
    const y = devices.map((device) => device.messages.length);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { x, y },
    };
  }
}
