Ext.define('App.view.ContentView', {
	extend : 'Ext.TabPanel',
	alias : 'widget.ContentView',
	itemId : 'ContentView',
	region: 'center',
	activeTab : 0,

	requires : [ 'App.view.HomeView' ],
	
	items : [ {
		xtype : 'HomeView'
	} ],

	plugins : [ Ext.create('Ext.ux.TabCloseMenu', {
		 closeTabText : '关闭当前页',
		 closeOthersTabsText : '关闭其他页',
		 closeAllTabsText : '关闭所有页'
	}) ],
//    plugins: [Ext.create('Ext.ux.TabCloseMenu'), {  //这里加入右键关闭插件
//        ptype: 'tabscrollermenu',
//        maxText: 15,
//        pageSize: 5
//    }],
    listeners: {
        tabchange: onTabChange,
        afterrender: onAfterRender
    }

});


function onTabChange(tabPanel, tab) {
	
	if(tab.items.items[0]!=null && tab.items.items[0].openSearch==1){
		tab.items.items[0].onFilterClick();
	}else{
		Ext.getCmp("ARightView").hide();
	}
    var tabs = [],
        ownerCt = tabPanel.ownerCt,
        oldToken, newToken;

    tabs.push(tab.id);
    tabs.push(tabPanel.id);

    while (ownerCt && ownerCt.is('tabPanel')) {
    	
        tabs.push(ownerCt.id);
        ownerCt = ownerCt.ownerCt;
    }

    newToken = tabs.reverse().join(tokenDelimiter);

    oldToken = Ext.History.getToken();

    if (oldToken === null || oldToken.search(newToken) === -1) {
//        Ext.History.add(newToken);
    }
}

function onAfterRender() {
    Ext.History.on('change', function (token) {
        var parts, tabPanel, length, i;

        if (token) {
            parts = token.split(tokenDelimiter);
            length = parts.length;
            
            for (i = 0; i < length - 1; i++) {
                Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
            }
        }
    });
    var activeTab1 = mainTab.getActiveTab(),
        activeTab2 = activeTab1;
    
    onTabChange(activeTab1, activeTab2);
}