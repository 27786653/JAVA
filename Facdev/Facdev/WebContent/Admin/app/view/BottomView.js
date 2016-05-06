Ext.define('App.view.BottomView', {
	extend : 'Ext.ux.statusbar.StatusBar',
	alias : 'widget.BottomView',
	itemId : 'BottomView',
	border : false,
	//text : '技术支持：<a style="text-decoration:none",href="http://www.xl-heart.com">佛山市星联信息科技有限公司</a>',
	style : 'background:#627fa9;',
	defaults : {
		style : 'color:#fff;'
	},
	initComponent : function() {
		var content;
		var online=0;
		Ext.Ajax.request({
			url : './user/getUserName',
			async : false,
			success : function(resp, opts) {
				content = Ext.JSON.decode(resp.responseText).username;
			}
		});
		Ext.Ajax.request({
			url : './user/getOnline',
			async : false,
			success : function(resp, opts) {
				online = Ext.JSON.decode(resp.responseText).size;
			}
		});
		Ext.apply(this, {
			items : [ '<span tyle="font-size: 14px;color:#fff;">'+content+ '</span>'+ ',欢迎回来','-','当前在线用户：'+online,'-','版本：v1.0' ]
		});

		this.callParent(arguments);
	}

});