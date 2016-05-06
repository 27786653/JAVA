/**
 * @author lizeda
 * @module 辅助资料管理
 * @description 添加、修改辅助资料明细
 */
Ext.define('App.win.sys.ItemDetailInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('ItemDetailInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'itemsId', 'name', 'code', 'enabled', 'allowEdit', 'allowDelete', 'description' ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'code',
			fieldLabel : '代码',
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
			name : 'description',
			fieldLabel : '描述',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'ItemDetailInfo',
			loadUrl : './itemDetail/load',
			saveUrl : './itemDetail/save' + '?itemsId=' + me.itemsId,
			updateUrl : './itemDetail/update',

			padding : '5 5 5 5',
			items : items

		});
		this.callParent(arguments);
	}
});