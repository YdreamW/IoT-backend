import { IHelper } from 'egg';

export default {
	/**
	 * 获取 JWT Token
	 */
	getAccessToken(this: IHelper) {
		const bearerToken = this.ctx.request.header.authorization;
		//@ts-ignore
		return bearerToken && bearerToken.replace('Bearer ', '');
	},
	/**
	 * 校验 JWT Token 有效性,无权限抛出 401 错误
	 */
	async verifyToken(this: IHelper) {
		const { ctx } = this;
		const token = this.getAccessToken();
		try {
			return await ctx.service.auth.verifyToken(token);
		} catch (e) {
			ctx.throw(401, e.message);
		}
	},

	/**
	 *  输入 Model 和数组以及对应的id
	 *  如果checkId 不存在则加入数组中
	 */
	async checkExistThenAdd(Model, Array, checkId) {
		const isExist =
			Model[Array].findIndex((id) => String(id) === String(checkId)) > -1;
		if (!isExist) {
			Model[Array].push(checkId);
			await Model.save();
		}
	},
	/**
	 *  输入 Model 和数组以及对应的id
	 *  从数组中删除 id
	 */

	async deleteId(Model, Array, checkId) {
		Model[Array] =
			Model &&
			Model[Array] &&
			Model[Array].filter((id) => String(id) !== String(checkId));
		await Model.save();
	},

	sleep: (numberMillis) => {
		let now = new Date();
		const exitTime = now.getTime() + numberMillis;
		const condition = true;
		while (condition) {
			now = new Date();
			if (now.getTime() > exitTime) return;
		}
	},
};
