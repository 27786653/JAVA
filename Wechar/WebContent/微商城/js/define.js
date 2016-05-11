// JavaScript Document
function oper_popup(id){
	var state = document.getElementById("popup_" + id).style.display;
	if( state == "none" ){
		document.getElementById("popup_" + id).style.display = "";	
	}else
	document.getElementById("popup_" + id).style.display = "none";
}

function hide_popup(id){
	document.getElementById(id).style.display = "none";	
}

/**
 * 格式化金额，为1,800格式
 */
function fmtPoints(s, n)  
{  
	 n = n > 0 && n <= 20 ? n : 2;  
	 s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	 var l = s.split(".")[0].split("").reverse(),  
	 r = s.split(".")[1];  
	 t = "";  
	 for(i = 0; i < l.length; i ++ )  
	 {  
	    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	 }  
	return t.split("").reverse().join("");  
}

function fmtPoints(s, n)  
{  
	 n = n > 0 && n <= 20 ? n : 2;  
	 s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	 var l = s.split(".")[0].split("").reverse(),  
	 r = s.split(".")[1];  
	 t = "";  
	 for(i = 0; i < l.length; i ++ ) 
	 {  
	    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	 }  
	return t.split("").reverse().join("");
}

function fmtMoney(s, n)  
{  
	 n = n > 0 && n <= 20 ? n : 2;  
	 s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	 var l = s.split(".")[0].split("").reverse(),  
	 r = s.split(".")[1];  
	 t = "";  
	 for(i = 0; i < l.length; i ++ )  
	 {  
	    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	 }  
	return t.split("").reverse().join("")+"."+r;  
}


/**
 * 验证码是否合法
 * @param {} k
 * @param {} length
 * @return {Boolean}
 */
function isSmsCode(k, length){
	var int_con = /^[0-9A-Za-z]{4}$/;
	if (length == 6){
		int_con = /^[0-9A-Za-z]{6}$/;
	}
	if (!int_con.test(k)) {
		return false;
	} else {
		return true;
	}
}

/**
 * 整数验证 2或4位
 * @param k
 * @param length
 * @returns {Boolean}
 */
function zhengshu(k, length) {
	var int_con = /^[0-9]{1,2}$/;
	if (length == 4){
		int_con = /^[0-9]{1,4}$/;
	}
	if (!int_con.test(k)) {
		return false;
	} else {
		return true;
	}
}

/**
 * 手机验证
 * @param str
 * @returns {Boolean}
 */
function isMobile(str){
	var pattern = /^1[0-9]{10}$/;
	if (!pattern.test(str)) {
		return false;
	} else {
		return true;
	}
}

/**
 * 切换排序
 * @param {} id
 */
function orderTab(id) {
	if (id == orderType) {
		if (orderSortBy == "desc") {
			if (id == "newArriv" || id == "hot") {
				return;
			}
			orderSortBy = "asc";
		} else if (orderSortBy == "asc") {
			orderSortBy = "desc";
		}
	} else {
		orderSortBy = "desc";
	}
	orderType = id;
	$("#orderType").val(orderType);
	$("#orderSortBy").val(orderSortBy);
	afterSort(orderType, orderSortBy);
	initFirstPage();//显示第一页
	$("#pageForm").submit();
}

/**
 * 显示第一页
 */
function initFirstPage(){
	if(document.getElementById("page.currentPage")){
		document.getElementById("page.currentPage").value = 1;
	}
}

/**
 * 排序后按钮样式修改
 * <em>获取&lt;div id="sor_img"&gt;下的两个&lt;img&gt;</em>
 * @param {} orderType
 * @param {} orderSortBy
 */
function afterSort(orderType,orderSortBy){
	var nowId = "pro_sort_" +orderType;
	var imgs = $("#sort_img").children("img");
	$("a[id^=pro_sort_]").each(function(i,obj){
		$(obj).removeClass("active");
		$(obj).children("img")[0].src = imgs[0].src;
		if(nowId == obj.id){
			//当前排序
			$(obj).addClass("active");
			if("asc" == orderSortBy){
				//asc
				$(obj).children("img")[0].src = imgs[1].src;
			} else {
				//desc
				$(obj).children("img")[0].src = imgs[2].src;
			}
		}
	});
}

function checkAgreement(id){
	document.getElementById(id).checked = "checked";
	hide_popup('popup_disclaimer');
}
//增加身份证18位校验
function fn18Paper(paperNo){
	if(paperNo.length==18){
		var XNUM = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
		var XLAST = ["1","0","X","9","8","7","6","5","4","3","2"];
		var XTEMP = 0;
		for(var i=0;i<paperNo.length-1;i++){
			XTEMP+=parseInt(paperNo.charAt(i))*XNUM[i];
		}
		if(XLAST[XTEMP%11]!=paperNo.charAt(17).toUpperCase()){
			return false;
		}
	}
	return true;
}