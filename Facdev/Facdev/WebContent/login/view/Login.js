Ext.define('LoYi.view.Login', {
	extend : 'Ext.window.Window',
	alias : 'widget.loginForm',
	requires : [ 'Ext.form.*', 'LoYi.view.CheckCode' ],
	initComponent : function() {
		var checkcode = Ext.create('LoYi.view.CheckCode', {
			cls : 'key',
			fieldLabel : '验证码',
			name : 'randomcode',
			id : 'CheckCode',
			allowBlank : false,
			isLoader : true,
			blankText : '验证码不能为空',
			codeUrl : './common/image.jsp',
			width : 160,
			listeners : {
				specialkey : function(field,e){
					if(e.getKey()==e.ENTER){
						var form = field.up('form').getForm();
						if (form.isValid()) {
							form.submit({
								clientValidation : true,
								waitMsg : '请稍后',
								waitTitle : '正在验证登录',
								url : './loginCheck',
								success : function(form, action) {
									window.location.href = "admin.jsp";
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
										width : 150,
										title : "登录失败",
										buttons : Ext.MessageBox.OK,
										msg : action.result.msg
									});
								}
							});
						}
					}
				}
			}
		});
		var form = Ext.widget('form', {
			border : false,
			bodyPadding : 10,
			fieldDefaults : {
				labelAlign : 'left',
				labelWidth : 55,
				labelStyle : 'font-weight:bold'
			},
			defaults : {
				margins : '0 0 10 0'
			},
			items : [ {
				xtype : 'textfield',
				fieldLabel : '用户名',
				blankText : '用户名不能为空',
				name : 'username',
				id : 'UserName',
				allowBlank : false,
				width : 240
			}, {
				xtype : 'textfield',
				fieldLabel : '密&nbsp;&nbsp;&nbsp;码',
				allowBlank : false,
				blankText : '密码不能为空',
				name : 'password',
				id : 'PassWord',
				width : 240,
				inputType : 'password'
			}, checkcode ],
			buttons : [ {
				text : '登录',
				handler : function() {
					var form = this.up('form').getForm();
					if (form.isValid()) {
						form.submit({
							clientValidation : true,
							waitMsg : '请稍后',
							waitTitle : '正在验证登录',
							url : './loginCheck',
							success : function(form, action) {
								window.location.href = "admin.jsp";
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
									width : 150,
									title : "登录失败",
									buttons : Ext.MessageBox.OK,
									msg : action.result.msg
								});
							}
						});
					}
				}
			} ]
		});
		Ext.apply(this, {
			height : 160,
			width : 280,
			id : 'loginWindow',
			title : '[佛山分公司物流管理系统]用户登陆',
			closeAction : 'hide',
			closable : false,
			iconCls : 'icon_user',
			layout : 'fit',
			modal : true,
			plain : true,
			resizable : false,
			items : form
		});
		this.callParent(arguments);
	}
});