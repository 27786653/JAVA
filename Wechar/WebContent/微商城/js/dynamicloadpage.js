/*
 * 下拉加载数据插件
 * Programming by lds 2015-05-29
 * 
 */
	function DynamicLoadPage(myconfig) {
		return (this instanceof DynamicLoadPage)
				? this.init(myconfig)
				: new DynamicLoadPage(myconfig);
	}

	DynamicLoadPage.prototype.session = window.sessionStorage;

	/**
	 * 配置信息
	 */
	DynamicLoadPage.prototype.config = {
		fillData : {
			templateHtml : "",
			templateProperties : [],
			templateFlag : true,
			noTemplateCallback : function(obj){},
			listName : "data",
			appendHtmlRootId : "boxList"
		},
		ajaxConfig : {
			isAjax : false,
			url : "",
			params : {},
			asyFlag : false,
			successCallback : function(){},
			errorCallback : function(){}
		},
		pageLoadConfig : {
			currentPage : 1,
			totalPage : 1,
			currentPageKey : 'currentPage',
			toTop: {toTopFlag: false ,topCallback : function(){}},
			loading : function(){
				//正在加载
				//console.log("页面加载中");
			},
			loadSuccess : function() {
				//加载成功
				//console.log("页面加载成功");
			},
			loadError : function() {
				//加载失败
				//console.log("页面加载失败");
			},
			loadEnd : function(){
				//页面加载完成
				//console.log("页面加载完成");
			}
		}
	};
	
	/**
	 * 
	 * @param config : {<br>
	 * (必填)templateHtml : String模板,参数用${xxx}表示<br>
	 * (必填)templateProperties : Array要填充的json参数属性名<br>
	 * (必填)listName : json中数据集合KEY
	 * (必填)appendHtmlRootId : 数据加载ID为appendHtmlRootId的节点内尾部
	 * (必填)url : ajax请求url<br>
	 * (必填)totalPage : 数据总页数<br>
	 * params : ajax参数{}<br>
	 * successCallback : ajax请求成功后执行函数<br>
	 * errorCallback : ajax请求失败后执行函数<br>
	 * currentPage : 当前页数<br>
	 * loading : 加载中回调函数<br>
	 * loadSuccess : 加载成功回调函数<br>
	 * loadError : 加载失败回调函数<br>
	 * loadEnd : 加载全部完成回调函数<br>
	 * toTopFlag : 是否显示TOP按钮，默认false<br>
	 * topCallback : TOP回调函数<br>
	 * templateFlag : 是否使用数据模板,如果不使用模板，则必须提供noTemplateCallback回调函数<br>
	 * noTemplateCallback : 不使用数据模板时，使用回调函数<br>
	 * currentPageKey : 参数中表示当前页参数名（传给后台的）<br>
	 * }
	 */
	DynamicLoadPage.prototype.init = function(myConfig) {
		if(myConfig.templateHtml) this.config.fillData.templateHtml = myConfig.templateHtml;//必填
		if(myConfig.templateProperties) this.config.fillData.templateProperties = myConfig.templateProperties;//必填
		if(myConfig.listName) this.config.fillData.listName = myConfig.listName;//与json中一样
		if(myConfig.appendHtmlRootId) this.config.fillData.appendHtmlRootId = myConfig.appendHtmlRootId;//必填
		
		if(myConfig.url) this.config.ajaxConfig.url = myConfig.url;//必填
		if(myConfig.params) this.config.ajaxConfig.params = myConfig.params;
		if(myConfig.successCallback) this.config.ajaxConfig.successCallback = myConfig.successCallback;
		if(myConfig.errorCallback) this.config.ajaxConfig.errorCallback = myConfig.errorCallback;
		
		if(myConfig.currentPage) this.config.pageLoadConfig.currentPage = myConfig.currentPage;
		if(myConfig.totalPage) this.config.pageLoadConfig.totalPage = myConfig.totalPage;//必填
		if(myConfig.loading) this.config.pageLoadConfig.loading = myConfig.loading;
		if(myConfig.loadSuccess) this.config.pageLoadConfig.loadSuccess = myConfig.loadSuccess;
		if(myConfig.loadError) this.config.pageLoadConfig.loadError = myConfig.loadError;
		if(myConfig.loadEnd) this.config.pageLoadConfig.loadEnd = myConfig.loadEnd;
		if(myConfig.toTopFlag != undefined) this.config.pageLoadConfig.toTop.toTopFlag = myConfig.toTopFlag;
		if(myConfig.topCallback) this.config.pageLoadConfig.toTop.topCallback = myConfig.topCallback;
		if(myConfig.templateFlag != undefined) this.config.fillData.templateFlag = myConfig.templateFlag;
		if(myConfig.noTemplateCallback) this.config.fillData.noTemplateCallback = myConfig.noTemplateCallback;
		if(myConfig.currentPageKey) this.config.pageLoadConfig.currentPageKey = myConfig.currentPageKey;
		return this;
	};

	/**
	 * 更新配置中、参数中当前页数
	 * @param {} currentPage
	 */
	DynamicLoadPage.prototype.initCurrentPageParam = function(currentPage){
		var config = this.config;
		config.pageLoadConfig.currentPage = currentPage;//更新配置中当前页
		eval('config.ajaxConfig.params[\'' + config.pageLoadConfig.currentPageKey + '\'] = ' + currentPage);//更新参数中当前页
		//console.log("参数中当前页数:" + config.ajaxConfig.params[config.pageLoadConfig.currentPageKey]);
	};
	
	/**
	 * ajax获取分页数据
	 */
	DynamicLoadPage.prototype.getJsonData = function() {
		var thisObj = this;
		var config = this.config;
		config.ajaxConfig.isAjax = true;// ajax加载开始
		config.pageLoadConfig.loading();//正在加载
		var datalistname = config.fillData.listName;
		var returnData = {datalistname:{}};
		$.ajax({
			url : config.ajaxConfig.url,
			type : "POST",
			data : config.ajaxConfig.params,
			dataType : 'json',
			async : config.ajaxConfig.asyFlag,
			success : function(data){
				config.ajaxConfig.successCallback(data);
				returnData = data;
			},
			error : function(xhr){
				thisObj.initCurrentPageParam(--config.pageLoadConfig.currentPage);
				config.ajaxConfig.errorCallback(xhr);
			}
		});
		return returnData;
	};

	/**
	 * 填充数据到模板
	 */
	DynamicLoadPage.prototype.fillTemplate = function(templateHtml,
			templateProperties1, obj) {
		for (var i in templateProperties1) {
			var templ = '&{' + templateProperties1[i] + '}';
			var pro = eval('obj.' + templateProperties1[i]) + '';
			templateHtml = templateHtml.replace(templ, pro);
		}
		return templateHtml;
	};
	
	/**
	 * 监听回退数据丢失，从session中自动补全
	 */
	DynamicLoadPage.prototype.autoListenerMis = function(){
		var thisobj = this;
		var currentPage = thisobj.config.pageLoadConfig.currentPage;
		var totalPages = thisobj.config.pageLoadConfig.totalPage;
		var pageMax = $("#currentPage_" + currentPage).val();// 应该加载的最大页数标志对象
		if(thisobj.session != null && currentPage > 1 && (!pageMax || pageMax == 1 || pageMax == '')){
			// 加载因回退丢失的数据
			for ( var i = 2; i <= currentPage; i++) {
				var currentPage_ = $("#currentPage_" + i).val();
				if(!currentPage_){
					thisobj.config.pageLoadConfig.loading();
					$(thisobj.config.fillData.appendHtmlRootId).append(thisobj.session.getItem("currentPage_" + i));
					//console.log("loadding_sessionStorageData:page" + i);
				}
			}
			// 定位最后一次浏览位置
			var currentPostionY = thisobj.session.getItem("currentPostionY");// 最后一次浏览位置Y坐标
			if(currentPostionY != null && currentPostionY > 0){
				window.scroll(0,currentPostionY);
			}
			if(currentPage == totalPages){
				thisobj.config.pageLoadConfig.loadEnd();
			} else {
				thisobj.config.pageLoadConfig.loadSuccess();
			}
		}
	};
	
	/**
	 * 加载页面
	 */
	DynamicLoadPage.prototype.loadPage = function() {
		var config = this.config;
		var totalPage = parseInt(config.pageLoadConfig.totalPage);
		var currentPage = parseInt(config.pageLoadConfig.currentPage);
		if (($(window).scrollTop() + $(window).height() > $(document).height() - 40) && !config.ajaxConfig.isAjax && totalPage > currentPage) {
			/*alert("$(window).scrollTop() : " + $(window).scrollTop() + ",\n$(window).height():" + $(window).height()
			+ ",\n$(window).scrollTop() + $(window).height():" + ($(window).scrollTop() + $(window).height()) + 
			",\n$(document).height() - 40):" + ($(document).height() - 40) );*/
			currentPage = currentPage + 1;
			if (currentPage > totalPages) {
				currentPage = totalPages;
				return;
			}
			if($('#currentPage_' + currentPage).val()){
				console.log("当前页已存在：" + currentPage);
				return ;
			}
			this.initCurrentPageParam(currentPage);//更新参数中当前页
			// ajax加载开始
			var data = this.getJsonData();
			if((data + '').indexOf('ERROR') > -1){
				currentPage--;
				this.initCurrentPageParam(currentPage);//更新参数中当前页
				config.ajaxConfig.isAjax = false;// ajax加载结束
				config.pageLoadConfig.loadError();
				return ;
			}
			
			var listName = config.fillData.listName;
			var list = eval('data.' + listName);
			if(list == undefined){
				currentPage--;
				this.initCurrentPageParam(currentPage);//更新参数中当前页
				config.ajaxConfig.isAjax = false;// ajax加载结束
				config.pageLoadConfig.loadError();
				return ;
			}
			var templateHtml = config.fillData.templateHtml;
			var templateProperties = config.fillData.templateProperties;
			var allHtml = "";
			// 遍历数据
			for (var i = 0; i < list.length; i++) {
				if(config.fillData.templateFlag){
					//使用模板
					
					allHtml += this.fillTemplate(templateHtml, templateProperties, list[i]);
				} else {
					//使用回调函数
					allHtml += config.fillData.noTemplateCallback(list[i]);
				}
			}
			allHtml += '<input type="hidden" id="currentPage_' + currentPage + '" value="' + currentPage + '"/>';//页面加载数据的标记
			this.session.setItem("currentPage_" + currentPage, allHtml);// session保存当前页
			$(config.fillData.appendHtmlRootId).append($(allHtml));
			config.ajaxConfig.isAjax = false;// ajax加载结束
			if (currentPage >= totalPages) {
				config.pageLoadConfig.loadEnd();//全部加载完成
			} else {
				config.pageLoadConfig.loadSuccess();//加载成功
			}
		}
	};
	
	/**
	 * 自动下拉加载
	 */
	DynamicLoadPage.prototype.autoScroll = function(){
		var thisobj = this;
		if(thisobj.config.pageLoadConfig.totalPage == 1){
			//总页数只有1页，不触发下拉事件
			thisobj.config.pageLoadConfig.loadEnd();
			return ;
		}
		thisobj.autoListenerMis();//加载丢失数据
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			if(scrollTop % 50 == 0){
				thisobj.session.setItem("currentPostionY", scrollTop);
			}
			// TOP按钮加载
			if(thisobj.config.pageLoadConfig.toTop.toTopFlag){
				thisobj.config.pageLoadConfig.toTop.topCallback();
			}
			// 页面加载
			thisobj.loadPage();
		});
	};