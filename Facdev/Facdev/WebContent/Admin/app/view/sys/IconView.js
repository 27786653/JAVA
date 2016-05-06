/**
 * @author lizeda
 * @module 图标管理面板
 */
Ext.define('App.view.sys.IconView', {
	extend : 'Ext.panel.Panel',

	initComponent : function() {
		var me = this;

		var dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				text : '新增',
				handler : me.onAddClick
			}, {
				text : '删除'
			} ]
		} ];

		Ext.apply(this, {
			dockedItems : dockedItems
		});
		this.callParent(arguments);
	},
	onAddClick : function() {
		var me = this;
		App.openWindow('图标-添加', Ext.create('Ext.ux.uploadPanel.UploadPanel', {
			height : 450,
			addFileBtnText : '选择文件...',
			uploadBtnText : '上传',
			removeBtnText : '移除所有',
			cancelBtnText : '取消上传',
			file_size_limit : 10000,// MB
			upload_url : 'upload.do'
		}), 800);
	}

});

// Ext.define('App.view.sys.IconView', {
// extend : 'Ext.ux.custom.AppGridPanel',
//
// initComponent : function() {
// var me = this;
//
// Ext.define('ButtonList', {
// extend : 'Ext.data.Model',
// idProperty : 'id',
// fields : [ 'id', 'name', 'fileName', 'fileSize', 'event', 'category',
// 'split', 'enabled', 'description' ]
// });
//
// var store = me.createStore({
// modelName : 'ButtonList',
// proxyUrl : './button/getPage',
// proxyDeleteUrl : './button/delete'
// // sortProperty : 'sortCode',
// // sortDirection : 'ASC'
// });
// store.load();
//
// var columns = [ {
// xtype : 'rownumberer',
// text : '序号',
// align : 'center',
// width : 50
// }, {
// text : "编码",
// dataIndex : 'controlID',
// width : 200
// }, {
// text : "图标",
// dataIndex : 'iconCls',
// width : 100
// }, {
// text : "名称",
// dataIndex : 'text',
// width : 100
// }, {
// text : "事件",
// dataIndex : 'event',
// width : 200
// }, {
// text : "分类",
// dataIndex : 'category',
// width : 100
// }, {
// xtype : 'checkcolumn',
// text : "分开",
// dataIndex : 'split',
// width : 60,
// processEvent : function() {
// return false;
// }
// }, {
// xtype : 'checkcolumn',
// text : "有效",
// dataIndex : 'enabled',
// width : 60,
// processEvent : function() {
// return false;
// }
// }, {
// text : "排序",
// dataIndex : 'sortCode',
// align : 'center',
// width : 60
// }, {
// text : "描述",
// dataIndex : 'description',
// flex : 1
// } ];
//
// Ext.apply(this, {
// store : store,
// columns : columns
// });
// this.callParent(arguments);
//
// },
// onAddClick : function() {
// var me = this;
// App.openWindow('图标-添加', Ext.create('Ext.ux.uploadPanel.UploadPanel', {
// height : 450,
// addFileBtnText : '选择文件...',
// uploadBtnText : '上传',
// removeBtnText : '移除所有',
// cancelBtnText : '取消上传',
// file_size_limit : 10000,// MB
// upload_url : 'upload.do'
// }), 700);
// },
// onEditClick : function() {
// var me = this;
// var selections = this.getSelectionModel().getSelection();
// if (selections.length == 1) {
// var record = selections[0];
// App.openWindow('操作按钮-编辑', Ext.create('App.win.sys.ButtonInfoWin', {
// dataId : record.get('id'),
// onSaveSuccess : function(action) {
// me.getStore().reload();
// }
// }), 480);
// }
// }
// });
