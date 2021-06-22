import 'egg';

declare module 'egg' {
	interface Application {
		emqtt: any;
		mqtt: any;
	}
}
