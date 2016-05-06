//Ext.Ajax.timeout = 60000; // (超时为一分钟，单位为毫秒，默认是30秒)
/**
 * 开启动态加载的依赖加载功能和设置插件的路径，并加载相关类库
 */
Ext.Loader.setConfig({
	enabled : true
// 开启动态加载的依赖加载功能，默认为false不开启
});

Ext.Loader.setPath({
	'Ext.ux' : 'Admin/ext-ux'

});
Ext.require([ 'Ext.util.History', 'Ext.ux.statusbar.StatusBar',
// 'Ext.ux.portal.PortalPanel',
'Ext.ux.TabCloseMenu', 'Ext.ux.TabScrollerMenu', 'Ext.state.*' ]);


var appName = '基础权限管理系统';
var appVersion = 'v1.1';
var appBaseUri = './Admin/';

var mainTab,
// 全局分页大小
globalPageSize = 50,
// 全局时间列宽度
globalDateColumnWidth = 160;

var bussinessStore;
var businessHeaderPanel;//洽谈头部页面
var businessHomePanel;//洽谈内容页面
var businessRightUpPanel;//洽谈右边页面 服务
var businessRightDownPanel;//洽谈右边页面 金额


var tokenDelimiter = ':';

Ext.application({

	name : 'App', // 设定应用程序的命名空间(它将是controller,view.model和store的命名空间)
	appFolder : 'Admin/app', // 设定应用程序的路径
	autoCreateViewport : true,// 开启自动创建Viewport,它将自动去view目录下查找Viewport文件并实例化
	controllers : [],
	launch : function() {
		Ext.QuickTips.init();
	}
});

var App = new Object();

/** 数字金额大写转换(可以处理整数,小数,负数) */  
App.upDigit = function (n){  
    var fraction = ['角', '分'];  
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
    var head = n < 0? '欠': '';  
    n = Math.abs(n);  
    var s = '';  
    for (var i = 0; i < fraction.length; i++)   
    {  
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
    }  
    s = s || '整';  
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++)   
    {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++)   
        {  
            p = digit[n % 10] + unit[1][j] + p;  
            n = Math.floor(n / 10);  
        }  
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;  
    }  
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');  
} 


App.openRightPanel=function(plug,title){
	Ext.getCmp("ARightView").removeAll(false);
	Ext.getCmp("ARightView").add(plug);
	Ext.getCmp("ARightView").setTitle(title);
	Ext.getCmp("ARightView").show();
	Ext.getCmp("ARightView").expand();
}

// 打开tab
App.openTab = function(tabId, tabTitle, tab, config) {
	// App.log(config);
//	 App.log(tabId);
	var _tab = mainTab.getComponent('tab' + tabId);
	if (!_tab) {
		mainTab.setLoading('Loading...');
		_tab = Ext.create('Ext.panel.Panel', {
			closable : true,
			id : 'tab' + tabId,
			title : tabTitle,
			layout : 'fit',
			autoScroll : true,
			border : false,
			items : typeof (tab) == 'string' ? Ext.create(tab, config) : tab
		});
		mainTab.add(_tab);
		mainTab.setLoading(false);
	}
	mainTab.setActiveTab(_tab);
};

// 打开window
App.openWindow = function(winTitle, win, winWidth, config) {
	Ext.create('Ext.window.Window', {
		autoShow : true,
		modal : true,
		title : winTitle,
		width : winWidth || 280,
		items : typeof (win) == 'string' ? Ext.create(win, config) : win,
	});
};

//打开window by wu
App.newOpenWindow = function(winTitle, win, winWidth, winConfig,itemConfig) {
	var window=Ext.create('Ext.window.Window', {
		modal : true,
		title : winTitle,
		width : winWidth || 280,
		items : typeof (win) == 'string' ? Ext.create(win, itemConfig) : win,
		resizable:false
	});
	if(winConfig)
	{
		Ext.apply(window,winConfig);
	}
	window.show();
	return window;
};

//全屏转换
/*App.toggleFullscreen = function(element){
 if(element.offsetHeight<730)
 {App.requestFullscreen(element);}
 else
 {App.cancelFullscreen(element);}
 };*/
//设置全屏
App.requestFullscreen = function(element) {
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen ||
		element.mozRequestFullScreen || element.msRequestFullScreen;

	if (requestMethod) {
		requestMethod.call(element);
		return true;
	}
	else if (typeof window.ActiveXObject !== "undefined") {
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
		return true;
	}
	else{
		return false;
	}
};
//取消全屏
/*App.cancelFullscreen = function (element) {
	var requestMethod = element.cancelFullScreen||element.webkitCancelFullScreen||
		element.mozCancelFullScreen||element.exitFullscreen;
	if (requestMethod) { // cancel full screen.
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
};*/

// 关闭tab
App.closeTab = function(tabId) {
	var tab = mainTab.getActiveTab();
	tab.close();
	if (tabId != undefined) {
		mainTab.setActiveTab(tabId);
	}
};

// 刷新ActiveTab下的gridpanel
App.listReload = function() {
	if (mainTab.getActiveTab().down('gridpanel'))
		mainTab.getActiveTab().down('gridpanel').getStore().reload();
};

