/**
 * @author lizeda
 * @module 操作按钮面板
 */
Ext.define('App.view.sys.ButtonView', {
	extend : 'Ext.ux.custom.AppGridPanel',

	initComponent : function() {
		var me = this;

		Ext.define('ButtonList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'sortCode', 'controlID', 'iconCls', 'text', 'event', 'category', 'split', 'enabled', 'description' ]
		});

		var store = me.createStore({
			modelName : 'ButtonList',
			proxyUrl : './button/getPage',
			proxyDeleteUrl : './button/delete'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "编码",
			dataIndex : 'controlID',
			width : 200
		}, {
			text : "图标",
			dataIndex : 'iconCls',
			width : 100
		}, {
			text : "名称",
			dataIndex : 'text',
			width : 100
		}, {
			text : "事件",
			dataIndex : 'event',
			width : 200
		}, {
			text : "分类",
			dataIndex : 'category',
			width : 140
		}, {
			xtype : 'checkcolumn',
			text : "分开",
			dataIndex : 'split',
			width : 60,
			processEvent : function() {
				return false;
			}
		}, {
			xtype : 'checkcolumn',
			text : "有效",
			dataIndex : 'enabled',
			width : 60,
			processEvent : function() {
				return false;
			}
		}, {
			text : "排序",
			dataIndex : 'sortCode',
			align : 'center',
			width : 60
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
		} ];

		Ext.apply(this, {
			store : store,
			columns : columns
		});
		this.callParent(arguments);

	},
	onAddClick : function() {
		var me = this;
		App.openWindow('操作按钮-添加', Ext.create('App.win.sys.ButtonInfoWin', {
			onSaveSuccess : function(action) {
				me.getStore().reload();
			}
		}), 480);
		
	},
	onEditClick : function() {
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 1) {
			var record = selections[0];
			App.openWindow('操作按钮-编辑', Ext.create('App.win.sys.ButtonInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	}
});
