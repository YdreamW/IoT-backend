const moment = require('moment');
export default (app) => {

	return class ServerController extends app.Controller {
		async index(ctx) {
			const {message} = ctx.req;
			const {alert, clientId: ID, info, lat, lng, timestamp, value} = message;
			let device = await ctx.model.Device.findOne({ID});
			if (device === null) {
				device = await ctx.model.Device({ID}).save();
			}
			const time = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
			const msg = await ctx.model.Message({alert, info, lat, lng, time, value, device: device._id}).save();
			if (msg !== null) {
				console.log("Message from " + device.ID + " has stored!");
			}
		}
	}
}
