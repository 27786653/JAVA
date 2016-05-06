/**
 * @module 测试报表
 */
Ext.define('App.view.report.TestReportView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.TestReportView',
	requires : [ 'Ext.ux.IFrame' ],
	initComponent : function() {
		var me = this;

		var url='./frameset?__report=test.rptdesign&__showtitle=false&__locale=zh_CN';
		
		
		var panel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			width : '100%',
			autoHeight : true,
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    items: ['条件:',{
					xtype : 'combo',
					width : 200,
					itemId : 'shopname',
//					displayField : "name",
//					valueField : "id",
////					store : shopnameStore,
//					queryParam : 'shopname',
//					mode : 'remote',  
//					minChars : 1,
//					triggerAction : 'all',
					allowBlank : false,
					blankText : '该条件不存在',
					forceSelection : true,
					emptyText : '条件名称'
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
					text : '搜索',
					margin : '0 0 0 5',
					iconCls : 'icon_filter',
					itemId : 'searchName',
					handler : function(b){
						var shopname = b.ownerCt.getComponent('shopname').getValue();
						var startDate = b.ownerCt.getComponent('startCharge').getRawValue();
						var endDate = b.ownerCt.getComponent('endCharge').getRawValue();
						if(shopname==null&&startDate==''&&endDate==''){
							return;
						}
						var surl = url;
						if(shopname!=''){
//							surl+='&shopId='+encodeURIComponent(shopname);
							surl+='&shopId='+shopname;
							surl+='&shopname='+encodeURIComponent(b.ownerCt.getComponent('shopname').getRawValue());
						}
						if(startDate!=''){
							surl+='&startDate='+startDate;
						}
						if(endDate!=''){
							surl+='&endDate='+endDate;
						}
						panel.items.items[0].load(encodeURI(surl));
//						var html = '<iframe src="'+encodeURI(surl)+'" width = "100%" height="100%" target="_blank" style="border:0;text-decoration:none;"/>'
////						var html = '<iframe src="'+surl+'" width = "100%" height="100%" target="_blank" style="border:0;text-decoration:none;"/>'
//						panel.update(html);
					}
				},'-',{
					xtype : 'button',
					text : '全部',
					margin : '0 0 0 5',
					iconCls : 'icon_fullscreen',
					itemId : 'all',
					handler : function(b){
						b.ownerCt.getComponent('shopname').setValue();
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
				src : url
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
