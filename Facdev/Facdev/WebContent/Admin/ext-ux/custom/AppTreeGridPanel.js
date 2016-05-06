Ext.define('Ext.ux.custom.AppTreeGridPanel', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.Apptreegrid',
	xtype : 'tree-grid',
	initComponent : function() {
		var me = this;

		var UniqueID = me.cName + (me.cId ? me.cId : '') + (me.myId ? me.myId : '');

		this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 2
		});

		var tbarMenus = new Array();

		var toolbarUrl = me.toolbarUrl ? me.toolbarUrl : './button/getToolbar';
		var toolbarParams = me.toolbarParams ? me.toolbarParams : {
			menuId : me.cId
		};
		Ext.Ajax.request({
			url : toolbarUrl,
			params : toolbarParams,
			async : false,
			method : 'GET',
			callback : function(options, success, response) {
				var data = Ext.JSON.decode(response.responseText).data;
				Ext.each(data, function(item) {
					tbarMenus.push({
						xtype : 'button',
						itemId : 'btn' + item.controlID,
						iconCls : item.iconCls,
						// iconAlign : 'top',
						text : item.text,
						scope : me,
						disabled : item.controlID.match('Edit') || item.controlID.match('Delete'),
						handler : eval('me.' + item.event)
					});
				});
			}
		});

		if (App.HaveActionMenu(me.cButtons, 'Sync') && App.HaveAction(me.cName + 'Edit')) {
			tbarMenus.push('-');
			tbarMenus.push('提示：双击单元格可修改数据');
		}

//		var oldColumns = me.columns;
//		var roleColumns = App.HaveAction('RoleAssignColumns') ? [ '->', {
//			xtype : 'button',
//			itemId : 'btnColumnsAction',
//			text : '列权限',
//			scope : this,
//			handler : function() {
//				Ext.create('App.app.infrastructure.rolecolums', {
//					dataColumns : oldColumns,
//					UniqueID : UniqueID
//				});
//			}
//		} ] : [];

		// tbarMenus = Ext.Array.merge(tbarMenus, me.tbarMenus, roleColumns);
		tbarMenus = Ext.Array.merge(tbarMenus, me.tbarMenus);

		if (tbarMenus.length == 0)
			me.hideTBar = true;
		this.ttoolbar = Ext.create('Ext.toolbar.Toolbar', {
			hidden : me.hideTBar || false,
			items : tbarMenus
		});

		var dockedItems = new Array();
		dockedItems.push(this.ttoolbar);

		var tbarTop = me.tbarTop ? me.tbarTop : false;
		if (tbarTop) {
			dockedItems = Ext.Array.merge(dockedItems, me.dockedItems);
		} else {
			dockedItems = Ext.Array.merge(me.dockedItems, dockedItems);
		}

//		if (me.cName) {
//			var newcolumns = [];
//			var haveColumn = new App.HaveColumn(UniqueID);
//			Ext.each(me.columns, function(item) {
//				var have = haveColumn.have(item.dataIndex);
//				if (have || have == -2) {
//					var newitem = Ext.apply(item, {
//						id : UniqueID + item.dataIndex
//					});
//					newcolumns.push(newitem);
//				}
//			});
//			me.columns = newcolumns;
//		}

		me.showCheckBox = me.showCheckBox == undefined ? 0 : me.showCheckBox;

		Ext.apply(this, {
			stateful : me.cName ? true : false,
			stateId : me.cName ? UniqueID + 'treegird' : null,
			enableColumnMove : me.cName ? true : false,
			plugins : App.HaveActionMenu(me.cButtons, 'Sync') && App.HaveAction(me.cName + 'Edit') ? [ this.cellEditing ] : this.plugins,
			// selModel : me.selModel ? me.selModel : (me.showCheckBox ?
			// Ext.create('Ext.selection.CheckboxModel') : null),
			selModel : me.selModel ? me.selModel : (me.showCheckBox ? Ext.create('Ext.selection.CheckboxModel') : null),
			border : false,
			// useArrows : true, //显示文件夹的形式
			rootVisible : false,
			multiSelect : true,
			singleExpand : true,
			columnLines : true,
			dockedItems : dockedItems,
			// tbar : this.ttoolbar,
			viewConfig : {
				stripeRows : true,// 在表格中显示斑马线
//				plugins : {
//					ptype : 'treeviewdragdrop',
//					appendOnly : false
//				},
				listeners : {
//					'drop' : this.onDragDrop
				}
			}
		});
		this.getSelectionModel().on('selectionchange', function(sm, records) {
			if (me.down('#btnEdit'))
				me.down('#btnEdit').setDisabled(sm.getCount() != 1);
			if (me.down('#btnDelete'))
				me.down('#btnDelete').setDisabled(sm.getCount() == 0);
		});

		this.callParent(arguments);
	},
	createStore : function(config) {
		Ext.applyIf(this, config);

		return Ext.create('Ext.data.TreeStore', {
			model : config.modelName,
//			autoDestroy : true,
			autoLoad : false,
			proxy : {
				type : 'ajax',
				url : config.proxyUrl
				
			},
			root : {
				id : '-1'
			},
			sorters : [ {
				property : config.sortProperty || 'id',
				direction : config.sortDirection || 'DESC'
			} ]
		});
	},
	onDragDrop : function(node, data, overModel, dropPosition, eOpts) {
		App.log({
			movedId : data.records[0].getId(),
			referenceId : overModel.getId(),
			dropPosition : dropPosition
		});
	},
	onAddClick : function() {
	},
	onEditClick : function() {
	},
	onDeleteClick : function() {
		var me = this;
		App.confirmTip('删除的记录不可恢复，继续吗？', function(btn) {
			if (btn == 'yes') {
				var s = me.getSelectionModel().getSelection();
				var ids = [];
				for (var i = 0, r; r = s[i]; i++) {
					ids.push(r.get('id'));
				}
				Ext.Ajax.request({
					url : me.proxyDeleteUrl,
					params : {
						ids : ids.join(',')
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
	},
	onSyncClick : function() {
		var me = this;
		if (Ext.select('td[class*=x-grid-dirty-cell]').getCount() <= 0) {
			App.msgTip('没有需要同步的数据！');
			return;
		}
		if (me.down('#btnSync') == null) {
			me.getStore().sync({
				success : function() {
					me.getStore().reload();
					App.msgTip('操作成功！');
				},
				failure : function() {
					App.errTip('数据同步失败！');
				}
			});
		} else {
			var orgText = me.down('#btnSync').getText();
			me.down('#btnSync').setText('数据同步中...').setDisabled(true);
			me.getStore().sync({
				success : function() {
					me.getStore().reload();
					App.msgTip('操作成功！');
					me.down('#btnSync').setText(orgText).setDisabled(false);
					;
				},
				failure : function() {
					App.errTip('数据同步失败！');
					me.down('#btnSync').setText(orgText).setDisabled(false);
				}
			});
		}
	}
});
