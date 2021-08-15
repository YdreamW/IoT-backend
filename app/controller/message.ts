import { Controller } from 'egg';

export default class MessageController extends Controller {
  public async queryMessages(ctx) {
    console.log(ctx.query);
    const { current, pageSize, _timestamp, device: ID, ...params } = ctx.query;
    let query = {};
    if (ID) {
      const device = await ctx.model.Device.findOne({ ID });
      query = { device: device._id, ...params };
    }

    console.log(current, pageSize, _timestamp, params);
    const messages = await ctx.model.Message.find(query).populate('device');
    ctx.body = {
      code: 0,
      data: { messages, total: messages.length },
    };
  }
}
