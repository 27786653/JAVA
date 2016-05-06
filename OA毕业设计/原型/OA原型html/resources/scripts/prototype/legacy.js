//stored on each browser event
var windowEvent;

$axure.internal(function($ax) {
    var _legacy = {};
    $ax.legacy = _legacy;


    // ************************** GLOBAL VARS *********************************//

    // ************************************************************************//
    //Check if IE
    //var bIE = false;
    //if ((index = navigator.userAgent.indexOf("MSIE")) >= 0) {
    //    bIE = true;
    //}

    var Forms = window.document.getElementsByTagName("FORM");
    for(var i = 0; i < Forms.length; i++) {
        var Form = Forms[i];
        Form.onclick = $ax.legacy.SuppressBubble;
    }

    $ax.legacy.SuppressBubble = function(event) {
        if($.browser.msie) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        } else {
            if(event) {
                event.stopPropagation();
            }
        }
    };

    //    function InsertAfterBegin(dom, html) {
    //        if(!$.browser.msie) {
    //            var phtml;
    //            var range = dom.ownerDocument.createRange();
    //            range.selectNodeContents(dom);
    //            range.collapse(true);
    //            phtml = range.createContextualFragment(html);
    //            dom.insertBefore(phtml, dom.firstChild);
    //        } else {
    //            dom.insertAdjacentHTML("afterBegin", html);
    //        }
    //    }

    //    function InsertBeforeEnd(dom, html) {
    //        if(!$.browser.msie) {
    //            var phtml;
    //            var range = dom.ownerDocument.createRange();
    //            range.selectNodeContents(dom);
    //            range.collapse(dom);
    //            phtml = range.createContextualFragment(html);
    //            dom.appendChild(phtml);
    //        } else {
    //            dom.insertAdjacentHTML("beforeEnd", html);
    //        }
    //    }

    //Get the id of the Workflow Dialog belonging to element with id = id

    //    function Workflow(id) {
    //        return id + 'WF';
    //    }

    $ax.legacy.BringToFront = function(id, skipFixed) {
        _bringToFrontHelper(id);
        if(!skipFixed) $ax.legacy.BringFixedToFront();
    };

    var _bringToFrontHelper = function(id) {
        var target = window.document.getElementById(id);
        if(target == null) return;
        $ax.globals.MaxZIndex = $ax.globals.MaxZIndex + 1;
        target.style.zIndex = $ax.globals.MaxZIndex;
    };

    $ax.legacy.BringFixedToFront = function() {
        $ax(function(diagramObject) { return diagramObject.fixedKeepInFront; }).each(function(diagramObject, scriptId) {
            _bringToFrontHelper(scriptId);
        });
    };

    $ax.legacy.SendToBack = function(id) {
        var target = window.document.getElementById(id);
        if(target == null) return;
        target.style.zIndex = $ax.globals.MinZIndex = $ax.globals.MinZIndex - 1;
    };

    $ax.legacy.RefreshScreen = function() {
        var oldColor = window.document.body.style.backgroundColor;
        var setColor = (oldColor == "rgb(0,0,0)") ? "#FFFFFF" : "#000000";
        window.document.body.style.backgroundColor = setColor;
        window.document.body.style.backgroundColor = oldColor;
    };

    $ax.legacy.getAbsoluteLeft = function(node) {
        var currentNode = node;
        var left = 0;
        var fixed = false;
        while(currentNode != null && currentNode.tagName != "BODY") {
            left += currentNode.offsetLeft;
            if(currentNode.id != '' && $('#' + currentNode.id).css('position') == 'fixed') fixed = true;
            if(currentNode.scrollLeft) left -= currentNode.scrollLeft;

            currentNode = currentNode.offsetParent;
        }
        if(fixed) left += window.document.body.scrollLeft;
        return left;
    };

    $ax.legacy.getAbsoluteTop = function(node) {
        var currentNode = node;
        var top = 0;
        var fixed = false;
        while(currentNode != null && currentNode.tagName != "BODY") {
            top += currentNode.offsetTop;
            if(currentNode.id != '' && $('#' + currentNode.id).css('position') == 'fixed') fixed = true;
            if(currentNode.scrollTop) top -= currentNode.scrollTop;

            currentNode = currentNode.offsetParent;
        }
        if(fixed) top += window.document.body.scrollTop;
        return top;
    };

    // ******************  Annotation and Link Functions ****************** //

    $ax.legacy.GetAnnotationHtml = function(annJson) {
        var retVal = "";
        for(var noteName in annJson) {
            if(noteName != "label") {
                retVal += "<div class='annotationName'>" + noteName + "</div>";
                retVal += "<div class='annotation'>" + annJson[noteName] + "</div>";
            }
        }
        return retVal;
    };


    $ax.legacy.GetScrollable = function(target) {
        var $target = $(target);
        var current = $target;
        var last = $target;

        while(!current.is('body') && !current.is('html')) {
            var elementId = current.attr('id');
            var diagramObject = elementId && $ax.getObjectFromElementId(elementId);
            if(diagramObject && diagramObject.type == 'dynamicPanel' && diagramObject.scrollbars != 'none') {
                //returns the panel diagram div which handles scrolling
                return window.document.getElementById(last.attr('id'));
            }
            last = current;
            current = current.parent();
        }
        // Need to do this because of ie
        if($.browser.msie) return window.document.documentElement;
        else return window.document.body;
    };



});