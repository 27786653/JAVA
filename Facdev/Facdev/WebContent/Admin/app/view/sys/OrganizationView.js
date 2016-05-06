/**
 * @author lizeda
 * @module 组织机构管理面板
 */
Ext.define('App.view.sys.OrganizationView', {
	extend : 'Ext.ux.custom.AppTreeGridPanel',

	initComponent : function() {
		var me = this;

		Ext.define('OrganizationList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'sortCode', 'parentId', 'name', 'code', 'enabled', 'expanded' ]
		});

		var store = me.createStore({
			modelName : 'OrganizationList',
			proxyUrl : './organization/getList',
			proxyDeleteUrl : './organization/delete'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		store.load();

		var columns = [ {
			xtype : 'treecolumn',
			text : "组织机构名称",
			dataIndex : 'name',
			width : 300,
			sortable : false,
		}, {
			text : "编码",
			dataIndex : 'code',
			width : 200
		}, {
			xtype : 'checkcolumn',
			text : "有效",
			dataIndex : 'enabled',
			width : 80,
			processEvent : function() {
				return false;
			}
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
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
		App.openWindow('组织机构--添加', Ext.create('App.win.sys.OrganizationInfoWin', {
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
			App.openWindow('组织机构--编辑', Ext.create('App.win.sys.OrganizationInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	},
	onRefreshClick : function() {
		this.getStore().reload();
	},

});