/* 
 * @Author: xuguanlong
 * @Date:   2014-12-29 18:58:57
 * @Last Modified by:   xuguanlong
 * @Last Modified time: 2015-02-02 12:25:20
 */

var topheader = function() {
    var topContent = ['<div id="header"><div class="top-bg"><div class="top-wrap"><div id="logins">\r\n',
        '<ul class="user-nav clearfix">\r\n',
        '<li class="user-nav-item" id="user-state-li">\r\n',
        '<a href="javascript:void(0)" id="username"></a> <label>|</label>\r\n',
        '<ul class="username-dropdown clearfix">\r\n',
        '<span class="arrow"></span><li><a href="http://passport.baidu.com/center" class="account-link" target="_top">账号设置</a></li>\r\n',
        '<li><a href="#" class="logout-link" target="_top">退出</a></li></ul></li>\r\n',
        '<li class="user-nav-item"><a href="http://lbsyun.baidu.com/apiconsole/key" target="_blank" style="color:#333333">API控制台</a></li>\r\n',
        '<li class="user-nav-item"><label>|</label><a href="http://developer.baidu.com/map" target="_blank" style="color:#999999">百度地图开放平台</a></li>\r\n',
        '<li class="user-nav-item" id="login-reg-li"><label>|</label>\r\n',
        '<a href="#" id="login" style="color:#999999" target="_top">登录</a>\r\n',
        '<a href="#" id="register" style="color:#999999" target="_top">注册</a>\r\n',
        '</li></ul></div></div></div></div>\r\n'
    ].join('');
    var navUl = ['<li class="nav-item"><a href="index.html" class="home">首页</a></li>\r\n',
        '<li class="nav-item"><a href="manage.html" class="trace">鹰眼服务</a></li>\r\n',
        '<li class="nav-item"><a href="http://bbs.lbsyun.baidu.com/forum.php?mod=forumdisplay&fid=26" target="_blank" class="bbs">论坛</a></li>\r\n',
        '<li class="nav-item"><a href="contact.html" class="contact">联系我们</a></li>\r\n'
    ];
    var navHtml = ['<div id="nav-wrapper" class="clearfix"><div class="content"><div id="logo">\r\n',
        '<a href="http://yingyan.baidu.com" title="百度鹰眼"></a>\r\n',
        '</div><div id="nav" class="clearfix"><ul class="clearfix">\r\n',
        '</ul></div></div></div>\r\n'
    ];
    var regPhone = /^0\d{2,3}-?\d{7,8}$/;
    var regMobile = /^1\d{10}$/;
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    function checkPhone() {
        var phone = $('input[name="phone"]').val();
        if (regPhone.test(phone) || regMobile.test(phone)) {
            $('.phone-tip').html('');
            return true;
        } else {
            $('.phone-tip').html('<span class="glyphicon glyphicon-remove" style="color:red"></span>联系方式格式不正确！')
            return false;
        }
    }

    function checkEmail() {
        var email = $('input[name="email"]').val();
        if (emailReg.test(email) || emailReg.test(email)) {
            $('.email-tip').html('');
            return true;
        } else {
            $('.email-tip').html('<span class="glyphicon glyphicon-remove" style="color:red"></span>邮箱格式不正确！')
            return false;
        }
    }

    function checkAll() {
        if (checkPhone() && checkEmail()) {
            return true;
        } else {
            return false;
        }
    }
    return {
        init: function() {
            document.write(topContent);
        },
        initNav: function(index) {
            var li = navUl[index];
            var pos = li.indexOf('<a') + 3;
            navUl[index] = li.replace(/(<a)/g, '$1' + ' style="color:#0098DD"');
            navHtml.splice(3, 0, navUl.join(''));
            navHtml = navHtml.join('');
            document.write(navHtml);
        },
        validate: function() {
            $('input[name="phone"]').bind('blur', function() {
                checkPhone();
            });
            $('input[name="email"]').bind('blur', function() {
                checkEmail();
            });

        },
        getCode: function() {
            var box = $('.yy-code');
            if (box.length <= 0) {
                return false;
            }
            box.on('click', 'img', function() {
                showCode();
            });
            showCode();

            function showCode() {
                $.ajax({
                    url: 'http://map.baidu.com/maps/services/captcha',
                    dataType: 'jsonp',
                    jsonp: 'cb',
                    success: function(data) {
                        $('input[name="vcode"]').val(data.content.vcode);
                        var img = box.find('img');
                        if (img.length <= 0) {
                            img = $('<img src="" />')
                            box.append(img);
                        }
                        img.attr('src', 'http://map.baidu.com/maps/services/captcha/image?vcode=' + data.content.vcode);
                    },
                    fail: function() {
                        alert('获取验证码失败，请刷新重试');
                    }
                });
            }
            $('form').on('submit', function() {
                var self = $(this);
                var data = self.serialize();
                if (self.find('textarea[name="intro"]').val().length > 500) {
                    alert('项目内容最大限制在500字内，请检查并修改');
                    return false;
                }
                self.find('input').attr("disabled", "disabled");
                self.find('textarea').attr("disabled", "disabled");
                self.find('button').attr("disabled", "disabled");
                if (!checkAll()) {
                    self.find('input').removeAttr("disabled");
                    self.find('textarea').removeAttr("disabled");
                    self.find('button').removeAttr("disabled");
                    return false;
                }
                $.ajax({
                    url: 'api/mail.php',
                    type: 'POST',
                    data: data,
                    success: function(data) {
                        self.find('input').removeAttr("disabled");
                        self.find('textarea').removeAttr("disabled");
                        self.find('button').removeAttr("disabled");
                        data = eval('(' + data + ')');
                        if (data.res) {
                            alert('发送成功');
                            self.find('input,textarea').val('');
                        } else {
                            alert('发送失败');
                        }
                        showCode();
                    },
                    fail: function() {
                        self.find('input').removeAttr("disabled");
                        self.find('textarea').removeAttr("disabled");
                        self.find('button').removeAttr("disabled");
                        alert('提交失败，请重试');
                        showCode();
                    }
                })
                return false;
            })

        }
    }
}();