/**
 * @author lizeda
 * @module 角色权限控制
 */
Ext.define('App.view.sys.RolePermissionView', {
	extend : 'Ext.panel.Panel',

	initComponent : function() {
		var me = this;

//		var roleUserGrid = Ext.create('App.view.sys.MemberGrid', {
//			title : '角色成员',
//			cId : me.cId
//		});

		var menuTree = Ext.create('App.view.sys.MenuTree', {
			title : '菜单权限',
			cId : me.cId
		});

		var buttonPanel = Ext.create('App.view.sys.ButtonPanel', {
			title : '按钮权限',
			cId : me.cId
		});

		var tabs = Ext.widget('tabpanel', {
			activeTab : 0,
			plain : true,
			title : '角色授权',
			// ui : 'light',
			region : 'center',
			margins : '1 0 0 1',
			autoScroll : true,
//			items : [ roleUserGrid, menuTree, buttonPanel ]
			items : [ menuTree, buttonPanel ]

		});

		var treeStore = Ext.create('Ext.data.TreeStore', {
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : './role/getList',
				reader : 'json'
			},
			root : {
				text : '所有角色',
				id : '-1'
			}
		});

		Ext.apply(this, {
			layout : 'border',
			items : [ {
				region : 'west',
				title : '按角色查看',
				width : 220,
				style : 'border-right:1px #ccc solid;',
				ui : 'light',
				xtype : 'treepanel',
				store : treeStore,
				listeners : {
					'itemclick' : function(view, record) {
						onItemclick(view, record);
					}

				}
			}, tabs ]
		});
		this.callParent(arguments);

		var onItemclick = function(view, record) {

			tabs.setTitle('角色授权 - ' + record.data.text);
			tabs.setActiveTab(0);

//			roleUserGrid.roleId = record.data.id;
//			roleUserGrid.roleName = record.data.text;
//			roleUserGrid.getStore().getProxy().extraParams.roleId = record.data.id;
//			roleUserGrid.getStore().loadPage(1);

//			menuTree.roleId = record.data.id;
//			menuTree.firstLoaded = true;
			
			menuTree.roleId = record.data.id;
			menuTree.firstLoaded = true;
			menuTree.getStore().getProxy().extraParams.roleId = record.data.id;
			menuTree.getStore().load();

			buttonPanel.roleId = record.data.id;
			buttonPanel.firstLoaded = false;
		};
	}

});

/**
 * 角色成员
 */
