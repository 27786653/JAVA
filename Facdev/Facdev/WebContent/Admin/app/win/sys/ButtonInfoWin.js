/**
 * @author lizeda
 * @module 操作按钮
 * @description 添加、修改按钮
 */
Ext.define('App.win.sys.ButtonInfoWin', {
	extend : 'Ext.ux.custom.AppWindowInfoPanel',

	initComponent : function() {
		var me = this;

		Ext.define('ButtonInfo', {
			extend : 'Ext.data.Model',
			fields : [ {
				name : 'id',
				type : 'int'
			}, {
				name : 'sortCode',
				type : 'int'
			}, 'controlID', 'iconCls', 'text', 'event', 'category', 'split',
					'enabled', 'description','type' ]
		});

		var typeStore = new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : [ [ '0', '没有选择时无效' ], [ '1', '选择一个记录有效' ], [ '2', '一直有效' ] ]
		});

		var items = [ {
			xtype : 'hiddenfield',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'controlID',
			fieldLabel : '按钮编码',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'text',
			fieldLabel : '按钮名称',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'iconCls',
			fieldLabel : '按钮图标',
			anchor : '100%'
		}, {
			xtype : 'textfield',
			name : 'event',
			fieldLabel : '按钮事件',
			anchor : '100%',
			vtype : 'alpha',
			allowBlank : false
		}, {
			hidden : true,
			xtype : 'textfield',
			name : 'enabled',
			fieldLabel : '是否有效',
			anchor : '100%'
		}, {
			hidden : true,
			xtype : 'textfield',
			name : 'category',
			fieldLabel : '是否有效',
			anchor : '100%'
		}, {
			xtype : 'combo',
			name : 'type',
			fieldLabel : '显示方式',
			anchor : '100%',
			store : typeStore,
			mode : 'local',
			valueField : 'value',
			displayField : 'text',
			editable : false,
			allowBlank : false,
			listeners : {
				change : function(e, newValue, oldValue, eOpts) {
					if(newValue==0||newValue==1){
						e.ownerCt.items.items[5].setValue(0);
					}else{
						e.ownerCt.items.items[5].setValue(1);
					}
					e.ownerCt.items.items[6].setValue(e.getRawValue());
				}
			}
		}, {
			xtype : 'checkboxgroup',
			fieldLabel : '选项',
			columns : 2,
			vertical : false,
			items : [ {
				boxLabel : '分开',
				name : 'split',
				inputValue : '1'
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

			modelName : 'ButtonInfo',
			loadUrl : './button/load',
			saveUrl : './button/save',
			updateUrl : './button/update',

			items : items
		});
		this.callParent(arguments);

		me.form.on('beforeSetafterLoad', function(data) {
//			
//			if(data.type==0){
//				me.items.items[7].setRawValue('没有选择时无效');
//			}else if(data.type==1){
//				me.items.items[7].setRawValue('选择一个记录有效');
//			}else{
//				me.items.items[7].setRawValue('一直有效');
//			}
			me.items.items[7].setValue(data.type);
		});
	}
});