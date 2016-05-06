/**
 * 自定义js
 */
$(function(){
    layer.use('extend/layer.ext.js'); //载入layer拓展模块 
});


/** start  board    **/

function ajaxDelboard(id){
	var url="bda_delboard_boardroommanger";
	var data="BId="+id;
	ajaxc(url,data);
}

function ajaxAddboard(){
	var url="bda_addboard_boardroommanger";
	var data="BCode="+$("[name=BCode]").val()+"&BDesc="+$("[name=BDesc]").val();
	ajaxc(url,data);
}

function saveChangeb(){
	ajaxAddboard();
	$('#myModal').modal('hide');
	
}

/** end  board    **/


/** start  car    **/




function ajaxDelcar(id){
	var url="ca_delcar_carmanger";
	var data="CId="+id;
	ajaxc(url,data);
}
function ajaxAddcar(){
	var url="ca_addcar_carmanger";
	var data="CCarcode="+$("[name=CCarcode]").val()+"&CCartype="+$("[name=CCartype]").val()+"&CDesc="+$("[name=CDesc]").val();
	ajaxc(url,data);
}

function  saveChange(){
	ajaxAddcar();
	$('#myModal').modal('hide');
}
/** end  car    **/


/** start  fileRecycle    **/

	

	function ajaxupdatefilerecycle(id){
		var url="fda_update_fileRecycle";
		var data="fdId="+id;
		ajaxc(url,data);
	}
	
	function aclick(id){
	
		document.location.href="http://localhost:8080/WebDemo/jsp/Mydesk/file/fda_show_filelist?fdId="+id;
	}



/** end  fileRecycle    **/



/** start  webmanger    **/


function addweb(){
	var srcc='../../jsp/Mydesk/webmanger/Addwebmanger.jsp';
	var title= "添加网站";
	OpenLayer(srcc,title);
}

function ajaxAddweb(){
	var url="wma_addWeb_Addwebmanger";
	var data="WName="+$("#webtitle").val()+"&WAddress="+$("#webs").val();
	ajaxc(url,data);
}
function ajaxDeleteweb(id){
	var url="wma_deleteWeb_left";
	var data="WId="+id;
	ajaxc(url,data);
}


/** end  webmanger    **/







/** start  note    **/

/**
 * 关闭窗口
 */
function closeframe(){
	//当你在iframe页面关闭自身时
 	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
 	parent.layer.close(index); //再执行关闭    
}
/**
 * 提交添加
 * @param id
 */
function ajaxAdd(){
	var url="na_addNote_updatenote";
	var data="NTitle="+$("#at").val()+"&NContent="+$("#ac").val();
	ajaxc(url,data);
}
/**
 * 提交删除
 * @param id
 */
function ajaxDelete(id){
	var url="na_deleteNote_updatenote";
	var data="?NId="+id;
	ajaxc(url,data);
}
/**
 * 提交修改
 * @param id
 */
function ajaxUpdate(id){
	var url="na_updateNote_updatenote";
	var data="?NId="+id+"&NTitle="+$("#inputSuccess3").val()+"&NContent="+$("#inputGroupSuccess2").val();
	ajaxc(url,data);
}



/**
 * 移除class属性
 */
function changeClass(){
	var b=$("#box2");
if(b.attr("class").indexOf("hidden")>0){
	b.removeClass("hidden");
}else{
	b.addClass("hidden");
}
}


	/**
	 * 弹出窗进行查看详细信息
	 * @param id
	 */
	function cc(id,title){   
		var srcc='../../jsp/Mydesk/note/na_getNotebyid_updatenote?NId='+id;
		var title= title;
		OpenLayer(srcc,title);
  }
	/**
	 * 弹出窗进行添加
	 * @param id
	 */
	function add(){
		var srcc='../../jsp/Mydesk/note/AddNote.jsp';
		var title= "添加便签";
		OpenLayer(srcc,title);
	}
	

/** end  note    **/

	
	

/** start public    **/
	
	/**
	 * 异步请求
	 * @param url
	 * @param data
	 */
	function ajaxc(url,data){
		$.ajax({
			url:url,
			type:"POST",
			data:data,
			success:function(data){
				javascript:window.parent.par();
			}
		});
	}
	
	/**
	   * 不同的提醒
	   */
	function showToast(){
		 toastr.success('Without any options', 'Simple notification!');
		    toastr.info('Are you the 6 fingered man?');
		    toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
		    toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');   
		
	}
	
	/**
	 * 弹窗
	 * @param srcc
	 * @param title
	 */
	function OpenLayer(srcc,title){   
		aa=  $.layer({
                    type : 2,
                    title: title,
                    shade: false,
                    shadeClose: true,
                    maxmin: true,
                    fix : false,  
                    shift :2,
                    area: ['500px', '500px'],                     
                    iframe: {
                        src: srcc
                    }
                });
  }
	
	//计算天数差的函数，通用  
	function  DateDiff(sDate2){    //sDate1和sDate2是2006-12-18格式  
	    var  aDate,  oDate1,  oDate2,  iDays  
	    oDate1=new Date();
	    oDate1=  oDate1.getFullYear()+"-"+(oDate1.getMonth()+1)+"-"+oDate1.getDate();
	    aDate  =  oDate1.split("-")  
	    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式  
	    aDate  =  sDate2.split("-")  
	    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
	    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
	    return  iDays  
	}    
	
	  
	
	
	
	
	/** end  public    **/	
	