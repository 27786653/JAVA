/* 
 * @Author: xuguanlong
 * @Date:   2014-08-19 17:11:31
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2015-02-02 12:27:24
 */
var header = function() {
    var htmlContent = ['<header class="y-hd clearfix">\r\n',
        '<a class="logo-link" href="http://yingyan.baidu.com"></a>\r\n',
        '<span class="trace-admin-title"></span>\r\n',
        '<ul class="top-bar-nav">\r\n',
        '<li class="item nav-bar-item"><a class="item-a" href="manage.html">我的鹰眼服务</a><span>|</span></li>\r\n',
        '<li class="item nav-bar-item" id="unlogin-li"><a id="login-href" href="#">登录</a><span>|</span></li>\r\n',
        '<li class="item user-bar-item" id="user-login">\r\n',
        '<span class="user-state clearfix">\r\n',
        '<span id="userName"></span>\r\n',
        '<span class="triangle-bottom"></span>\r\n',
        '<span style="margin-left:10px;">|</span></span>\r\n',
        '<ul class="dropdown">\r\n',
        '<li class="dropdown-li"><div class="tip-triangel-up"></div><a href="http://passport.baidu.com/center">账号设置</a></li>\r\n',
        '<li style="padding-top:5px;"><a href="#" id="logout">退出</a></li>\r\n',
        '</ul></li>\r\n',
        '<li class="item nav-bar-item contact-item"><a class="contact" href="contact.html">联系我们</a>\r\n',
        '<div class="message" style="display: none; ">\r\n',
        ' <div class="tip-triangel-up"></div>\r\n',
        '<img src="static/images/email-icon.png" height="16" width="16" alt="邮箱"><a class="tip-email" href="mailto:BaiduYingyan@baidu.com">BaiduYingyan@baidu.com</a>',
        '</div>',
        '</li>\r\n',
        '</ul></header>\r\n',
       
    ].join('');
    this.init = function() {
        document.write(htmlContent);
    }

};

