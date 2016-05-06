/**
 * @author lizeda
 * @module 用户管理
 * @description 添加、修改用户
 */
Ext.define('App.win.sys.UserInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('UserInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'departmentId','roleId','code', 'account', 'realName', 'department', 'gender', 'mobile', 'email', 'enabled', 'description' ]
		});

		var departmentField = Ext.create('Ext.ux.TreePicker', {
			name : 'departmentId',
			fieldLabel : '部门',
			url : './organization/getList',
			selectParentNode : true,
			displayField : 'name',
			valueField : 'id',
			anchor : '100%',
			emptyText : "请选择部门",
			allowBlank : false
		});

		var rolesStore = Ext.create('Ext.data.Store', {
			proxy : {
				type : 'ajax',
				url : './role/getList',
				reader : {
					type : 'json',
					root : 'children'
				}
			},
			fields : [ 'id', 'name' ]
		});

		var rolesField = Ext.create('Ext.form.ComboBox', {
			fieldLabel : "默认角色",
			name : 'roleId',
			displayField : "name",
			valueField : "id",
			anchor : '100%',
			emptyText : "请选择角色",
			store : rolesStore,
			allowBlank : false
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'account',
			fieldLabel : '登录账户',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'realName',
			fieldLabel : '姓名',
			anchor : '100%',
			allowBlank : false
		}, departmentField, rolesField, {
			xtype : 'radiogroup',
			fieldLabel : '性别',
			columns : 2,
			// vertical : false,
			items : [ {
				boxLabel : '男',
				name : 'gender',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '女',
				name : 'gender',
				inputValue : '0'
			} ]
		}, {
			xtype : 'textfield',
			name : 'mobile',
			fieldLabel : '手机号码',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'email',
			fieldLabel : '电子邮件',
			anchor : '100%'
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '有效性',
			vertical : false,
			items : [ {
				boxLabel : '有效 <font color=red> 注意：禁用该用户后，将不能登录。</font>',
				name : 'enabled',
				inputValue : '1',
				checked : true
			} ]
		}, {
			xtype : 'textfield',
			name : 'description',
			fieldLabel : '描述',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'UserInfo',
			loadUrl : './user/load',
			saveUrl : './user/save',
			updateUrl : './user/update',

			padding : '5 5 5 5',
			items : items
		});
		this.callParent(arguments);

		me.form.on('beforeSetafterLoad', function(data) {

			departmentField.store.load({
				callback : function(records, operation, success) {
					Ext.each(records, function(item, index) {
						if (item.data.id == data['parentId']) {
							departmentField.selectItem(records[index]);
						}
					});
				}
			});

			rolesField.store.load(function(records, operation, success) {
				Ext.Array.each(records, function(item, index) {
					if (item.data.id == data['roleId']) {
						rolesField.setValue(item.data.id);
					}
				});
			});

		});
	}
});