/*
 * @Author: xuguanlong
 * @Date:   2014-08-20 18:42:34
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2015-10-29 16:52:59
 */
/* eslint-disable fecs-indent */
/* eslint-disable no-mixed-spaces-and-tabs */
var tpl = baidu.template('tracesList'); //traces列表的html模板
var aksObj = {}; //traces的ak对象  每条trace对应一个ak
var modalId = '#myModal';
/**
 * 添加trace的回调函数，服务端输出js传入data进行回调
 * @Author: xuguanlong
 * @param   {[type]}   data [服务端返回的参数]
 * @return  {Function}      [description]
 */

function backUrl() {
    var backurl = location.href;
    backurl = backurl.replace(/[<>]/g, function(match, pos, originalText) {
        switch (match) {
            case "<":
                return '&lt;';
                break;
            case ">":
                return '&gt;';
                break;
            case "&":
                return '&amp;';
                break;
            case "\"":
                return '&quot;';
                break;
        }
    });
    return backurl;
}

function callback(data) {
    data = $.parseJSON(data);
    var msg = data.message || "添加trace服务失败";
    if (data && data.status == 0) {
        $('.trace-msg').children('.glyphicon').removeClass('glyphicon-remove error').addClass('glyphicon-ok');
        $('.trace-msg-txt').removeClass('error').html('添加trace服务成功');
        $('.trace-msg').show();
        setTimeout(function() {
            $('#myModal').modal('hide');
            $('#trace-creat-btn').prop('disabled', false);
            $('.trace-msg').hide();
            getTraces();
        }, 1000);
    } else {
        $('.trace-msg').children('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove error');
        $('.trace-msg-txt').addClass('error').html(msg);
        $('.trace-msg').show();
        setTimeout(function() {
            $('#myModal').modal('hide');
            $('#trace-creat-btn').prop('disabled', false);
            $('.trace-msg').hide();
        }, 3000);
    }
}

