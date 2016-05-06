/**
 * @author lizeda
 * @module 菜单管理面板
 */
Ext.define('App.view.sys.MenuView', {
	extend : 'Ext.ux.custom.AppTreeGridPanel',

	initComponent : function() {
		var me = this;

		Ext.define('MenuList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [  'id','sortCode','parentId','text', 'code', 'iconCls', 'navigateUrl', 'enabled', 'expanded', 'allowEdit', 'allowDelete' ]
		});

		var store = me.createStore({
			modelName : 'MenuList',
			proxyUrl : './menu/getList',
			proxyDeleteUrl : './menu/delete',
		 	sortProperty : 'sortCode',
		 	sortDirection : 'ASC'
		});
		store.load();

		var columns = [ {
			xtype : 'treecolumn',
			text : "菜单名称",
			dataIndex : 'text',
			width : 250,
			sortable : false,
			editor : {
				allowBlank : false
			}
		}, {
			text : "菜单编码",
			dataIndex : 'code',
			width : 200
		}, {
			text : "链接地址",
			dataIndex : 'navigateUrl',
			// width : 250,
			editor : {
				allowBlank : false
			},
			flex : 1
		}, {
			xtype : 'checkcolumn',
			text : "有效",
			dataIndex : 'enabled',
			width : 60,
			processEvent : function() {
				return false;
			}
		}, /*
			 * { xtype : 'checkcolumn', text : "展开", dataIndex : 'expanded',
			 * width : 60, processEvent : function() { return false; } },
			 */{
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
			width : 100
		} ];

		Ext.apply(this, {
			selModel : Ext.create('Ext.selection.TreeModel', {
				mode : 'single'
			}),
			store : store,
			columns : columns,
			listeners : {
				'load' : function() {
					me.expandAll();
				}
			}
		});
		this.callParent(arguments);

	},
	onAddClick : function() {
		var me = this;
		App.openWindow('定义菜单--添加', Ext.create('App.win.sys.MenuInfoWin', {
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
			App.openWindow('定义菜单--编辑', Ext.create('App.win.sys.MenuInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	},
	onAllotButtonClick : function() {
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 0) {
			App.infoTip('你当前未选中任何一行!');
			return;
		}
		if (selections.length == 1) {
			var record = selections[0];
			App.openWindow(record.get('text') + '--想拥有按钮(请勾选)', Ext.create('App.win.sys.AllotButtonWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	}
});
