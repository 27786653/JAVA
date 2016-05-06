Ext.define('LoYi.controller.Main', {
	extend : 'Ext.app.Controller',
	requires : [ 'LoYi.view.Login' ],
	onLaunch : function() {
		var win = Ext.create('LoYi.view.Login');
		if (win) {
			win.show();
		}
	}
});
