/* @file overview drag.js
 * 页面元素拖拽插件
 * @Author: xuguanlong
 * @Date:   2014-08-19 17:11:31
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2015-11-03 19:40:22
 */

$(function() {
    $(document).mousemove(function(e) {
        if(!!this.move) {
            var posix = !document.move_target ? {
                    x: 0,
                    y: 0
                } : document.move_target.posix,
                callback = document.call_down || function() {
                    $(this.move_target).css({
                        top: e.pageY - posix.y,
                        left: e.pageX - posix.x
                    });
                };

            callback.call(this, e, posix);
        }
    }).mouseup(function(e) {
        if(!!this.move) {
            var callback = document.call_up || function() {};
            callback.call(this, e);
            $.extend(this, {
                move: false,
                move_target: null,
                call_down: false,
                call_up: false
            });
        }
    });

    var $box = $('.tracks-history').mousedown(function(e) {
        var offset = $(this).offset();

        this.posix = {
            x: e.pageX - offset.left,
            y: e.pageY - offset.top
        };
        $.extend(document, {
            move: true,
            move_target: this
        });
    }).on('mousedown', '#h-slider', function(e) {
        $.extend(document, {
            move: true,
            call_down: function(e) {
                return false;
            }
        });
        return false;
    });

    var $move = $('.slide-up').mousedown(function(e) {
        var pos = {
            x: e.pageX,
            y: e.pageY
        };
        $.extend(document, {
            move: true,
            call_down: function(e) {
                var h = e.pageY - posiy.y + posiy.h;
                h = (h < 50) ? 50 : h;
                h = (h > 250) ? 250 : h;
                $('.monitor-panel').css({
                    'height': h
                });
                $('#mapContainer').css({
                    'height':$('.row').height() - h
                })
            }
        });
        return false;
    });
});
