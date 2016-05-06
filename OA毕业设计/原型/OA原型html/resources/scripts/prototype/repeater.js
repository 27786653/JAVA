
// ******* Repeater MANAGER ******** //
$axure.internal(function($ax) {
    var _repeaterManager = {};
    $ax.repeater = _repeaterManager;

    //This is a mapping of current editItems
    var repeaterToEditItems = {};
    //This is a mapping of current filters
    var repeaterToFilters = {};
    // This is a mapping of current sorts
    var repeaterToSorts = {};
    // This is a mapping of repeater page info
    var repeaterToPageInfo = {};

    //Hopefully this can be simplified, but for now I think 3 are needed.
    //This is the data set that is owned by this repeater. The repeater may or may not reference this data set, and others can reference it.
    var repeaterToLocalDataSet = {};
    //This is the data set referenced by the repeater. It is not a copy of the local data set, but a reference to a local data set (or eventually a global data set could be referenced).
    var repeaterToCurrentDataSet = {};
    //This is a copy of the current data set, that is replaced whenever a set or refresh is done.
    var repeaterToActiveDataSet = {};
    var _loadRepeaters = function() {
        $ax(function(obj) {
            return obj.type == 'repeater';
        }).each(function(obj, repeaterId) {
            repeaterToLocalDataSet[repeaterId] = $ax.deepCopy(obj.data);
            repeaterToEditItems[repeaterId] = [];

            _initPageInfo(obj, repeaterId);

            _setRepeaterDataSet(repeaterId, repeaterId);

        });
    };
    _repeaterManager.load = _loadRepeaters;

    var _initRepeaters = function() {
        $ax(function(obj) {
            return obj.type == 'repeater';
        }).each(function(obj, repeaterId) {
            _refreshRepeater(repeaterId);
        });
    };
    _repeaterManager.init = _initRepeaters;

    var repeatersHaveNewDataSet = [];
    var _setRepeaterDataSet = function(repeaterId, dataSetId) {
        //TODO: No idea about how global data sets will be handled...
        repeaterToCurrentDataSet[repeaterId] = repeaterToLocalDataSet[dataSetId];
        repeaterToFilters[repeaterId] = [];
        repeaterToSorts[repeaterId] = [];

        if(repeatersHaveNewDataSet.indexOf(repeaterId) == -1) repeatersHaveNewDataSet[repeatersHaveNewDataSet.length] = repeaterId;
    };
    _repeaterManager.setDataSet = _setRepeaterDataSet;

    var _refreshRepeater = function(repeaterId, eventInfo) {
        $ax.style.ClearCacheForRepeater(repeaterId);

        if($ax.visibility.limboIds[repeaterId]) {
            removeItems(repeaterId);
            $ax.dynamicPanelManager.fitParentPanel(repeaterId);
            return;
        }

        var path = $ax.getPathFromScriptId(repeaterId);
        path.splice(path.length - 1, 1);

        if(eventInfo) {
            eventInfo = $ax.eventCopy(eventInfo);
            eventInfo.repeaterIdOverride = repeaterId;
        }

        // Clear edit items if there this is a new data set that is being referenced
        var repeaterIndex = repeatersHaveNewDataSet.indexOf(repeaterId);
        if(repeaterIndex != -1) {
            repeaterToEditItems[repeaterId] = [];
            repeatersHaveNewDataSet.splice(repeaterIndex, 1);
        }

        var obj = $ax.getObjectFromScriptId(repeaterId);

        var html = $('#' + repeaterId + '_script').html();
        //        var container = $('<div></div>');
        //        container.html(html);
        //        container.attr('id', '' + repeaterId + '_container');
        //        container.css({ position: 'absolute' });
        //        container.offset({ left: -obj.x, top: -obj.y });

        var div = $('<div></div>');
        div.html(html);


        var top = 0;
        var left = 0;

        //If there is no wrap, then set it to be above the number of rows
        var propMap = obj.repeaterPropMap;
        var viewId = $ax.adaptive.currentViewId || '';
        var wrap = _getAdaptiveProp(propMap, 'wrap', viewId);
        var vertical = _getAdaptiveProp(propMap, 'vertical', viewId);
        var offset = propMap[viewId];
        var xOffset = offset.width + _getAdaptiveProp(propMap, 'horizontalSpacing', viewId);
        var yOffset = offset.height + _getAdaptiveProp(propMap, 'verticalSpacing', viewId);

        var orderedIds = getOrderedIds(repeaterId, eventInfo);

        //clean up old items as late as possible
        removeItems(repeaterId);

        var start = 0;
        var end = orderedIds.length;
        var pageInfo = repeaterToPageInfo[repeaterId];
        if(!pageInfo.noLimit) {
            end = pageInfo.itemsPerPage * pageInfo.currPage;
            start = Math.min(end - pageInfo.itemsPerPage, orderedIds.length);
            end = Math.min(end, orderedIds.length);
        }

        var i = 0;
        for(var pos = start; pos < end; pos++) {
            var itemId = orderedIds[pos];

            var itemElementId = _createElementId(repeaterId, itemId);
            $ax.addItemIdToRepeater(itemId, repeaterId);

            var ids = [itemElementId];
            var processId = function(full, id, suffix) {
                var elementId = _createElementId('u' + id, itemId);
                //If there is a suffix (ex. _img), then don't push the id.
                if(!suffix) ids[ids.length] = elementId;
                return 'id="' + elementId + '"';
            };

            var copy = div.clone();
            copy.attr('id', itemElementId);
            copy.html(div.html().replace(/id="?u([0-9]+(_[_a-z0-9]*)?)"?/g, processId));

            copy.css({
                'position': 'absolute',
                'top': top + 'px',
                'left': left + 'px',
                'width': obj.width + 'px',
                'height': obj.height + 'px'
            });
            $('#' + repeaterId).append(copy);

            var query = $ax(function(diagramObject, elementId) {
                return _getItemIdFromElementId(elementId) == itemId && $ax.getParentRepeaterFromScriptId(_getScriptIdFromElementId(elementId)) == repeaterId;
            });
            if(viewId) $ax.adaptive.applyView(viewId, query);
            else {
                var limbo = {};
                var hidden = {};
                query.each(function(diagramObject, elementId) {
                    // sigh, javascript. we need the === here because undefined means not overriden
                    if(diagramObject.style.visible === false) hidden[elementId] = true;
                    //todo: **mas** check if the limboed widgets are hidden by default by the generator
                    if(diagramObject.style.limbo) limbo[elementId] = true;
                });
                $ax.visibility.addLimboAndHiddenIds(limbo, hidden, query);
            }

            i++;
            if(wrap != -1 && i % wrap == 0) {
                if(vertical) {
                    top = 0;
                    left += xOffset;
                } else {
                    left = 0;
                    top += yOffset;
                }
            } else if(vertical) top += yOffset;
            else left += xOffset;

            for(var index = 0; index < ids.length; index++) {
                var id = ids[index];
                $ax.initializeObjectEvents($ax('#' + id));
            }
            //$ax.event.raiseSyntheticEvent(itemElementId, 'onLoad', true);
            //$ax.loadDynamicPanelsAndMasters(obj.objects, path, itemId);
        }

        // Now load
        for(pos = start; pos < end; pos++) {
            itemId = orderedIds[pos];
            itemElementId = _createElementId(repeaterId, itemId);

            $ax.event.raiseSyntheticEvent(itemElementId, 'onLoad', true);
            $ax.loadDynamicPanelsAndMasters(obj.objects, path, itemId);
        }

        $ax.dynamicPanelManager.fitParentPanel(repeaterId);
    };
    _repeaterManager.refreshRepeater = _refreshRepeater;

    _repeaterManager.refreshAllRepeaters = function() {
        $ax('*').each(function(diagramObject, elementId) {
            if(diagramObject.type != 'repeater') return;

            _initPageInfo(diagramObject, elementId);
            _refreshRepeater(elementId, $ax.getEventInfoFromEvent($ax.getjBrowserEvent()));
        });
    };

    var _initPageInfo = function(obj, elementId) {
        var pageInfo = {};
        var map = obj.repeaterPropMap;

        var currentViewId = $ax.adaptive.currentViewId || '';
        var itemsPerPage = _getAdaptiveProp(map, 'itemsPerPage', currentViewId);
        if(itemsPerPage == -1) pageInfo.noLimit = true;
        else {
            pageInfo.itemsPerPage = itemsPerPage;
            pageInfo.currPage = _getAdaptiveProp(map, 'currPage', currentViewId);
        }
        repeaterToPageInfo[elementId] = pageInfo;
    };

    var _getAdaptiveProp = _repeaterManager.getAdaptiveProp = function(map, prop, viewId) {
        var viewChain = $ax.adaptive.getAdaptiveIdChain(viewId);
        for(var i = viewChain.length - 1; i >= 0; i--) {
            viewId = viewChain[i];
            var viewProps = map[viewId];
            if(viewProps.hasOwnProperty(prop)) return viewProps[prop];
        }

        var base = map[''];
        if(base.hasOwnProperty(prop)) return base[prop];
        return map['default'][prop];
    };

    _repeaterManager.getItemCount = function(repeaterId) {
        var data = repeaterToActiveDataSet[repeaterId].length;
        var info = repeaterToPageInfo[repeaterId];
        if(!info.noLimit) {
            var start = Math.min(data, info.itemsPerPage * info.currPage);
            var end = Math.min(data, start + info.itemsPerPage);
            data = end - start;
        }
        return data;
    };

    _repeaterManager.getDisplayIndex = function(repeaterId, itemIndex) {
        var data = repeaterToActiveDataSet[repeaterId];
        var info = repeaterToPageInfo[repeaterId];
        var start = 0;
        var end = data.length;
        if(!info.noLimit) {
            start = Math.min(end, info.itemsPerPage * info.currPage);
            end = Math.min(end, start + info.itemsPerPage);
        }
        var count = end - start;
        for(var i = 0; i < count; i++) {
            if(data[start + i].index == itemIndex) return i + 1;
        }
        return -1;
    };

    var getActiveDataSet = function(repeaterId) {
        var active = $ax.deepCopy(repeaterToCurrentDataSet[repeaterId]);
        // Set up 1 indexing each item.
        for(var i = 0; i < active.length; i++) active[i].index = i + 1;
        return active;
    };

    var getOrderedIds = function(repeaterId, eventInfo) {
        var data = repeaterToActiveDataSet[repeaterId] = getActiveDataSet(repeaterId);

        // Filter first so less to sort
        applyFilter(repeaterId, data, eventInfo);

        // Sort next
        var sorts = repeaterToSorts[repeaterId] || [];
        if(sorts.length != 0 && data.length > 1) {
            // TODO: Make this generic and factor out if we want to use it elsewhere...
            // Compare is a function that takes 2 arguments, and returns a number. A high number means the second should go first
            // Otherwise the first stays first.
            var mergesort = function(list, start, end, compare) {
                var middle = Math.floor((start + end) / 2);
                if(middle - start > 1) mergesort(list, start, middle, compare);
                if(end - middle > 1) mergesort(list, middle, end, compare);
                var index1 = start;
                var index2 = middle;
                var tempList = [];
                while(index1 < middle && index2 < end) {
                    tempList[tempList.length] = list[compare(list[index1], list[index2]) > 0 ? index2++ : index1++];
                }
                while(index1 < middle) tempList[tempList.length] = list[index1++];
                while(index2 < end) tempList[tempList.length] = list[index2++];

                // transfer from temp list to the real list.
                for(var i = 0; i < tempList.length; i++) list[start + i] = tempList[i];
            };
            // Compare is the tie breaking function to us if necessary.
            var getComparator = function(columnName, ascending, type, compare) {
                // If this needs to be sped up, break up into several smaller functions conditioned off of type
                return function(row1, row2) {
                    // If column undefined, no way to measure this, so call it a tie.
                    if(row1[columnName] === undefined || row2[columnName] === undefined) return 0;

                    var text1 = row1[columnName].text;
                    var text2 = row2[columnName].text;

                    // This means we are case insensitive, so lowercase everything to kill casing
                    if(type == 'Text') {
                        text1 = text1.toLowerCase();
                        text2 = text2.toLowerCase();
                    }

                    //If tied, go to tie breaker
                    if(text1 == text2) {
                        if(compare) return compare(row1.index, row2.index);
                        // Actually a tie.
                        return 0;
                    }
                    if(type == 'Text' || type == 'Text (Case Sensitive)') {
                        if(text1 < text2 ^ ascending) return 1;
                        else return -1;
                    } else if(type == 'Number') {
                        var num1 = Number(text1);
                        var num2 = Number(text2);

                        if(isNaN(num1) && isNaN(num2)) return 0;
                        if(isNaN(num1) || isNaN(num2)) return isNaN(num1) ? 1 : -1;
                        if(num1 < num2 ^ ascending) return 1;
                        else return -1;
                    } else if(type == 'Date - YYYY-MM-DD' || type == 'Date - MM/DD/YYYY') {
                        var func = type == 'Date - YYYY-MM-DD' ? getDate1 : getDate2;
                        var date1 = func(text1);
                        var date2 = func(text2);
                        if(!date1.valid && !date2.valid) return 0;
                        if(!date1.valid || !date2.valid) return date1.valid ? -1 : 1;
                        var diff = date2.year - date1.year;
                        if(diff == 0) diff = date2.month - date1.month;
                        if(diff == 0) diff = date2.day - date1.day;
                        if(diff == 0) return 0;
                        return diff > 0 ^ ascending ? 1 : -1;
                    }
                    console.log('unhandled sort type');
                    return 0;
                };
            };
            var compareFunc = null;
            for(var i = 0; i < sorts.length; i++) compareFunc = getComparator(sorts[i].columnName, sorts[i].ascending, sorts[i].sortType, compareFunc);

            mergesort(data, 0, data.length, compareFunc);
        }

        var ids = [];
        for(i = 0; i < data.length; i++) ids[i] = data[i].index;

        return ids;
    };

    var getDate1 = function(text) {
        var date = { valid: false };
        var sections = text.split('-');
        if(sections.length == 1) sections = text.split('/');
        if(sections.length != 3) return date;
        date.year = Number(sections[0]);
        date.month = Number(sections[1]);
        date.day = Number(sections[2]);
        date.valid = !isNaN(date.year);
        date.valid &= !isNaN(date.month) && date.month > 0 && date.month <= 12;
        date.valid &= !isNaN(date.day) && date.day > 0 && date.day <= daysPerMonth(date.month, date.year);
        return date;
    };

    var getDate2 = function(text) {
        var date = { valid: false };
        var sections = text.split('-');
        if(sections.length == 1) sections = text.split('/');
        if(sections.length != 3) return date;
        date.month = Number(sections[0]);
        date.day = Number(sections[1]);
        date.year = Number(sections[2]);
        date.valid = !isNaN(date.year);
        date.valid &= !isNaN(date.month) && date.month > 0 && date.month <= 12;
        date.valid &= !isNaN(date.day) && date.day > 0 && date.day <= daysPerMonth(date.month, date.year);
        return date;
    };

    var daysPerMonth = function(month, year) {
        if(month == 9 || month == 4 || month == 6 || month == 11) return 30;
        if(month != 2) return 31;

        if(year % 4 != 0) return 28;
        if(year % 100 != 0) return 29;
        return year % 400 == 0 ? 29 : 28;
    };

    var applyFilter = function(repeaterId, data, eventInfo) {
        var dataFiltered = [];
        var filters = repeaterToFilters[repeaterId] || [];
        if(filters.length != 0) {
            var oldSrc = eventInfo.srcElement;
            var oldThis = eventInfo.thiswidget;

            outer:
            for(var i = 1; i <= data.length; i++) {
                for(var j = 0; j < filters.length; j++) {
                    eventInfo.itemIdOverride = i;
                    eventInfo.srcElement = filters[j].thisId;
                    eventInfo.thiswidget = $ax.getWidgetInfo(eventInfo.srcElement);
                    if($ax.expr.evaluateExpr(filters[j].filter, eventInfo) != 'true') continue outer;
                }
                dataFiltered[dataFiltered.length] = data[i - 1];
            }

            for(i = 0; i < dataFiltered.length; i++) data[i] = dataFiltered[i];
            while(data.length > dataFiltered.length) data.pop();

            eventInfo.srcElement = oldSrc;
            eventInfo.thiswidget = oldThis;
        }
    };

    var _addFilter = function(repeaterId, label, filter, thisId) {
        var filterList = repeaterToFilters[repeaterId];
        if(!filterList) repeaterToFilters[repeaterId] = filterList = [];

        var filterObj = { filter: filter, thisId: thisId };
        if(label) filterObj.label = label;
        filterList[filterList.length] = filterObj;
    };
    _repeaterManager.addFilter = _addFilter;

    var _removeFilter = function(repeaterId, label) {
        var filterList = repeaterToFilters[repeaterId];
        // If no list, nothing to remove
        if(!filterList) return;

        // If no label, remove everything
        if(!label) {
            repeaterToFilters[repeaterId] = [];
            return;
        }

        for(var i = filterList.length - 1; i >= 0; i--) {
            var filterObj = filterList[i];
            if(filterObj.label && filterObj.label == label) filterList.splice(i, 1);
        }
    };
    _repeaterManager.removeFilter = _removeFilter;

    var _addSort = function(repeaterId, label, columnName, ascending, toggle, sortType) {
        var sortList = repeaterToSorts[repeaterId];
        if(!sortList) repeaterToSorts[repeaterId] = sortList = [];

        for(var i = 0; i < sortList.length; i++) {
            if(columnName == sortList[i].columnName) {
                var lastSortObj = sortList.splice(i, 1)[0];
                if(toggle) ascending = !lastSortObj.ascending;
                break;
            }
        }

        var sortObj = { columnName: columnName, ascending: ascending, sortType: sortType };

        if(label) sortObj.label = label;
        sortList[sortList.length] = sortObj;
    };
    _repeaterManager.addSort = _addSort;

    var _removeSort = function(repeaterId, label) {
        var sortList = repeaterToSorts[repeaterId];
        // If no list, nothing to remove
        if(!sortList) return;

        // If no label, remove everything
        if(!label) {
            repeaterToSorts[repeaterId] = [];
            return;
        }

        for(var i = sortList.length - 1; i >= 0; i--) {
            var sortObj = sortList[i];
            if(sortObj.label && sortObj.label == label) sortList.splice(i, 1);
        }
    };
    _repeaterManager.removeSort = _removeSort;

    var _setRepeaterToPage = function(repeaterId, type, value, eventInfo) {
        var pageInfo = repeaterToPageInfo[repeaterId];
        // page doesn't matter if there is no limit.
        if(pageInfo.noLimit) return;

        var lastPage = Math.ceil(repeaterToActiveDataSet[repeaterId].length / pageInfo.itemsPerPage);

        if(type == 'Value') {
            var val = Number($ax.expr.evaluateExpr(value, eventInfo));
            // if invalid, default to 1, otherwise, clamp the value
            if(isNaN(val)) val = 1;
            else if(val < 1) val = 1;
            else if(val > lastPage) val = lastPage;

            pageInfo.currPage = val;
        } else if(type == 'Previous') {
            if(pageInfo.currPage > 1) pageInfo.currPage--;
        } else if(type == 'Next') {
            if(pageInfo.currPage < lastPage) pageInfo.currPage++;
        } else if(type == 'Last') {
            pageInfo.currPage = lastPage;
        } else {
            console.log('Unknown type');
        }
    };
    _repeaterManager.setRepeaterToPage = _setRepeaterToPage;

    var _setNoItemLimit = function(repeaterId) {
        var pageInfo = repeaterToPageInfo[repeaterId];
        delete pageInfo.currPage;
        delete pageInfo.itemsPerPage;
        pageInfo.noLimit = true;
    };
    _repeaterManager.setNoItemLimit = _setNoItemLimit;

    var _setItemLimit = function(repeaterId, value, eventInfo) {
        var pageInfo = repeaterToPageInfo[repeaterId];

        if(pageInfo.noLimit) {
            pageInfo.noLimit = false;
            pageInfo.currPage = 1;
        }

        var itemLimit = Number($ax.expr.evaluateExpr(value, eventInfo));
        if(isNaN(itemLimit)) itemLimit = 20;
        else if(itemLimit < 1) itemLimit = 1;
        pageInfo.itemsPerPage = itemLimit;
    };
    _repeaterManager.setItemLimit = _setItemLimit;

    var removeItems = function(repeaterId) {
        var elementIds = $ax.getChildElementIdsForRepeater(repeaterId);
        for(var i = 0; i < elementIds.length; i++) $('#' + elementIds[i]).remove();
        $ax.visibility.clearLimboAndHiddenIds(elementIds);
        $ax.clearItemsForRepeater(repeaterId);
    };

    var _getDataFromDataSet = function(repeaterId, itemId, propName, type) {
        var itemNum = Number(itemId) - 1;
        // Default to obj with text as empty string, as we don't generate the data for empty props
        var data = repeaterToCurrentDataSet[repeaterId][itemNum][propName] || { text: '' };
        //For now text is always the default. May change this to depend on context.
        return type == 'data' ? data : (type && data[type]) || data['text'];
    };
    _repeaterManager.getData = _getDataFromDataSet;

    var _addItemToDataSet = function(repeaterId, row, itemEventInfo) {
        itemEventInfo.data = true;
        var dataSet = repeaterToLocalDataSet[repeaterId];

        for(var propName in row) {
            if(!row.hasOwnProperty(propName)) continue;
            var prop = row[propName];
            if(prop.type == 'literal') {
                var retval = $ax.expr.evaluateExpr(prop.literal, itemEventInfo);
                if(typeof (retval) == 'string') retval = { type: 'text', text: retval };
                row[propName] = retval;
            }
        }

        dataSet[dataSet.length] = row;
        itemEventInfo.data = false;
    };
    _repeaterManager.addItem = _addItemToDataSet;

    var _deleteEditItemsFromDataSet = function(repeaterId) {
        var dataSet = repeaterToCurrentDataSet[repeaterId];
        var items = repeaterToEditItems[repeaterId];
        //Want them decending.
        items.sort(function(a, b) { return b - a; });
        for(var i = 0; i < items.length; i++) {
            var itemId = items[i];
            dataSet.splice(itemId - 1, 1);
        }
        repeaterToEditItems[repeaterId] = [];
    };
    _repeaterManager.deleteEditItems = _deleteEditItemsFromDataSet;

    var _updateEditItemsInDataSet = function(repeaterId, propMap, itemEventInfo) {
        itemEventInfo.data = true;
        var dataSet = repeaterToCurrentDataSet[repeaterId];
        var editItems = repeaterToEditItems[repeaterId];
        for(var prop in propMap) {
            if(!propMap.hasOwnProperty(prop)) continue;
            var data = propMap[prop];
            for(var i = 0; i < editItems.length; i++) {
                if(data.type == 'literal') {
                    data = $ax.expr.evaluateExpr(data.literal, itemEventInfo);
                    if(typeof (data) == 'string') data = { type: 'text', text: data };
                }
                dataSet[editItems[i] - 1][prop] = data;
            }
        }
        itemEventInfo.data = false;
    };
    _repeaterManager.updateEditItems = _updateEditItemsInDataSet;

    var _addEditItemToRepeater = function(repeaterId, itemIds) {
        for(var i = 0; i < itemIds.length; i++) {
            var itemId = itemIds[i];
            var items = repeaterToEditItems[repeaterId];
            if(items.indexOf(itemId) == -1) items[items.length] = itemId;
        }
    };
    _repeaterManager.addEditItems = _addEditItemToRepeater;

    var _removeEditItemFromRepeater = function(repeaterId, itemIds) {
        for(var i = 0; i < itemIds.length; i++) {
            var itemId = itemIds[i];
            var items = repeaterToEditItems[repeaterId];
            var index = items.indexOf(itemId);
            if(index != -1) items.splice(index, 1);
        }
    };
    _repeaterManager.removeEditItems = _removeEditItemFromRepeater;

    var _createElementId = function(scriptId, itemId) {
        if(!itemId) return scriptId;
        var sections = scriptId.split('_');
        var retval = sections[0] + '-' + itemId;
        return sections.length > 1 ? retval + '_' + sections[1] : retval;
    };
    _repeaterManager.createElementId = _createElementId;

    var _getElementId = function(scriptId, childId) {
        var elementId = scriptId;
        if($ax.getParentRepeaterFromScriptId(scriptId)) {
            // Must be in the same item as the child
            var itemId = $ax.repeater.getItemIdFromElementId(childId);
            elementId = $ax.repeater.createElementId(scriptId, itemId);
        }
        return elementId;
    };
    _repeaterManager.getElementId = _getElementId;

    var _getScriptIdFromElementId = function(elementId) {
        if(!elementId) return elementId;
        var sections = elementId.split('-');
        var retval = sections[0];
        if(sections.length <= 1) return retval;
        sections = sections[1].split('_');
        return sections.length > 1 ? retval + '_' + sections[1] : retval;
    };
    _repeaterManager.getScriptIdFromElementId = _getScriptIdFromElementId;

    var _getItemIdFromElementId = function(elementId) {
        var sections = elementId.split('-');
        if(sections.length < 2) return '';
        sections = sections[1].split('_');
        return sections[0];
    };
    _repeaterManager.getItemIdFromElementId = _getItemIdFromElementId;

    // TODO: Just inline this if we keep it this way.
    var _applySuffixToElementId = function(id, suffix) {
        return id + suffix;
        //        return _createElementId(_getScriptIdFromElementId(id) + suffix, _getItemIdFromElementId(id));
    };
    _repeaterManager.applySuffixToElementId = _applySuffixToElementId;

    //    var _getRepeaterSize = function(repeaterId) {
    //        var itemCount = ($ax.getItemIdsForRepeater(repeaterId) || []).length;
    //        if(itemCount == 0) return { width: 0, height: 0 };

    //        var repeater = $obj(repeaterId);
    //        // Width and height per item;
    //        var width = repeater.width;
    //        var height = repeater.height;

    //        var viewId = $ax.adaptive.currentViewId || '';
    //        var widthIncrement = width + _getAdaptiveProp(repeater.repeaterPropMap, 'horizontalSpacing', viewId);
    //        var heightIncrement = height + _getAdaptiveProp(repeater.repeaterPropMap, 'verticalSpacing', viewId);

    //        var wrap = _getAdaptiveProp(repeater.repeaterPropMap, 'wrap', viewId);
    //        var vertical = _getAdaptiveProp(repeater.repeaterPropMap, 'vertical', viewId);

    //        if(wrap == -1 || itemCount <= wrap) {
    //            if(vertical) height += heightIncrement * (itemCount - 1);
    //            else width += widthIncrement * (itemCount - 1);
    //        } else {
    //            var primaryDim = wrap;
    //            var secondaryDim = Math.ceil(itemCount / primaryDim);

    //            if(vertical) {
    //                height += heightIncrement * (primaryDim - 1);
    //                width += widthIncrement * (secondaryDim - 1);
    //            } else {
    //                width += widthIncrement * (primaryDim - 1);
    //                height += heightIncrement * (secondaryDim - 1);
    //            }
    //        }
    //        return { width: width, height: height };
    //    };
    //    _repeaterManager.getRepeaterSize = _getRepeaterSize;

});

