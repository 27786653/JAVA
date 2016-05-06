/**
 * @author lizeda
 * @module 辅助资料管理
 * @description 添加、修改辅助资料类别
 */
Ext.define('App.win.sys.ItemsInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('ItemsInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'code', 'category', 'enabled', 'expanded', 'allowEdit', 'allowDelete', 'sortCode' ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'code',
			fieldLabel : '编号',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '名称',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '选项',
			vertical : false,
			items : [ {
				boxLabel : '有效',
				name : 'enabled',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '允许编辑',
				name : 'allowEdit',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '允许删除',
				name : 'allowDelete',
				inputValue : '1',
				checked : true
			} ]
		}, {
			xtype : 'textfield',
			name : 'sortCode',
			fieldLabel : '显示顺序',
			anchor : '100%',
			vtype : 'num'
		} ];

		Ext.apply(this, {

			modelName : 'ItemsInfo',
			loadUrl : './items/load',
			saveUrl : './items/save',
			updateUrl : './items/update',

			padding : '5 5 5 5',
			items : items

		});
		this.callParent(arguments);
	}
});