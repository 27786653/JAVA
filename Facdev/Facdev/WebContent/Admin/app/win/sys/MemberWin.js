/**
 * @author lizeda
 * @module 角色权限控制 角色成员
 * @description 添加角色成员
 */
Ext.define('App.win.sys.MemberWin', {
	extend : 'Ext.panel.Panel',

	layout : 'border',

	initComponent : function() {
		var me = this;

		var treeStore = Ext.create('Ext.data.TreeStore', {
			autoLoad : true,
			// fields : [ 'id', 'name' ],
			proxy : {
				type : 'ajax',
				url : './organization/getList',
				reader : {
					type : 'json',
					root : 'children'
				}
			},
			root : {
				text : '所有部门',
				id : '-1'
			}
		});

		var memberGrid = Ext.create('MemberGrid', {
			region : 'center'
		});

		var items = [ {
			region : 'north',
			height : 30,
			itemId : 'title',
			xtype : 'displayfield',
			// style :
			// 'background-color:#fffdcd;font-size:60px;text-align:center;',
			style : 'background-color:#fffdcd;font-size:60px;',
			value : me.roleName + ';想拥有成员(请点击勾选)'
		}, {
			region : 'west',
			title : '按部门查看',
			width : 220,
			style : 'border-right:1px #ccc solid;',
			ui : 'light',
			rootVisible : false,
			xtype : 'treepanel',
			store : treeStore,
			listeners : {
				'load' : function(store, node) {
					me.down('treepanel').getSelectionModel().select(node.firstChild);
					memberGrid.getStore().getProxy().extraParams.departmentId = node.firstChild.data.id;
					memberGrid.getStore().load();
				},
				'itemclick' : function(e, record) {
					memberGrid.getStore().getProxy().extraParams.departmentId = record.data.id;
					memberGrid.getStore().reload();
				}
			}
		}, memberGrid ];

		Ext.apply(this, {
			items : items,
			buttonAlign : 'center',
			buttons : [ {
				text : '确定',
				iconCls : 'icon_save',
				scope : this,
				handler : function() {
					me.onSaveClick();
				}
			}, {
				text : '取消',
				iconCls : 'icon_delete',
				handler : function() {
					me.up('window').close();
				}
			} ]
		});
		this.callParent(arguments);
	},
	onSaveClick : function() {
		var me = this;
		var selections = me.down('gridpanel').getSelectionModel().getSelection();
		if (selections.length == 0) {
			App.infoTip('没有选择用户成员!');
			return;
		}

		var ids = [];
		for (var i = 0, r; r = selections[i]; i++) {
			ids.push(r.get('id'));
		}
		Ext.Ajax.request({
			url : './role/saveRoleMember',
			params : {
				roleId : me.roleId,
				userIds : ids.join(',')
			},
			success : function(response) {
				if (response.responseText != '') {
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						App.msgTip('操作成功！');
						me.up('window').close();

						if (me.onSaveSuccess)
							me.onSaveSuccess(res.result);
					} else
						App.errTip(res.msg);
				}
			}
		});
	}
});

/**
 * 成员
 */
Ext.define('MemberGrid', {
	extend : 'Ext.grid.Panel',
	title : '成员',

	initComponent : function() {
		var me = this;

		var store = me.createStore();
		// store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "登陆账户",
			dataIndex : 'account',
			width : 200
		}, {
			text : "姓名",
			dataIndex : 'realName',
			width : 200
		}, {
			text : "部门",
			dataIndex : 'department',
			width : 200
		}, {
			text : "性別",
			dataIndex : 'gender',
			width : 100
		}, {
			text : "手机号码",
			dataIndex : 'mobile',
			width : 200
		}, {
			text : "电子邮件",
			dataIndex : 'email',
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
			selModel : Ext.create('Ext.selection.CheckboxModel'),
			columnLines : true,
			store : store,
			columns : columns
		});
		this.callParent(arguments);
	},
	createStore : function() {
		var me = this;

		Ext.define('UserList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'code', 'account', 'realName', 'department', 'gender', 'mobile', 'email', 'enabled', 'description' ]
		});

		return Ext.create('Ext.data.Store', {
			model : 'UserList',
			autoDestroy : true,
			remoteSort : true,
			pageSize : globalPageSize,
			proxy : {
				type : 'ajax',
				url : './user/getPageByDepartmentId',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			}
		});
	}
});
