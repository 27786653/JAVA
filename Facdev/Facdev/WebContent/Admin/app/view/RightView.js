Ext.define('App.view.RightView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.RightView',
	itemId : 'RightView',
	width : 290,
	split : true,
	id : 'ARightView',
	collapsible : true,
	collapseDirection : 'left',
	title : '详细内容',
	hidden : true, 
	listeners :{
		'hide' : function(p,eOpts){
			p.removeAll(false);
		}
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});