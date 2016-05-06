<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>My JSP 'calendar.jsp' starting page</title>
    <link rel='stylesheet' type='text/css' href='../../css/fullCalendar/fullcalendar.css' />
<script type="text/javascript" src="../../js/fullCalendar/moment.min.js"></script>
<script type='text/javascript' src='../../js/fullCalendar/jquery.min.js'></script>
<script type='text/javascript' src='../../js/fullCalendar/fullcalendar.min.js'></script>
	<script type='text/javascript'>




$(document).ready(function() {
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			height:"800px",
			draggable : true,
			defaultDate: '2015-02-12',
			events : "http://localhost:8080/WebDemo/json/j.json",
			"editable":true
		});
		//"http://localhost:6060/aa/json/j.json"
	});

	
</script>

  </head>
  
  <body>
   <div id='calendar' style="width: 1000px; height: 800px;margin: 0 auto;"></div>
  </body>
</html>
