import {EggPlugin} from 'egg';

const plugin: EggPlugin = {
	// static: true,
	// nunjucks: {
	//   enable: true,
	//   package: 'egg-view-nunjucks',
	// },

	emqtt: {enable: true, package: 'egg-emqtt',},
	mongoose: {
		enable: true,
		package: 'egg-mongoose',
	},
	routerPlus: {
		enable: true,
		package: 'egg-router-plus',
	},
	jwt: {
		enable: true,
		package: 'egg-jwt'
	}
};

export default plugin;