// ******* Dynamic Panel Manager ******** //
$axure.internal(function($ax) {
    // TODO: Probably a lot of the dynamic panel functions from pagescript should be moved here at some point...
    var _dynamicPanelManager = $ax.dynamicPanelManager = {};

    var _isIdFitToContent = _dynamicPanelManager.isIdFitToContent = function(id) {
        var obj = $obj(id);
        if(!obj || obj.type != 'dynamicPanel' || !obj.fitToContent) return false;

        var jobj = $jobj(id);
        var styleAttr = jobj.attr('style');
        if(styleAttr && styleAttr.indexOf('width') > -1) return false;

        return true;
    };

    var _fitParentPanel = function(widgetId) {
        // Find parent panel if there is one.
        var parentPanelInfo = getParentPanel(widgetId);
        if(!parentPanelInfo) {
            // Get size for the body and html, and set the their height
            _updateFitPanel();
            return;
        }

        var parentId = parentPanelInfo.parent;
        if(_updateFitPanel(parentId, parentPanelInfo.state)) _fitParentPanel(parentId);
    };
    _dynamicPanelManager.fitParentPanel = _fitParentPanel;


    _dynamicPanelManager.initAllFitPanels = function() {
        var fitToContent = [];
        $ax('*').each(function(obj, elementId) {
            if(obj.type == 'dynamicPanel' && obj.fitToContent) fitToContent[fitToContent.length] = elementId;
        });
        for(var i = fitToContent.length - 1; i >= 0; i--) {
            var panelId = fitToContent[i];
            var stateCount = $obj(panelId).diagrams.length;
            for(var j = 0; j < stateCount; j++) {
                // Traverse through children to find what size it should be.
                var stateId = $ax.repeater.applySuffixToElementId(panelId, '_state' + j);
                var stateQuery = $jobj(stateId);
                var size = getContainerSize(stateId);
                stateQuery.width(size.width);
                stateQuery.height(size.height);
            }
        }

        _updateBodyHeight();
    };

    _dynamicPanelManager.updateAllFitPanels = function() {
        var fitToContent = [];
        $ax('*').each(function(obj, elementId) {
            if(obj.type == 'dynamicPanel' && obj.fitToContent) fitToContent[fitToContent.length] = elementId;
        });
        for(var i = fitToContent.length - 1; i >= 0; i--) {
            var panelId = fitToContent[i];
            var stateCount = $obj(panelId).diagrams.length;
            for(var j = 0; j < stateCount; j++) {
                $ax.dynamicPanelManager.setFitToContentCss(panelId, true);
                _updateFitPanel(panelId, j);
            }
        }

        // Make sure the page itself updates its size
        _updateFitPanel();
    };

    _dynamicPanelManager.setFitToContentCss = function(elementId, fitToContent, oldWidth, oldHeight) {

        if($ax.dynamicPanelManager.isIdFitToContent(elementId) == fitToContent) return;

        var panel = $jobj(elementId);
        var stateCss;
        var scrollbars = $obj(elementId).scrollbars;
        
        if(fitToContent) {
            panel.attr('style', '');
            stateCss = {};
            stateCss.position = 'relative';
            if(scrollbars != 'none') {
                stateCss.overflow = 'visible';
                stateCss['-webkit-overflow-scrolling'] = 'visible';
            }
            if(scrollbars == 'verticalAsNeeded') {
                stateCss['overflow-x'] = 'visible';
                stateCss['-ms-overflow-x'] = 'visible';
            } else if(scrollbars == 'horizontalAsNeeded') {
                stateCss['overflow-y'] = 'visible';
                stateCss['-ms-overflow-y'] = 'visible';
            }
            panel.children().css(stateCss);
        } else {
            var panelCss = {width:oldWidth, height:oldHeight};
            stateCss = {width:oldWidth, height:oldHeight};
            panelCss.overflow = 'hidden';
            stateCss.position = 'absolute';
            if(scrollbars != 'none') {
                stateCss.overflow = 'auto';
                stateCss['-webkit-overflow-scrolling'] = 'touch';
            }
            if(scrollbars == 'verticalAsNeeded') {
                stateCss['overflow-x'] = 'hidden';
                stateCss['-ms-overflow-x'] = 'hidden';
            } else if(scrollbars == 'horizontalAsNeeded') {
                stateCss['overflow-y'] = 'hidden';
                stateCss['-ms-overflow-y'] = 'hidden';
            }
            panel.css(panelCss);
            panel.children().css(stateCss);
        }
    };

    // TODO: [ben] This should be used in a lot more places...
    var _getPanelJobj = _dynamicPanelManager.getPanelJobj = function(id) {
        // Try for container first
        var container = $jobj(id + '_container');
        return container.length ? container : $jobj(id);
    };

    var _updateBodyHeight = function() {
        // Get size for the body and html, and set the their height
        var height = Math.max($(window).height(), getContainerSize().height) + 'px';
        $('body').css('height', height);
        $('html').css('height', height);
    };

    var _updateFitPanel = function(panelId, stateIndex) {
        // If no panelId, then we are trying to update the body.
        if(!panelId) {
            _updateBodyHeight();
            return false;
        }

        // Only fit if fitToContent is true
        if(!$ax.dynamicPanelManager.isIdFitToContent(panelId)) return false;

        // Traverse through children to find what size it should be.
        var stateId = $ax.repeater.applySuffixToElementId(panelId, '_state' + stateIndex);
        var stateQuery = $jobj(stateId);
        var size = getContainerSize(stateId);

        // Skip if size hasn't changed
        var oldWidth = stateQuery.width();
        var oldHeight = stateQuery.height();
        if(oldWidth == size.width && oldHeight == size.height) return false;

        _adjustFixed(panelId, oldWidth, oldHeight, size.width, size.height);

        stateQuery.width(size.width);
        stateQuery.height(size.height);

        $ax.event.raiseSyntheticEvent(panelId, 'onResize');
        $ax.flyoutManager.updateFlyout(panelId);
        return true;
    };
    _dynamicPanelManager.updateFitPanel = _updateFitPanel;

    var getParentPanel = function(widgetId, path) {
        path = path || $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(widgetId));

        var obj = $obj(widgetId);
        if(obj.parentDynamicPanel) {
            path[path.length - 1] = obj.parentDynamicPanel;
            var parentId = $ax.getScriptIdFromPath(path);
            parentId = $ax.repeater.getElementId(parentId, widgetId);
            var parentObj = $obj(parentId);
            var retVal = { parent: parentId };
            for(var i = 0; i < parentObj.diagrams.length; i++) {
                var stateId = $ax.repeater.applySuffixToElementId(parentId, '_state' + i);
                var stateQuery = $jobj(stateId);
                if(stateQuery.find('#' + widgetId).length != 0) {
                    retVal.state = i;
                    break;
                }
            }
            return retVal;
        }

        if(path.length == 1) return undefined;

        path.splice(path.length - 1);
        var parentMaster = $ax.getScriptIdFromPath(path);
        parentMaster = $ax.repeater.getElementId(parentMaster, widgetId);

        return getParentPanel(parentMaster, path);
    };

    // TODO: May be a better location for this. Used currently for rdo and panel state containers
    var getContainerSize = function(containerId) {
        var containerQuery = containerId ? $jobj(containerId) : $('body');
        var children = containerQuery.children();
        // Default size
        var size = { width: 0, height: 0 };
        for(var i = 0; i < children.length; i++) {
            var child = $(children[i]);
            var childId = child.attr('id');
            if(!childId || $ax.visibility.limboIds[childId] || !$ax.visibility.IsIdVisible(childId)) continue;

            var childObj = $obj(childId);
            // On the body there are some children that should be ignored, as they are not objects.
            if(!childObj) continue;

            // Ignore fixed
            if(childObj.type == 'dynamicPanel' && childObj.fixedHorizontal) continue;

            var position = { left: Number(child.css('left').replace('px', '')), top: Number(child.css('top').replace('px', '')) };

            // Default width and height (adjusted for widgets that are special)
            var width = child.width();
            var height = child.height();
            if(childObj.type == 'master') {
                var masterSize = getContainerSize(childId);
                width = masterSize.width;
                height = masterSize.height;
//            } else if(childObj.type == 'repeater') {
//                var repeaterSize = $ax.repeater.getRepeaterSize(childId);
//                width = repeaterSize.width;
//                height = repeaterSize.height;

//                if(width == 0 && height == 0) continue;

//                position.left += childObj.x;
//                position.top += childObj.y;
            } else if(childObj.type == 'dynamicPanel') {
                if($ax.dynamicPanelManager.isIdFitToContent(childId)) {
                    var stateQuery = $jobj($ax.visibility.GetPanelState(childId));
                    width = stateQuery.width();
                    height = stateQuery.height();
                }
            }

            size.width = Math.max(size.width, position.left + width);
            size.height = Math.max(size.height, position.top + height);
        }

        return size;
    };

    var _adjustFixed = _dynamicPanelManager.adjustFixed = function(panelId, oldWidth, oldHeight, width, height) {
        var loc = _getFixedPosition(panelId, oldWidth, oldHeight, width, height);
        if(loc) {
            $ax.action.addAnimation(panelId, function() {
                $ax.move.MoveWidget(panelId, loc[0], loc[1], 'none', 0, false, null, true);
            });
        }
    };

    var _getFixedPosition = _dynamicPanelManager.getFixedPosition = function(panelId, oldWidth, oldHeight, width, height) {
        var panelObj = $obj(panelId);
        var x = 0;
        var y = 0;
        if(panelObj.fixedHorizontal == 'center') {
            x = (oldWidth - width) / 2;
        }
        if(panelObj.fixedVertical == 'middle') {
            y = (oldHeight - height) / 2;
        }
        return x == 0 && y == 0 ? undefined : [x, y];
    };

    _dynamicPanelManager.getFixedInfo = function(panelId) {
        var panelObj = $obj(panelId);
        if(!panelObj || panelObj.type != 'dynamicPanel') return {};
        var jobj = $jobj(panelId);

        var info = {};
        var horizontal = panelObj.fixedHorizontal;
        if(!horizontal) return info;

        info.fixed = true;
        info.horizontal = horizontal;
        info.vertical = panelObj.fixedVertical;

        if(info.horizontal == 'left') info.x = Number(jobj.css('left').replace('px', ''));
        else if(info.horizontal == 'center') info.x = Number(jobj.css('margin-left').replace('px', ''));
        else if(info.horizontal == 'right') info.x = Number(jobj.css('right').replace('px', ''));

        if(info.vertical == 'top') info.y = Number(jobj.css('top').replace('px', ''));
        else if(info.vertical == 'middle') info.y = Number(jobj.css('margin-top').replace('px', ''));
        else if(info.vertical == 'bottom') info.y = Number(jobj.css('bottom').replace('px', ''));

        return info;
    };

    // Show isn't necessary if this is always done before toggling (which is currently true), but I don't want that
    //  change (if it happened) to break this.
    var _compressToggle = function(id, vert, show, easing, duration) {
        var panelJobj = _getPanelJobj(id);
        var threshold = Number(panelJobj.css(vert ? 'top' : 'left').replace('px', ''));
        var delta = panelJobj[vert ? 'height' : 'width']();

        if(!show) {
            // Need to make threshold bottom/right
            threshold += delta;
            // Delta is in the opposite direction
            delta *= -1;
        }

        _compress(id, vert, threshold, delta, easing, duration);
    };
    _dynamicPanelManager.compressToggle = _compressToggle;

    // Used when setting state of dynamic panel
    var _compressDelta = function(id, oldState, newState, vert, easing, duration) {
        var panelQuery = $jobj(id);
        var oldQuery = $jobj(oldState);
        var newQuery = $jobj(newState);

        var thresholdProp = vert ? 'top' : 'left';
        var thresholdOffset = vert ? 'height' : 'width';
        var threshold = Number(panelQuery.css(thresholdProp).replace('px', ''));
        threshold += oldQuery[thresholdOffset]();

        var delta = newQuery[thresholdOffset]() - oldQuery[thresholdOffset]();

        var clampProp = vert ? 'left' : 'top';
        var clampOffset = vert ? 'width' : 'height';
        var clamp = [Number(panelQuery.css(clampProp).replace('px', ''))];
        clamp[1] = clamp[0] + Math.max(oldQuery[clampOffset](), newQuery[clampOffset]());

        _compress(id, vert, threshold, delta, easing, duration, clamp);
    };
    _dynamicPanelManager.compressDelta = _compressDelta;

    var _compress = function(id, vert, threshold, delta, easing, duration, clamp) {
        if(!easing) {
            easing = 'none';
            duration = 0;
        }
        var parent = $ax('#' + id).getParents()[0];
        var obj = $ax.getObjectFromElementId(parent);
        while(obj && obj.type == 'referenceDiagramObject') {
            parent = $ax('#' + parent).getParents()[0];
            obj = $ax.getObjectFromElementId(parent);
        }

        var jobj = _getPanelJobj(id);

        // If below, a horizantal clamp, otherwise a vertical clamp
        var clampProp = vert ? 'left' : 'top';
        var clampOffset = vert ? 'width' : 'height';
        if(!clamp) {
            clamp = [Number(jobj.css(clampProp).replace('px', ''))];
            clamp[1] = clamp[0] + jobj[clampOffset]();
        }

        // If clamps, threshold, or delta is not a number, can't compress.
        if(isNaN(clamp[0]) || isNaN(clamp[1]) || isNaN(threshold) || isNaN(delta)) return;

        // Note: If parent is body, some of these aren't widgets
        var children = $(parent ? '#' + parent : 'body').children();
        for(var i = 0; i < children.length; i++) {
            var child = $(children[i]);
            var childId = child.attr('id');
            // Don't move self, and check id to make sure it is a widget.
            if(childId == id || !childId || childId[0] != 'u') continue;
            var numbers = childId.substring(1).split('-');
            if(numbers.length < 1 || isNaN(Number(numbers[0])) || (numbers.length == 2 && isNaN(Number(numbers[1]))) || numbers.length > 2) continue;

            var markerProp = vert ? 'top' : 'left';
            var marker = Number(child.css(markerProp).replace('px', ''));

            var childClamp = [Number(child.css(clampProp).replace('px', ''))];
            childClamp[1] = childClamp[0] + child[clampOffset]();
            if(isNaN(marker) || isNaN(childClamp[0]) || isNaN(childClamp[1]) ||
               marker < threshold || childClamp[1] <= clamp[0] || childClamp[0] >= clamp[1]) continue;

            marker += delta;

            var props = {};
            props[markerProp] = marker;
            if(easing == 'none') child.css(props);
            else child.animate(props, duration, easing);
        }
    };

    var _parentHandlesStyles = function(id) {
        var parents = $ax('#' + id).getParents(true)[0];
        if(!parents) return false;
        var directParent = true;
        for(var i = 0; i < parents.length; i++) {
            var parentId = parents[i];
            // Because state parent panel id is the active state, must strip off the end of it.
            var itemId = $ax.repeater.getItemIdFromElementId(parentId);
            parentId = parentId.split('_')[0];
            if(itemId) parentId = $ax.repeater.createElementId(parentId, itemId);
            var parentObj = $obj(parentId);
            if(parentObj.type != 'dynamicPanel') continue;
            if(!parentObj.propagate) {
                directParent = false;
                continue;
            }
            return { id: parentId, direct: directParent };
        }
        return false;
    };
    _dynamicPanelManager.parentHandlesStyles = _parentHandlesStyles;

    var _propagateMouseOver = function(id, value) {
        propagate(id, true, value);
    };
    _dynamicPanelManager.propagateMouseOver = _propagateMouseOver;

    var _propagateMouseDown = function(id, value) {
        propagate(id, false, value);
    };
    _dynamicPanelManager.propagateMouseDown = _propagateMouseDown;

    var propagate = function(id, hover, value) {
        var hoverChildren = function(children) {
            if(!children) return;
            for(var i = 0; i < children.length; i++) {
                var elementId = children[i].id;
                var obj = $obj(elementId);
                if(obj.type == 'dynamicPanel' && !obj.propagate) continue;

                if(hover) $ax.style.SetWidgetHover(elementId, value);
                else $ax.style.SetWidgetMouseDown(elementId, value);
                $ax.annotation.updateLinkLocations($ax.style.GetTextIdFromShape(elementId));

                hoverChildren(children[i].children);
            }
        };
        hoverChildren($ax('#' + id).getChildren(true)[0].children);
    };
});
