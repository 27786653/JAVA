/**
 * @author lichuangwu
 * @module 用户管理面板
 */
var store;
var form = Ext.widget('form',{
			border: false,
            bodyPadding: 5,
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 45,
				labelStyle: 'font-weight:bold'
			},
			defaults: {
				margins: '0 0 10 0'
			},
			items:[{
				xtype: 'textfield',
    	        fieldLabel: '账户',
    	        itemId : 'userAccount',
    	        name: 'userAccount',
    	        width:260
    	    },{
    	    	xtype: 'textfield',
    	        fieldLabel: '姓名',
    	        itemId : 'userName',
    	        name: 'userName',
    	        width:260
    	    },{
    	    	xtype: 'textfield',
    	        fieldLabel: '号码',
    	        itemId : 'phoneNum',
    	        name: 'phoneNum',
    	        width:260
    	    }],
    	    buttonAlign:'center',
			buttons:[{
    	        text: '查找',
    	        iconCls : 'icon_filter',
    	        handler: function() {
    	        	var formPanel = this.up('form');
    	        	store.on('beforeload', function(store, options) {
    	    			var new_params = {
    	    				userAccount : formPanel.getComponent('userAccount').getValue(),
    	    				userName : formPanel.getComponent('userName').getValue(),
    	    				phoneNum : formPanel.getComponent('phoneNum').getValue()
    	    			};
    	    			Ext.apply(store.proxy.extraParams, new_params);
    	    		});
    	        	store.reload();
    	        }
    	    },{
    	        text: '全部',
    	        iconCls : 'icon_refresh',
    	        handler: function() {
    	        	var formPanel = this.up('form');
    	        	var form = formPanel.getForm();
    	        	form.reset();
    	        	store.on('beforeload', function(store, options) {
    	    			var new_params = {
    	    				userAccount : '',
    	    				userName : '',
    	    				phoneNum : ''
    	    			};
    	    			Ext.apply(store.proxy.extraParams, new_params);
    	    		});
    	        	store.reload();
    	        }
    	    }]
		});

Ext.define('App.view.sys.UserView', {
	extend : 'Ext.ux.custom.AppGridPanel',
	initComponent : function() {
		var me = this;
		
		Ext.define('UserList', {
			extend : 'Ext.data.Model',
			idProperty : 'id',
			fields : [ 'id', 'code', 'account', 'realName', 'department', 'roleName','gender', 'mobile', 'email', 'enabled', 'description' ]
		});

		store = me.createStore({
			modelName : 'UserList',
			proxyUrl : './user/getPage',
			proxyDeleteUrl : './user/delete'
		// sortProperty : 'sortCode',
		// sortDirection : 'ASC'
		});
		store.load();

		var columns = [ {
			xtype : 'rownumberer',
			text : '序号',
			align : 'center',
			width : 50
		}, {
			text : "登陆账户",
			dataIndex : 'account',
			width : 100
		}, {
			text : "姓名",
			dataIndex : 'realName',
			width : 100
		}, {
			text : "部门",
			dataIndex : 'department',
			width : 100
		}, {
			text : "角色",
			dataIndex : 'roleName',
			width : 100
		}, {
			text : "性別",
			dataIndex : 'gender',
			renderer : function (value)
			{
				if(value==1){
					return "男";
				}else if(value==0){
					return "女";
				}else{
					return "";
				}
			},
			width : 100
		}, {
			text : "手机号码",
			dataIndex : 'mobile',
			width : 200
		}, {
			text : "电子邮件",
			dataIndex : 'email',
			width : 200
		}, {
			xtype : 'checkcolumn',
			text : "有效",
			dataIndex : 'enabled',
			width : 80,
			processEvent : function() {
				return false;
			}
		}, {
			text : "描述",
			dataIndex : 'description',
			flex : 1
		} ];

		Ext.apply(this, {
			store : store,
			columns : columns
		});
		this.callParent(arguments);
	},
	onAddClick : function() {
		var me = this;
		App.openWindow('用户信息--添加', Ext.create('App.win.sys.UserInfoWin', {
			onSaveSuccess : function(action) {
				me.getStore().reload();
			}
		}), 480);
	},
	onEditClick : function() {
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 1) {
			var record = selections[0];
			App.openWindow('用户信息--编辑', Ext.create('App.win.sys.UserInfoWin', {
				dataId : record.get('id'),
				onSaveSuccess : function(action) {
					me.getStore().reload();
				}
			}), 480);
		}
	},
	onEnableClick : function() {
		
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 0) {
			App.infoTip('请至少选择一条数据');
			
		} else {
			
			var ids = [];
			for (var i = 0, r; r = selections[i]; i++) {
				ids.push(r.get('id'));
			}
			Ext.Ajax.request({
				url : './user/enable',
				params : {
//					roleId : me.roleId,
					userIds : ids.join(',')
				},
				success : function(response) {
					if (response.responseText != '') {
						var res = Ext.JSON.decode(response.responseText);
						if (res.success) {
							App.msgTip('操作成功！');

							me.getStore().reload();
						} else
							App.errTip(res.msg);
					}
				}
			});
		}
	},
	onDisableClick : function() {
		
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 0) {
			App.infoTip('请至少选择一条数据');
			
		} else {
			
			var ids = [];
			for (var i = 0, r; r = selections[i]; i++) {
				ids.push(r.get('id'));
			}
			Ext.Ajax.request({
				url : './user/disable',
				params : {
//					roleId : me.roleId,
					userIds : ids.join(',')
				},
				success : function(response) {
					if (response.responseText != '') {
						var res = Ext.JSON.decode(response.responseText);
						if (res.success) {
							App.msgTip('操作成功！');

							me.getStore().reload();
						} else
							App.errTip(res.msg);
					}
				}
			});
		}
	},
	onRePasswordClick : function() {
		
		var me = this;
		var selections = this.getSelectionModel().getSelection();
		if (selections.length == 0) {
			App.infoTip('请至少选择一条数据');
			
		} else {
			
			var ids = [];
			for (var i = 0, r; r = selections[i]; i++) {
				ids.push(r.get('id'));
			}
			Ext.Ajax.request({
				url : './user/repassword',
				params : {
					userIds : ids.join(',')
				},
				success : function(response) {
					if (response.responseText != '') {
						var res = Ext.JSON.decode(response.responseText);
						if (res.success) {
							App.msgTip('操作成功！');

							me.getStore().reload();
						} else
							App.errTip(res.msg);
					}
				}
			});
		}
	},
	onFilterClick : function (){
		this.openSearch=1;
		App.openRightPanel(form,'查找');
	}
});