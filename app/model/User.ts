import {Application} from 'egg';
import {compare, genSaltSync, hashSync} from 'bcryptjs';

export default (app: Application) => {
	const {mongoose} = app;
	const {Schema, model} = mongoose;
	const UserSchema = new Schema(
		{
			username: {type: String},
			password: {type: String},
			email: {type: String},
		},
		{
			timestamps: true
		});

	UserSchema.pre('save', async function save(next) {
		const user = this;
		if (!user.isModified('password')) {
			return next();
		}
		// @ts-ignore
		user.password = hashSync(user.password, genSaltSync(10));
		next();
	});

	UserSchema.methods.comparePassword = function comparePassword(password) {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			compare(password, this.password, (err, isMatch) => {
				if (!err) {
					resolve(isMatch);
				} else reject(err);
			})
		})
	};

	return model('User', UserSchema, 'user');
}
