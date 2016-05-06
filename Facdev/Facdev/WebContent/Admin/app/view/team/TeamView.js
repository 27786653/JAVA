/**
 * @author chenjianchao
 * @module 应急队伍管理
 */
var store;
Ext.define('App.view.team.TeamView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;

		Ext.define('TeamList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'name', 'position', 'birth', 'job',
					'type', 'title', 'organization', 'tel', 'email',
					'remark' ]
		});

		store = me.createStore({
			modelName : 'TeamList',
			proxyUrl : './team/getPage',
			proxyDeleteUrl : './team/delete',
			sortProperty : 'id',
			sortDirection : 'DESC'
		});
		store.load();

		var columns = [ {
			text : "队伍名",
			dataIndex : 'name',
			width : 60,
		}, {
			text : "职务",
			dataIndex : 'position',
			width : 80,
		}, {
			text : "创建时间",
			dataIndex : 'birth',
			width : 150
		}, {
			text : "岗位",
			dataIndex : 'job',
			width : 140
		}, {
			text : "岗位类别",
			dataIndex : 'type',
			width : 140
		}, {
			text : "工作单位",
			dataIndex : 'organization',
			width : 160
		}, {
			text : "职称",
			dataIndex : 'title',
			width : 100
		},{
			text : "联系电话",
			dataIndex : 'tel',
			width : 100
		}, {
			text : "邮箱",
			dataIndex : 'email',
			width : 100
		},{
			text : "备注",
			dataIndex : 'remark',
			width : 200
		} ];

		Ext.apply(this, {
			store : store,
			columns : columns,
			dockedItems : [ {// 搜索栏
				xtype : 'toolbar',
				dock : 'top',
				items : [
						'队伍名:',
						{
							xtype : 'textfield',
							itemId : 'name',
							emptyText : '队伍名'
						},
						{
							xtype : 'button',
							text : '搜索',
							iconCls : 'icon_search',
							handler : function(btn) {
								var name = this.ownerCt.getComponent('name')
										.getValue();
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : name,
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
								store.on('beforeload',
										function(store, options) {
											var params = {
												name : '',
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
		App.openWindow('队伍管理--添加', Ext.create('App.win.team.TeamWin', {
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
			App.openWindow('队伍管理--编辑', Ext.create('App.win.team.TeamWin',
					{
						dataId : record.get('id'),
						onSaveSuccess : function(action) {
							me.getStore().reload();
						}
					}), 480);
		}
	},

});