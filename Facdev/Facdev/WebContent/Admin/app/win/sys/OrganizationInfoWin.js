/**
 * @author lizeda
 * @module 组织机构管理
 * @description 添加、修改组织机构
 */
Ext.define('App.win.sys.OrganizationInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('OrganizationInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'parentId', 'code', 'name', 'category', 'enabled', 'leaf', 'expanded', 'allowEdit', 'allowDelete', 'description' ]
		});

		var parentField = Ext.create('Ext.ux.TreePicker', {
			name : 'parentId',
			fieldLabel : '上级组织机构',
			url : './organization/getList',
			selectParentNode : true,
			displayField : 'name',
			valueField : 'id',
			emptyText : '不选则为顶级组织机构',
			anchor : '100%'
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, parentField, {
			xtype : 'textfield',
			name : 'code',
			fieldLabel : '编码',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '名称',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '选项',
			vertical : false,
			items : [ {
				boxLabel : '有效',
				name : 'enabled',
				inputValue : '1',
				checked : true
			} /*
				 * , { boxLabel : '允许编辑', name : 'allowEdit', inputValue : '1',
				 * checked : true }, { boxLabel : '允许删除', name : 'allowDelete',
				 * inputValue : '1', checked : true }
				 */]
		}, {
			xtype : 'textfield',
			name : 'description',
			fieldLabel : '描述',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'OrganizationInfo',
			loadUrl : './organization/load',
			saveUrl : './organization/save',
			updateUrl : './organization/update',

			padding : '5 5 5 5',
			items : items

		});
		this.callParent(arguments);

		me.form.on('beforeSetafterLoad', function(data) {

			parentField.store.load({
				callback : function(records, operation, success) {
					
					var parent = data['parentId'];
					if(parent != null) {
						parentField.setValue(parent);
					}else {
						parentField.setValue('-1');
					}
//					Ext.each(records, function(item, index) {
//						if (item.data.id == data['parentId']) {
//							parentField.selectItem(records[index]);
//							return;
//						}
//						parentField.setValue('-1');
//					});
				}
			});
		});
	}
});