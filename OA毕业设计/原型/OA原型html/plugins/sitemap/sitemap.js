// use this to isolate the scope
(function() {

    var SHOW_HIDE_ANIMATION_DURATION = 0;

    $(window.document).ready(function() {
        $axure.player.createPluginHost({
            id: 'sitemapHost',
            context: 'interface',
            title: '站点地图'
        });

        generateSitemap();

        $('.sitemapPlusMinusLink').toggle(collapse_click, expand_click);
        $('.sitemapPageLink').click(node_click);

        $('#sitemapLinksAndOptionsContainer').hide();
        $('#searchDiv').hide();
        $('#linksButton').click(links_click);
        $('#adaptiveButton').click(adaptive_click);
        $('#footnotesButton').click(footnotes_click).addClass('sitemapToolbarButtonSelected');
        $('#highlightInteractiveButton').click(highlight_interactive);
        $('#variablesButton').click(showvars_click);
        $('#variablesClearLink').click(clearvars_click);
        $('#searchButton').click(search_click);
        $('#searchBox').keyup(search_input_keyup);
        $('.sitemapLinkField').click(function() { this.select(); });

        //        $('#sitemapHost').parent().resize(function () {
        //            $('#sitemapHost').height($(this).height());
        //        });

        // bind to the page load
        $axure.page.bind('load.sitemap', function() {
            var pageLoc = $axure.page.location.split("#")[0];
            var decodedPageLoc = decodeURI(pageLoc);
            var nodeUrl = decodedPageLoc.substr(decodedPageLoc.lastIndexOf('/') ? decodedPageLoc.lastIndexOf('/') + 1 : 0);

            if(typeof PREVIEW_INFO != 'undefined') {
                var currPageName = nodeUrl.substring(0, nodeUrl.lastIndexOf('.html'));
                var currentHash = window.location.hash;
                var pageIndex = currentHash.indexOf('#p=');
                if(pageIndex == -1) pageIndex = currentHash.indexOf('&p=');
                if(pageIndex != -1) {
                    var newHash = currentHash.substring(0, pageIndex);

                    newHash = newHash == '' ? '#p=' + currPageName : newHash + '&p=' + currPageName;

                    var ampIndex = currentHash.indexOf('&', pageIndex + 1);
                    if(ampIndex != -1) {
                        newHash = newHash + currentHash.substring(ampIndex);
                    }
                    window.location.hash = newHash;
                } else if(currentHash.indexOf('#') != -1) {
                    window.location.hash = currentHash + '&p=' + currPageName;
                } else {
                    window.location.hash = '#p=' + currPageName;
                }
            }

            $('.sitemapPageLink').parent().parent().removeClass('sitemapHighlight');
            $('.sitemapPageLink[nodeUrl="' + nodeUrl + '"]').parent().parent().addClass('sitemapHighlight');


            $('#sitemapLinksPageName').html($('.sitemapHighlight > .sitemapPageLinkContainer > .sitemapPageLink > .sitemapPageName').html());

            var playerLoc = $(location).attr('href').split("#")[0].split("?")[0];
            var hString = '#p=' + nodeUrl.substr(0, nodeUrl.lastIndexOf('.'));
            $('#sitemapLinkWithPlayer').val(playerLoc + hString);
            $('#sitemapLinkWithoutPlayer').val(pageLoc);

            $('#sitemapClosePlayer').unbind('click');
            $('#sitemapClosePlayer').click(function() { window.location.href = pageLoc; });

            //Update variable div with latest global variable values after page has loaded
            $axure.messageCenter.postMessage('getGlobalVariables', '');

            //If the footnotes button isn't selected, hide them on this loaded page
            if($axure.document.configuration.showAnnotations == true &&
                !$('#footnotesButton').is('.sitemapToolbarButtonSelected')) {
                $axure.messageCenter.postMessage('annotationToggle', false);
            }

            //If the highlight interactive button is enabled, trigger highlights on current page
            if($('#highlightInteractiveButton').is('.sitemapToolbarButtonSelected')) {
                $axure.messageCenter.postMessage('highlightInteractive', true);
            }

            if($('.checkedAdaptive').length > 0) {
                $('.checkedAdaptive').parents('.adaptiveViewOption').click();
            }

            $('#mainFrame').focus();

            return false;
        });

        //Fill out adaptive view container with prototype's defined adaptive views, as well as the default, and Auto
        $('#adaptiveViewsContainer').append('<div class="adaptiveViewOption" val="auto"><div class="adaptiveCheckboxDiv checkedAdaptive"></div>Auto</div>');
        if(typeof $axure.document.defaultAdaptiveView.name != 'undefined') {
            //If the name is a blank string, make the view name the width if non-zero, else 'any'
            var defaultViewName = $axure.document.defaultAdaptiveView.name;
            if(defaultViewName == '') {
                defaultViewName = $axure.document.defaultAdaptiveView.size.width != 0 ? $axure.document.defaultAdaptiveView.size.width : 'Base';
            }

            $('#adaptiveViewsContainer').append('<div class="adaptiveViewOption" val="default"><div class="adaptiveCheckboxDiv"></div>' + defaultViewName + '</div>');
        }

        var enabledViewIds = $axure.document.configuration.enabledViewIds;
        for(var viewIndex = 0; viewIndex < $axure.document.adaptiveViews.length; viewIndex++) {
            var currView = $axure.document.adaptiveViews[viewIndex];
            if(enabledViewIds.indexOf(currView.id) < 0) continue;
            
            var widthString = currView.size.width == 0 ? 'any' : currView.size.width;
            var heightString = currView.size.height == 0 ? 'any' : currView.size.height;
            var conditionString = '';
            if(currView.condition == '>' || currView.condition == '>=') {
                conditionString = ' and above';
            } else if(currView.condition == '<' || currView.condition == '<=') {
                conditionString = ' and below';
            }
            $('#adaptiveViewsContainer').append('<div class="adaptiveViewOption" val="' + currView.id + '"><div class="adaptiveCheckboxDiv"></div>' + currView.name + ' (' + widthString + ' x ' + heightString + conditionString + ')</div>');
        }

        $('.adaptiveViewOption').click(adaptiveViewOption_click);

        $(document).mouseup(function() {
            $('.sitemapPopupContainer').hide();
            $('#variablesButton').removeClass('sitemapToolbarButtonSelected');
            $('#adaptiveButton').removeClass('sitemapToolbarButtonSelected');
            $('#linksButton').removeClass('sitemapToolbarButtonSelected');
        });

        $('#variablesContainer,#sitemapLinksContainer').mouseup(function(event) {
            event.stopPropagation();
        });
        $('#variablesButton').mouseup(function(event) {
            hideAllContainersExcept(2);
            event.stopPropagation();
        });
        $('#adaptiveButton').mouseup(function(event) {
            hideAllContainersExcept(1);
            event.stopPropagation();
        });
        $('#linksButton').mouseup(function(event) {
            hideAllContainersExcept(3);
            event.stopPropagation();
        });

        $('#searchBox').focusin(function() {
            if($(this).is('.searchBoxHint')) {
                $(this).val('');
                $(this).removeClass('searchBoxHint');
            }
        }).focusout(function() {
            if($(this).val() == '') {
                $(this).addClass('searchBoxHint');
                $(this).val('搜索');
            }
        });

        var $varContainer = $('#variablesContainer');
        $(window).resize(function () {
            if($varContainer.is(":visible")) {
                var newHeight = $(this).height() - 120;
                if (newHeight < 100) newHeight = 100;
                $varContainer.css('max-height', newHeight);
            }
        });
    });

    function hideAllContainersExcept(exceptContainer) {
        //1 - adaptive container, 2 - vars container, 3 - links container
        if(exceptContainer != 1) {
            $('#adaptiveViewsContainer').hide();
            $('#adaptiveButton').removeClass('sitemapToolbarButtonSelected');
        }
        if(exceptContainer != 2) {
            $('#variablesContainer').hide();
            $('#variablesButton').removeClass('sitemapToolbarButtonSelected');
        }
        if(exceptContainer != 3) {
            $('#sitemapLinksContainer').hide();
            $('#linksButton').removeClass('sitemapToolbarButtonSelected');
        }
    }

    function collapse_click(event) {
        $(this)
            .children('.sitemapMinus').removeClass('sitemapMinus').addClass('sitemapPlus').end()
            .closest('li').children('ul').hide(SHOW_HIDE_ANIMATION_DURATION);

        $(this).next('.sitemapFolderOpenIcon').removeClass('sitemapFolderOpenIcon').addClass('sitemapFolderIcon');
    }

    function expand_click(event) {
        $(this)
            .children('.sitemapPlus').removeClass('sitemapPlus').addClass('sitemapMinus').end()
            .closest('li').children('ul').show(SHOW_HIDE_ANIMATION_DURATION);

        $(this).next('.sitemapFolderIcon').removeClass('sitemapFolderIcon').addClass('sitemapFolderOpenIcon');
    }

    function node_click(event) {
        $axure.page.navigate(this.getAttribute('nodeUrl'), true);
    }

    function links_click(event) {
        $('#sitemapLinksContainer').toggle();
        if($('#sitemapLinksContainer').is(":visible")) {

            $('#linksButton').addClass('sitemapToolbarButtonSelected');

            var linksButtonBottom = $('#linksButton').offset().top + $('#linksButton').height();
            var linksButtonRight = $('#sitemapTreeContainer').width() - ($('#linksButton').offset().left + $('#linksButton').width()) - 2;
            $('#sitemapLinksContainer').css('top', linksButtonBottom + 'px');
            $('#sitemapLinksContainer').css('right', linksButtonRight + 'px');
        } else {
            $('#linksButton').removeClass('sitemapToolbarButtonSelected');
        }
    }

    $axure.messageCenter.addMessageListener(function(message, data) {
        if(message == 'globalVariableValues') {
            //If variables container isn't visible, then ignore
            if(!$('#variablesContainer').is(":visible")) {
                return;
            }

            $('#variablesDiv').empty();
            for(var key in data) {
                var value = data[key] == '' ? '(blank)' : data[key];
                $('#variablesDiv').append('<div class="variableDiv"><span class="variableName">' + key + '</span><br/>' + value + '</div>');
            }
        }
    });

    function showvars_click(event) {
        $('#variablesContainer').toggle();
        if(!$('#variablesContainer').is(":visible")) {
            $('#variablesButton').removeClass('sitemapToolbarButtonSelected');
        } else {
            $(window).resize();
            $('#variablesButton').addClass('sitemapToolbarButtonSelected');

            var variablesButtonBottom = $('#variablesButton').offset().top + $('#variablesButton').height();
            $('#variablesContainer').css('top', variablesButtonBottom + 'px');
            $('#variablesContainer').css('left', '30px');
            $('#variablesContainer').css('right', '30px');

            $axure.messageCenter.postMessage('getGlobalVariables', '');
        }
    }

    function clearvars_click(event) {
        $axure.messageCenter.postMessage('resetGlobalVariables', '');
    }

    function footnotes_click(event) {
        if($('#footnotesButton').is('.sitemapToolbarButtonSelected')) {
            $('#footnotesButton').removeClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('annotationToggle', false);
        } else {
            $('#footnotesButton').addClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('annotationToggle', true);
        }
    }

    function highlight_interactive(event) {
        if($('#highlightInteractiveButton').is('.sitemapToolbarButtonSelected')) {
            $('#highlightInteractiveButton').removeClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('highlightInteractive', false);
        } else {
            $('#highlightInteractiveButton').addClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('highlightInteractive', true);
        }
    }

    function adaptive_click(event) {
        $('#adaptiveViewsContainer').toggle();
        if(!$('#adaptiveViewsContainer').is(":visible")) {
            $('#adaptiveButton').removeClass('sitemapToolbarButtonSelected');
        } else {
            $('#adaptiveButton').addClass('sitemapToolbarButtonSelected');

            var adaptiveButtonBottom = $('#adaptiveButton').offset().top + $('#adaptiveButton').height();
            $('#adaptiveViewsContainer').css('top', adaptiveButtonBottom + 'px');
            $('#adaptiveViewsContainer').css('left', $('#adaptiveButton').offset().left);
        }
    }

    function adaptiveViewOption_click(event) {
        var currVal = $(this).attr('val');

        $('.checkedAdaptive').removeClass('checkedAdaptive');
        $(this).find('.adaptiveCheckboxDiv').addClass('checkedAdaptive');

        if(currVal == 'auto') {
            $axure.messageCenter.postMessage('setAdaptiveAuto', '');
        } else {
            $axure.messageCenter.postMessage('switchAdaptiveView', currVal);
        }
    }

    function search_click(event) {
        $('#searchDiv').toggle();
        if(!$('#searchDiv').is(":visible")) {
            $('#searchButton').removeClass('sitemapToolbarButtonSelected');
            $('#searchBox').val('');
            $('#searchBox').keyup();
        } else {
            $('#searchButton').addClass('sitemapToolbarButtonSelected');
            $('#searchBox').focus();
        }
    }

    function search_input_keyup(event) {
        var searchVal = $(this).val().toLowerCase();
        //If empty search field, show all nodes, else grey+hide all nodes and
        //ungrey+unhide all matching nodes, as well as unhide their parent nodes
        if(searchVal == '') {
            $('.sitemapPageName').removeClass('sitemapGreyedName');
            $('.sitemapNode').show();
        } else {
            $('.sitemapNode').hide();

            $('.sitemapPageName').addClass('sitemapGreyedName').each(function() {
                var nodeName = $(this).text().toLowerCase();
                if(nodeName.indexOf(searchVal) != -1) {
                    $(this).removeClass('sitemapGreyedName').parents('.sitemapNode:first').show().parents('.sitemapExpandableNode').show();
                }
            });
        }
    }

    function generateSitemap() {
        var treeUl = "<div id='sitemapTreeContainer'>";

        treeUl += "<div id='sitemapToolbar'>";

        treeUl += "<a id='linksButton' title='获取链接地址' class='sitemapToolbarButton' style='float:right;'></a>";

        treeUl += "<div style='float:left;'>";

        if($axure.document.adaptiveViews.length > 0) {
            treeUl += "<a id='adaptiveButton' title='选择视图' class='sitemapToolbarButton'></a>";
        }

        if($axure.document.configuration.showAnnotations == true) {
            treeUl += "<a id='footnotesButton' title='切换注释' class='sitemapToolbarButton'></a>";
        }

        treeUl += "<a id='highlightInteractiveButton' title='高亮交互事例' class='sitemapToolbarButton'></a>";
        treeUl += "<a id='variablesButton' title='查看变量' class='sitemapToolbarButton'></a>";
        treeUl += "<a id='searchButton' title='搜索页面' class='sitemapToolbarButton'></a>";
        treeUl += "</div>";

        treeUl += "<div id='sitemapLinksContainer' class='sitemapPopupContainer'><span id='sitemapLinksPageName'>Page Name</span>";
        treeUl += "<div class='sitemapLinkContainer'><span class='sitemapLinkLabel'>带站点地图</span><input id='sitemapLinkWithPlayer' type='text' class='sitemapLinkField'/></div>";
        treeUl += "<div class='sitemapLinkContainer'><span class='sitemapLinkLabel'>不带站点地图 - </span><a id='sitemapClosePlayer'>打开链接</a><input id='sitemapLinkWithoutPlayer' type='text' class='sitemapLinkField'/></div></div>";

        treeUl += "<div id='variablesContainer' class='sitemapPopupContainer'><a id='variablesClearLink'>重设变量</a><br/><br/><div id='variablesDiv'></div></div>";
        treeUl += "<div id='adaptiveViewsContainer' class='sitemapPopupContainer'></div>";

        treeUl += "</div>";

        treeUl += '<div id="searchDiv" style="margin-top:5px; margin-left: 5px;"><input id="searchBox" style="width: 95%;" type="text"/></div>';

        treeUl += "<ul class='sitemapTree' style='clear:both;'>";
        var rootNodes = $axure.document.sitemap.rootNodes;
        for(var i = 0; i < rootNodes.length; i++) {
            treeUl += generateNode(rootNodes[i], 0);
        }
        treeUl += "</ul></div>";

        $('#sitemapHost').html(treeUl);
    }

    function generateNode(node, level) {
        var hasChildren = (node.children && node.children.length > 0);
        if(hasChildren) {
            var returnVal = "<li class='sitemapNode sitemapExpandableNode'><div><div class='sitemapPageLinkContainer' style='margin-left:" + (15 + level * 17) + "px'><a class='sitemapPlusMinusLink'><span class='sitemapMinus'></span></a>";
        } else {
            var returnVal = "<li class='sitemapNode sitemapLeafNode'><div><div class='sitemapPageLinkContainer' style='margin-left:" + (27 + level * 17) + "px'>";
        }

        var isFolder = node.type == "Folder";
        if(!isFolder) returnVal += "<a class='sitemapPageLink' nodeUrl='" + node.url + "'>";
        returnVal += "<span class='sitemapPageIcon";
        if(node.type == "Flow") { returnVal += " sitemapFlowIcon"; }
        if(isFolder) {
            if(hasChildren) returnVal += " sitemapFolderOpenIcon";
            else returnVal += " sitemapFolderIcon";
        }

        returnVal += "'></span><span class='sitemapPageName'>";
        returnVal += $('<div/>').text(node.pageName).html();
        returnVal += "</span>";
        if(!isFolder) returnVal += "</a>";
        returnVal += "</div></div>";

        if(hasChildren) {
            returnVal += "<ul>";
            for(var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                returnVal += generateNode(child, level + 1);
            }
            returnVal += "</ul>";
        }
        returnVal += "</li>";
        return returnVal;
    }

})();
