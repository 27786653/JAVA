/**
 * @author chenjianchao
 * @module 专家管理
 * @description 添加专家
 */
Ext.define('App.win.expert.ExpertWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('ExpertInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'name', 'gender', 'organization', 'zjzy', 'major',
					'title', 'cardNumber', 'tel', 'email', 'remark',
					'isChecked' ]
		});

		var genderStore = Ext.create('Ext.data.Store', {
			fields : [ 'gender', 'text' ],
			data : [ {
				gender : 0,
				text : '女'
			}, {
				gender : 1,
				text : '男 '
			} ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '专家姓名',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'combobox',
			fieldLabel : '性别',
			emptyText : '性别',
			itemId : 'gender',
			store : genderStore,
			displayField : 'text',
			editable : false,
			valueField : 'gender',
			value : '男',
			name : 'gender'
		}, {
			xtype : 'textfield',
			name : 'organization',
			fieldLabel : '工作单位',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'major',
			fieldLabel : '所学专业',
			anchor : '100%',
		}, {
			xtype : 'textareafield',
			name : 'zjzy',
			fieldLabel : '主要工作经历',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'title',
			fieldLabel : '职称',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'cardNumber',
			fieldLabel : '证书编号',
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
		}, {
			xtype : 'textareafield',
			name : 'remark',
			fieldLabel : '备注',
			anchor : '100%'
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '有效性',
			vertical : false,
			items : [ {
				boxLabel : '有效 <font color=red> 注意：禁用该专家，将不能在前台显示。</font>',
				name : 'isChecked',
				inputValue : '1',
				checked : true
			} ]
		} ];

		Ext.apply(this, {

			modelName : 'ExpertInfo',
			loadUrl : './expert/load',
			saveUrl : './expert/save',
			updateUrl : './expert/update',

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