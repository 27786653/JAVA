Ext.define('App.view.HeaderView', {
	extend : 'Ext.container.Container',
	alias : 'widget.HeaderView',
	itemId : 'HeaderView',
	height : 45,
	id : 'app-header',
	layout : {
		type : 'border',
		align : 'middle'
	},
	defaults : {
		xtype : 'component',
	},
    initComponent : function() {
        var me = this;
        
        var	items = [ {
        	region: "west",
        	style: {
                marginLeft: '12px',
                marginTop: '5px'
            },
			html : '<img src="Public/admin/images/logo.png" style="width:35px;height:35px;"/>'
		}, {
			id : 'app-header-title',
			region: "center",
			html : '佛山分公司物流管理系统',
		    style:'color: #FFF;font-size: 20px;font-weight: bold;padding: 10px 10px 0 10px;text-shadow: 0 1px 0 #4E691F;'
		}, {
		    xtype: 'button',
		    text: '个人中心',
		    region : 'east',
		    iconCls: 'icon_user',
		    style: {
                marginRight: '12px',
                marginTop: '8px',
                marginBottom :'8px'
            },
		    menu: [{
		        text: '修改密码',
		        iconCls: 'icon_key',
		        disabled: false,
		        handler: function() {
		        var form = Ext.widget('form',{
		    			border: false,
		                bodyPadding: 10,
		    			fieldDefaults: {
		    				labelAlign: 'right',
		    				labelWidth: 65,
		    				labelStyle: 'font-weight:bold'
		    			},
		    			defaults: {
		    				margins: '0 0 10 0'
		    			},
		    			items:[{
		    				xtype: 'textfield',
		        	        fieldLabel: '密码',
		        	        name: 'pwd',
		        	        inputType: 'password',
		        	        allowBlank: false,
		        	        width:240
		        	    },{
		        	    	xtype: 'textfield',
		        	        fieldLabel: '确认密码',
		        	        name: 'confirmpwd',
		        	        inputType: 'password',
		        	        allowBlank: false,
		        	        width:240
		        	    }],
		    			buttons:[{
		        	        text: '取消',
		        	        iconCls : 'icon_repair_delete',
		        	        handler: function() {
		        	        	 this.up('window').close();
		        	        }
		        	    }, {
		        	        text: '修改',
		        	        formBind: true, // only enabled once the form is valid
		        	        disabled: true,
		        	        iconCls : 'icon_repair_approve',
		        	        handler: function() {
		        	        	var formPanel = this.up('form');
		        	            var form = formPanel.getForm();
		        	            if (form.isValid()) {
		        	            	
		        	            if (form.findField('pwd').getValue() != form.findField('confirmpwd').getValue()) {
			                        Ext.Msg.alert('提示', '两次输入的密码不一致 ');
			                        return;
								}	
		    	                form.submit({
		    	                    url: './user/changePwd',
		    	                    submitEmptyText:false,
		    	                    waitMsg: '保存中，请稍候...',
		    	                    success: function(form, action) {
		    	                    	Ext.Msg.alert('提示', action.result.msg);
		    	                        formPanel.up('window').close();
		    	                    },
		    	                    failure: function(form, action) {
		    	                    	Ext.Msg.alert('提示', action.result.msg);
		    	                    }
		    	                });
		        	          }
		        	        }
		        	    }]
		    		});
		 
			        Ext.create(Ext.window.Window,{
			        	autoShow: true,
						height: 130,
						width: 280,
						title: '修改密码',
						closable : false, 
						iconCls: 'icon_key',
						layout: 'fit',
						modal : true, 
						plain : true,
						resizable: false,
						items:form
					});
		        }
		    },'-', {
		        text: '安全退出',
		        iconCls: 'icon_outbox',
		        handler: function() {
		            top.location.href = './logout';
		        }
		    }]
		    }/*, {
		    	xtype: 'label',
                itemId:'userName',
		        text: '当前用户:',
		        cls: 'curLabel'
		    } */];
        	

			Ext.apply(this, {
				items : items
			});
			
			
		   this.on('render',function(){
			   	Ext.Ajax.request({
					url : './user/getUserName',// 获取面板的地址
					method : 'POST',
					callback : function(options, success, response) {
						me.down('button').setText("当前用户: "+Ext.JSON.decode(response.responseText).username);
					}
				});
		   });
			
        	
           this.callParent(arguments);
        }

});