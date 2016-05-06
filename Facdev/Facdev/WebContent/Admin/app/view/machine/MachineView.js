/**
 * @author chenjianchao
 * @module 设备管理
 */
var store;
Ext.define('App.view.machine.MachineView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;

		Ext.define('MachineList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'name', 'category', 'firstCheckTime', 'situation',
					'type', 'location', 'subordinate', 'qty', 'useable',
					'remark' ]
		});

		var stateStore = Ext.create('Ext.data.Store', {
			fields : [ 'useable', 'text' ],
			data : [ {
				useable : 0,
				text : '不可用'
			}, {
				useable : 1,
				text : '可用'
			} ]
		});

		store = me.createStore({
			modelName : 'MachineList',
			proxyUrl : './machine/getPage',
			proxyDeleteUrl : './machine/delete',
			sortProperty : 'id',
			sortDirection : 'DESC'
		});
		store.load();

		var columns = [
				{
					text : "设备名",
					dataIndex : 'name',
					width : 130,
				},
				{
					text : "登记时间",
					dataIndex : 'firstCheckTime',
					width : 130,
				}, {
					text : "设备情况",
					dataIndex : 'situation',
					width : 160
				}, {
					text : "存放地点",
					dataIndex : 'location',
					width : 220
				}, {
					text : "设备类型",
					dataIndex : 'type',
					width : 130
				},{
					text : "从属部门",
					dataIndex : 'subordinate',
					width : 130
				},{
					text : "数量",
					dataIndex : 'qty',
					width : 60
				},{
					xtype : 'checkcolumn',
					text : "可用",
					dataIndex : 'useable',
					width : 60,
					processEvent : function() {
						return false;
					}
				}, {
					text : "备注",
					dataIndex : 'remark',
					width : 220
				} ];

		Ext.apply(this, {
			store : store,
			columns : columns,
			dockedItems : [ {// 搜索栏
				xtype : 'toolbar',
				dock : 'top',
				items : [
						'标题:',
						{
							xtype : 'textfield',
							itemId : 'name',
							emptyText : '设备名'
						},
						'-',
						'是否可用:',
						{
							xtype : 'combobox',
							emptyText : '是否可用',
							itemId : 'useable',
							store : stateStore,
							displayField : 'text',
							editable : false,
							valueField : 'useable',
							value : '可用',
							name : 'useable'
						},
						{
							xtype : 'button',
							text : '搜索',
							iconCls : 'icon_search',
							handler : function(btn) {
								var name = this.ownerCt.getComponent('name')
										.getValue();
								var useable = this.ownerCt.getComponent(
										'useable').getValue();
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : name,
												useable : useable
											};
											Ext.apply(store.proxy.extraParams,
													params);
										});
								store.load();
							}
						},
						{
							xtype : 'button',
							iconCls : 'icon_view',
							text : '全部',
							handler : function(btn) {
								this.ownerCt.getComponent('name').setValue(
										null);
								this.ownerCt.getComponent('useable')
										.setValue(null);
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : '',
												useable : ''
											};
											Ext.apply(store.proxy.extraParams,
													params);
										});
								store.load();
							}
						} ]
			} ]
		});
		this.callParent(arguments);
	},
	onAddClick : function() {
		var me = this;
		App.openWindow('设备管理--添加', Ext.create('App.win.machine.MachineWin', {
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
			App.openWindow('设备管理--编辑', Ext.create('App.win.machine.MachineWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	},

});