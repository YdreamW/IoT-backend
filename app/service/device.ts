import {Service} from 'egg';

export default class Devices extends Service {
	async create(body) {
		return await new this.ctx.model.Device(body).save();
	}
}
