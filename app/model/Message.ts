import {Application} from 'egg';

export default (app: Application) => {
	const {mongoose} = app;
	const {Schema, model} = mongoose;
	const MessageSchema = new Schema(
		{
			info: {type: String},
			value: {type: Number},
			alert: {type: Number},
			lng: {type: Number},
			lat: {type: Number},
			time: {type: Date},
			device: {type: Schema.Types.ObjectId, ref: 'Device'}
		},
		{
			timestamps: true
		});
	return model('Message', MessageSchema, 'message');
}
