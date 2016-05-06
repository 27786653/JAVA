/**
 * @author lizeda
 * @module 菜单管理
 * @description 添加、修改菜单
 */
Ext.define('App.win.sys.MenuInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('MenuInfo', {
			extend : 'Ext.data.Model',
			fields : [ 'id', 'sortCode', 'parentId', 'text', 'code', 'iconCls', 'navigateUrl', 'enabled', 'expanded', 'allowEdit', 'allowDelete',
					'description' ]
		});

		var parentField = Ext.create('Ext.ux.TreePicker', {
			name : 'parentId',
			fieldLabel : '上级菜单',
			url : './menu/getList',
			selectParentNode : true,
			displayField : 'text',
			valueField : 'id',
			emptyText : '不选则为顶级菜单',
			anchor : '100%'
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, parentField, {
			xtype : 'textfield',
			name : 'text',
			fieldLabel : '菜单名称',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'code',
			fieldLabel : '菜单编码',
			anchor : '100%'
//			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'iconCls',
			fieldLabel : '菜单图标',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'navigateUrl',
			fieldLabel : 'Web连接地址',
			anchor : '100%'
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '选项',
			vertical : false,
			items : [ {
				boxLabel : '有效',
				name : 'enabled',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '展开',
				name : 'expanded',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '允许编辑',
				name : 'allowEdit',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '允许删除',
				name : 'allowDelete',
				inputValue : '1',
				checked : true
			} ]
		}, {
			xtype : 'textfield',
			name : 'sortCode',
			fieldLabel : '显示顺序',
			anchor : '100%',
			vtype : 'num'
		}, {
			xtype : 'textfield',
			name : 'description',
			fieldLabel : '描述',
			anchor : '100%'
		} ];

		Ext.apply(this, {

			modelName : 'MenuInfo',
			loadUrl : './menu/load',
			saveUrl : './menu/save',
			updateUrl : './menu/update',

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