function modifyCallBack(data) {
        data = $.parseJSON(data);
        if (data && data.status == 0) {
            $('.modify-msg').children('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
            $('.modify-msg-txt').html('修改trace服务成功');
            $('.modify-msg').show();
            setTimeout(function() {
                $('#myEditModal').modal('hide');
                $('#trace-modify-btn').prop('disabled', false);
                $('.modify-msg').hide();
                getTraces();
            }, 1000);
        } else {
            $('.modify-msg').children('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove');
            $('.modify-msg-txt').html('修改trace服务失败');
            $('.modify-msg').show();
            setTimeout(function() {
                $('#myEditModal').modal('hide');
                $('#trace-modify-btn').prop('disabled', false);
                $('.modify-msg').hide();
            }, 2000);
        }
    }
    /**
     * 页面加载时获取traces列表
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
function getTraces() {
    $('.loading-dialog').show();
    var timeStamp = new Date();
	timeStamp = timeStamp.getTime();
    $.get('api/getTraces.php?time=' + timeStamp, function (data) {
        $('.loading-dialog').hide();
        data = $.parseJSON(data);
        if (data.is_dev == 0) {
            $('.empty').show();
            data.services = [];
            modalId = '#devModal';
            var backurl = backUrl();
            backurl = 'http://developer.baidu.com/user/reg?u=' + backurl;
            $('#devBack').attr('href', backurl);
        }
        listTraces(data);
    });
}

/**
 * 按页码回去traces列表
 * @Author: xuguanlong
 * @param   {[type]}   index [description]
 * @return  {[type]}         [description]
 */
function getTracesByPageIndex(index) {
	var timeStamp = new Date();
	timeStamp = timeStamp.getTime();
    $.get('api/getTraces.php?time=' + timeStamp + '&page_index=' + index, function (data) {
        data = $.parseJSON(data);
        if (data && data.total > 0) {
            listTraces(data);
        }
    });
}


/**
 * 初始化aksObj对象，每条trace对应一条ak
 * @Author: xuguanlong
 * @param   {[type]}   data [description]
 * @return  {[type]}        [description]
 */
function initAksObj(data) {
    if (data) {
        for (var i = 0; i < data.services.length; i++) {
            aksObj[data.services[i].service_id] = data.services[i];
            data.services[i]['create_time'] = js_date_time(data.services[i]['create_time']);
            // var type = '';
            // switch (data.services[i]['type']) {
            //     case 0:
            //         type = '其他';
            //         break;
            //     case 1:
            //         type = '车辆管理行业';
            //         break;
            //     case 2:
            //         type = 'MTK位置穿戴';
            //         break;
            //     case 3:
            //         type = 'O2O配送行业';
            //         break;
            //     case 4:
            //         type = '位置智能穿戴行业';
            //         break;
            //     default:
            //         type = '其他';
            //         break;
            // }
            // data.services[i]['type'] = type;
        }
    }
}

function js_date_time(unixtime) {
        var timestr = new Date(parseInt(unixtime) * 1000);
        //var datetime = timestr.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        var datetime = date_format(timestr, 'yyyy-MM-dd');
        return datetime;
    }
    /**
     * 日期格式化  yyyy-MM-dd hh:mm:ss
     * @Author: xuguanlong
     * @param   {[type]}   date [description]
     * @return  {[type]}        [description]
     */
function date_format(date, fmt) {
    // var fmt = "yyyy-MM-dd hh:mm:ss";
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * traces列表渲染
 * @Author: xuguanlong
 * @param   {[type]}   traces [description]
 * @return  {[type]}          [description]
 */
function listTraces(traces) {
    initAksObj(traces);
    if (traces.services.length > 0) {
        var html = tpl(traces);
        $('.empty').hide();
        $('#traces-table-body').html(html);

        // $clamp(myParagraph, {clamp: '35px'});
    } else {
        $('#traces-table-body').html('');
        $('.empty').show();
    }
    $('#add-btn').attr('data-target', modalId);
    // slyInit();
}

function updateTrace(t) {
        var id = $(t).attr('data-id');
        var ak = $(t).attr('ak');
        var traceName = aksObj[id].name;
        var desc = aksObj[id].desc;
        $('#trace_id').val(id);
        $('#modify_ak').val(ak);
        $('#modify_name').val(traceName);
        $('#modify_desc').val(desc);
        $('#myEditModal').modal();
    }
    /**
     * 删除trace
     * @Author: xuguanlong
     * @param   {[type]}   t 鼠标点击的target
     * @return  {[type]}     [description]
     */
function deleteTrace(t) {
    $('#myDelModal').modal();
    $("#trace-del-btn").unbind("click")
    $('#trace-del-btn').bind('click', function(e) {
        var id = $(t).attr('data-id');
        $(t).prop('disabled', true);
        var ak = $(t).attr('ak');
		var timeStamp = new Date();
		timeStamp = timeStamp.getTime();
        $.get('api/traceDel.php?time=' + timeStamp + '&id=' + id + '&ak=' + ak, function (data) {
            data = $.parseJSON(data);
            if (data && data.status == 0) {
                $('.del-trace-msg').children('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
                $('.del-trace-msg-txt').html('删除鹰眼服务成功');
                $('.del-trace-msg span').removeClass('error');
                $('.del-trace-msg').show();
            } else {
                $('.del-trace-msg').children('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $('.del-trace-msg-txt').html('删除鹰眼服务失败');
                $('.del-trace-msg span').addClass('error');
                $('.del-trace-msg').show();
            }
            setTimeout(function() {
                //closeAlert();
                $('#trace-del-btn').prop('disabled', false);
                $('#myDelModal').modal('hide');
                $('.del-trace-msg').hide();
                getTraces();
            }, 1000);
        });
    });
}

function closeAlert() {
    $('.del-trace-msg').hide();
    $('#myDelModal').modal('hide');
}

$(document).ready(function() {
    getTraces();
});
