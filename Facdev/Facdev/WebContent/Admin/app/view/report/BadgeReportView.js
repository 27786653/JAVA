/**
 * @module 测试报表
 */
Ext.define('App.view.report.BadgeReportView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.BadgeReportView',
	requires : [ 'Ext.ux.IFrame' ],
	initComponent : function() {
		var me = this;

		var url='./frameset?__report=BadgeReport.rptdesign&__showtitle=false&__locale=zh_CN';
		
		var userStore = Ext.create('Ext.data.Store', {
			proxy : {
				type : 'ajax',
				url : './zktime/getUser',
				getMethod: function(){ return 'POST'; },
				reader : {
					type : 'json',
					root : 'children'
				}
			},
			fields : [ 'userID', 'userName' ]
		});
		
		
		var panel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			width : '100%',
			autoHeight : true,
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    items: ['考勤编号:',{
					xtype : 'combo',
					width : 200,
					itemId : 'userID',
					displayField : "userName",
					valueField : "userID",
					store : userStore,
					queryParam : 'username',
					mode : 'remote', 
					minChars : 1,
					triggerAction : 'all',
					allowBlank : false,
					blankText : '该 用户不存在',
					forceSelection : true,
					emptyText : '考勤编号'
				},'-','日期:',{
					xtype : 'datefield',
					width : 120,
					itemId : 'startCharge',
					format : 'Y-m-d',
					emptyText : '请选择起始时间',
					listeners : {
						"focus" : function(c,e,eOpts){
							c.setMaxValue(c.ownerCt.getComponent('endCharge').getRawValue());
						}
					}
				},'至',{
					xtype : 'datefield',
					width : 120,
					itemId : 'endCharge',
					format : 'Y-m-d',
					emptyText : '请选择结束时间',
					listeners : {
						"focus" : function(c,e,eOpts){
							c.setMinValue(c.ownerCt.getComponent('startCharge').getRawValue());
						}
					}
				},'-',{
					xtype : 'button',
					text : '计算',
					margin : '0 0 0 5',
					iconCls : 'icon_calculator',
					itemId : 'calc',
					handler : function(b){
						var userID = b.ownerCt.getComponent('userID').getValue();
						var startDate = b.ownerCt.getComponent('startCharge').getRawValue();
						var endDate = b.ownerCt.getComponent('endCharge').getRawValue();
						if(startDate==''&&endDate==''){
							return;
						}
						Ext.Ajax.request({
							url :'./zktime/calculate',
							params : {
								userID:userID,
								startDate : startDate,
								endDate : endDate
							},
							success : function(response) {
								if (response.responseText != '') {
									var res = Ext.JSON.decode(response.responseText);
									if (res.success) {
										App.msgTip(res.msg);
									} else
										App.errTip(res.msg);
								}
							}
						});
					}
				},'-',{
					xtype : 'button',
					text : '搜索',
					margin : '0 0 0 5',
					iconCls : 'icon_filter',
					itemId : 'searchName',
					handler : function(b){
						var userID = b.ownerCt.getComponent('userID').getValue();
						var startDate = b.ownerCt.getComponent('startCharge').getRawValue();
						var endDate = b.ownerCt.getComponent('endCharge').getRawValue();
						if(startDate==''&&endDate==''){
							return;
						}
						var surl = url;
						if(userID!=''){
							surl+='&userID='+userID;
						}else{
							surl+='&userID=0';
						}
						if(startDate!=''){
							surl+='&startDate='+startDate;
						}
						if(endDate!=''){
							surl+='&endDate='+endDate;
						}
						panel.items.items[0].load(surl);
					}
				},'-',{
					xtype : 'button',
					text : '全部',
					margin : '0 0 0 5',
					iconCls : 'icon_fullscreen',
					itemId : 'all',
					handler : function(b){
						b.ownerCt.getComponent('userID').setValue();
						b.ownerCt.getComponent('startCharge').setValue();
						b.ownerCt.getComponent('endCharge').setValue();
						panel.items.items[0].load(url);
//						var html = '<iframe src="'+url+'" width = "100%" height="100%" target="_blank" style="border:0;text-decoration:none;"/>'
//						panel.update(html);
					}
				}]
			}],
			items : [{
				xtype : 'uxiframe',
				height : '100%',
				src : ''
			}]
//			html : '<iframe src="'+url+'" width = "100%" height="100%" target="_blank" style="border:0;text-decoration:none;"/>'
		});

		Ext.apply(this, {
			layout : 'border',
			items : [ panel ]
		});
		this.callParent(arguments);
	}
});
