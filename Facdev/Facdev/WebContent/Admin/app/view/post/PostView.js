/**
 * @author chenjianchao
 * @module 商品管理
 */
var store;
Ext.define('App.view.post.PostView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;

		Ext.define('PostList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'title', 'content', 'postTime', 'modifyTime',
					'isChecked', 'userName', 'pfile' ]
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
			modelName : 'PostList',
			proxyUrl : './post/getPage',
			proxyDeleteUrl : './post/delete',
			sortProperty : 'id',
			sortDirection : 'DESC'
		});
		store.load();

		var columns = [
				{
					text : "标题",
					dataIndex : 'title',
					width : 150,
					flex : 1
				},
				{
					text : "内容",
					dataIndex : 'content',
					width : 150,
					flex : 1,
					renderer : function(value, meta, record) {
						var max = 23;
						meta.tdAttr = 'data-qtip="' + value + '"';
						return value.length < max ? value : value.substring(0,
								max - 3)
								+ '...';
					}
				}, {
					text : "发帖时间",
					dataIndex : 'postTime',
					width : 65
				}, {
					text : "修改时间",
					dataIndex : 'modifyTime',
					width : 65
				}, {
					xtype : 'checkcolumn',
					text : "可用",
					dataIndex : 'isChecked',
					width : 60,
					processEvent : function() {
						return false;
					}
				}, {
					text : "发帖人",
					dataIndex : 'userName',
					width : 100
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
							itemId : 'title',
							emptyText : '标题'
						},
						'-',
						'内容:',
						{
							xtype : 'textfield',
							itemId : 'content',
							emptyText : '内容'
						},
						'-',
						'发帖人:',
						{
							xtype : 'textfield',
							itemId : 'userName',
							emptyText : '发帖人'
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
								var title = this.ownerCt.getComponent('title')
										.getValue();
								var content = this.ownerCt.getComponent(
										'content').getValue();
								var userName = this.ownerCt.getComponent(
										'userName').getValue();
								var isChecked = this.ownerCt.getComponent(
								'isChecked').getValue();
								store.on('beforeload',
										function(store, options) {
											var params = {
												title : title,
												content : content,
												userName : userName,
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
								this.ownerCt.getComponent('title').setValue(
										null);
								this.ownerCt.getComponent('content').setValue(
										null);
								this.ownerCt.getComponent('userName').setValue(
										null);
								this.ownerCt.getComponent('isChecked').setValue(
										null);
								store.on('beforeload',
										function(store, options) {
											var params = {
												title : '',
												content : '',
												userName : '',
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
		App.openWindow('帖子应用--添加', Ext.create('App.win.post.PostWin', {
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
			App.openWindow('帖子应用--编辑', Ext.create('App.win.post.PostWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 720);
		}
	},

});