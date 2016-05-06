/**
 * @author lizeda
 * @module 角色管理面板
 */
Ext.define('App.view.sys.RoleView', {
	extend : 'Ext.ux.custom.AppGridPanel',

	initComponent : function() {
		var me = this;

		Ext.define('RoleList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'code', 'name', 'category', 'enabled', 'allowEdit', 'allowDelete', 'description' ]
		});

		var store = me.createStore({
			modelName : 'RoleList',
			proxyUrl : './role/getPage',
			proxyDeleteUrl : './role/delete',
			sortProperty : 'code',
		    sortDirection : 'DESC'
		});
		store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "角色编号",
			dataIndex : 'code',
			width : 200
		}, {
			text : "角色名称",
			dataIndex : 'name',
			width : 200
		}, {
			text : "角色分类",
			dataIndex : 'category',
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
		App.openWindow('角色信息--添加', Ext.create('App.win.sys.RoleInfoWin', {
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
			App.openWindow('角色信息--编辑', Ext.create('App.win.sys.RoleInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	}
});