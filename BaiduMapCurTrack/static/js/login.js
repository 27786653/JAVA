/**
 *  用户登录组件
 *  @param {JsonObject} ops json对象参数
 */
window.tag = 0;
var M = {};
M.service = {};

function showUserInfo(userState) {
    var type = userState.isOnline == 1 ? "e" : "s";
    if (type == 's') {
        $("#login-href").attr('href', "https://passport.baidu.com/?login&u=" + location.href);
        $("#unlogin-li").show();
    } else {
        $("#unlogin-li").hide();
        var name = userState.displayname;
        var logoutUrl = 'http://passport.baidu.com/?logout&u=' + M.service.login._config["backurl"];
        $("#user-login").show();
        $("#userName").html(name);
        $("#logout").attr('href', logoutUrl);
    }
}
M.service.login = function(ops) {
    var backurl = ops.backurl; // 登录退出后的跳转地址 [必须输入项]
    var echo = ops.echo; // 回调函数→script加载完被调用
    var charset = ops.charset; // 编码
    var flag = ops.flag; // 是否启用缓存 默认不缓存
    var callback = ops.callback; // 回调函数→在_getUserState方法中被调用
    M.service.login._config["backurl"] = backurl;
    M.service.login._config["callback"] = callback;
    var url = M.service.login._config["ACCESS"];
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
M.service.login._config = {
    ACCESS: "http://mc.map.baidu.com/passport/Session3.php?callback=showUserInfo", // 取用户信息
    LOGIN: "https://passport.baidu.com/?login&u=" + location.href, // 登录passport地址
    SPLIT: "&nbsp;|&nbsp;" // 链接项目的分隔符
}
// 登录组件加载
$(document).ready(function() {
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
    M.service.login({
        backurl: backurl, // *退出【登录】后的访问地址
        callback: function(o) {}
    });
    $('.user-bar-item').bind({
        mouseenter: function() {
            $(this).children('.dropdown').show();
        },
        mouseleave: function(e) {
            $(this).children('.dropdown').hide();
        }
    });
    // $('.contact-item').bind({
    //     mouseenter: function() {
    //         $(".message").show();
    //     },
    //     mouseleave: function() {
    //         $(".message").hide();
    //     }
    // })
});