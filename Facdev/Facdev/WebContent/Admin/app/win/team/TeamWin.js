/**
 * @author chenjianchao
 * @module 队伍管理
 * @description 添加队伍
 */
Ext.define('App.win.team.TeamWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('TeamInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'position', 'birth', 'job', 'type',
					'title', 'organization', 'tel', 'email', 'remark' ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '队伍名',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'position',
			fieldLabel : '职务',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'job',
			fieldLabel : '工作岗位',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'type',
			fieldLabel : '岗位类别',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'title',
			fieldLabel : '职称',
			anchor : '100%'
		},{
			xtype : 'textfield',
			name : 'organization',
			fieldLabel : '工作单位',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'tel',
			fieldLabel : '联系电话',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'email',
			fieldLabel : '邮箱',
			anchor : '100%'
		},{
			xtype : 'textareafield',
			name : 'remark',
			fieldLabel : '备注',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'TeamInfo',
			loadUrl : './team/load',
			saveUrl : './team/save',
			updateUrl : './team/update',

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