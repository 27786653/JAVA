Ext.define('Ext.ux.custom.AppPanelClass', {
	extend : 'Ext.panel.Panel',
	initComponent : function() {
		var me = this;

		// 获取按钮.
		var buttonList = new Array();
		Ext.Ajax.request({
			url : './button/getToolbar',
			params : {
				menuId : me.cId
			},
			async : false,
			method : 'GET',
			callback : function(options, success, response) {
				var data = Ext.decode(response.responseText).data;
				Ext.each(data, function(item) {
					buttonList.push({
						xtype : 'button',
						itemId : 'btn' + item.controlID,
						iconCls : item.iconCls,
						// iconAlign : 'top',
						text : item.text,
						scope : me,
						handler : eval('me.' + item.event)
					});
				});
			}
		});
		var buttonBar = {
			xtype : 'toolbar',
			dock : 'top',
			items : buttonList
		};

		var dockedItems = [];
		if (me.searchBar != null) {
			for (var i = 0; i < me.searchBar.length; i++) {
				dockedItems.push(me.searchBar[i]);
			}
		}
		if (me.firstBar != null) {
			dockedItems.push(me.firstBar);
		}
		if (me.secondBar != null) {
			dockedItems.push(me.secondBar);
		}
		if (me.thirdBar != null) {
			dockedItems.push(me.thirdBar);
		}

		dockedItems.push(buttonBar);
		var body = {
			layout : me.layout,
			items : me.items,
			dockedItems : dockedItems
		};
		Ext.apply(this, body);
		this.callParent(arguments);
	}
});