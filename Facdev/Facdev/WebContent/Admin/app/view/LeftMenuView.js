Ext.define('App.view.LeftMenuView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.LeftMenuView',
	itemId : 'LeftMenuView',
	width : 180,
	layout : 'accordion',
	split : true,
	collapsible : true,
	collapseDirection : 'left',
	title : '功能导航',

	initComponent : function() {
		var me = this;

		Ext.Ajax.request({
			url : './menu/getLeftMenus',
			method : 'GET',
			callback : function(options, success, response) {
				menuTreePanel(Ext.JSON.decode(response.responseText));
			}
		});

		menuTreePanel = function(menus) {
			Ext.each(menus.children, function(menu) {
				var tree = Ext.create("Ext.tree.Panel", {
					title : menu.text,
					useArrows : true,
					autoScroll : true,
					rootVisible : false,
					lines : false,
					viewConfig : {
						loadingText : "正在加载..."
					},
					store : menuTreeStore(menu.children),
			        listeners: {
                        'itemclick': function(e, record) {
                            if (record.data.leaf) {
                                App.openTab(record.data.id, record.data.text, record.raw.navigateUrl, {
                                    cId : record.data.id,
                                	cButtons: record.raw.buttons ? record.raw.buttons.split(',') : [],
                                    cName: record.raw.navigateUrl.substring(record.raw.navigateUrl.lastIndexOf(".")+1,record.raw.navigateUrl.length ),
//                                    cParams: record.raw.MenuConfig
                                });
                            }
                        }
                    }
				});
				me.add(tree);
			});
		};
		menuTreeStore = function(children) {
			return Ext.create("Ext.data.TreeStore", {
				root : {
					checked : null,
					expanded : true,
					children : children
				}
			});
		};
		
		Ext.applyIf(this, {
		});
		this.callParent(arguments);
	}
});