// 成功提示
App.msgTip = function(msg) {
	function createBox(t, s) {
		return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
	}

	var msgCt;
	if (!msgCt) {
		msgCt = Ext.DomHelper.insertFirst(document.body, {
			id : 'msg-div'
		}, true);
	}
	var m = Ext.DomHelper.append(msgCt, createBox('提示：', msg), true);
	m.hide();
	m.slideIn('t').ghost("t", {
		delay : 1000,
		remove : true
	});
};

// 错误提示
App.errTip = function(msg, e) {
	Ext.MessageBox.show({
		title : '出错啦！',
		msg : msg,
		buttons : Ext.MessageBox.OK,
		animateTarget : e,
		icon : Ext.MessageBox.ERROR
	});
};

// 一般提示
App.infoTip = function(msg, e) {
	Ext.MessageBox.show({
		title : '系统提示！',
		msg : msg,
		buttons : Ext.MessageBox.OK,
		animateTarget : e,
		icon : Ext.MessageBox.INFO
	});
};

// 选择性提示
App.confirmTip = function(msg, fn, buttons, e) {
	Ext.MessageBox.show({
		title : '确认继续？',
		msg : msg,
		buttons : buttons || Ext.MessageBox.YESNO,
		animateTarget : e,
		fn : fn
	});
};

// 控制台日志
App.log = function(obj) {
	if (window.console) {
		console.log(obj);
	}
};

// 导出excel
App.ImportToExcel = function(me, exportHideColumn, onlySelected) {
	onlySelected = onlySelected || false;
	// 要导出的列
	var exportColumns = new Array();
	Ext.each(me.columns, function(item, i) {
		if (i > 0) {
			if (exportHideColumn)
				exportColumns.push({
					text : item.initialConfig.text,
					dataIndex : item.initialConfig.dataIndex,
					width : item.initialConfig.width
				});
			if (!exportHideColumn && !item.initialConfig.hidden)
				exportColumns.push({
					text : item.initialConfig.text,
					dataIndex : item.initialConfig.dataIndex,
					width : item.initialConfig.width
				});
		}
	});

	// 筛选条件
	var exportFilters = new Array();
	if (me.filters) {
		Ext.each(me.filters.getFilterData(), function(item, i) {
			var data = {};
			for ( var key in item.data) {
				data[key] = item.data[key];
			}
			data["field"] = item.field;
			exportFilters.push(data);
		});
	}

	// 排序
	var exportSorters = new Array();
	Ext.each(me.store.getSorters(), function(item, i) {
		exportSorters.push({
			property : item.property,
			direction : item.direction
		});
	});

	var jsonData = {
		ExportColumns : exportColumns,
		ExportFilters : exportFilters,
		ExportSorters : exportSorters
	};
	if (onlySelected) {
		// 选中数据
		var s = me.getSelectionModel().getSelection();
		var importRecords = new Array();
		Ext.each(s, function(item, i) {
			importRecords.push(item.data);
		});
		if (importRecords.length == 0) {
			Niwar.infoTip('未选择任何数据！');
			return;
		}
		jsonData['SelectedRecords'] = Ext.JSON.encode(importRecords);
	}
	var newParams = {
		postType : 'export',
		jsonData : Ext.JSON.encode(jsonData)
	};
	var extended = Ext.apply(newParams, me.extraParams);

	if (!Ext.fly('frmDummy')) {
		var frm = document.createElement('form');
		frm.id = 'frmDummy';
		frm.name = frm.id;
		frm.className = 'x-hidden';
		document.body.appendChild(frm);
	}
	Ext.Ajax.request({
		url : "../" + me.cName + "/Export",
		method : 'POST',
		form : Ext.fly('frmDummy'),
		success : function(o, s, r) {

		},
		isUpload : true,
		params : extended
	});
};

// 拥有指定权限
App.HaveAction = function(name) {
	return Ext.Array.contains(idata.myInfo.actions, name);
};

// 拥有指定按钮
App.HaveActionMenu = function(items, name) {
	if (items && items.length > 0)
		return Ext.Array.contains(items, name);
	return false;
};

// 拥有指定角色
App.HaveRole = function(name) {
	return Ext.Array.contains(idata.myInfo.roles, name);
};

// 执行指定Action
App.run = function(url, params, itemStore) {
	Ext.Ajax.request({
		url : url,
		params : params,
		success : function(response) {
			if (response.responseText != '') {
				var res = Ext.JSON.decode(response.responseText);
				if (res.success) {
					App.msgTip('操作成功！');
					if (itemStore)
						itemStore.reload();
				} else
					App.errTip(res.msg);
			}
		}
	});
};

// 拥有指定列
App.HaveColumn = function(cName) {
	var columns = idata.myInfo.roleColumns[cName];
	this.have = function(columnName) {
		if (columns == undefined)
			return -2;
		return Ext.Array.contains(columns, columnName);
	};
};

/*
 * 字符串拼接类 用法： var buffer = new StringBuffer (); buffer.append("hello ");
 * buffer.append("world"); var result = buffer.toString();
 */
function StringBuffer() {
	this._strings_ = new Array();
}

StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
};

StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
};