var g_bigImg_t;
$(function(){
	$("#bigImg .btnList li").each(function(index, el) {
		$(this).data("img",$("#bigImg .imageList li:eq("+index+")"));
		$(this).on("click",function(){
			if(!$("#bigImg").data("banRoll")){
				$("#bigImg").data("banRoll",true);
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				bigImgRoll(index);
			}
		});
	});
	$("#bigImg .rightBtn").on('click',function(){
		var showindex = $("#bigImg").data("showindex")*1;
		if(showindex != $("#bigImg .btnList li").length-1){
			$("#bigImg .btnList li:eq("+(showindex+1)+")").trigger('click');
		}else{
			$("#bigImg .imageList").animate({"margin-left":-($("#bigImg .imageList li").length-1)*1000-80+"px"},200,function(){
				$(this).animate({"margin-left":-($("#bigImg .imageList li").length-1)*1000+"px"},50)});
		}
	});
	$("#bigImg .leftBtn").on('click',function(){
		var showindex = $("#bigImg").data("showindex")*1;
		if(showindex != 0){
			$("#bigImg .btnList li:eq("+(showindex-1)+")").trigger('click');
		}else{
			$("#bigImg .imageList").animate({"margin-left":"80px"},200,function(){
				$(this).animate({"margin-left":"0px"},50)});
		}
	});
	$("#bigImg").on('mouseover',function(){
		clearTimeout(g_bigImg_t);
	}).on('mouseout',function(){
		startRoll();
	});
	startRoll();

	$("#news .titleBar2>*").on('click',function(event) {
		event.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$("#news .newsList").addClass('hidden');
		$("#news .newsList:eq("+$(this).index()+")").removeClass('hidden');
	});
});
function startRoll(){
	g_bigImg_t = setInterval(function(){
		var showindex = $("#bigImg").data("showindex")*1+1;
		if(showindex == $("#bigImg .btnList li").length)
			showindex = 0;
		$("#bigImg .btnList li:eq("+showindex+")").trigger('click');
	},5000);
}
function bigImgRoll(index){
	$("#bigImg").data("showindex",index);
	$("#bigImg .imageList").animate({
		"margin-left":-1000*index+"px"
	},300,function(){
		$("#bigImg").data("banRoll",false);
	});
}