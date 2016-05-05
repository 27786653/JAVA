/* 
 * @Author: xuguanlong
 * @Date:   2014-08-19 17:11:31
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2014-10-24 10:27:28
 */
var tracksControl = function() {
    this.trace_id = ''; //当前trace服务id
    this.ak = ''; //当前trace服务关联的ak
    this.tracksList = []; //轨迹track列表
    this.curPage = 1; //当前页码
    this.pageSize = 10; //获取tracks的pageSize，默认12
    this.totalTracksNum = 0; //该条trace服务下总共的tracks数量
    this.keyWord = '';
    this.canvasRender = {}; //自定义canvas覆盖物的canvas绘制对象，包含zrender，用于绘制
    this.tracksMonitoring = []; //添加到监控栏之内的track列表
    this.monitoringMakers = {}; //实时监控的地图Markers集合，每个Marker对应key为track的id
    this.monitoringPolylines = {}; //实时监控的地图Markers集合，每个Marker对应key为track的id
    this.monitoringTrackOverlays = {}; //实时监控地图轨迹覆盖物集合，每一个overlay对应key为track的id
    this.monitored = false;
    this.map = null; //BMap的map对象
    this.trace = null;
    this.pois = []; //track 所有轨迹POI
    this.POIS_MAX_NUM = 6400; //是否抽稀的阀值，如果track的POI数超过该值，就进行抽稀
    this.DMAXDINSTANCE = 500; //抽稀的阀值 根据经纬度转换成平面坐标的值进行距离计算，小于该值的poi会被过滤。
    this._pois = []; //抽稀后的轨迹POI点
    this._LngLatpois = []; //抽稀后的轨迹POI点 经纬度值
    this._encrLngLatPois = []; // 对_LngLatpois 加密后的轨迹poi点
    this.pixelPois = []; //抽稀后的轨迹POI 像素坐标点  （地图变化时该数组也会变)
    this.currentPlayTrack = null; //当前正在回放的trackid
    this.defaultSpeed = 1000; //小车轨迹移动的速度  默认400(平面坐标的距离)
    this.lushu = null;
    // this.hasTracksOnMap = false; //是否存在track在地图上
    this.isPlayed = false; //小车移动动画是否在播放
    this.isPaused = false; //小车移动动画是否暂停
    this.totalStep = 0; //小车走完轨迹所需的步数
    this.curIndex = 0; //小车移动的动画游标
    this.tracksListTmpl = null;
    this.tracksMonitorTmpl = null;
    //this.tmplTheads = ['序号', 'ID'];
    this.tmplTheads = {};
    this.userColumns = {};
    this.tracksListTmplObj = {};
    this.monitorTableTmplObj = {}; //监控面板模板对象
    this.historyTableTmplObj = {};
    this.noTracksIds = []; //未查询到轨迹点的track id数组
    this.trackPoiArrayObj = {};
    /**
     * [ canvas 自定义图层覆盖物，canvas上绘制轨迹]
     * @Author: xuguanlong
     * @param   {[type]}   center       [中心点坐标]
     * @param   {[type]}   size         [覆盖物大小]
     * @param   {[type]}   trackControl [轨迹控制对象,方便于在自定义覆盖物内调用轨迹控制对象函数]
     */
    function ZrenderOverlay(center, size, trackControl) {
        this._center = center;
        this._width = size.width;
        this._height = size.height;
        this._trackControl = trackControl;
    }
    /**
     * [继承BMap 自定义覆盖物]
     * @type {BMap}
     */
    ZrenderOverlay.prototype = new BMap.Overlay();
    ZrenderOverlay.prototype.initialize = function(map) {
        this._map = map;
        var div = document.createElement("div");
        div.setAttribute("id", "zrenderDiv");
        div.style.position = "absolute";
        div.style.width = this._width + "px";
        div.style.height = this._height + "px";
        div.style.left = "0px";
        div.style.top = "0px";
        map.getPanes().mapPane.appendChild(div);
        //console.log(map.getPanes().mapPane);
        this._div = div;
        return div;
    }
    /**
     * canvas覆盖物绘制
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    ZrenderOverlay.prototype.draw = function() {
        this.refresh();
        this.reDraw();
    }
    /**
     * [canvas自定义覆盖物在地图map变换时进行更新，始终保持canvas覆盖物与map容器保持一致]
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    ZrenderOverlay.prototype.refresh = function() {
        if ($(this._div).parent().last().attr('id') != $(this._div).attr('id')) {
            $(this._div).parent().remove('#zrenderDiv').append($(this._div));
            this._trackControl.hasChangeDiv = true;
        }

        this._div.style.width = this._map.getSize().width + "px";
        this._div.style.height = this._map.getSize().height + "px";
        this._div.style.left = $('.BMap_mask').css('left');
        this._div.style.top = $('.BMap_mask').css('top');
        $(this._div).children().css({
            "width": this._div.style.width,
            "height": this._div.style.height
        });
        $(this._div).children().children().css({
            "width": this._div.style.width,
            "height": this._div.style.height
        });
        $(this._div).children().children().attr('height', this._div.style.height);
        $(this._div).children().children().attr('width', this._div.style.width);
    }
    /**
     * canvas覆盖物绘制track函数,将当前track的poi点坐标转换成像素坐标进行绘制
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    ZrenderOverlay.prototype.reDraw = function() {
        var trackOverlays = this._trackControl.monitoringTrackOverlays;
        for (var id in trackOverlays) {
            if (trackOverlays[id] && trackOverlays[id].display) {
                trackOverlays[id].pixelPois = [];
                if (typeof trackOverlays[id]._pois != 'undefined') {
                    for (var i = trackOverlays[id]._pois.length - 1; i >= 0; i--) {
                        var point = this._trackControl.map.pointToPixel(new BMap.Point(trackOverlays[id]._pois[i][0], trackOverlays[id]._pois[i][1]));
                        trackOverlays[id].pixelPois.push([point.x, point.y]);
                    }
                }
            }
        }
        if (typeof this._trackControl.canvasRender.zr != 'undefined' && this._trackControl.canvasRender.zr !== null) {
            this._trackControl.canvasRender.zr.clear();
        }
        this._trackControl.drawTrack();
    }
    /**
     * 过滤XSS攻击字符
     * @Author: xuguanlong
     * @param   {[type]}   s [description]
     * @return  {[type]}     [description]
     */
    this.xssFilter = function(s) {
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") //格式 RegExp("[在中间定义特殊过滤字符]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
    /**
     * 获取url中的参数
     * @Author: xuguanlong
     * @param   {[type]}   name [description]
     * @return  {[type]}        [description]
     */
    this.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return (this.xssFilter(r[2]));
        return null;
    }
    /**
     * tracksControl对象的初始化,初始trace_id,ak以及canvas覆盖物的对象
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.init = function() {
        var self = this;
        // self.trace_id = self.getQueryString('i');
        // self.ak = self.getQueryString('k');
        // self.processBar=$('.tracks-history');
        self.pageSize = self.setPageSize();
        self.projection = self.map.getMapType().getProjection();
        self.tracksListTmpl = baidu.template('tracks-list-tmpl');
        self.theadTmpl = baidu.template('monitor-table-thead');
        self.tracksMonitorTmpl = baidu.template('monitor-table-tbody');
        require.config({
            paths: {
                zrender: 'static/js/src/zrender',
                'zrender/shape/BrokenLine': 'static/js/src/zrender',
                'zrender/shape/Circle': 'static/js/src/zrender',
                'zrender/shape/Image': 'static/js/src/zrender',
                'zrender/tool/color': 'static/js/src/zrender',
                'zrender/tool/guid': 'static/js/src/zrender'
            }
        });
        require(
            ['zrender', 'zrender/shape/BrokenLine', 'zrender/shape/Circle', 'zrender/shape/Image', 'zrender/tool/color', 'zrender/tool/guid'], function(zrender, BrokenLineShape, CircleShape, ImageShape, color, guid) {
                var zrenderSquare = new ZrenderOverlay(self.map.getCenter(), self.map.getSize(), self);
                self.canvasRender.zrOverlay = zrenderSquare;
                self.map.addOverlay(zrenderSquare);
                self.canvasRender.zrender = zrender;
                self.canvasRender.zr = zrender.init(document.getElementById('zrenderDiv'));
                self.canvasRender.BrokenLineShape = BrokenLineShape;
                self.canvasRender.CircleShape = CircleShape;
                self.canvasRender.ImageShape = ImageShape;
                self.canvasRender.color = color;
                self.canvasRender.guid = guid;
                self.startImgId = guid();
                self.endImgId = guid();
            });
        setTimeout(function() {
            self.timerStart();
        }, 8000);

    }
    this.initDateTimePicker = function() {
        var n = new Date(),
            self = this;
        //n.setDate(n.getDate() - 1);
        self.selectDate = n;
        self.startTime = self.date_format(n, 'yyyy-MM-dd') + ' 00:00:00';
        self.endTime = self.date_format(n, 'yyyy-MM-dd') + ' 23:59:59';
        self.startTimeStr = self.date_format(n, 'yyyy-MM-dd') + ' 00:00';
        self.endTimeStr = self.date_format(n, 'yyyy-MM-dd') + ' 23:59';
        $('#date').html(self.date_format(n, 'yyyy-MM-dd'));
        var logic = function(currentDateTime) {
            var d = new Date();
            self.selectDate = currentDateTime;
            if (self.selectDate < n) {
                $('.next_day').removeClass('disabled-btn');
            } else {
                $('.next_day').addClass('disabled-btn');
            }
            self.startTime = self.date_format(currentDateTime, 'yyyy-MM-dd') + ' 00:00:00';
            if (currentDateTime.getFullYear() == d.getFullYear() && currentDateTime.getMonth() == d.getMonth() && currentDateTime.getDate() == d.getDate()) {
                self.endTime = self.date_format(currentDateTime, 'yyyy-MM-dd') + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            } else {
                self.endTime = self.date_format(currentDateTime, 'yyyy-MM-dd') + ' 23:59:59';
            }

            self.startTimeStr = self.date_format(currentDateTime, 'yyyy-MM-dd') + ' 00:00';
            self.endTimeStr = self.date_format(currentDateTime, 'yyyy-MM-dd') + ' 23:59';
            $('#date').html(self.date_format(currentDateTime, 'yyyy-MM-dd'));
            self.autoLoadHistory(true);
        }
        var datepicker = $("#div_date").datetimepicker({
            timepicker: false,
            //validateOnBlur: false,
            yearStart: 1990,
            yearEnd: n.getFullYear(),
            onChangeDateTime: logic,
            // onChangeMonth: changeStart,
            maxDate: self.date_format(n, 'yyyy/MM/dd'),
            // maxTime: 0,
            lang: 'ch'
        });
        $('.next_day').addClass('disabled-btn');
        $('.date_btn').bind('click', function() {
            var d = new Date();
            if ($(this).hasClass('pre_day')) {
                self.selectDate.setDate(self.selectDate.getDate() - 1);
                $('.next_day').removeClass('disabled-btn');
            } else if ($(this).hasClass('to_day')) {
                self.selectDate = new Date();
                $('.next_day').addClass('disabled-btn');
            } else if ($(this).hasClass('next_day')) {
                var now = new Date();
                self.selectDate.setDate(self.selectDate.getDate() + 1);
                if (self.selectDate > now) {
                    self.selectDate.setDate(self.selectDate.getDate() - 1);
                    $('.next_day').addClass('disabled-btn');
                    return;
                }
            } else {
                return;
            }
            self.startTime = self.date_format(self.selectDate, 'yyyy-MM-dd') + ' 00:00:00';
            if (self.selectDate.getFullYear() == d.getFullYear() && self.selectDate.getMonth() == d.getMonth() && self.selectDate.getDate() == d.getDate()) {
                self.endTime = self.date_format(self.selectDate, 'yyyy-MM-dd') + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            } else {
                self.endTime = self.date_format(self.selectDate, 'yyyy-MM-dd') + ' 23:59:59';
            }
            $('#date').html(self.date_format(self.selectDate, 'yyyy-MM-dd'));
            $("#div_date").datetimepicker({
                value: self.date_format(self.selectDate, 'yyyy-MM-dd'),
                format: 'Y-m-d'
            });
            self.autoLoadHistory(true);
        })
    }
    this.initHistoryEvent = function() {
        var self = this;
        $('#tracks-history').bind('click', function() {
            var startTime = self.startTime,
                endTime = self.endTime,
                selected = [];
            // ids=[];
            if (typeof startTime != 'undefined' && typeof endTime != 'undefined' && startTime != 0 && endTime != 0) {
                startTime = tracksControl.js_strto_time(startTime),
                endTime = tracksControl.js_strto_time(endTime);
                for (var i = 0; i < self.tracksMonitoring.length; i++) {
                    selected.push(self.tracksMonitoring[i].track_id);
                };
                if (selected.length <= 0) {
                    $('.no-poi-msg span').html('请先选择要查询的轨迹！');
                    $('.no-poi-msg').show();
                    setTimeout(function() {
                        $('.no-poi-msg').hide();
                    }, 1000);
                } else {
                    $('.load').show();
                    var track_ids = selected.join(',');
                    for (var i = 0; i < selected.length; i++) {
                        self.monitoringTrackOverlays[selected[i]] = {
                            'display': true
                        }
                    };
                    $.ajax({
                        type: 'GET',
                        url: 'api/trackHistory.php?traceId=' + self.trace_id + '&ak=' + self.ak + '&ids=' + track_ids + '&start_time=' + startTime + '&end_time=' + endTime,
                        success: storeTracksHistory
                    });
                }
            } else {
                $('.no-poi-msg span').html('请先选择合适的时间范围！');
                $('.no-poi-msg').show();
                setTimeout(function() {
                    $('.no-poi-msg').hide();
                }, 1500);
            }
        })
    }
    /**
     * 去轨迹history的回调函数
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    function storeTracksHistory(res) {
        var me = tracksControl;
        for (var id in me.monitoringTrackOverlays) {
            $('#no-track-' + id).hide();
        }
        if (typeof res != 'undefined' && res != null) {
            var data = $.parseJSON(res);
            if (data.length <= 0) {
                $('.load').hide();
                $('.no-poi-msg span').html('未请求到任何数据！');
                $('.no-poi-msg span').addClass('large-no-poi-msg');
                $('.no-poi-msg').show();
                setTimeout(function() {
                    $('.no-poi-msg').hide();
                }, 1000);
            } else {
                var noPoisTrackIds = '';
                me.noTracksIds = [];
                for (var id in data) {
                    if (data[id].pois == null || data[id].pois.length <= 0) {
                        if (noPoisTrackIds.length <= 0) {
                            noPoisTrackIds += '部分轨迹track';
                        };
                        me.noTracksIds.push(id);
                    } else {
                        me.monitoringTrackOverlays[id].pois = data[id].pois;
                        me.monitoringTrackOverlays[id].startId = me.canvasRender.guid();
                        me.monitoringTrackOverlays[id].trackId = me.canvasRender.guid();
                        me.monitoringTrackOverlays[id].endId = me.canvasRender.guid();
                        me.compressTrack(me.monitoringTrackOverlays[id].pois);
                        me.monitoringTrackOverlays[id]._pois = me._pois;
                        me.monitoringTrackOverlays[id]._LngLatpois = me._LngLatpois;
                        me.monitoringTrackOverlays[id]._totalLength = me.getTotalLength(me._LngLatpois);
                        me.monitoringTrackOverlays[id]._encrLngLatPois = me._encrLngLatPois;
                        $('#history-dis-' + id).html(me.monitoringTrackOverlays[id]._totalLength);
                        //me.monitoringTrackOverlays[id]._poiLoctimes = me._poiLoctimes;
                    };
                }
                $('.load').hide();
                if (noPoisTrackIds.length > 0) {
                    //noPoisTrackIds = noPoisTrackIds.substr(0, noPoisTrackIds.length - 1);
                    $('.no-poi-msg span').html(noPoisTrackIds + '在时间范围内未查到POI点！');
                    $('.no-poi-msg').addClass('large-no-poi-msg');
                    $('.no-poi-msg').show();
                    for (var i = 0; i < me.noTracksIds.length; i++) {
                        $('#no-track-' + me.noTracksIds[i]).show();
                        $('#no-track-' + me.noTracksIds[i]).jBox('Tooltip', {
                            theme: 'TooltipBorder'
                        });
                    };
                    setTimeout(function() {
                        $('.no-poi-msg').hide();
                    }, 2000);
                }
                me.setFitview(2);
            }
        }
    }
    /**
     * 模板渲染完成后进行事件绑定
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    function dataTableDelegate() {
        var me = tracksControl;
        $('.tip').bind({
            mouseenter: function() {
                $(this).tooltip('destroy');
                var t = $(this).attr('title');
                $(this).tooltip({
                    title: t
                }).tooltip('show');
            },
            mouseleave: function() {
                $(this).tooltip('hide');
            }
        })
        $('#box-table-tbody a').bind('click', function(e) {
            var self = $(this);
            if (self.hasClass('remove')) {
                var id = self.attr('data-id');
                tracksControl.noLoadAction = true;
                tracksControl.loadAllTracks = false;
                tracksControl.removeMonitoring(id);
            } else if (self.hasClass('play')) {
                var id = self.attr('data-id');
                if (!me.isPlayed) {
                    me.trackPlay(id);
                } else if (me.isPlayed && me.isPaused) {
                    me.trackPlay(id);
                } else if (me.isPlayed && !me.isPaused) {
                    if (id == me.currentPlayTrack) {
                        me.trackPause();
                    } else {
                        me.trackPlay(id)
                    }
                }
            }
            e.stopPropagation();
        })
        if ($('#history-track').hasClass('active')) {
            if (typeof me.onActiveTrack != 'undefined' && me.onActiveTrack != null) {
                // $('.tr-' + me.onActiveTrack).css('background-color', '#f8f8f8');
                $('.tr-' + me.onActiveTrack).addClass('active-tr');
            }
        } else {
            if (typeof me._clickTrId != 'undefined' && me._clickTrId != null) {
                $('.tr-' + me._clickTrId).addClass('active-tr');
            }
        }
        $('#box-table-tbody tr').bind({
            mouseenter: function() {
                if (!$(this).hasClass('active-tr')) {
                    $(this).css('background-color', '#f8f8f8');
                }
                var id = $(this).attr('data-id');
                if ($('#monitoring').hasClass('active')) {
                    if (me.monitoringMakers[id] != null && me.monitoringMakers[id].isVisible()) {
                        var icon = new BMap.Icon('static/images/marker_car.png', new BMap.Size(36, 18), {
                            anchor: new BMap.Size(18, 9)
                        });
                        me.monitoringMakers[id].setIcon(icon);
                        me.monitoringMakers[id].setRotation(me.monitoringMakers[id].getRotation());
                    }
                }
                if ($('#history-track').hasClass('active')) {
                    if (me.monitoringTrackOverlays[id] != null && me.monitoringTrackOverlays[id].display) {
                        if (id != me.onActiveTrack) {
                            me.canvasRender.zr.modShape(id, {
                                style: {
                                    strokeColor: 'rgba(41,188,1,0.8)',
                                    lineWidth: 5
                                }
                            });
                            me.canvasRender.zr.refresh();
                        }
                    }
                }
            },
            mouseleave: function() {
                var id = $(this).attr('data-id');
                if (!$(this).hasClass('active-tr')) {
                    $(this).css('background-color', '#ffffff');
                    if ($('#monitoring').hasClass('active')) {
                        if (me.monitoringMakers[id] != null && me.monitoringMakers[id].isVisible()) {
                            var icon = new BMap.Icon('static/images/car.png', new BMap.Size(31, 16), {
                                anchor: new BMap.Size(15, 8)
                            });
                            me.monitoringMakers[id].setIcon(icon);
                            me.monitoringMakers[id].setRotation(me.monitoringMakers[id].getRotation());
                        }
                    }
                }
                if ($('#history-track').hasClass('active')) {
                    if (me.monitoringTrackOverlays[id] != null && me.monitoringTrackOverlays[id].display) {
                        if (id != me.onActiveTrack) {
                            $(this).css('background-color', '#ffffff');
                            me.canvasRender.zr.modShape(id, {
                                style: {
                                    strokeColor: 'rgba(63,109,218,0.8)',
                                    lineWidth: 4
                                }
                            });
                            me.canvasRender.zr.refresh();
                        }
                    }
                }
            },
            click: function() {
                var id = $(this).attr('data-id');
                if (typeof me._clickTrId == 'undefined') {
                    me._clickTrId = id;
                }
                $('#box-table-tbody tr').removeClass('active-tr').css('background-color', '#ffffff');
                $(this).addClass('active-tr').css('background-color', '#E5E5E5');
                if ($('#monitoring').hasClass('active')) {
                    if (me.monitoringMakers[id] != null && me.monitoringMakers[id].isVisible()) {
                        if (me._clickTrId != id) {
                            if (me.monitoringMakers[me._clickTrId] != null && me.monitoringMakers[me._clickTrId].isVisible()) {
                                var icon = new BMap.Icon('static/images/car.png', new BMap.Size(31, 16), {
                                    anchor: new BMap.Size(15, 8)
                                });
                                me.monitoringMakers[me._clickTrId].setIcon(icon);
                                me.monitoringMakers[me._clickTrId].setRotation(me.monitoringMakers[me._clickTrId].getRotation());
                            }
                            me._clickTrId = id;
                        }
                        me.setFitViewForMarker(id);
                    }
                }
                if ($('#history-track').hasClass('active')) {
                    me.onActiveTrack = id;
                    if (me.monitoringTrackOverlays[id] != null && me.monitoringTrackOverlays[id].display) {
                        if (!me.isPlayed) {
                            me.currentPlayTrack = id;
                        }
                        me.setFitViewForTrack(id);
                        if (!me.tipHasShowed) {
                            me.tipHasShowed = true;
                            var tip = $(this).find('.play');
                            tip.tooltip('show');
                            setTimeout(function() {
                                tip.tooltip('hide');
                            }, 1000);
                        }
                    }
                }
            }
        })
    }
    /**
     * [获取当前鹰眼服务的详细信息]
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.getTraceDetail = function() {
        var self = this;
        // if (typeof self.trace_id == 'undefined' || self.ak == null || self.ak.length <= 0 || self.trace_id.length <= 0) {
        //     var html = '<p>未查询到鹰眼服务数据</p>';
        //     $('.tracks-list-panel').append(html);
        //     return;
        // } else {
        $.getJSON('static/data/trace.json', function(data) {
            //data = $.parseJSON(data);
            if (data && data.service) {
                self.trace = data.service;
                $('.trace-admin-title').html('(位置管理平台' + '<span class="trace-admin-circle"></span>' + '<span style="color:#ffffff">' + '示例车辆' + '</span>' + ')');
                // $('.trace-admin-title').html(self.trace.name + '鹰眼服务管理后台');
                // var width = $('#trace-name-h3').width() / 2;
                // $('#trace-name-h3').css('margin-left', '-' + width + 'px');
                //var theadTmpl = baidu.template('monitor-table-thead');
                self.tmplTheadObj = {};
                self.tmplTheadObj.type = 1;
                self.tmplTheadObj.theads = [];
                self.tmplTheadObj.theads.push('序号');
                //self.tmplTheadObj.theads.push('track ID');
                for (var k in self.trace.columns) {
                    self.tmplTheads[self.trace.columns[k].key] = self.trace.columns[k].name;
                    self.tmplTheadObj.theads.push(self.trace.columns[k].name);
                }
                //self.tmplTheadObj.theads.push('里程(km)');
                self.tmplTheadObj.theads.push('操作');
                //
                var html = self.theadTmpl(self.tmplTheadObj);
                $('#box-table-thead').html(html);
                self.loadTracks(1);
                setTimeout(function() {
                    $('#myAlert').slideDown('slow');
                }, 500);

            }
        })
        // }
    }
    this.bindUserColumnsEvent = function() {
        var self = this;
        $('.user-checkbox').on('ifClicked', function() {
            var v = $(this).val();
            var checked = !this.checked;
            for (var i in self.userColumns.colums) {
                var obj = self.userColumns.colums[i];
                if (obj.key == v) {
                    self.tmplTheads[v] = checked ? obj.value : null;
                }
            }
            self.tracksListTableRender(self.currentPage, self.pageSize);
            if ($('#history-track').hasClass('selected')) {
                self.historyTableRender();
            } else {
                self.monitoringTableRender();
            }
        });
    }
    /**
     * [loadTracks 加载track]
     * @Author: xuguanlong
     * @param   {[number]}   pageIndex [页数]
     */
    this.loadTracks = function(pageIndex) {
        var self = this;
        self.curPage = pageIndex;
        $('.tracks-loading').show();
        // var url = 'api/tracksList.php?traceId=' + self.trace_id + '&ak=' + self.ak + '&pageIndex=' + pageIndex + '&pageSize=' + self.pageSize;
        // //判断当前是否是查询状态，若是将查询关键字添加到url中
        // if (typeof self.keyWord == 'string' && self.keyWord.length > 0) {
        //     url += '&key=' + self.keyWord;
        // }
        $.getJSON('static/data/list.json', function(data) {
            $('.tracks-loading').hide();

            if (data && data.status == 0 && data.pois != null && data.pois.length > 0) {
                self.totalTracksNum = data.total;
                self.tracksList = [];
                if (typeof self.keyWord == 'string' && self.keyWord.length > 0) {
                    $('#track-search-btn').button('reset');
                    for (var i = 0; i < data.pois.length; i++) {
                        if (data.pois[i].track_name.indexOf(self.keyWord) > 0) {
                            self.tracksList.push(data.pois[i]);
                        }
                    };
                } else {
                    self.tracksList = data.pois;
                }
            } else {
                self.totalTracksNum = 0;
                self.tracksList = [];
            }
            $('.nums').html(self.totalTracksNum);
            $('.total-items').show();
            self.tracksListTableRender(pageIndex, self.pageSize);
        })
    };
    this.tracksListSlyInit = function() {
        var $frame = $('#tracks-list-panel');
        var $slidee = $frame.children('table').eq(0);
        $frame.sly(false);
        $frame.sly({
            horizontal: 1,
            itemNav: 'tracks-list-panel',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $('.scrollbar'),
            scrollBy: 50,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1
        });
    }
    /**
     * 更新track列表的模板渲染对象
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.updateTracksListTmplObj = function() {
        var self = this;
        if (self.tracksList.length <= 0) {
            return;
        } else {
            var tracksLength = self.tracksList.length;
            self.tracksListTmplObj.tracksLength = tracksLength;
            self.tracksListTmplObj.tracksList = self.tracksList;
            for (var i = 0; i < tracksLength; i++) {
                if (self.isMonitored(self.tracksList[i])) {
                    self.tracksListTmplObj.tracksList[i].isMonitorChecked = true;
                } else {
                    self.tracksListTmplObj.tracksList[i].isMonitorChecked = false;
                }
            };
        }
    }
    /**
     * 更新实时监控列表模板的渲染对象
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.updateMonitorTableTmplObj = function() {
        var self = this;
        if (self.tracksMonitoring.length <= 0) {
            return;
        } else {
            var tracksMonitoringLength = self.tracksMonitoring.length;
            self.monitorTableTmplObj.tracksMonitoringLength = tracksMonitoringLength;
            self.monitorTableTmplObj.tracksMonitoring = self.tracksMonitoring;
            self.monitorTableTmplObj.theads = self.tmplTheadObj.theads;

            self.monitorTableTmplObj.tds = new Array();
            self.monitorTableTmplObj.type = 1;
            // for(var key in self.tmplTheads) {
            //     if(self.tmplTheads[key] != null) {
            //         self.monitorTableTmplObj.theads.push(self.tmplTheads[key]);
            //     }
            // }
            // self.monitorTableTmplObj.theads.push('移除监控');
            for (var i = 0; i < tracksMonitoringLength; i++) {
                var td = new Array();
                td.push(i + 1);
                //td.push(self.tracksMonitoring[i].track_id);
                for (var key in self.tmplTheads) {
                    if (self.tmplTheads[key] != null) {
                        if (key == 'loc_time') {
                            td.push(self.js_date_time(self.tracksMonitoring[i][key]));
                        } else {
                            td.push(self.tracksMonitoring[i][key]);
                        }
                    }
                }
                // var monitorLength = self.getTotalLength(self.trackPoiArrayObj[self.tracksMonitoring[i].track_id]);
                // td.push(monitorLength);
                self.monitorTableTmplObj.tds.push(td);
            };
        }
    }
    /**
     * 更新历史轨迹查询列表模板的渲染对象
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.updateHistoryTableTmplObj = function() {
        var self = this;
        if (self.tracksMonitoring.length <= 0) {
            return;
        } else {

            var tracksMonitoringLength = self.tracksMonitoring.length;
            self.historyTableTmplObj.tracksMonitoringLength = tracksMonitoringLength;
            self.historyTableTmplObj.tracksMonitoring = self.tracksMonitoring;
            self.historyTableTmplObj.theads = []
            for (var i = 0; i < self.tmplTheadObj.theads.length; i++) {
                self.historyTableTmplObj.theads.push(self.tmplTheadObj.theads[i]);
            }
            self.historyTableTmplObj.theads.splice(self.tmplTheadObj.theads.length - 1, 0, '里程(km)');
            self.historyTableTmplObj.tds = new Array();
            self.historyTableTmplObj.type = 2;
            for (var i = 0; i < tracksMonitoringLength; i++) {
                var td = new Array();
                td.push(i + 1);
                //td.push(self.tracksMonitoring[i].track_id);
                for (var key in self.tmplTheads) {
                    if (self.tmplTheads[key] != null) {
                        if (key == 'loc_time') {
                            td.push(self.js_date_time(self.tracksMonitoring[i][key]));
                        } else {
                            td.push(self.tracksMonitoring[i][key]);
                        }
                    }
                }
                // me.monitoringTrackOverlays[id]._LngLatpois
                var historyLength = self.monitoringTrackOverlays[self.tracksMonitoring[i].track_id] ? self.monitoringTrackOverlays[self.tracksMonitoring[i].track_id]._totalLength : 0;
                td.push(historyLength);
                self.historyTableTmplObj.tds.push(td);
            };
        }
    }
    /**
     * 判断track是否处于监控中
     * @Author: xuguanlong
     * @param   {[type]}   track [轨迹track]
     * @return  {Boolean}        [track若被监控返回true]
     */
    this.isMonitored = function(track) {
        var self = this;
        var m = false;
        if (self.tracksMonitoring.length > 0) {
            _.each(self.tracksMonitoring, function(element, i) {
                if (element.track_id == track.track_id) {
                    m = true;
                }
            })
        }
        return m;
    }
    /**
     * tracks列表面板的渲染函数
     * @Author: xuguanlong
     * @param   {[type]}   pageIndex [分页控件的页数]
     * @param   {[type]}   pageSize  [分页控件的pageSize]
     * @return  {[type]}             [description]
     */
    this.tracksListTableRender = function(pageIndex, pageSize) {
        var html = '';
        var self = this;
        $('.tracks-loading').hide();
        if (self.tracksList.length <= 0) {
            $('.tracks-ul').html('');
            if ($('.no-track-p').length > 0) {
                $('.no-track-p').show();
            } else {
                html = '<p class="no-track-p">未查到相关的轨迹记录</p>';
                $('.tracks-list-panel').append(html);
                $('#tracks-pager-ul').hide();
            }
        } else {
            //var index = (pageIndex - 1) * pageSize;
            var pageNums = Math.ceil(self.totalTracksNum / pageSize);
            self.updateTracksListTmplObj();
            html = self.tracksListTmpl(self.tracksListTmplObj);
            $('.tracks-list-panel').html(html);
            self.initLeftCheckEvent();
            // $('.user-colums-btn').show();
            // $('.scrollbar').show();
            if (pageNums > 1) {
                var opt = {
                    items_per_page: pageSize,
                    next_text: ">>",
                    num_display_entries: 2,
                    num_edge_entries: 1,
                    current_page: pageIndex - 1,
                    prev_text: "<<",
                    callback: function(pageIndex) {
                        self.loadTracks(pageIndex + 1);
                    }
                };
                $('#tracks-pager-ul').show().pagination(self.totalTracksNum, opt);
            }
        }
        var $subs = $("input[name='chkItem']");
        $("#chk_all_track").attr("checked", $subs.length == $subs.filter(":checked").length ? true : false);
    }
    this.initLeftCheckEvent = function() {
        var self = this;
        $('.tracks-ul').delegate('li', 'click', function() {
            var id = $(this).find("input[type=checkbox]").attr('data-id');
            var checked = $(this).find("input[type=checkbox]").attr('checked');
            if (checked) {
                _.each(self.tracksList, function(element, i) {
                    if (element['track_id'] == id) {
                        self.removeMonitoring(id);
                    }
                })
                if ($('#history-track').hasClass('active')) {
                    self.historyTableRender();
                } else {
                    self.monitoringTableRender();
                };
                $(this).find("input[type=checkbox]").attr('checked', false);
            } else {
                _.each(self.tracksList, function(element, i) {
                    if (element['track_id'] == id) {
                        self.addMonitoring(element);
                    }
                })
                if ($('#history-track').hasClass('active')) {
                    self.historyTableRender();
                } else {
                    self.monitorTrackById(id, true);
                    self.monitoringTableRender();
                };
                $(this).find("input[type=checkbox]").attr('checked', true);
            }

            var $subs = $("input[name='chkItem']");
            $("#chk_all_track").attr("checked", $subs.length == $subs.filter(":checked").length ? true : false);
        })
        $('.tracks-ul').delegate('input[type=checkbox]', 'click', function(e) {
            var id = $(this).attr('data-id');
            e.stopPropagation();
            if ($(this).attr('checked')) {
                // if (self.tracksMonitoring.length < 4) {
                _.each(self.tracksList, function(element, i) {
                    if (element['track_id'] == id) {
                        self.addMonitoring(element);
                    }
                })
                if ($('#history-track').hasClass('active')) {
                    self.historyTableRender();
                } else {
                    self.monitorTrackById(id, true);
                    self.monitoringTableRender();
                };
            } else {
                _.each(self.tracksList, function(element, i) {
                    if (element['track_id'] == id) {
                        self.removeMonitoring(id);
                    }
                })
                if ($('#history-track').hasClass('active')) {
                    self.historyTableRender();
                } else {
                    self.monitoringTableRender();
                };
            }
            var $subs = $("input[name='chkItem']");
            $("#chk_all_track").attr("checked", $subs.length == $subs.filter(":checked").length ? true : false);
        })
    }
    /**
     * 将track添加到监控中
     * @Author: xuguanlong
     * @param   {[type]}   track [被监控的轨迹track]
     */
    this.addMonitoring = function(track) {
       $('#myAlert').slideUp("fast");
        if (!this.isMonitored(track)) {
            track.positionSelected = $("#monitoring").hasClass('active');
            track.historySelected = false;
            track.startId = this.canvasRender.guid();
            track.endId = this.canvasRender.guid();
            track.trackId = this.canvasRender.guid();
            this.tracksMonitoring.push(track);
            this.trackPoiArrayObj[track.track_id] = [];
        }
    };
    /**
     * 将track移除监控
     * @Author: xuguanlong
     * @param   {[type]}   id [被移出的轨迹track id]
     * @return  {[type]}      [description]
     */
    this.removeMonitoring = function(id) {
        var self = this;
        if ($('#history-track').hasClass('active')) {
            for (var i = 0; i < self.tracksMonitoring.length; i++) {
                var track = self.tracksMonitoring[i];
                if (track.track_id == id) {
                    if (self.currentPlayTrack == track.track_id && self.isPlayed) {
                        self.trackPause();
                        jConfirm('当前轨迹正在回放中,是否停止?', '历史轨迹回放', function(res) {
                            if (res) {
                                self.trackStop();
                                self.currentPlayTrack = null;
                                self.monitoringTrackOverlays[id] = null;
                                delete self.monitoringTrackOverlays[id];
                                //self.monitoringTrackOverlays[id].display = false;
                                if (self.lushuMarker) {
                                    if (self.lushuMarker.trackId == id) {
                                        self.map.removeOverlay(self.lushuMarker);
                                        self.map.removeOverlay(self._timeOverlay);
                                    }
                                }
                                if (typeof self.monitoringMakers[id] != 'undefined' && self.monitoringMakers[id] != null) {
                                    self.monitoringMakers[id].closeInfoWindow();
                                    self.map.removeOverlay(self.monitoringMakers[id]);
                                    self.monitoringMakers[id] = null;
                                }
                                if (typeof self.monitoringPolylines[id] != 'undefined' && self.monitoringPolylines[id] != null) {
                                    self.map.removeOverlay(self.monitoringPolylines[id]);
                                    self.monitoringPolylines[id] = null;
                                }
                                _.each(self.tracksMonitoring, function(element, i) {
                                    if (element.track_id == id) {
                                        self.tracksMonitoring.splice(i, 1);
                                    }
                                });
                                self.trackPoiArrayObj[id] = null;
                                $('.chk_' + id).attr('checked', false);
                                $('.tr-' + id).removeClass('monitored');
                                if (id == self.onActiveTrack) {
                                    self.onActiveTrack = null;
                                }
                                self.historyTableRender();
                                self.setFitview(2);
                            } else {
                                $('.chk_' + id).attr('checked', true);
                                if (self.isPlayed && self.isPaused) {
                                    self.isPaused = false;
                                    self.lushu.start();
                                }
                            }
                        });
                    } else {
                        if (typeof self.monitoringTrackOverlays[track.track_id] != 'undefined' && self.monitoringTrackOverlays[track.track_id] != null) {
                            //self.monitoringTrackOverlays[track.track_id].display = false;
                            self.monitoringTrackOverlays[track.track_id] = null;
                            delete self.monitoringTrackOverlays[track.track_id];
                            if (self.lushuMarker) {
                                if (self.lushuMarker.trackId == track.track_id) {
                                    self.map.removeOverlay(self.lushuMarker);
                                    self.map.removeOverlay(self._timeOverlay);
                                }
                            }
                        }
                        if (typeof self.monitoringMakers[id] != 'undefined' && self.monitoringMakers[id] != null) {
                            self.monitoringMakers[id].closeInfoWindow();
                            self.map.removeOverlay(self.monitoringMakers[id]);
                            self.monitoringMakers[id] = null;
                        }
                        if (typeof self.monitoringPolylines[id] != 'undefined' && self.monitoringPolylines[id] != null) {
                            self.map.removeOverlay(self.monitoringPolylines[id]);
                            self.monitoringPolylines[id] = null;
                        }
                        _.each(self.tracksMonitoring, function(element, i) {
                            if (element.track_id == id) {
                                self.tracksMonitoring.splice(i, 1);
                            }
                        });
                        self.trackPoiArrayObj[id] = null;
                        if (id == self.onActiveTrack) {
                            self.onActiveTrack = null;
                        }
                        $('.chk_' + id).attr('checked', false);
                        self.historyTableRender();
                        self.setFitview(2);
                    }
                }
            };
        } else {
            _.each(self.tracksMonitoring, function(element, i) {
                if (element.track_id == id) {
                    self.tracksMonitoring.splice(i, 1);
                    if (self.currentPlayTrack == element.track_id) {
                        self.trackStop();
                    }
                    if (typeof self.monitoringTrackOverlays[element.track_id] != 'undefined' && self.monitoringTrackOverlays[element.track_id] != null) {
                        //self.monitoringTrackOverlays[element.track_id].display = false;
                        self.monitoringTrackOverlays[element.track_id] = null;
                        delete self.monitoringTrackOverlays[element.track_id];
                        if (self.lushuMarker) {
                            if (self.lushuMarker.trackId == element.track_id) {
                                self.map.removeOverlay(self.lushuMarker);
                                self.map.removeOverlay(self._timeOverlay);
                            }
                        }
                    }
                }
            });
            self.trackPoiArrayObj[id] = null;
            if (id == self.onActiveTrack) {
                self.onActiveTrack = null;
            }
            if (typeof self.monitoringMakers[id] != 'undefined' && self.monitoringMakers[id] != null) {
                self.monitoringMakers[id].closeInfoWindow();
                self.map.removeOverlay(self.monitoringMakers[id]);
                self.monitoringMakers[id] = null;
            }
            if (typeof self.monitoringPolylines[id] != 'undefined' && self.monitoringPolylines[id] != null) {
                self.map.removeOverlay(self.monitoringPolylines[id]);
                self.monitoringPolylines[id] = null;
            }
            $('.chk_' + id).attr('checked', false);
            self.monitoringTableRender();
        }
    }
    /**
     * 监控栏中的实时监控track列表table渲染
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.monitoringTableRender = function() {
        //tracksMonitoring中保存了当前被监控的tracks列表

        this.hideTracksOverlays();
        this.showMarkerOverlays();
        for (var i = 0; i < this.tracksMonitoring.length; i++) {
            if (typeof this.monitoringMakers[this.tracksMonitoring[i].track_id] == 'undefined' || this.monitoringMakers[this.tracksMonitoring[i].track_id] == null) {
                this.monitorTrackById(this.tracksMonitoring[i].track_id);
            }
        };
        if (this.tracksMonitoring.length <= 0) {
            // $(".monitor-table-div").html('<p class="no-track-p">请先添加track至监控面板</p>');
            $('#box-table-tbody').html('');
            //$("#chk-all").attr('checked', false);
        } else {
            this.updateMonitorTableTmplObj();
            this.tmplTheadObj.type = 1;
            //var theadTmpl = baidu.template('monitor-table-thead');
            var html = this.theadTmpl(this.tmplTheadObj);
            $('#box-table-thead').html(html);
            html = this.tracksMonitorTmpl(this.monitorTableTmplObj);
            $('#box-table-tbody').html(html);
            // $('.data-table-div').css('height', '165px');
            dataTableDelegate();
            //var $chk = $("[name = chk-li]:checkbox");
            //$("#chk-all").attr("checked", $chk.length == $chk.filter(":checked").length);
        }
    }
    /**
     * 监控栏中的轨迹查询track列表table渲染
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.historyTableRender = function() {
        this.showTracksOverlays();
        this.hideMarkerOverlays();
        if (this.tracksMonitoring.length <= 0) {
            //$(".monitor-table-div").html('<p class="no-track-p">请先添加track至监控栏</p>');
            $('#box-table-tbody').html('');
        } else {
            this.updateHistoryTableTmplObj();
            //var theadTmpl = baidu.template('monitor-table-thead');
            var tempObj = {};
            tempObj.theads = [];
            for (var i = 0; i < this.tmplTheadObj.theads.length; i++) {
                tempObj.theads.push(this.tmplTheadObj.theads[i]);
            }
            tempObj.theads.splice(this.tmplTheadObj.theads.length - 1, 0, '里程(km)');
            tempObj.type = 2;
            var html = this.theadTmpl(tempObj);
            $('#box-table-thead').html(html);
            html = this.tracksMonitorTmpl(this.historyTableTmplObj);
            $('#box-table-tbody').html(html);
            for (var i = 0; i < this.noTracksIds.length; i++) {
                $('#no-track-' + this.noTracksIds[i]).show();
                $('#no-track-' + this.noTracksIds[i]).jBox('Tooltip', {
                    theme: 'TooltipBorder'
                });
            };
            dataTableDelegate();
            this.autoLoadHistory();
        }
    }
    this.showTracksOverlays = function() {
        if (typeof this.canvasRender.zrOverlay != 'undefined' && this.canvasRender.zrOverlay != null) {
            this.canvasRender.zrOverlay.show();
            if (this.lushu) {
                if (this.lushu._marker) {
                    this.lushu._marker.show();
                    //this.lushu.showInfoWindow();
                }
                if (this.isPlayed && this.isPaused) {
                    this.trackPlay(this.currentPlayTrack);
                }
            }
        };
    }
    this.hideTracksOverlays = function() {
        if (typeof this.canvasRender.zrOverlay != 'undefined' && this.canvasRender.zrOverlay != null) {
            this.canvasRender.zrOverlay.hide();
            if (this.lushu) {
                if (this.isPlayed) {
                    this.trackPause();
                }
                if (this.lushu._marker) {
                    this.lushu._marker.hide();
                    //this.lushu.hideInfoWindow();
                }
            }
        };
    }
    this.showMarkerOverlays = function() {
        for (var i in this.monitoringMakers) {
            if (typeof this.monitoringMakers[i] != 'undefined' && this.monitoringMakers[i] != null) {
                this.monitoringMakers[i].show();
            }
        }
        for (var j in this.monitoringPolylines) {
            if (typeof this.monitoringPolylines[j] != 'undefined' && this.monitoringPolylines[j] != null) {
                this.monitoringPolylines[j].show();
            }
        }
    }
    this.hideMarkerOverlays = function() {
        for (var i in this.monitoringMakers) {
            if (typeof this.monitoringMakers[i] != 'undefined' && this.monitoringMakers[i] != null) {
                this.monitoringMakers[i].hide();
            }
        }
        for (var j in this.monitoringPolylines) {
            if (typeof this.monitoringPolylines[j] != 'undefined' && this.monitoringPolylines[j] != null) {
                this.monitoringPolylines[j].hide();
            }
        }
        this.map.closeInfoWindow();
    }
    /**
     * 日期转时间戳
     * @Author: xuguanlong
     * @param   {[type]}   str_time [字符串日期 格式2014-08-29 00:00:00]
     * @return  {[type]}            [时间戳]
     */
    this.js_strto_time = function(str_time) {
        var new_str = str_time.replace(/:/g, '-');
        new_str = new_str.replace(/ /g, '-');
        var arr = new_str.split("-");
        var strtotime = 0;
        var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        if (datum != null && typeof datum != 'undefined') {
            strtotime = datum.getTime() / 1000;
        }
        return strtotime;
    }
    /**
     * 时间戳转日期
     * @Author: xuguanlong
     * @param   {[type]}   unixtime [时间戳]
     * @return  {[type]}            [时间戳对应的日期]
     */
    this.js_date_time = function(unixtime) {
        var timestr = new Date(parseInt(unixtime) * 1000);
        //var datetime = timestr.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        var datetime = this.date_format(timestr, 'yyyy-MM-dd hh:mm:ss');
        return datetime;
    }
    /**
     * 日期格式化  yyyy-MM-dd hh:mm:ss
     * @Author: xuguanlong
     * @param   {[type]}   date [description]
     * @return  {[type]}        [description]
     */
    this.date_format = function(date, fmt) {
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
     * 获取某范围内的随机数
     * @Author: xuguanlong
     * @param   {[type]}   min [最小值]
     * @param   {[type]}   max [最大值]
     * @return  {[type]}       [范围内的随机数]
     */
    function random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }
    /**
     * 监控tracks，
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.tracksMonitorStart = function() {
        var self = this;
        self.processBarHide();
        if (self.tracksMonitoring.length > 0) {
            self.monitoringTableRender();
        }
    };
    /**
     * track历史轨迹查询
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.tracksHistoryStart = function() {
        var self = this;
        self.noLoadAction = false;
        self.loadAllTracks = true;
        if (self.tracksMonitoring.length > 0) {
            self.historyTableRender();
        }
    }
    /**
     * 对某一条track的实时点进行监控
     * @Author: xuguanlong
     * @param   {[type]}   track_id [需要监控的track id]
     * @return  {[type]}            [description]
     */
    this.monitorTrackById = function(track_id, setFiew) {
        var self = this;
        if (self.tracksMonitoring.length > 0) {
            $.getJSON("static/data/list.json", function(data) {
                var poi = null;
                if (data && data.status == 0 && data.pois != null) {
                    for (var j = 0; j < data.pois.length; j++) {
                        if (data.pois[j].track_id == track_id) {
                            poi = data.pois[j];
                        }
                    }
                    for (var i = 0; i < self.tracksMonitoring.length; i++) {
                        if (self.tracksMonitoring[i].track_id == track_id) {
                            self.tracksMonitoring[i] = poi;
                        }
                    }
                    var l = self.trackPoiArrayObj[track_id] ? self.trackPoiArrayObj[track_id].length : 0,
                        pt = new BMap.Point(poi.location[0], poi.location[1]),
                        len = self.getTotalLength(self.trackPoiArrayObj[track_id]);
                    if (l > 0) {
                        var d = self._getDistance(self.trackPoiArrayObj[track_id][l - 1], pt);
                        len += (Math.floor(d)) / 1000;
                    }

                    var marker = self.createMarker(poi);
                    if (l > 1) {
                        self.markerMoveAnimation(track_id, marker);
                    } else {
                        var polyline = new BMap.Polyline(self.trackPoiArrayObj[track_id], {
                            strokeColor: "blue",
                            strokeStyle: 'dashed',
                            strokeWeight: 5,
                            strokeOpacity: 0.5
                        });
                        if (self.monitoringMakers[track_id]) {
                            self.map.removeOverlay(self.monitoringMakers[track_id]);
                        }
                        if (self.monitoringPolylines[track_id]) {
                            self.map.removeOverlay(self.monitoringPolylines[track_id]);
                        }
                        self.monitoringPolylines[track_id] = polyline;
                        self.monitoringMakers[track_id] = marker;
                        if (!$('#monitoring').hasClass('active')) {
                            marker.hide();
                            polyline.hide();
                        }
                        self.map.addOverlay(marker);
                        self.map.addOverlay(polyline);
                    }
                    if (setFiew) {
                        self.setFitViewForMarker(track_id, true);
                    } else {
                        $('#loctime-' + track_id).slideUp('normal').html(self.js_date_time(poi.loc_time)).slideDown('normal');
                        $('#monitor-dis-' + track_id).slideUp('normal').html(self.toDecimal3(len)).slideDown('normal');
                    }
                }
            })
        }
    }
    this.getRotation = function(curPos, targetPos) {
        var self = this;
        var deg = 0,
            curPos = self._LngLatToPoint(curPos),
            targetPos = self._LngLatToPoint(targetPos);
        if (targetPos.x != curPos.x) {
            var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x),
                atan = Math.atan(tan);
            deg = atan * 360 / (2 * Math.PI);
            if (targetPos.x < curPos.x && targetPos.y < curPos.y) {
                deg = -deg;
            } else if (targetPos.x < curPos.x && targetPos.y > curPos.y) {
                deg = -deg;
            } else if (targetPos.x > curPos.x && targetPos.y > curPos.y) {
                deg = 180 - deg;
            } else {
                deg = deg - 180;
            }
        } else {
            var disy = targetPos.y - curPos.y;
            var bias = 0;
            if (disy > 0) bias = 1
            else bias = -1
            deg = bias * 90;
        }
        return deg;
    }
    this.createMarker = function(poi) {
        var self = this,
            deg = 0,
            point = new BMap.Point(poi.location[0], poi.location[1]);
        if (!self.trackPoiArrayObj[poi.track_id]) {
            return;
        }
        if ((self.trackPoiArrayObj[poi.track_id] ? self.trackPoiArrayObj[poi.track_id].length : 0) > 100) {
            self.trackPoiArrayObj[poi.track_id].splice(0, 1);
        }
        self.trackPoiArrayObj[poi.track_id].push(point);
        if (self.trackPoiArrayObj[poi.track_id].length > 2) {
            var l = self.trackPoiArrayObj[poi.track_id].length;
            deg = self.getRotation(self.trackPoiArrayObj[poi.track_id][l - 2], self.trackPoiArrayObj[poi.track_id][l - 1]);
        }
        var sContent = '<div class="info_window"><h5>' + poi.track_id + '(' + poi.track_name + ')' + '</h5><div class="info_ul">' + '<ul><li><label>GPS时间：</label><span>' + self.js_date_time(poi.loc_time) + '</span></li>' + '<li><label>经度：</label><span>' + poi.location[0] + '</span></li>' + '<li><label>纬度：</label><span>' + poi.location[1] + '</span></li>' + '<li><label>区域：</label><span>' + poi.city + poi.district + '</span></li>' + '</ul>' + '</div></div>';
        var infoWindow = new BMap.InfoWindow(sContent, {
            width: 310,
            offset: new BMap.Size(0, -8),
            enableMessage: false
        });
        // var i = random(1, 8);
        var icon = new BMap.Icon('static/images/car.png', new BMap.Size(31, 16), {
            anchor: new BMap.Size(15, 8)
        });
        var marker = new BMap.Marker(point, {
            icon: icon
        });
        marker.setRotation(deg);
        marker.track_id = poi.track_id;
        marker.infoWindow = infoWindow;
        marker.addEventListener('mouseover', function() {
            var id = this.track_id;
            if (!$('.tr-' + id).hasClass('active-tr')) {
                $('.tr-' + id).css('background-color', '#F8F8F8');
                this.setIcon(new BMap.Icon('static/images/marker_car.png', new BMap.Size(36, 18), {
                    anchor: new BMap.Size(18, 9)
                }))
            }
        });
        marker.addEventListener('mouseout', function() {
            var id = this.track_id;
            if (!$('.tr-' + id).hasClass('active-tr')) {
                $('.tr-' + id).css('background-color', '#FFFFFF');
                this.setIcon(new BMap.Icon('static/images/car.png', new BMap.Size(31, 16), {
                    anchor: new BMap.Size(15, 8)
                }))
            }
        });
        marker.addEventListener("click", function() {
            this.openInfoWindow(infoWindow);
        });
        return marker;
    }

    /**
     * [markerMoveAnimation 实时监控中小车移动动画]
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.markerMoveAnimation = function(track_id, marker) {
        var self = this,
            l = self.trackPoiArrayObj[track_id].length,
            //当前的帧数
            currentCount = 0,
            //步长，
            timer = 25,
            step = 100 / (5000 / timer),
            //初始坐标
            init_pos = self._LngLatToPoint(self.trackPoiArrayObj[track_id][l - 2]),
            //获取结束点的(x,y)坐标
            target_pos = self._LngLatToPoint(self.trackPoiArrayObj[track_id][l - 1]),
            dis = self._getPointDistance(init_pos, target_pos),
            d = Math.round(self._getPointDistance(init_pos, target_pos) / step),
            //总的步长
            //count = d > 200 ? 200 : d,
            count = 200,
            tempPath = [];

        if (dis == 0) {
            return;
        } else {
            for (var i = 0; i < l - 1; i++) {
                tempPath.push(self.trackPoiArrayObj[track_id][i]);
            };
            var deg = marker.getRotation();
            if (self.intervarFlagObj[track_id]) {
                clearInterval(self.intervarFlagObj[track_id]);
            }
            self.intervarFlagObj[track_id] = setInterval(function() {
                if (currentCount >= count) {
                    clearInterval(self.intervarFlagObj[track_id]);
                    if (self.monitoringMakers[track_id]) {
                        self.map.removeOverlay(self.monitoringMakers[track_id]);
                    }
                    self.monitoringMakers[track_id] = marker;
                    if (!$('#monitoring').hasClass('active')) {
                        marker.hide();
                        self.monitoringPolylines[track_id].hide();
                    }
                    self.map.addOverlay(marker);
                } else {
                    currentCount++;
                    var x = self._Linear(init_pos.x, target_pos.x, currentCount, count),
                        y = self._Linear(init_pos.y, target_pos.y, currentCount, count),
                        pos = self.projection.pointToLngLat(new BMap.Pixel(x, y));
                    tempPath.push(pos);
                    var polyline = new BMap.Polyline(tempPath, {
                        strokeColor: "blue",
                        strokeStyle: 'dashed',
                        strokeWeight: 5,
                        strokeOpacity: 0.5
                    });
                    if (self.monitoringPolylines[track_id]) {
                        self.map.removeOverlay(self.monitoringPolylines[track_id]);
                    }
                    if (!$('#monitoring').hasClass('active')) {
                        polyline.hide();
                    }
                    self.map.addOverlay(polyline);
                    self.monitoringPolylines[track_id] = polyline;
                    self.monitoringMakers[track_id].setRotation(deg);
                    self.monitoringMakers[track_id].setPosition(pos);
                }

            }, timer);
        }

    }
    /**
     * 小车沿轨迹移动的动画播放
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.trackPlay = function(id) {
        var self = this;
        if (typeof self.monitoringTrackOverlays[id] == 'undefined' || self.monitoringTrackOverlays[id] == null || typeof self.monitoringTrackOverlays[id]._encrLngLatPois == 'undefined' || !self.monitoringTrackOverlays[id].display) {
            $('.no-poi-msg span').html('该条轨迹暂无历史数据，请先查询再回放！');
            //$('.no-poi-msg span').addClass('large-no-poi-msg');
            $('.no-poi-msg').show();
            setTimeout(function() {
                $('.no-poi-msg').hide();
            }, 1000);
            return;
        }
        self.processBarShow();
        self.processBarEnabled();
        if (self.currentPlayTrack && self.currentPlayTrack != id && self.isPlayed) {
            jConfirm('当前另条轨迹正在回放中,是否停止?', '历史轨迹回放', function(res) {
                if (res) {
                    self.trackStop();
                    self.trackPlay(id);
                } else {
                    if (self.isPlayed && self.isPaused) {
                        $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-pause');
                        $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-pause');
                        $(".ply-" + self.currentPlayTrack).attr('title', '暂停回放');
                        self.isPaused = false;
                        self.lushu.start();
                    }
                }
            });
        } else if (self.currentPlayTrack && self.currentPlayTrack == id) {
            if (self.isPlayed && self.isPaused) {
                $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-pause');
                $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-pause');
                $(".ply-" + self.currentPlayTrack).attr('title', '暂停回放');
                self.isPaused = false;
                self.lushu.start();
            } else if (!self.isPlayed) {
                self.sliderStart();
                self.trackStart();
                self.isPlayed = true;
            } else {
                return;
            }
        } else {
            self.currentPlayTrack = id;
            //第一次开始播放
            if (!self.isPlayed) {
                self.sliderStart();
                self.trackStart();
                self.onActiveTrack = id;
                self.isPlayed = true;
            } else if (self.isPaused) {
                self.isPaused = false;
                self.lushu.start();
            }
        }
    }
    /**
     * 小车沿轨迹移动的动画暂停
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.trackPause = function() {
        var self = this;
        if (self.lushu && self.isPlayed) {
            $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-play');
            $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-play');
            $(".ply-" + self.currentPlayTrack).attr('title', '轨迹回放')
            self.isPaused = true;
            self.lushu.pause();
        }
    }
    /**
     * 小车沿轨迹移动的动画重播
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.trackReplay = function() {
        $("#h-slider").slider({
            value: 0
        });
        // this.map.removeOverlay(this.lushu._marker);
        this.curIndex = 0;
        if (this.replayPlayTrack) {
            this.trackPlay(this.replayPlayTrack);
        }
    }
    /**
     * 小车沿轨迹移动的动画停止
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.trackStop = function() {
        var self = this;
        self.isPaused = false;
        self.isPlayed = false;
        self.curIndex = 0;
        $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-play');
        $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-play');
        $(".ply-" + self.currentPlayTrack).attr('title', '轨迹回放')
        //self.currentPlayTrack = null;
        if (self.lushu) {
            //停止后移除小车Marker
            self.map.removeOverlay(self.lushu._marker);
            self.lushu.stop();
            self.lushu = null;
        }
        //播放进度条回0
        $("#h-slider").slider({
            value: 0
        });
        $('.ui-slider-label').html('');
    }
    /**
     * 添加lushu，开始小车沿轨迹移动动画
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.trackStart = function() {
        var self = this;
        if (self.currentPlayTrack) {
            self.activeTrack(self.currentPlayTrack);
            self.setFitViewForTrack(self.currentPlayTrack);
            if (self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois && self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois.length > 0) {
                self.lushu = new BMapLib.LuShu(self, self.map, self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois, {
                    autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon: new BMap.Icon('static/images/car.png', new BMap.Size(31, 16), {
                        anchor: new BMap.Size(15, 8)
                    }),
                    speed: self.defaultSpeed,
                    //defaultContent: self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois[0].loc_time,
                    enableRotation: true //是否设置marker随着道路的走向进行旋转
                });
                if (self.lushuMarker) {
                    self.map.removeOverlay(self.lushuMarker);
                }
                self.lushu.start();
                //self.timeControl.show();
                $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-pause');
                $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-pause');
                $(".ply-" + self.currentPlayTrack).attr('title', '暂停回放');
            }
        }
    }
    /**
     * 播放那个进度条开始
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.sliderStart = function() {
        var self = this;
        if (self.currentPlayTrack) {
            if (self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois && self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois.length > 0) {
                self.totalStep = self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois.length;
                if (self.monitoringTrackOverlays[self.currentPlayTrack]._pois.length > 0) {
                    //手动控制进度
                    $(document).bind("mouseup", function() {
                        if (self.sliding) {
                            if (self.isPlayed) {
                                self.trackPlay(self.currentPlayTrack);
                                //self.lushu.start();
                            } else {
                                self.setSliderValue(0);
                            }
                            self.sliding = false;
                        }
                    });
                    $("#h-slider").slider({
                        value: 0,
                        min: 0,
                        max: self.totalStep,
                        slide: function(event, ui) {
                            if (self.lushu && self.isPlayed) {
                                self.sliding = true;
                                //self.lushu.pause();
                                self.trackPause();
                                self.curIndex = ui.value;
                                self.moveIndex(self.curIndex);
                            } else {
                                self.setSliderValue(0);
                                $('.ui-slider-label').hide();
                            }
                        }
                    });
                }
            }
        }
    }
    /**
     * [setSliderValue 调整进度条的进度]
     * @Author: xuguanlong
     * @param   {[type]}   v [进度条的值]
     */
    this.setSliderValue = function(v) {
        var self = this;
        $('#h-slider').slider({
            value: v
        });
        //self.setSliderTime(self.monitoringTrackOverlays[self.currentPlayTrack]._encrLngLatPois[v].loc_time);
    }
    this.moveIndex = function(index) {
        this.lushu.i = index;
        this.lushu._marker.setPosition(this.monitoringTrackOverlays[this.currentPlayTrack]._encrLngLatPois[index]);
        this.setSliderTime(this.monitoringTrackOverlays[this.currentPlayTrack]._encrLngLatPois[index].loc_time);
        //this.lushu._overlay.setPosition(this.lushu._marker.getPosition(), this.lushu._marker.getIcon().size);
    }
    /**
     * 动画结束回调函数
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.end = function() {
        var self = this;
        self.curIndex = 0;
        self.isPlayed = false;
        //self.isPaused = false;
        self.replayPlayTrack = self.currentPlayTrack;
        $("#btn-play").children().removeClass().addClass('glyphicon glyphicon-play');
        $(".ply-" + self.currentPlayTrack).children().removeClass().addClass('glyphicon glyphicon-play');
        $(".ply-" + self.currentPlayTrack).attr('title', '轨迹回放');
        //self.currentPlayTrack = null;
        $('.ui-slider-range').css('width', '100%');
        $('.ui-slider-handle').css('left', '100%');
        //self.setTimeControl(str)
    }
    this.processBarShow = function() {
        $('.tracks-history').show();
    }
    this.processBarHide = function() {
        $('.tracks-history').hide();
    }
    this.processBarDefault = function() {
        $("#h-slider").slider({
            value: 0
        });
    }
    this.processBarEnabled = function() {
        $('.tracks-history .btn').attr('disabled', false);
    }
    this.processBarDisabled = function() {
        $('.tracks-history .btn').attr('disabled', true);
    }
    /**
     * track poi点的抽稀,抽稀完后_pois保存抽稀后的poi点数组
     * @Author: xuguanlong
     * @param   {[type]}   pois [description]
     * @return  {[type]}        [description]
     */
    this.compressTrack = function(track_id, pois) {
        var self = this;
        self._pois = [];
        for (var i = 0; i < pois.length; i++) {
            self._pois.push(pois[i]);
        };
        if (!pois || pois.length == 0) {
            return;
        } else {
            //如果pois点数量大于阀值
            if (pois.length > self.POIS_MAX_NUM) {
                self.compress(track_id, 0, pois.length - 1);
                self._pois = _.compact(self._pois);
            }
            self.setLngLatpois();
        }
    }
    /**
     * 存储poi点的经纬度坐标
     * @Author: xuguanlong
     */
    this.setLngLatpois = function() {
        var self = this;
        if (self._pois.length > 0) {
            self._LngLatpois = [];
            self._encrLngLatPois = [];
            //self._poiLoctimes = [];
            for (var i = self._pois.length - 1; i >= 0; i--) {
                self._LngLatpois.push(new BMap.Point(self._pois[i][0], self._pois[i][1]));
                //self._poiLoctimes.push(self.js_date_time(self._pois[i].loc_time));
                var pos = new BMap.Point(self._pois[i][0], self._pois[i][1]);
                pos.loc_time = self.js_date_time(self._pois[i][2]);
                self._encrLngLatPois.push(pos);
                if (i > 0) {
                    var p1 = new BMap.Point(self._pois[i][0], self._pois[i][1]),
                        p2 = new BMap.Point(self._pois[i - 1][0], self._pois[i - 1][1]);
                    //self.encrytPoiloctime(self._pois[i].loc_time * 1000, self._pois[i - 1].loc_time * 1000, p1, p2);
                    self.encrytLngLatpois(self._pois[i][2] * 1000, self._pois[i - 1][2] * 1000, p1, p2);
                }
            }
        }
    }
    /**
     * 对存储的经纬度坐标点数组在进行动画轨迹播放时两点之间进行加密，加密后的数组只负责轨迹回放时计算小车的位置
     * @Author: xuguanlong
     * @param   {[type]}   p1 [经纬度坐标点1]
     * @param   {[type]}   p2 [经纬度坐标点2]
     * @return  {[type]}      [description]
     */
    this.encrytLngLatpois = function(unixtime1, unixtime2, p1, p2) {
        var self = this,
            timer = 25,
            step = self.defaultSpeed / (1000 / timer),
            init_pos = self._LngLatToPoint(p1),
            target_pos = self._LngLatToPoint(p2),
            count = Math.round(self._getPointDistance(init_pos, target_pos) / step);
        for (var i = 1; i < count; i++) {
            var x = self._Linear(init_pos.x, target_pos.x, i, count),
                y = self._Linear(init_pos.y, target_pos.y, i, count),
                z = self._Linear(unixtime1, unixtime2, i, count);
            pos = self.projection.pointToLngLat(new BMap.Pixel(x, y));
            pos.loc_time = self.js_date_time(Math.round(z / 1000));
            //_encrLngLatPois存储加密后的点数组，用户小车轨迹回放
            self._encrLngLatPois.push(pos);
        }
    }
    /**
     * 线性加密函数
     * @Author: xuguanlong
     * @param   {[type]}   initPos      [起始点]
     * @param   {[type]}   targetPos    [终止点]
     * @param   {[type]}   currentCount [当前计数]
     * @param   {[type]}   count        [两点间需要加密的点数]
     * @return  {[type]}                [description]
     */
    this._Linear = function(initPos, targetPos, currentCount, count) {
        var b = initPos,
            c = targetPos - initPos,
            t = currentCount,
            d = count;
        return c * t / d + b;
    }
    /**
     * canvas绘制线性轨迹函数，包括起点和终点
     * @Author: xuguanlong
     * @return  {[type]}        [description]
     */
    this.drawTrack = function() {
        var self = this;
        // self.hasTracksOnMap = true;
        for (var id in self.monitoringTrackOverlays) {
            var opts = self.monitoringTrackOverlays[id] ? self.monitoringTrackOverlays[id].pixelPois : [];
            if (typeof opts == 'undefined' || opts == null || opts.length <= 0) {
                continue;
            };
            if (self.monitoringTrackOverlays[id].display) {
                var startId = self.monitoringTrackOverlays[id].startId,
                    endId = self.monitoringTrackOverlays[id].endId,
                    trackId = self.monitoringTrackOverlays[id].trackId,
                    color = self.canvasRender.color;
                var BrokenLineShape = self.canvasRender.BrokenLineShape;
                var CircleShape = self.canvasRender.CircleShape;
                var ImageShape = self.canvasRender.ImageShape;
                var offset = {
                    x: 16,
                    y: 33
                };
                //var tid = track_id;
                if (opts.length <= 1) {
                    self.canvasRender.zr.addShape(new CircleShape({
                        id: id,
                        style: {
                            x: opts[0][0],
                            y: opts[0][1],
                            r: 4,
                            color: 'rgba(63,109,218,0.8)'
                        },
                        draggable: false
                    }));
                } else {
                    //起点图标  canvas image 
                    //canvas 绘制track
                    self.canvasRender.zr.addShape(new BrokenLineShape({
                        id: id,
                        style: {
                            pointList: opts,
                            strokeColor: 'rgba(63,109,218,0.8)',
                            lineWidth: 4,
                            lineJoin: 'round'
                        },
                        highlightStyle: {
                            strokeColor: 'rgba(41,188,1,0.8)'
                        },
                        onmouseover: function(e) {
                            if (e.target.id != self.onActiveTrack) {
                                self.highLight(e.target.id, true);
                                $('.tr-' + e.target.id).css('background-color', '#f8f8f8');
                            }
                        },
                        onmouseout: function(e) {
                            if (e.target.id != self.onActiveTrack) {
                                self.highLight(e.target.id, false);
                                $('.tr-' + e.target.id).css('background-color', '#ffffff');
                            }
                        },
                        //hoverable : true,
                        draggable: false
                    }));
                    //self.canvasRender.zr.addShape(startShape);
                    //self.canvasRender.zr.addShape(endShape);
                }
            }
        }
        if (typeof self.canvasRender.zr != 'undefined' && self.canvasRender.zr != null) {
            self.canvasRender.zr.render();
            if (typeof self.onActiveTrack != 'undefined' && self.onActiveTrack != null) {
                self.activeTrack(self.onActiveTrack);
            }
        }
    }
    this.activeTrack = function(id) {
        var opts = this.monitoringTrackOverlays[id] ? this.monitoringTrackOverlays[id].pixelPois : [];
        if (!opts || opts.length < 1) {
            return;
        }
        if (opts.length == 1) {
            this.onActiveTrack = id;
            this.canvasRender.zr.modShape(id, {
                style: {
                    color: 'rgba(83,139,69,0.9)',
                    r: 5
                }
            });
            this.canvasRender.zr.refresh();
            return;
        } else {
            this.onActiveTrack = id;
            this.canvasRender.zr.modShape(id, {
                style: {
                    strokeColor: 'rgba(41,188,1,0.9)',
                    lineWidth: 5
                }
            });
            var offset = {
                x: 16,
                y: 33
            };
            var ImageShape = this.canvasRender.ImageShape;
            var startShape = new ImageShape({
                    id: this.startImgId,
                    style: {
                        x: opts[0][0] - offset.x,
                        y: opts[0][1] - offset.y,
                        image: "static/images/start.png",
                        width: 31,
                        height: 33
                    },
                    draggable: false
                }),
                //终点图标  canvas image
                endShape = new ImageShape({
                    id: this.endImgId,
                    style: {
                        x: opts[opts.length - 1][0] - offset.x,
                        y: opts[opts.length - 1][1] - offset.y,
                        image: "static/images/end.png",
                        width: 31,
                        height: 33
                    },
                    draggable: false
                });
            this.canvasRender.zr.addShape(startShape);
            this.canvasRender.zr.addShape(endShape);
            this.canvasRender.zr.refresh();
        }
    }
    this.highLight = function(id, light) {
        var backColor = light ? '#dddddd' : '#ffffff';
        $('#tr-' + id).children('td').css('background-color', backColor);
    }
    this.showAll = function() {
        var type = ($('#monitoring').hasClass('active')) ? 1 : 2;
        this.setFitview(type);
    }
    this.setFitViewForMarker = function(id, hide) {
        var self = this,
            lngLats = [];
        if (!$('#monitoring').hasClass('active')) {
            return;
        }
        if (self.monitoringMakers[id] && self.monitoringMakers[id].isVisible()) {
            //var bounds = self.map.getBounds();
            //if (!bounds.containsPoint(self.monitoringMakers[id].getPosition())) {
            //self.map.setCenter(self.monitoringMakers[id].getPosition());
            var pts = [];
            pts.push(self.monitoringMakers[id].getPosition());
            var viewport = self.map.getViewport(pts, {
                margins: [10, 10, 10, 10]
            });
            self.map.setViewport(viewport);
            //}
            // if (typeof hide == 'undefined' || !hide) {
            //     setTimeout(function() {
            //         self.monitoringMakers[id].openInfoWindow(self.monitoringMakers[id].infoWindow);
            //     }, 50)
            // }
            //self.map.openInfoWindow(self.monitoringMakers[id].infoWindow, self.monitoringMakers[id].getPosition());
        }
    }
    this.setFitViewForTrack = function(id) {
        var self = this,
            lngLats = [];
        if (!$('#history-track').hasClass('active')) {
            return;
        }
        if (self.monitoringTrackOverlays[id] && self.monitoringTrackOverlays[id].display) {
            if (self.isPlayed && self.currentPlayTrack != id) {
                jConfirm('当前另条轨迹正在回放中,是否停止?', '历史轨迹回放', function(res) {
                    if (res) {
                        self.trackStop();
                        self.currentPlayTrack = id;
                        self.setFitViewForTrack(id);
                    }
                });
            } else {
                var pts = self.monitoringTrackOverlays[id]._LngLatpois;
                if (typeof pts != 'undefined' && pts != null && pts.length > 0) {
                    lngLats = lngLats.concat(pts);
                }
                var viewport = self.map.getViewport(lngLats, {
                    margins: [10, 10, 10, 10]
                });
                self.map.setViewport(viewport);
            }
        }
    }
    /**
     * 调整map的视窗
     * @Author: xuguanlong
     * @param   {[type]}   type [description]
     */
    this.setFitview = function(type) {
        var self = this,
            lngLats = [];
        self.trackStop();
        self.onActiveTrack = null;
        //self.currentPlayTrack = null;
        if (type == 1) {
            for (var m in self.monitoringMakers) {
                var marker = self.monitoringMakers[m];
                if (marker != null && typeof marker != 'undefined') {
                    lngLats.push(marker.getPosition());
                }
            }
        } else if (type == 2) {
            for (var id in self.monitoringTrackOverlays) {
                if (self.monitoringTrackOverlays[id] && self.monitoringTrackOverlays[id].display) {
                    var pts = self.monitoringTrackOverlays[id]._LngLatpois;
                    if (typeof pts != 'undefined' && pts != null && pts.length > 0) {
                        lngLats = lngLats.concat(pts);
                    }
                }
            }
        } else {
            return;
        }
        var viewport = self.map.getViewport(lngLats, {
            margins: [10, 10, 10, 10]
        });
        self.map.setViewport(viewport);
        //self.map.panBy(0, 0);
    };
    this._LngLatToPoint = function(point) {
        var self = this;
        return self.projection.lngLatToPoint(point);
    }
    this._getDistance = function(pxA, pxB) {
        // return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
        return this.map.getDistance(pxA, pxB);
    }
    this._getPointDistance = function(pxA, pxB) {
        return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
    }
    /**
     * 计算轨迹经过的长度
     * @Author: xuguanlong
     * @return  {[type]}   [description]
     */
    this.getTotalLength = function(points) {
        var self = this;
        var d = 0;
        if (!points) {
            return d;
        }
        if (points.length > 0) {
            for (var i = points.length - 1; i >= 1; i--) {
                if (!points[i].equals(points[i - 1])) {
                    d += parseFloat(self.toDecimal3(self._getDistance(points[i], points[i - 1])));
                }
            }
            d = (Math.floor(d)) / 1000;
        }
        return d;
    }
    /**
     * [compress 轨迹点抽稀]
     * @Author: xuguanlong
     * @param   {[number]}   from
     * @param   {[number]}   to   [poi点数组终止下标]
     */
    this.compress = function(id, from, to) {
        if (to == from + 1 || from > to || from == to) {
            return;
        }
        var self = this;
        var switchvalue = false;
        var start = self._LngLatToPoint(new BMap.Point(self.monitoringTrackOverlays[id].pois[from][0], self.monitoringTrackOverlays[id].pois[from][1]));
        var end = self._LngLatToPoint(new BMap.Point(self.monitoringTrackOverlays[id].pois[to][0], self.monitoringTrackOverlays[id].pois[to][1]));
        var A = (start.y - end.y) / Math.sqrt(Math.pow((start.y - end.y), 2) + Math.pow((start.x - end.x), 2));
        var B = (end.x - start.x) / Math.sqrt(Math.pow((start.y - end.y), 2) + Math.pow((start.x - end.x), 2));
        var C = (start.x * end.y - end.x * start.y) / Math.sqrt(Math.pow((start.y - end.y), 2) + Math.pow((start.x - end.x), 2));
        var dmax = 0;
        var middle = from;
        for (var i = from + 1; i < to; i++) {
            var temp = self._LngLatToPoint(new BMap.Point(self.monitoringTrackOverlays[id].pois[i][0], self.monitoringTrackOverlays[id].pois[i][1]));
            var d = Math.abs(A * temp.x + B * temp.y + C) / Math.sqrt(Math.pow(A, 2) + Math.pow(B, 2));
            if (d > dmax) {
                dmax = d;
                middle = i;
            }
        };
        //若距离大于阀值，则不进行过滤
        if (dmax > self.DMAXDINSTANCE) {
            switchvalue = true;
        } else {
            switchvalue = false;
        }
        //抽稀掉距离过小的poi点
        if (!switchvalue) {
            for (var i = from + 1; i < to; i++) {
                self._pois[i] = null;
            }
        } else {
            self.compress(id, from, middle);
            self.compress(id, middle, to);
        }
    }
    this.timerStart = function() {
        var self = this;
        setInterval(function() {
            self.loopMonitoring();
        }, 5000);
    }
    this.toDecimal3 = function(num) {
        if (!num) {
            return 0;
        }
        var str = num.toString();
        var i = str.indexOf('.');
        if (str.length - i > 4) {
            str = str.substring(0, i + 4);
        }
        return str;
    }
    this.setPageSize = function() {
        var h = $('.track-list-div').height() - 200;
        return Math.floor(h / 26);
    }
    this.loopMonitoring = function() {
        for (var i = 0; i < this.tracksMonitoring.length; i++) {
            this.monitorTrackById(this.tracksMonitoring[i].track_id);
        }
    }
    this.setTimeControl = function(str) {
        $('#time_control').html(str);
    }
    this.setSliderTime = function(str) {
        $('.ui-slider-label').html(str.substring(str.length - 8, str.length));
        $('.ui-slider-label').show();
    }

    this.autoLoadHistory = function(loadAll) {
        var self = this;
        // if (self.currentPlayTrack != null && self.isPlayed) {
        //     self.trackStop();
        // }
        for (var i = 0; i < self.tracksMonitoring.length; i++) {
            var id = self.tracksMonitoring[i].track_id;
            if (loadAll) {
                if (self.currentPlayTrack != null && self.isPlayed) {
                    self.trackStop();
                }
                self.getTrackHistory(id);
            } else {
                if (!self.monitoringTrackOverlays.hasOwnProperty(id)) {
                    self.getTrackHistory(id);
                } else {
                    if (self.monitoringTrackOverlays[id]) {
                        $('#history-dis-' + id).html(self.monitoringTrackOverlays[id]._totalLength);
                        $('#track-ok-' + id).show();
                        $('#time-' + id).html(self.monitoringTrackOverlays[id].startTime + ' -- ' + self.monitoringTrackOverlays[id].endTime);
                        $('.ply-' + id).attr('disabled', false);
                    } else {
                        $('#no-track-' + id).show();
                        $('#no-track-' + id).jBox('Tooltip', {
                            theme: 'TooltipBorder'
                        });
                        $('#history-dis-' + id).html('--');
                        $('#time-' + id).html('--   --');
                    }
                }
            }
        }
    }
    this.getTrackHistory = function(track_id) {
        var self = this,
            startTime = self.js_strto_time(self.startTime),
            endTime = self.js_strto_time(self.endTime);
        $('.ply-' + track_id).attr('disabled', true);
        $('#no-track-' + track_id).hide();
        $('#track-ok-' + track_id).hide();
        $('#track-load-' + track_id).show();
        $.getJSON('static/data/' + track_id + '.json', function(data) {
            historyCallBack(data);
        });
        // $.ajax({
        //     type: 'GET',
        //     url: 'static/data/'+track_id+'.json',
        //     success: historyCallBack
        // });
    }
    this.inMonitoring = function(track_id) {
        var self = this;
        var m = false;
        if (self.tracksMonitoring.length > 0) {
            _.each(self.tracksMonitoring, function(element, i) {
                if (element.track_id == track_id) {
                    m = true;
                }
            })
        }
        return m;
    }

    function historyCallBack(data) {
        var self = tracksControl;
        if (typeof data != 'undefined' && data != null) {
            //var data = $.parseJSON(res);
            if (data.length <= 0) {
                //$('#track-load-' + id).hide();
                $('.no-poi-msg span').html('未请求到任何数据！');
                $('.no-poi-msg span').addClass('large-no-poi-msg');
                $('.no-poi-msg').show();
                setTimeout(function() {
                    $('.no-poi-msg').hide();
                }, 1000);
            } else {
                for (var id in data) {
                    if (!self.inMonitoring(id)) {
                        return;
                    }
                    if (typeof data[id].pois == 'undefined' || data[id].pois == null || data[id].pois.length <= 0) {
                        $('#track-load-' + id).hide();
                        $('#no-track-' + id).show();
                        $('#no-track-' + id).jBox('Tooltip', {
                            theme: 'TooltipBorder'
                        });
                        self.monitoringTrackOverlays[id] = null;
                        $('#history-dis-' + id).html('--');
                        $('#time-' + id).html('--   --');
                    } else {

                        self.monitoringTrackOverlays[id] = {
                            'display': true
                        }
                        // 存储这条轨迹的历史轨迹点信息
                        self.monitoringTrackOverlays[id].pois = data[id].pois;
                        self.monitoringTrackOverlays[id].startId = self.canvasRender.guid();
                        self.monitoringTrackOverlays[id].trackId = self.canvasRender.guid();
                        self.monitoringTrackOverlays[id].endId = self.canvasRender.guid();
                        self.compressTrack(id, self.monitoringTrackOverlays[id].pois);
                        self.monitoringTrackOverlays[id]._pois = self._pois;
                        var endTime = self.js_date_time(self._pois[0][2]),
                            startTime = self.js_date_time(self._pois[self._pois.length - 1][2]);
                        self.monitoringTrackOverlays[id]._LngLatpois = self._LngLatpois;
                        self.monitoringTrackOverlays[id]._totalLength = self.getTotalLength(self._LngLatpois);
                        self.monitoringTrackOverlays[id].startTime = startTime.substring(startTime.length - 8, startTime.length);
                        self.monitoringTrackOverlays[id].endTime = endTime.substring(endTime.length - 8, endTime.length);
                        self.monitoringTrackOverlays[id]._encrLngLatPois = self._encrLngLatPois;
                        $('#history-dis-' + id).html(self.monitoringTrackOverlays[id]._totalLength);
                        $('#time-' + id).html(self.monitoringTrackOverlays[id].startTime + ' -- ' + self.monitoringTrackOverlays[id].endTime);
                        $('#track-load-' + id).hide();
                        $('#track-ok-' + id).show();
                        $('.ply-' + id).attr('disabled', false);
                        if (!self.tipHasShowed) {
                            self.tipHasShowed = true;
                            $('.ply-' + id).tooltip('show');
                            setTimeout(function() {
                                $('.ply-' + id).tooltip('hide');
                            }, 1000);
                        }
                        if (!self.hasSetFitView) {
                            self.setFitViewForTrack(id);
                            self.hasSetFitView = true;
                        }
                    };
                }
            }
        }
    }

    this.fullScreenMap = function() {
        var self = this,
            height = $('.main-div').height();
        self.mapOptions = self.mapOptions ? self.mapOptions : {};
        self.mapOptions.zIndex = $('.map-div').css('z-index');
        self.mapOptions.marginLeft = $('.map-div').css('margin-left');
        self.mapOptions.height = $('.map-div').height();

        $('.map-div').addClass('full-map').css({
            zIndex: "1000",
            height: height + "px",
            marginLeft: '0px',
            position: 'absolute'
        });
    }
    this.defaultScreenMap = function() {
        var self = this;
        if (self.mapOptions) {
            $('.map-div').removeClass('full-map').css({
                zIndex: self.mapOptions.zIndex,
                height: self.mapOptions.height + "px",
                marginLeft: self.mapOptions.marginLeft,
                position: 'relative'
            });
        }
    }

}