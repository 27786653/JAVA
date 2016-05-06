/**
 * @author chenjianchao
 * @module 帖子管理
 * @description 添加帖子
 */
Ext.define('App.win.post.PostWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('PostInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'title', 'content', 'isChecked' ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'title',
			fieldLabel : '标题',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textareafield',
			name : 'content',
			fieldLabel : '内容',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '有效性',
			vertical : false,
			items : [ {
				boxLabel : '有效 <font color=red> 注意：禁用该帖子，将不能在前台显示。</font>',
				name : 'isChecked',
				inputValue : '1',
				checked : true
			} ]
		} ];

		Ext.apply(this, {

			modelName : 'PostInfo',
			loadUrl : './post/load',
			saveUrl : './post/save',
			updateUrl : './post/update',

			padding : '5 5 5 5',
			items : items
		});
		this.callParent(arguments);

		// me.form.on('beforeSetafterLoad', function(data) {
		//
		// departmentField.store.load({
		// callback : function(records, operation, success) {
		// Ext.each(records, function(item, index) {
		// if (item.data.id == data['parentId']) {
		// departmentField.selectItem(records[index]);
		// }
		// });
		// }
		// });
		//
		// rolesField.store.load(function(records, operation, success) {
		// Ext.Array.each(records, function(item, index) {
		// if (item.data.id == data['roleId']) {
		// rolesField.setValue(item.data.id);
		// }
		// });
		// });
		//
		// });
	}
});