//首页banner图切换动画控制对象
var Banner = function() {
    this.init = function() {
        this.current = 0; //当前的banner index
        this.duration = 6; //每条banner
        this.timeline = null; //控制动画的timeline对象
        this.first = true;
        this.speed = 1.3; //action动画时间
        this.skip = false;
    };
    this.setBannerDefault = function(index) {
        var self = this;
        index = parseInt(index);
        switch (index) {
            case 0:
                TweenMax.to(".ele0-title", 1, {
                    left: "-2000px",
                });
                TweenMax.to(".ele0-imgs", 0.5, {
                    opacity: 0,
                });
                TweenMax.to(".ele0-title .icon", 0.5, {
                    display: "none",
                    top: "0px"
                });
                break;
            case 1:
                TweenMax.to(".ele1-title", 1, {
                    left: "-2000px",
                });
                TweenMax.to([".ele1-imgs .img-1", ".ele1-imgs .img-2", ".ele1-imgs .img-3"], 0.5, {
                    opacity: 0,
                });
                break;
            case 2:
                TweenMax.to(".ele2-title", 1, {
                    right: "-2000px",
                });
                TweenMax.to([".ele2-imgs .img-1", ".ele2-imgs .img-2"], 0.5, {
                    opacity: 0,
                });
                break;
            case 3:
                TweenMax.to(".ele3-title", 1, {
                    left: "-2000px",
                });
                TweenMax.to([".ele3-imgs .img-1", ".ele3-imgs .img-2", ".ele3-imgs .img-3"], 0.5, {
                    opacity: 0,
                });
                break;
            case 4:
                TweenMax.to(".ele4-title", 1, {
                    left: "-2000px",
                });
                TweenMax.to([".ele4-imgs .img-1", ".ele4-imgs .img-1 .cir1", ".ele4-imgs .img-1 .cir2", ".ele4-imgs .img-1 .cir3"], 0.5, {
                    opacity: 0,
                });
                break;
            case 5:
                TweenMax.to(".ele5-title", 1, {
                    left: "-2000px",
                });
                TweenMax.to([".ele5-imgs .img-1", ".ele5-imgs .img-2", ".ele5-imgs .img-3"], 0.5, {
                    opacity: 0,
                });
                break;
            default:
                return;
        }
    }
    //每个banner对应的动画action
    this.bannerAction = function(index) {
        var self = this;
        switch (index) {
            case 0:
                TweenMax.to(".ele0-title", self.speed, {
                    left: "20px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele0-imgs", self.speed + 1, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele0-title .icon", 0.5, {
                    display: "block",
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                TweenMax.to(".ele0-title .icon", 0.5, {
                    top: "-30px",
                    ease: Linear.linear,
                    delay: self.speed + 0.6,
                    repeat: 2,
                    reversed: true,
                    yoyo: true
                });
                break;
            case 1:
                TweenMax.to(".ele1-title", 1, {
                    left: "0px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele1-imgs .img-1", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele1-imgs .img-2", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                TweenMax.to(".ele1-imgs .img-3", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: 2 * self.speed
                });
                break;
            case 2:
                TweenMax.to(".ele2-title", self.speed, {
                    right: "80px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele2-imgs .img-1", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele2-imgs .img-2", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                break;
            case 3:
                TweenMax.to(".ele3-title", self.speed, {
                    left: "0px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele3-imgs .img-1", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele3-imgs .img-3", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                TweenMax.to(".ele3-imgs .img-2", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: 2 * self.speed
                });
                break;
            case 4:
                TweenMax.to(".ele4-title", self.speed, {
                    left: "0px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele4-imgs .img-1", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele4-imgs .img-1 .cir1", 0.9, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                TweenMax.to(".ele4-imgs .img-1 .cir2", 0.9, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: 0.9 + self.speed
                });
                TweenMax.to(".ele4-imgs .img-1 .cir3", 0.9, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: 1.8 + self.speed
                });
                break;
            case 5:
                TweenMax.to(".ele5-title", self.speed, {
                    left: "0px",
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele5-imgs .img-1", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut
                });
                TweenMax.to(".ele5-imgs .img-2 ", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: self.speed
                });
                TweenMax.to(".ele5-imgs .img-3", self.speed, {
                    opacity: 1,
                    ease: Cubic.easeInOut,
                    delay: 2 * self.speed
                });
                break;
            default:
                return;
        }
    };
    //    banner切换处理
    this.changeBanner = function() {
        var self = this;
        var element_showed = $(".banner:visible");
        var delay = 1;
        if (element_showed.length) {}

        function showBanner() {
            var element = $('.element-' + self.current);
            TweenMax.killTweensOf(".banners");
            if ($(element_showed).attr("index") != $(element).attr("index")) {
                TweenMax.to(element_showed, 0.05, {
                    delay: 0,
                    display: "none",
                    onComplete: self.setBannerDefault($(element_showed).attr("index"))
                });

            }
            TweenMax.to(element, 0.05, {
                display: "block",
                alpha: 1,
                ease: Cubic.easeOut
            });
            $(".banners").append(element);
            self.bannerAction(self.current);

        };
        TweenMax.killTweensOf(showBanner);
        TweenMax.delayedCall(delay, showBanner);
        $('.ball').removeClass("curball");
        $('.btn-' + self.current + ' .ball').addClass('curball');
        $('.line-vert').removeClass("cur-line-vert");
        $('.btn-' + self.current + ' .line-vert').addClass('cur-line-vert');

    };
    //手动点击图标时显示banner
    this.setBanner = function(value) {
        var self = this;
        self.skip = true;
        self.timeline.timeScale(4 * self.duration).tweenTo("position_" + value, {
            ease: Cubic.easeInOut,
            onComplete: function() {
                self.timeline.timeScale(1).play();
                self.skip = false;
            }
        });
    }
    //banner动画播放的timeline初始化
    this.configTimeLine = function() {
        var self = this;
        TweenMax.killTweensOf(self.timeline);
        self.current = 0;
        self.timeline = new TimelineMax({
            repeat: -1
        });
        self.timeline.to(".overlay-line", 0, {
            width: "0%"
        }).addLabel("position_0");

        var bannerItems = parseFloat(6);
        for (var i = 0; i < bannerItems; i++) {
            var percent = ((i / bannerItems) + (1 / bannerItems)) * 100 + "%";
            self.timeline.to(".overlay-line", self.duration, {
                width: percent,
                ease: Linear.easeNone,
                onStartParams: [i],
                onStart: function(i) {
                    self.current = i;
                    self.changeBanner();
                }
            }).addLabel("position_" + (i + 1));
        }
    }
}
var banner = new Banner();
$(document).ready(function() {
    banner.init();
    banner.configTimeLine();
    // $('.user-bar-item').bind({
    //     mouseenter: function() {
    //         $(this).children('.dropdown').show();
    //     },
    //     mouseleave: function(e) {
    //         $(this).children('.dropdown').hide();
    //     }
    // });
    // $('.contact-item').bind({
    //     mouseenter: function() {
    //         $(".message").show();
    //     },
    //     mouseleave: function() {
    //         $(".message").hide();
    //     }
    // })
})