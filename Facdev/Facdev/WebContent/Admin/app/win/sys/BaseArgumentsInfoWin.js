/**
 * @author chenjianchao
 * @module 基本参数设置
 * @description 添加、修改基本参数设置
 */
Ext.define('App.win.sys.BaseArgumentsInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('BaseArgumentsInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'value' ]
		});
		
		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			fieldLabel : '关键字',
			name : 'name',
			itemId : 'name',
			width : 433
		}, {
			xtype : 'textfield',
			name : 'value',
			fieldLabel : '值',
			itemId : 'value',
			width : 433
		}
		 ];

		Ext.apply(this, {
			modelName : 'BaseArgumentsInfo',
			loadUrl : './baseArguments/load',
			saveUrl : './baseArguments/save',
			updateUrl : './baseArguments/update',
			deleteUrl : './baseArguments/delete',
			padding : '5 5 5 5',
			items : items

		});
		this.callParent(arguments);

		
	}
});