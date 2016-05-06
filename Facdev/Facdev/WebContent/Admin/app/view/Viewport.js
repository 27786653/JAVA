Ext.define('App.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'border',
	requires : [ 'App.view.HeaderView', 'App.view.LeftMenuView','App.view.RightView',
			'App.view.ContentView', 'App.view.BottomView' ],

	initComponent : function() {
		var me = this;
		mainTab = Ext.create('App.view.ContentView');
		Ext.applyIf(me, {
			items : [ {
				xtype : 'HeaderView',
				region : 'north'

			}, {
				xtype : 'LeftMenuView',
				region : 'west'

			}, {
				xtype : 'RightView',
				region : 'east'
			}, mainTab, {
				xtype : 'BottomView',
				region : 'south'

			} ]
		});
		me.callParent(arguments);
	}
});