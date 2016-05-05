/* 
 * @Author: xuguanlong
 * @Date:   2014-08-19 17:11:31
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2014-10-28 14:04:38
 */
$(document).ready(function() {
    // tracksControl.monitoringTableRender();
     
    $('#chk_all_track').bind("click", function() {
        $('input[name="chkItem"]').attr("checked", this.checked);
        if ($(this).attr('checked')) {
            for (var i = 0; i < tracksControl.tracksList.length; i++) {
                tracksControl.addMonitoring(tracksControl.tracksList[i]);
            }
            if ($('#history-track').hasClass('active')) {
                tracksControl.historyTableRender();
            } else {
                tracksControl.monitoringTableRender();
            };
            setTimeout(function() {
                tracksControl.setFitview(1);
            }, 500);
        } else {
            for (var i = 0; i < tracksControl.tracksList.length; i++) {
                tracksControl.removeMonitoring(tracksControl.tracksList[i].track_id);
            }
        }
    })
    $("#monitoring").bind("click", function() {
        $('.box-tabs li').removeClass('active');
        $(this).addClass('active');
        $('.history-time-div').hide();
        tracksControl.timeControl.hide();
        $('.box-table-container').css('height', '193px');
        if (tracksControl.tracksMonitoring.length > 0) {
            tracksControl.tracksMonitorStart();
        }
    });
    $('#history-track').bind("click", function() {
        $('.box-tabs li').removeClass('active');
        $(this).addClass('active');
        $('.history-time-div').show();
        //tracksControl.timeControl.show();
        $('.box-table-container').css('height', '155px');
        if (tracksControl.tracksMonitoring.length > 0) {
            tracksControl.tracksHistoryStart();
        }
    })

    function checkTrack(index) {
        var isExsit = false;
        _.each(tracksControl.tracksMonitoring, function(element, i) {
            if (element['id'] == index) {
                isExsit = true;
            }
        });
        return isExsit;
    }
    $('.tracks-history .close').click(function() {
        if (tracksControl.isPlayed) {
            jConfirm('当前轨迹正在回放中,是否停止?', '历史轨迹回放', function(res) {
                if (res) {
                    tracksControl.trackStop();
                    $('.tracks-history').hide();
                }
            });
        } else {
            $('.tracks-history').hide();
        }
    })
    $("body").keydown(function() {
        if (event.keyCode == "13" && tracksControl.focus) { //keyCode=13是回车键
            $('#track-search-btn').button('loading');
            var key = $("#track-search-text").val();
            tracksControl.keyWord = key;
            if (tracksControl.keyWord.length <= 0) {
                $('#track-search-btn').button('reset');
            }
            tracksControl.loadTracks(1);
        }
        if (event.keyCode == '32') {
            if ($('.tracks-history').is(':visible')) {
                if (tracksControl.isPlayed) {
                    if(tracksControl.isPaused){
                        tracksControl.trackPlay(tracksControl.currentPlayTrack);
                    }else{
                       tracksControl.trackPause(); 
                    }
                } else {
                    tracksControl.trackPlay(tracksControl.currentPlayTrack);
                }
            }
        }
    })
    $("#track-search-text").focus(function() {
        tracksControl.focus = true;
    });
    $("#track-search-text").blur(function() {
        tracksControl.focus = false;
    });
    $('#track-search-btn').click(function() {
        var btn = $(this);
        btn.button('loading');
        var key = $("#track-search-text").val();
        tracksControl.keyWord = key;
        if (tracksControl.keyWord.length <= 0) {
            btn.button('reset');
        }
        tracksControl.loadTracks(1);
    });
    $('#btn-play').bind('click', function() {
        if ($(this).children().hasClass('glyphicon-repeat')) {
            if (tracksControl.replayPlayTrack && tracksControl.monitoringTrackOverlays[tracksControl.replayPlayTrack].display) {
                //$(this).children().removeClass('glyphicon-repeat').addClass('glyphicon-pause');
                tracksControl.trackReplay();
            } else {
                $('.no-poi-msg span').html('重新回放的轨迹未找到！');
                $('.no-poi-msg').show();
                setTimeout(function() {
                    $('.no-poi-msg').hide();
                }, 1000);
            }
        } else {
            if (!tracksControl.currentPlayTrack) {
                $('.no-poi-msg span').html('请先选择需要回放的轨迹！');
                $('.no-poi-msg').show();
                setTimeout(function() {
                    $('.no-poi-msg').hide();
                }, 1000);
            } else {
                if ($(this).children().hasClass('glyphicon-play')) {
                    tracksControl.trackPlay(tracksControl.currentPlayTrack);
                } else if ($(this).children().hasClass('glyphicon-pause')) {
                    //$(this).children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                    tracksControl.trackPause();
                } else {
                    return;
                }
            }
        }
    });
    $('#btn-stop').click(function() {
        tracksControl.trackStop();
        //tracksControl.processBarDisabled();
    });
});
