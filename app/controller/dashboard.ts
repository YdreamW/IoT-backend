import { Controller } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

export default class DashboardController extends Controller {
  // 获取柱状图数据，每个设备的告警和不告警数量分开传递，
  public async fetchMsgPerDev(ctx) {
    console.log(13);
    const devices = await ctx.model.Device.find()
      .sort('ID')
      .lean();
    const data = [] as any[];
    for (const device of devices) {
      const messages = await ctx.model.Message.find({
        device: device._id,
        alert: 1,
      });
      data.push({
        ID: device.ID,
        value: messages.length,
        type: 'alert',
      });
    }
    for (const device of devices) {
      const nMessages = await ctx.model.Message.find({
        device: device._id,
        alert: 0,
      });
      data.push({
        ID: device.ID,
        value: nMessages.length,
        type: 'normal',
      });
    }
    ctx.body = {
      code: 0,
      data,
    };
  }

  public async fetchMsgPerDay(ctx) {
    const oneDay = 24 * 60 * 60 * 1000;
    const { begin, end } = ctx.request.body;
    const edDay = end ? new Date(end) : new Date();
    const bgDay = begin
      ? new Date(begin)
      : new Date(edDay.valueOf() - oneDay * 30);
    const devices = await ctx.model.Device.find()
      .sort('ID')
      .lean();
    const data = [] as any[];
    for (const device of devices) {
      let i = 0;
      let tmpDay = bgDay.valueOf() + oneDay * i;
      while (tmpDay <= edDay.valueOf()) {
        const messages = await ctx.model.Message.find({
          device: device._id,
          time: { $gt: tmpDay, $lt: tmpDay + oneDay },
        });
        const day = moment(tmpDay).format('YYYY-MM-DD');
        data.push({ ID: device.ID, value: messages.length, day });
        i++;
        tmpDay = bgDay.valueOf() + oneDay * i;
      }
    }
    ctx.body = {
      code: 0,
      data,
    };
  }

  public async fetchMap(ctx) {
    const devices = await ctx.model.Device.find().lean();
    const features = [] as any[];
    for (const device of devices) {
      const messages = await ctx.model.Message.find({ device: device._id })
        .sort('time')
        .lean();
      const coordinates = messages.map((item) => {
        const { lng, lat } = item;
        return [lng, lat];
      });
      const feature = {
        type: 'Feature',
        properties: { name: device.ID },
        geometry: { type: 'LineString', coordinates },
      };
      features.push(feature);
    }
    ctx.body = {
      code: 0,
      data: {
        type: 'FeatureCollection',
        features,
      },
    };
  }

  public async fetchMapPoints(ctx) {
    const nMessages = await ctx.model.Message.find({ alert: 0 })
      .populate('device')
      .lean();
    const nFeatures = nMessages.map((item) => {
      const { ID } = item.device;
      const { lng, lat } = item;
      return {
        type: 'Feature',
        properties: { name: ID },
        geometry: { type: 'Point', coordinates: [lng, lat] },
      };
    });

    const messages = await ctx.model.Message.find({ alert: 1 })
      .populate('device')
      .lean();
    const features = messages.map((item) => {
      const { ID } = item.device;
      const { lng, lat } = item;
      return {
        type: 'Feature',
        properties: { name: ID },
        geometry: { type: 'Point', coordinates: [lng, lat] },
      };
    });
    ctx.body = {
      code: 0,
      data: {
        nAlert: {
          type: 'FeatureCollection',
          features: nFeatures,
        },
        alert: {
          type: 'FeatureCollection',
          features,
        },
      },
    };
  }

  public async fetchSunburst(ctx) {
    const devices = await ctx.model.Device.find()
      .populate('messages')
      .lean();
    const children = [] as any[];
    for (const device of devices) {
      const alertM = await ctx.model.Message.find({
        alert: 1,
        device: device._id,
      });
      const alertNM = await ctx.model.Message.find({
        alert: 0,
        device: device._id,
      });
      children.push({
        name: device.ID,
        value: device.messages.length,
        children: [
          { name: 'alert!', value: alertM.length },
          { name: 'normal!', value: alertNM.length },
        ],
      });
    }
    ctx.body = {
      code: 0,
      data: {
        name: '告警信息占比',
        children
      },
    };
  }
}
