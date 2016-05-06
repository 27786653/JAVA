$axure.internal(function($ax) {
    var _move = {};
    $ax.move = _move;

    var widgetMoveInfo = {};

    $ax.move.GetWidgetMoveInfo = function() {
        return $.extend({}, widgetMoveInfo);
    };

    // This converts from current div coordinates (master, dp, or repeater) to diagram coordinates (page)
    // If reverse is true, instead convert from digram to master.
    // terminate, if given, is a list of parents that it should terminate at (master, dp, and/or repeater).
    // For example if terminate is ['dynamicPanel', 'repeater'], then if the parent is a master, it keeps going up, otherwise it terminates.

    $ax.move.DivToDiagramCoordinates = function(elementId, x, y, reverse, terminate) {
        var scriptId = $ax.repeater.getScriptIdFromElementId(elementId);
        var itemId = $ax.repeater.getItemIdFromElementId(elementId);
        var path = $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(scriptId));

        if(terminate instanceof Array) {
            var array = terminate;
            terminate = function(id, type) {
                return array.indexOf(type) != -1;
            };
        }

        return _divToDiagramCoordinatesHelper(path, { x: x, y: y }, scriptId, itemId, reverse, terminate);
    };

    // TODO: [BF] There has to be a cleaner way to do this...

    var _divToDiagramCoordinatesHelper = function(path, coords, scriptId, itemId, reverse, terminate) {
        var masterPath = path.splice(0, path.length - 1);
        var elementId = scriptId; // If this needs to be modified, it will be done when processing parent repeater.

        // Keep track of who your direct parent is
        var parent = '';

        // Find out if in repeater
        var repeaterId = itemId && $ax.getParentRepeaterFromScriptId(scriptId);
        var repeaterPath = $ax.deepCopy(masterPath);
        if(repeaterId) {
            elementId = $ax.repeater.createElementId(scriptId, itemId);
            parent = 'repeater';

            var masterId = repeaterPath.length == 0 ? '' : $ax.getScriptIdFromPath(repeaterPath);
            while(repeaterPath.length > 0 && $ax.getParentRepeaterFromScriptId(masterId)) repeaterPath.pop();
        }

        // Find out if in dynamic panel. If parentDynamicPanel is not undefined then either direct parent, or in repeater.
        var panelId = $obj(elementId).parentDynamicPanel;
        var panelPath = $ax.deepCopy(masterPath);
        while(!panelId && panelPath.length > 0) {
            var rdo = $ax.getObjectFromScriptId($ax.getScriptIdFromPath(panelPath));
            panelId = rdo.parentDynamicPanel;
            panelPath.pop();
        }

        if(panelId) {
            panelPath.push(panelId);
            panelId = $ax.getScriptIdFromPath(panelPath);
        }
        if(panelId && (!repeaterId || $ax.getParentRepeaterFromScriptId(panelId))) parent = 'dynamicPanel';

        var sign = reverse ? -1 : 1;

        // Terminate if neccessary
        if(!parent || (terminate && terminate(parent == 'repeater' ? repeaterId : panelId, parent) != -1)) {
            // If there are terminate conditons, just leave, otherwise, try and go up to the body
            if(terminate) return coords;

            // Only if page center aligned do we need to do this with the body
            if($ax.adaptive.getPageStyle().pageAlignment != 'center') return coords;

            var body = $('body');
            var left = Number(body.css('left').replace('px', ''));
            var pageLeft = (body.parent().width() - body.width()) / 2;

            //Flooring here, otherwise certain page widths would immediately close Flyouts when entering from the left because of rounding
            //from a updateMouseEvent. I can still get Flyouts to not show occasionally, but very randomly and not sure how to reproduce.
            coords.x += sign * Math.floor(left + pageLeft);
            return coords;
        }

        if(parent == 'dynamicPanel') {
            scriptId = panelId;
            path = panelPath;
        }
        if(parent == 'repeater') {
            scriptId = repeaterId;
            path = repeaterPath;
            // Below will only handle position within item. Here account for items position within repeater.
            var item = $jobj($ax.repeater.createElementId(scriptId, itemId));
            coords.x += sign * Number(item.css('left').replace('px', ''));
            coords.y += sign * Number(item.css('top').replace('px', ''));

            itemId = '';
        }

        var obj = $jobj(itemId ? $ax.repeater.createElementId(scriptId, itemId) : scriptId);
        coords.x += sign * Number(obj.css('left').replace('px', ''));
        coords.y += sign * Number(obj.css('top').replace('px', ''));

        return _divToDiagramCoordinatesHelper(path, coords, scriptId, itemId, reverse, terminate);
    };

    $ax.move.MoveWidget = function(id, x, y, easing, duration, to, animationCompleteCallback, shouldFire) {
        $ax.drag.LogMovedWidgetForDrag(id);

        var widget = $('#' + id);
        var jobj = $jobj(id);

        var horzProp = 'left';
        var vertProp = 'top';
        var horzX = to ? x - Number(jobj.css('left').replace('px', '')) : x;
        var vertY = to ? y - Number(jobj.css('top').replace('px', '')) : y;

        var fixedInfo = $ax.dynamicPanelManager.getFixedInfo(id);

        if(fixedInfo.horizontal == 'right') {
            horzProp = 'right';
            horzX = to ? $(window).width() - x - Number(jobj.css('right').replace('px', '')) - widget.width() : -x;
        } else if(fixedInfo.horizontal == 'center') {
            horzProp = 'margin-left';
            if(to) horzX = x - $(window).width() / 2;
        }

        if(fixedInfo.vertical == 'bottom') {
            vertProp = 'bottom';
            vertY = to ? $(window).height() - y - Number(jobj.css('bottom').replace('px', '')) - widget.height() : -y;
        } else if(fixedInfo.vertical == 'middle') {
            vertProp = 'margin-top';
            if(to) vertY = y - $(window).height() / 2;
        }
        var cssStyles = {};
        cssStyles[horzProp] = '+=' + horzX;
        cssStyles[vertProp] = '+=' + vertY;

        if(easing == 'none') {
            $('#' + id).animate(cssStyles, 0);
            if(shouldFire) $ax.action.fireAnimationFromQueue(id);
        } else {
            $('#' + id).animate(cssStyles, duration, easing, function() {
                if(animationCompleteCallback) animationCompleteCallback();
                if(shouldFire) $ax.action.fireAnimationFromQueue(id);
            });
        }

        var moveInfo = new Object();
        moveInfo.x = horzX;
        moveInfo.y = vertY;
        moveInfo.options = {};
        moveInfo.options.easing = easing;
        moveInfo.options.duration = duration;
        widgetMoveInfo[id] = moveInfo;

        $ax.event.raiseSyntheticEvent(id, "onMove");
    };
});