Ext.define('Ext.ux.custom.AppGridPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.Appgrid',
	// requires: [
	// 'Ext.ux.grid.FiltersFeature'
	// ],
	xtype : 'cell-editing',
	openSearch : 0,
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
						type : item.type,
						text : item.text,
						scope : me,
						disabled : item.enabled==1?false:true,
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
		if( me.tbarMenus!=null){
			tbarMenus = Ext.Array.merge(tbarMenus, me.tbarMenus);
		}
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

		Ext.apply(this, {
			stateful : me.cName ? true : false,
			stateId : me.cName ? (UniqueID + 'gird') : null,
			enableColumnMove : me.cName ? true : false,
			plugins : App.HaveActionMenu(me.cButtons, 'Sync') && App.HaveAction(me.cName + 'Edit') ? [ this.cellEditing ] : this.plugins,
			selModel : Ext.create('Ext.selection.CheckboxModel'),
			border : false,
			columnLines : true,
			dockedItems : dockedItems,
			// tbar: this.ttoolbar,
			bbar : me.hideBBar ? null : Ext.create('Ext.PagingToolbar', {
				store : me.getStore(),
				displayInfo : true,
				displayMsg : '显示从{0}条数据到{1}条数据，共{2}条数据',
				emptyMsg : "没有数据"
			})
		});
		this.getSelectionModel().on('selectionchange', function(sm, records) {
			Ext.Array.each(tbarMenus,function(button,index,countriesItSelf){ //遍历数组    
				if(me.down('#'+button.itemId).type==0){
					me.down('#'+button.itemId).setDisabled(sm.getCount() == 0)
				}else if(me.down('#'+button.itemId).type==1){
					me.down('#'+button.itemId).setDisabled(sm.getCount() != 1);
				}else{
					
				}
		    });
//			console.log(me.down('#btnEdit').type);
//			if (me.down('#btnEdit'))
//				me.down('#btnEdit').setDisabled(sm.getCount() != 1);
//			if (me.down('#btnDelete'))
//				me.down('#btnDelete').setDisabled(sm.getCount() == 0);
//			if (me.down('#btnVerify'))
//				me.down('#btnVerify').setDisabled(sm.getCount() != 1);
//			if (me.down('#btnCopyAdd'))
//				me.down('#btnCopyAdd').setDisabled(sm.getCount() != 1);
//			if (me.down('#btnPrintCode'))
//				me.down('#btnPrintCode').setDisabled(sm.getCount() != 1);
		});

		this.callParent(arguments);
	},
	createStore : function(config) {
/*		console.log('config');
		console.log(config.sortProperty);
		console.log(config.sortDirection);
		console.log(config);*/
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
				reader : {
					type : 'json',
					root : 'items',
					totalProperty : 'total'
				},
				//前台传字符串到后台乱码问题
				actionMethods:{
					read:'POST',
//					create:'POST'
				},
			},
			sorters : [ {
				property : config.sortProperty || 'id',
				direction : config.sortDirection || 'ASC'
			} ]
		});
	},
	getTabId : function() {
		return this.up('panel').getId();
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
				var idProperty = me.idProperty || 'id';
				for (var i = 0, r; r = s[i]; i++) {
					ids.push(r.get(idProperty));
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
				},
				failure : function() {
					App.errTip('数据同步失败！');
					me.down('#btnSync').setText(orgText).setDisabled(false);
				}
			});
		}
	},
	onImportClick : function(importHideColumn, onlySelected) {
		App.ImportToExcel(this, importHideColumn, onlySelected);
	}
});
