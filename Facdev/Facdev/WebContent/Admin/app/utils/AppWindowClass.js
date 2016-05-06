Ext.define('App.utils.AppWindowClass', {
	extend : 'Ext.window.Window',
	initComponent : function() {
		var me = this;
		var clientWidth = document.body.clientWidth;
		var clientHeight = document.body.clientHeight;
		var XInterval = me.XInterval;
		var YInterval = me.YInterval;
		var winWidth = me.winWidth;
		var winHeight = me.winHeight;
		var spreadSpeed = me.spreadSpeed;// 窗口展开速度
		if (XInterval == null) {
			XInterval = 50;
		}
		if (YInterval == null) {
			YInterval = 50;
		}
		if (winWidth == null) {
			winWidth = 600;
		}
		if (winHeight == null) {
			winHeight = 500;
		}
		if (spreadSpeed == null) {
			spreadSpeed = 500;
		}

		var body = {
			layout : me.layout,
			items : me.items,
			width : 0,
			autoScroll : true,
			height : 0,
			x : clientWidth / 2,
			y : clientHeight / 2
		};
		Ext.apply(this, body);
		this.callParent(arguments);

		this.animate({
			duration : spreadSpeed,// 动态时间
			keyframes : {
				50 : {
					width : winWidth,
					x : (clientWidth - winWidth) / 2
				},
				100 : {
					height : winHeight,
					y : (clientHeight - winHeight) / 2
				}
			}
		});
	}
});