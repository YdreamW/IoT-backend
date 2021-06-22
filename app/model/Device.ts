import {Application} from 'egg';

export default (app: Application) => {
	const {mongoose} = app;
	const {Schema, model} = mongoose;
	const DeviceSchema = new Schema(
		{
			ID: {type: String},
			name: {type: String}
		},
		{
			timestamps: true
		});
	return model('Device', DeviceSchema, 'device');
}
