/**
 * @author lizeda
 * @module 辅助资料管理面板
 */
Ext.define('App.view.sys.ItemsView', {
	extend : 'Ext.panel.Panel',

	initComponent : function() {
		var me = this;

		var itemsTree = Ext.create('App.view.sys.ItemsTree', {
			cId : me.cId,
			onItemClick : function(view, record) {

				itemDetailGrid.itemsId = record.data.id;
				itemDetailGrid.setTitle('辅助资料明细 --' + record.data.name);
				itemDetailGrid.getStore().getProxy().extraParams = {
					itemsId : record.data.id
				};
				itemDetailGrid.getStore().load();
			}
		});

		var itemDetailGrid = Ext.create('App.view.sys.ItemDetailGrid', {
			cId : me.cId
		});

		Ext.apply(this, {
			layout : 'border',
			items : [ itemsTree, itemDetailGrid ]
		});
		this.callParent(arguments);

	}
});

/**
 * 辅助资料管理类别
 */
Ext.define('App.view.sys.ItemsTree', {
	extend : 'Ext.ux.custom.AppTreeGridPanel',

	title : '辅助资料类别 ',
	region : 'west',
	width : 250,
	style : 'border-right:1px #ccc solid;',
	hideHeaders : true,

	initComponent : function() {
		var me = this;

		Ext.define('ItemsList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'text', 'name', 'code', 'category', 'enabled', 'expanded', 'allowEdit', 'allowDelete', 'sortCode' ]
		});

		var store = me.createStore({
			modelName : 'ItemsList',
			proxyUrl : './items/getList',
			proxyDeleteUrl : './items/delete'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});

		var columns = [ {
			xtype : 'treecolumn',
			text : "类别名称",
			dataIndex : 'name',
			flex : 1
		} ];

		Ext.apply(this, {
			selModel : Ext.create('Ext.selection.TreeModel', {
				mode : 'single'
			}),
			store : store,
			columns : columns
		});
		this.callParent(arguments);

		me.on('itemclick', function(view, record) {
			me.onItemClick(view, record);
		});
	},
	onItemClick : function(view, record) {
	},
	onAddClick : function() {
		var me = this;
		App.openWindow('辅助资料类别--添加', Ext.create('App.win.sys.ItemsInfoWin', {
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
			App.openWindow('辅助资料类别--编辑', Ext.create('App.win.sys.ItemsInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	}
});

/**
 * 辅助资料明细
 */
Ext.define('App.view.sys.ItemDetailGrid', {
	extend : 'Ext.ux.custom.AppGridPanel',
	region : 'center',

	initComponent : function() {
		var me = this;

		Ext.define('ItemDetailList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'name', 'code', 'category', 'enabled', 'expanded', 'allowEdit', 'allowDelete', 'sortCode', 'description' ]
		});

		var store = me.createStore({
			modelName : 'ItemDetailList',
			proxyUrl : './itemDetail/getPage',
			proxyDeleteUrl : './itemDetail/delete',
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		// store.load();

		var columns = [ {
			xtype : 'rownumberer',
			// text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "代码(值)",
			dataIndex : 'code',
			width : 100
		}, {
			text : "名称",
			dataIndex : 'name',
			width : 200
		}, {
			xtype : 'checkcolumn',
			text : "有效",
			dataIndex : 'enabled',
			width : 60,
			processEvent : function() {
				return false;
			}
		}, {
			xtype : 'checkcolumn',
			text : "允许编辑",
			dataIndex : 'allowEdit',
			width : 100,
			processEvent : function() {
				return false;
			}
		}, {
			xtype : 'checkcolumn',
			text : "允许删除",
			dataIndex : 'allowDelete',
			width : 100,
			processEvent : function() {
				return false;
			}
		}, {
			text : "排序",
			dataIndex : 'sortCode',
			align : 'center',
			width : 80
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
		} ];

		Ext.apply(this, {
			title : '辅助资料明细 --(请选择明细类别)',
			store : store,
			columns : columns
		});
		this.callParent(arguments);
	},
	onAddClick : function() {
		var me = this;
		
		if (!me.itemsId) {
			App.infoTip('还未选择辅助资料类别');
			return ;
		}
		App.openWindow('辅助资料明细--添加', Ext.create('App.win.sys.ItemDetailInfoWin', {
			itemsId : me.itemsId,
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
			App.openWindow('辅助资料明细--编辑', Ext.create('App.win.sys.ItemDetailInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	}

});
