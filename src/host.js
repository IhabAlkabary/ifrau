import Port from './port';

export default class Host extends Port {
	constructor(id, src, cb) {

		var iframe = Host.createIFrame(src);
		var parent = document.getElementById(id);
		parent.appendChild(iframe);

		super(iframe.contentWindow, '*');

		var me = this;
		this.onEvent('ready', function() {
				me.sendEvent('csrf', {
					origin: window.location.origin,
					token: localStorage['XSRF.Token']
				});
				cb(me);
			}).onEvent('height', function(height) {
				iframe.style.height = height + 'px';
			}).onEvent('title', function(title) {
				document.title = title;
			}).onEvent('navigate', function(url) {
				document.location.href = url;
			}).open();

	}
	static createIFrame(src) {
		var iframe = document.createElement('iframe');
		iframe.width = '100%';
		iframe.style.border = 'none';
		iframe.style.overflow = 'hidden';
		iframe.scrolling = 'no';
		iframe.src = src;
		return iframe;
	}
}