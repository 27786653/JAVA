/**
 * @author chenjianchao
 * @module 帖子管理
 * @description 添加帖子
 */
Ext.define('App.win.machine.MachineWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('MachineInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'situation', 'type','location','subordinate','qty' ,'useable','remark']
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '设备名',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'situation',
			fieldLabel : '设备情况',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'type',
			fieldLabel : '设备类型',
			anchor : '100%'
		},{
			xtype : 'textfield',
			name : 'location',
			fieldLabel : '存放地点',
			anchor : '100%'
		},{
			xtype : 'textfield',
			name : 'subordinate',
			fieldLabel : '从属部门',
			anchor : '100%'
		},{
			xtype : 'numberfield',
			name : 'qty',
			fieldLabel : '数量',
			anchor : '100%',
			allowBlank: false,
			allowDecimals: false,
			minValue : 0
		},{
			xtype : 'checkboxgroup',
			fieldLabel : '是否可用',
			vertical : false,
			items : [ {
				name : 'useable',
				inputValue : '1',
				checked : true
			} ]
		},{
			xtype : 'textfield',
			name : 'remark',
			fieldLabel : '备注',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'MachineInfo',
			loadUrl : './machine/load',
			saveUrl : './machine/save',
			updateUrl : './machine/update',

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