/* 
 * @Author: xuguanlong
 * @Date:   2014-10-10 20:22:44
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2014-10-16 19:14:18
 */

//地图的显示全部自定义控件

function ShowAllControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(80, 8);
}

ShowAllControl.prototype = new BMap.Control();

ShowAllControl.prototype.initialize = function(map) {
	// 创建一个DOM元素  
	var div = document.createElement("div");
	// 添加文字说明  
	div.setAttribute("title", "显示全部");
	div.setAttribute("id", "show_all_ctr");
	// 设置样式  
	div.style.cursor = "pointer";
	div.style.width = '68px';
	div.style.height = '28px';
	div.innerHTML = '显示全部';
	//div.style.background = "url(static/images/show_all.png)";
	// 绑定事件，点击一次放大两级  
	div.onclick = function(e) {
		window.tracksControl.showAll();
	}
	$(div).bind({
		mouseenter: function() {
			//$(this).css("background", "url(static/images/show_all_1.png)");
			$(this).addClass('active');
			//$(".triangel-right").css("border-color", "transparent transparent transparent #3193F5");
		},
		mouseleave: function() {
			$(this).removeClass('active');
			//$(this).css("background", "url(static/images/show_all.png)");
		}
	})
	// 添加DOM元素到地图中  
	map.getContainer().appendChild(div);
	// 将DOM元素返回  
	return div;
}


function TimeControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(150, 10);
}

TimeControl.prototype = new BMap.Control();

TimeControl.prototype.initialize = function(map) {
	// 创建一个DOM元素  
	var div = document.createElement("div");
	// 添加文字说明  
	div.setAttribute("title", "轨迹时间");
	div.setAttribute("id", "time_control");
	// 设置样式  
	div.style.cursor = "default";
	div.style.width = '150px';
	div.style.height = '20px';
	div.style.background = "rgba(0,0,0,0.5)";
	div.style.textAlign = "center";
	div.style.fontSize = "10px";
	div.style.color = "#ffffff";
	map.getContainer().appendChild(div);
	// 将DOM元素返回  
	return div;
}

function fullScreenControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(10, 8);
}

fullScreenControl.prototype = new BMap.Control();

fullScreenControl.prototype.initialize = function(map) {
	// 创建一个DOM元素  
	var div = document.createElement("div");
	// 添加文字说明  
	div.setAttribute("title", "全屏");
	div.setAttribute("id", "full_screen_ctr");
	// 设置样式  
	div.style.cursor = "pointer";
	div.style.width = '68px';
	div.style.height = '28px';
	div.innerHTML = '全屏';
	//div.style.background = "url(static/images/show_all.png)";
	// 绑定事件，点击一次放大两级  
	$(div).bind({
		mouseenter: function() {
			//$(this).css("background", "url(static/images/show_all_1.png)");
			$(this).addClass('active');
			//$(".triangel-right").css("border-color", "transparent transparent transparent #3193F5");
		},
		mouseleave: function() {
			$(this).removeClass('active');
			//$(this).css("background", "url(static/images/show_all.png)");
		}
	})
	$(div).toggle(function() {
			$(this).attr("title", "退出全屏").html('退出全屏');
			tracksControl.fullScreenMap();
		},
		function() {
			$(this).attr("title", "全屏").html('全屏');
			tracksControl.defaultScreenMap();
		})
	// 添加DOM元素到地图中  
	map.getContainer().appendChild(div);
	// 将DOM元素返回  
	return div;
}