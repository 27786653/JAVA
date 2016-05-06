/**
 * @author chenjianchao
 * @module 备注设置
 */

var store;

Ext.define('BaseArgumentsInfo', {
	extend : 'Ext.data.Model',
	fields : [ 'id', 'name', 'value' ]
});

var form = Ext.widget('form', {
	border : false,
	bodypadding : 5,
	fieldDefaults : {
		labelWidth : 60,
		labelAlign : 'right',
		labelStyle : 'font-wight:bold'
	},
	defaults : {
		margin : '10 0 10 0'
	},
	items : [ {
		xtype : 'textfield',
		fieldLabel : '关键字',
		itemId : 'name',
		name : 'name',
		width : 260
	}, {
		xtype : 'textfield',
		fieldLabel : '值',
		itemId : 'value',
		name : 'value',
		width : 260
	} ],
	buttonAlign : 'center',
	buttons : [ {
		text : '查找',
		iconCls : 'icon_filter',
		handler : function() {
			var formPanel = this.up('form');
			store.on('beforeload', function(store, option) {
				var new_params = {
					name : formPanel.getComponent('name').getValue(),
					value : formPanel.getComponent('value').getValue(),
				};
				Ext.apply(store.proxy.extraParams, new_params);
			});
			store.reload();
		}
	}, {
		text : '全部',
		iconCls : 'icon_refresh',
		handler : function() {
			var formPanel = this.up('form');
			var form = formPanel.getForm();
			form.reset();
			store.on('beforeload', function(store, options) {
				var new_params = {
					name : '',
					value : ''
				};
				Ext.apply(store.proxy.extraParams, new_params);
			});
			store.reload();
		}
	} ]

});

Ext.define('App.view.sys.CBaseArgumentsView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;
		Ext.define('BaseArgumentsInfo', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'name', 'value' ]
		});

		store = me.createStore({
			modelName : 'BaseArgumentsInfo',
			proxyUrl : './baseArguments/getPage',
			proxyDeleteUrl : './baseArguments/delete',
		});
		store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 60
		}, {
			dataIndex : 'name',
			text : '关键字',
			width : 150
		}, {
			dataIndex : 'value',
			text : '值',
			flex : 1
		} ];
		Ext.apply(this, {
			dockedItems : [ {// 搜索栏
				xtype : 'toolbar',
				dock : 'top',
				items : [
						'关键字:',
						{
							xtype : 'textfield',
							itemId : 'name',
							name : 'name',
							emptyText : '关键字',
							width : 120
						},
						'-',
						'值:',
						{
							xtype : 'textfield',
							itemId : 'value',
							name : 'value',
							emptyText : '值',
							width : 120
						},
						{
							xtype : 'button',
							iconCls : 'icon_search',
							text : '搜索',
							handler : function(btn) {
								var name = this.ownerCt.getComponent(
										'name').getValue();
								var value = this.ownerCt
										.getComponent('value')
										.getValue();
								store.on('beforeload', function(store, option) {
									var new_params = {
										name : name,
										value : value
									};
									Ext.apply(store.proxy.extraParams,
											new_params);
								});
								store.reload();
							}
						},
						{
							xtype : 'button',
							iconCls : 'icon_view',
							text : '全部',
							handler : function(btn) {
								this.ownerCt.getComponent('name').setValue(
										null);
								this.ownerCt.getComponent('value')
										.setValue(null);
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : '',
												value : ''
											};
											Ext.apply(store.proxy.extraParams,
													params);
										});
								store.reload();
							}
						} ]
			} ],
			store : store,
			columns : columns
		});
		this.callParent(arguments);
	},

	onAddClick : function() {
		var me = this;
		App.openWindow('基础参数设置--添加', Ext.create(
				'App.win.sys.BaseArgumentsInfoWin', {
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
			App.openWindow('基础参数设置--编辑', Ext.create(
					'App.win.sys.BaseArgumentsInfoWin', {
						dataId : record.get('id'),
						onSaveSuccess : function(action) {
							me.getStore().reload();
						}
					}), 480);
		}
	},
	onFilterClick : function() {
		this.openSearch = 1;
		App.openRightPanel(form, '查找');
	}
});