Ext.define('App.view.sys.MemberGrid', {
	extend : 'Ext.ux.custom.AppGridPanel',

	roleId : -1,
	roleName : '',

	initComponent : function() {
		var me = this;

		Ext.define('MemberList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'code', 'account', 'realName', 'department', 'gender', 'mobile', 'email', 'enabled', 'description' ]
		});

		var store = me.createStore({
			modelName : 'MemberList',
			proxyUrl : './user/getPageByRoleId',
			proxyDeleteUrl : './user/delete'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		// store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "登陆账户",
			dataIndex : 'account',
			width : 150
		}, {
			text : "姓名",
			dataIndex : 'realName',
			width : 150
		}, {
			text : "部门",
			dataIndex : 'department',
			width : 200
		}, {
			text : "性別",
			dataIndex : 'gender',
			width : 80
		}, {
			text : "手机号码",
			dataIndex : 'mobile',
			width : 150
		}, {
			text : "电子邮件",
			dataIndex : 'email',
			width : 150
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

		me.on('render', function() {

			var toolbar = me.down('toolbar');
			var buttons = toolbar.items.items;
			Ext.each(buttons, function(button, index) {
				if (!button.itemId.match('Member+')) {
					button.hidden = true;
					button.disabled = true;
				}
			});
		});

		me.getSelectionModel().on('selectionchange', function(sm, records) {
			if (me.down('#btnDeleteMember'))
				me.down('#btnDeleteMember').setDisabled(sm.getCount() == 0);
		});

	},
	onAddMemberClick : function() {
		var me = this;

		if (me.roleId == -1) {
			App.infoTip('请选择角色!');
			return;
		}
		App.openWindow('为角色分配成员', Ext.create('App.win.sys.MemberWin', {
			height : 450,
			roleId : me.roleId,
			roleName : me.roleName,
			onSaveSuccess : function(action) {
				me.getStore().reload();
			}
		}), 960);
	},
	onDeleteMemberClick : function() {
		var me = this;

		var selections = me.getSelectionModel().getSelection();
		var ids = [];
		for (var i = 0, r; r = selections[i]; i++) {
			ids.push(r.get('id'));
		}
		Ext.Ajax.request({
			url : './role/deleteRoleMember',
			params : {
				roleId : me.roleId,
				userIds : ids.join(',')
			},
			success : function(response) {
				if (response.responseText != '') {
					var res = Ext.JSON.decode(response.responseText);
					if (res.success) {
						App.msgTip('操作成功！');

						me.getStore().reload();
					} else
						App.errTip(res.msg);
				}
			}
		});
	}
});

/**
 * 菜单权限
 */
Ext.define('App.view.sys.MenuTree', {
	extend : 'Ext.ux.custom.AppTreeGridPanel',

	roleId : -1,
	firstLoaded : false,

	initComponent : function() {
		var me = this;

		Ext.define('MenuList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'sortCode', 'parentId', 'text', 'code', 'iconCls', 'enabled', 'expanded' ]
		});

		var store = me.createStore({
			modelName : 'MenuList',
			proxyUrl : './menu/getListByRoleId'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		// store.load();

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
			text : "排序",
			dataIndex : 'sortCode',
			align : 'center',
			width : 100
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
		} ];
		
		var tbarMenus =[];
		tbarMenus.push({
			xtype : 'button',
			itemId : 'btnAuthorization',
			text : '授权',
			scope : me,
			iconCls : 'icon_window_accept',
			handler : me.onAuthorizationClick
		});

		Ext.apply(this, {
			selModel : Ext.create('Ext.selection.TreeModel'),
			store : store,
			columns : columns,
			tbarMenus : tbarMenus,
			listeners : {
				'load' : function() {
					me.expandAll();
				}
			}
		});
		this.callParent(arguments);

		me.on('render', function() {

			var toolbar = me.down('toolbar');
			var buttons = toolbar.items.items;
			Ext.each(buttons, function(button, index) {
				if (button.itemId.match('Member+')) {
					button.hidden = true;
					button.disabled = true;
				}
			});
		});

		me.on('activate', function() {
			if (!me.firstLoaded) {
				store.getProxy().extraParams.roleId = me.roleId;
				store.load();
				me.firstLoaded = true;
			}
		});

		me.on('checkchange', function(node, checked) {

			if (checked) {
				node.eachChild(function(child) {
					childNodeCheck(child, true);
				});
			} else {
				node.eachChild(function(child) {
					childNodeCheck(child, false);
				});
			}
			parentNodeCheck(node);
		});

		var childNodeCheck = function(node, check) {
			node.set('checked', check);
			if (node.isNode) {
				node.eachChild(function(child) {
					childNodeCheck(child, check);
				});
			}
		};

		var parentNodeCheck = function(node) {
			var parent = node.parentNode;
			if (parent != null) {
				parent.set('checked', true);
				parentNodeCheck(parent);
			}
		};
	},
	onAcceptResetClick : function() {

	},
	onAuthorizationClick : function() {
		var me = this;

		var s = me.getChecked();
		var ids = [];
		for (var i = 0, r; r = s[i]; i++) {
			if (r.get('id') != 'root') {
				ids.push(r.get('id'));
			}
		}

		me.setLoading('权限保存中...');
		Ext.Ajax.request({
			url : './role/saveRoleMenu',
			params : {
				menuIds : ids.join(','),
				roleId : me.roleId
			},
			success : function(response) {
				me.setLoading(false);
				var res = Ext.JSON.decode(response.responseText);
				if (res && !res.success)
					Ext.Msg.alert('Error', res.msg);
				else {
					App.msgTip('保存成功！');
				}
			},
			failure : function(response, opts) {
				me.setLoading(false);
			}
		});
	}
});

