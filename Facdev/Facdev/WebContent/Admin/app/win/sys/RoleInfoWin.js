/**
 * @author lizeda
 * @module 角色管理
 * @description 添加、修改角色
 */
Ext.define('App.win.sys.RoleInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('RoleInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'code', 'name', 'category', 'enabled', 'allowEdit', 'allowDelete', 'description' ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'code',
			fieldLabel : '角色编号',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '角色名称',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'category',
			fieldLabel : '角色分类',
			anchor : '100%'
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '选项',
			columns : 3,
			vertical : false,
			items : [ {
				boxLabel : '有效',
				name : 'enabled',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '允许编辑',
				name : 'allowEdit',
				inputValue : '1'
			}, {
				boxLabel : '允许删除',
				name : 'allowDelete',
				inputValue : '1'
			} ]
		}, {
			xtype : 'textfield',
			name : 'description',
			fieldLabel : '描述',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'RoleInfo',
			loadUrl : './role/load',
			saveUrl : './role/save',
			updateUrl : './role/update',

			items : items
		});
		this.callParent(arguments);

		me.form.on('beforeSetafterLoad', function(data) {
		});
	}
});