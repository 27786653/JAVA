$(function(){
	$("#tabDiv").on('click', '.tab', function(event) {
		event.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$(".tabPanel").addClass('hidden');
		$(".tabPanel:eq("+$(this).index()+")").removeClass('hidden');
	});
})