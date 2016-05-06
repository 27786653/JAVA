/**
 * @author chenjianchao
 * @module 专家管理
 */
var store;
Ext.define('App.view.expert.ExpertView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;

		Ext.define('ExpertList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'name', 'gender', 'organization', 'zjzy', 'major',
					'title', 'cardNumber', 'tel', 'email', 'remark',
					'isChecked' ]
		});

		var stateStore = Ext.create('Ext.data.Store', {
			fields : [ 'isChecked', 'text' ],
			data : [ {
				isChecked : 0,
				text : '不可用'
			}, {
				isChecked : 1,
				text : '可用'
			} ]
		});

		store = me.createStore({
			modelName : 'ExpertList',
			proxyUrl : './expert/getPage',
			proxyDeleteUrl : './expert/delete',
			sortProperty : 'id',
			sortDirection : 'DESC'
		});
		store.load();

		var columns = [ {
			text : "专家姓名",
			dataIndex : 'name',
			width : 60,
		}, {
			text : "性别",
			dataIndex : 'gender',
			width : 60,
			renderer : function(gender) {
				if (gender == 0) {
					return '女';
				} else {
					return '男';
				}
			}
		}, {
			text : "工作单位",
			dataIndex : 'organization',
			width : 100
		}, {
			text : "主要工作经历",
			dataIndex : 'zjzy',
			width : 160
		}, {
			text : "所学专业",
			dataIndex : 'major',
			width : 160
		}, {
			text : "职称",
			dataIndex : 'title',
			width : 60
		}, {
			text : "证书编号",
			dataIndex : 'cardNumber',
			width : 160
		}, {
			text : "联系电话",
			dataIndex : 'tel',
			width : 130
		}, {
			text : "邮箱",
			dataIndex : 'email',
			width : 120
		}, {
			text : "备注",
			dataIndex : 'remark',
			width : 160
		}, {
			xtype : 'checkcolumn',
			text : "可用",
			dataIndex : 'isChecked',
			width : 60,
			processEvent : function() {
				return false;
			}
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
							emptyText : '专家姓名'
						},
						'-',
						'是否可用:',
						{
							xtype : 'combobox',
							emptyText : '是否可用',
							itemId : 'isChecked',
							store : stateStore,
							displayField : 'text',
							editable : false,
							valueField : 'isChecked',
							value : '可用',
							name : 'isChecked'
						},
						{
							xtype : 'button',
							text : '搜索',
							iconCls : 'icon_search',
							handler : function(btn) {
								var name = this.ownerCt.getComponent('name')
										.getValue();
								var isChecked = this.ownerCt.getComponent(
										'isChecked').getValue();
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : name,
												isChecked : isChecked
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
								this.ownerCt.getComponent('name')
										.setValue(null);
								this.ownerCt.getComponent('isChecked')
										.setValue(null);
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : '',
												isChecked : ''
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
		App.openWindow('专家管理--添加', Ext.create('App.win.expert.ExpertWin', {
			onSaveSuccess : function(action) {
				me.getStore().reload();
			}
		}), 720);
	},
	onEditClick : function() {
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 1) {
			var record = selections[0];
			App.openWindow('专家管理--编辑', Ext.create('App.win.expert.ExpertWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 720);
		}
	},

});