/**
 * 按钮权限面板
 */
Ext.define('App.view.sys.ButtonPanel', {
	extend : 'Ext.panel.Panel',
	layout : 'border',

	roleId : -1,
	menuId : -1,
	firstLoaded : false,

	initComponent : function() {
		var me = this;

		var treeStore = Ext.create('Ext.data.TreeStore', {
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : './menu/getAllByRoleId',
				reader : 'json'
			},
			root : {
				checked : null,
				text : '所有菜单',
				id : '-1'
			}
		});

		var buttonGrid = Ext.create('App.view.sys.ButtonGrid', {
			region : 'center',
			title : '想拥有权限按钮(请勾选)',
			cId : me.cId
		});
		

		Ext.apply(this, {

			items : [ {
				region : 'west',
				title : '系统菜单',
				width : 220,
				style : 'border-right:1px #ccc solid;',
				ui : 'light',
				xtype : 'treepanel',
				store : treeStore,
				rootVisible : false,
				listeners : {
					'load' : function() {
						me.down('treepanel').expandAll();
					},
					'itemclick' : function(view, record) {

						me.menuId = record.data.id;

						buttonGrid.roleId = me.roleId;
						buttonGrid.menuId = me.menuId;

						buttonGrid.getStore().getProxy().extraParams.roleId = me.roleId;
						buttonGrid.getStore().getProxy().extraParams.menuId = record.data.id;
						buttonGrid.getStore().load();
					}
				}
			}, buttonGrid ]
		});
		this.callParent(arguments);

		me.on('activate', function() {

			if (!me.firstLoaded) {

				buttonGrid.getStore().removeAll();

				treeStore.getProxy().extraParams.roleId = me.roleId;
				treeStore.load();
				me.firstLoaded = true;
			}
		});
	},
	onAcceptResetClick : function() {

	},
	onAuthorizationClick : function() {
		var me = this;

		App.log(me);

		var s = me.down('gridpanel').getSelectionModel().getSelection();
		var ids = [];
		for (var i = 0, r; r = s[i]; i++) {
			if (r.get('id') != 'root') {
				ids.push(r.get('id'));
			}
		}

		me.setLoading('权限保存中...');
		Ext.Ajax.request({
			url : './role/saveRoleMenuButton',
			params : {
				buttonIds : ids.join(','),
				menuId : me.menuId,
				roleId : me.roleId
			},
			success : function(response) {
				me.setLoading(false);
				var res = Ext.JSON.decode(response.responseText);
				if (res && !res.success)
					Ext.Msg.alert('Error', res.msg);
				else {
					App.msgTip('保存成功！');
				}
			},
			failure : function(response, opts) {
				me.setLoading(false);
			}
		});
	}
});

/**
 * 按钮权限面板 -- 按钮Grid
 */
