// ******* Deep Copy ******** //
$axure.internal(function($ax) {
    // TODO: [ben] Ah, infinite loops cause major issues here. Tried saving objects we've already hit, but that didn't seem to work (at least at my first shot).
    var _deepCopy = function(original) {
        if(original instanceof Array) return deepCopyArray(original);
        if(!(original instanceof Function) && (original instanceof Object)) return deepCopyObject(original);
        return original;
    };
    $ax.deepCopy = _deepCopy;

    // Hacky way to copy event info. Copying dragInfo causes major issues due to infinite loops
    $ax.eventCopy = function(eventInfo) {
        var dragInfo = eventInfo.dragInfo;
        if(!dragInfo) return _deepCopy(eventInfo);

        delete eventInfo.dragInfo;
        var copy = _deepCopy(eventInfo);
        copy.dragInfo = dragInfo;
        eventInfo.dragInfo = dragInfo;
        
        return copy;
    };

    var deepCopyArray = function(original) {
        var copy = [];
        for(var i = 0; i < original.length; i++) {
            copy[i] = _deepCopy(original[i]);
        }
        return copy;
    };

    var deepCopyObject = function(original) {
        var copy = {};
        for(var key in original) {
            if(!original.hasOwnProperty(key)) continue;
            copy[key] = _deepCopy(original[key]);
        }
        return copy;
    };
});



// ******* Flow Shape Links ******** //
$axure.internal(function($ax) {

    if(!$ax.document.configuration.linkFlowsToPages && !$ax.document.configuration.linkFlowsToPagesNewWindow) return;

    $(window.document).ready(function() {
        $ax(function(dObj) { return dObj.type == 'flowShape' && dObj.referencePageUrl; }).each(function(dObj, elementId) {

            var elementIdQuery = $('#' + elementId);

            if($ax.document.configuration.linkFlowsToPages) {
                elementIdQuery.css("cursor", "pointer");
                elementIdQuery.click(function() {
                    $ax.navigate({
                        url: dObj.referencePageUrl,
                        target: "current",
                        includeVariables: true
                    });
                });
            }

            if($ax.document.configuration.linkFlowsToPagesNewWindow) {
                $('#' + elementId + "_ref").append("<div id='" + elementId + "PagePopup' class='refpageimage'></div>");
                $('#' + elementId + "PagePopup").click(function() {
                    $ax.navigate({
                        url: dObj.referencePageUrl,
                        target: "new",
                        includeVariables: true
                    });
                });
            }
        });
    });

});
