/**
 * @module 保安排班报表
 */
Ext.define('App.view.report.ZhiBanReportView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ZhiBanReportView',
	requires : [ 'Ext.ux.IFrame','Ext.ux.Month'],
	initComponent : function() {
		var me = this;

		var url='./frameset?__report=zhibanReport.rptdesign&__showtitle=false&__locale=zh_CN';
		
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
			    items: ['年月:',{
					xtype : 'monthfield',
					width : 150,
					itemId : 'YM',
					format : 'Y-m',
					editable : false,
					emptyText : '请选择月份'
				},'-',{
					xtype : 'button',
					text : '搜索',
					margin : '0 0 0 5',
					iconCls : 'icon_filter',
					itemId : 'searchName',
					handler : function(b){
						var YM = b.ownerCt.getComponent('YM').getRawValue();
						if(YM==''){
							return;
						}
						var surl = url;
						if(YM!=''){
							surl+='&dateString='+YM;
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
						b.ownerCt.getComponent('YM').setValue();
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