Ext.define('App.view.sys.ButtonGrid', {
	extend : 'Ext.ux.custom.AppGridPanel',

	roleId : -1,
	menuId : -1,
	oldActions : [],
	selectActions : [],
	unselectActions : [],

	initComponent : function() {
		var me = this;

		Ext.define('ButtonList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'sortCode', 'controlID', 'iconCls', 'text', 'category', 'enabled', 'description','btnSortCode' ]
		});

		var store = me.createStore({
			modelName : 'ButtonList',
			proxyUrl : './button/getPageByMenuId',
			sortProperty : 'btnSortCode',
			sortDirection : 'ASC'
		});
		store.on('load', function(store, records) {
			me.onChangeChecked(store, records);
		});

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "名称",
			dataIndex : 'text',
			width : 200
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
		}, {
			text : "排序",
			dataIndex : 'btnSortCode',
			flex : 1,
			editor:{
                 allowBlank:true
            }
		} ];
		
		var tbarMenus =[];
		tbarMenus.push({
			xtype : 'button',
			itemId : 'btnAuthorization',
			text : '授权',
			scope : me,
			iconCls : 'icon_window_accept',
			handler : me.onAuthorizationClick
		},{
			xtype : 'button',
			itemId : 'btnSaveSort',
			text : '保存排序',
			scope : me,
			iconCls : 'icon_save',
			handler : me.onSaveSortClick
		});

		Ext.apply(this, {
			store : store,
			columns : columns,
			tbarMenus : tbarMenus,
			plugins:[
	                 Ext.create('Ext.grid.plugin.CellEditing',{
	                     clicksToEdit:1 //设置单击单元格编辑
	                 })
	        ],
			listeners : {
				'select' : function(cur, record) {
					me.selectActions.push(record.get('id'));
					Ext.Array.remove(me.unselectActions, record.get('id'));
				},
				'deselect' : function(cur, record) {
					me.unselectActions.push(record.get('id'));
					Ext.Array.remove(me.selectActions, record.get('id'));
				}
			}
		});
		this.callParent(arguments);

		me.on('render', function() {

			var toolbar = me.down('toolbar');
			var buttons = toolbar.items.items;
			Ext.each(buttons, function(button, index) {
				if (button.itemId.match('Member+')) {
					button.hidden = true;
					button.disabled = true;
				}
			});
		});
	},	
	createStore : function(config) {
		Ext.applyIf(this, config);

		return Ext.create('Ext.data.Store', {
			model : config.modelName,
			// autoDestroy: true,
			// autoLoad: true,
			
			remoteSort : true,
			pageSize : globalPageSize,
			proxy : {
				type : 'ajax',
				url : config.proxyUrl,
				extraParams : config.extraParams || null,
//				actionMethods:{
//					read:'GET'
//				},

				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			},
			sorters : [ {
				property : config.sortProperty || 'btnSortCode',
				direction : config.sortDirection || 'ASC'
			} ]
		});
	},
	onChangeChecked : function(store, records) {
		var me = this;

		Ext.each(records, function(item, itemIndex) {
			me.getView().onRowDeselect(itemIndex);
		});

		Ext.Ajax.request({
			url : './button/getListByRoleIdAndMenuId',
			params : {
				'roleId' : me.roleId,
				'menuId' : me.menuId
			},
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				if (res == null)
					return;
				try {
					var oldActions = [];
					Ext.each(res, function(item, itemIndex) {
						var index = me.getStore().findBy(function(record, id) {
							return record.get('text') == item.text;
						});
						me.getView().onRowSelect(index);
						oldActions.push(item.id);
					});
					me.oldActions = oldActions;
				} catch (e) {
				}
			}
		});
	},
	onAcceptResetClick : function() {

	},
	onAuthorizationClick : function() {
		var me = this;

		var selects = Ext.Array.unique(me.selectActions); // 去掉所选重复数据
		var unselects = Ext.Array.unique(me.unselectActions); // 去掉反选重复数据
		// 合并需要保存的数据并返回不重复的数组
		var saves = Ext.Array.merge(me.oldActions, selects);

		App.log(selects);
		App.log(unselects);
		App.log(saves);

		// 从要保存的数组里删除不需要保存的数组
		Ext.Array.forEach(unselects, function(item, index) {
			// 删除
			Ext.Array.remove(saves, item);
		});
		App.log(saves);

		me.setLoading('权限保存中...');
		Ext.Ajax.request({
			url : './role/saveRoleMenuButton',
			params : {
				buttonIds : saves.join(','),
				menuId : me.menuId,
				roleId : me.roleId
			},
			success : function(response) {
				me.selectActions = [];
				me.setLoading(false);
				var res = Ext.JSON.decode(response.responseText);
				if (res && !res.success)
					Ext.Msg.alert('Error', res.msg);
				else {
					App.msgTip('保存成功！');
				}
			},
			failure : function(response, opts) {
				me.setLoading(false);
			}
		});
	},
	onSaveSortClick : function() {
		
		console.log('onSaveSortClick');
		var me = this;
	
		me.getStore().sync({
				success : function() {
					me.getStore().reload();
					App.msgTip('操作成功！');
				},
				failure : function() {
					App.errTip('数据同步失败！');
				}
			});
	}
});
