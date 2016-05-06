/**
 * @author lizeda
 * @module 菜单管理
 * @description 分配按钮窗口
 */
Ext.define('App.win.sys.AllotButtonWin', {
	extend : 'Ext.grid.Panel',

	dataId : null,
	oldActions : [],
	selectActions : [],
	unselectActions : [],

	initComponent : function() {
		var me = this;

		var columns = [ {
			text : "按钮名称",
			dataIndex : 'text',
			width : 300,
			sortable : true
		}, {
			text : "权限描述",
			dataIndex : 'description',
			flex : 1
		} ];

		var store = me.createStore();
		store.load();

		Ext.apply(this, {
			height : 300,
			store : store,
			columns : columns,
			selModel : Ext.create('Ext.selection.CheckboxModel'),
			border : false,
			enableColumnMove : false,
			buttonAlign : 'center',
			buttons : [ {
				text : '确定',
				iconCls : 'icon_save',
				scope : this,
				handler : me.saveMenuBotton
			}, {
				text : '取消',
				iconCls : 'icon_delete',
				handler : function() {
					me.up('window').close();
				}
			} ],
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

	},
	createStore : function() {
		var me = this;

		Ext.define('ButtonList', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'int'
			}, 'text', 'description' ]
		});

		return Ext.create('Ext.data.Store', {
			model : 'ButtonList',
			autoDestroy : true,
			remoteSort : true,
			pageSize : globalPageSize,
			proxy : {
				type : 'ajax',
				url : './button/getPage',
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				}
			},
			sorters : [ {
				property : 'text',
				direction : 'ASC'
			} ],
			listeners : {
				'load' : function(store, records) {
					me.onChangeChecked(store, records);
				}
			}
		});
	},
	onChangeChecked : function(store, records) {
		var me = this;

		Ext.each(records, function(item, itemIndex) {
			me.getView().onRowDeselect(itemIndex);
		});

		Ext.Ajax.request({
			url : './button/getListByMenuId',
			params : {
				'id' : me.dataId
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

	// 保存菜单按钮
	saveMenuBotton : function() {

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

		me.setLoading('菜单按钮保存中...');
		Ext.Ajax.request({
			url : './menu/saveMenuBotton',
			params : {
				ids : saves.join(','),
				menuId : me.dataId
			},
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				if (res && !res.success)
					Ext.Msg.alert('Error', res.msg);
				else {
					App.msgTip('保存成功！');
					me.setLoading(false);
					me.selectActions = [];
					me.unselectActions = [];
					me.up('window').close();
				}
			},
			failure : function(response, opts) {
				me.setLoading(false);
			}
		});
	}
});