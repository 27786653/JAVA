/**
 * @author chenjianchao
 * @module 备注设置
 * @description 添加、修改备注设置
 */
Ext.define('App.win.sys.RemarksInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('RemarksInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'content', 'orderId', 'byServiceTypeId' ]
		});

		Ext.define('byServiceTypeModel', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name']
		});
		
		var byServiceTypeStore = Ext.create('Ext.data.Store', {
			model : 'byServiceTypeModel',
			proxy : {
				type : 'ajax',
				url : './remark/getList',
				reader : {
					type : 'json',
					root : 'data'
				}
			}

		});
		byServiceTypeStore.load();
		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			fieldLabel : '内容',
			name : 'content',
			itemId : 'content',
			width : 433
		}, {
			xtype : 'numberfield',
			name : 'orderId',
			fieldLabel : '排序',
			itemId : 'orderId',
			value : 0,
			minValue : 0,
			maxValue : 99,
			width : 433
		}, {
			xtype : 'combo',
			fieldLabel : '服务种类',
			itemId : 'byServiceTypeId',
			name : 'byServiceTypeId',
			queryModel : 'local',
			displayField : 'name',
			valueField : 'id',
			store : byServiceTypeStore,
			width : 433
			}
		 ];

		Ext.apply(this, {
			modelName : 'RemarksInfo',
			loadUrl : './remark/load',
			saveUrl : './remark/save',
			updateUrl : './remark/update',
			deleteUrl : './remark/delete',
			padding : '5 5 5 5',
			items : items

		});
		this.callParent(arguments);

		
	}
});