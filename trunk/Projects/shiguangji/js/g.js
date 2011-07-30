function $TAG(tagName, attr){
	var _doc = document;
	var _dom = _doc.createElement(tagName);
	if( attr ){
		if( attr.id ){
			_dom.setAttribute('id', attr.id);
		}
		if( attr.cls ){
			_dom.className = attr.cls;
		}
	}
	return $(_dom);
}
function $ELEBYID( _id ){
    return document.getElementById(_id);
}
function $EVENT(obj, events, func){
	if(obj.addEventListener){
        obj.addEventListener(events,func,false);
    }else{
        obj.attachEvent("on" + events,func);
    }
}

SGJ = {};
SGJ.BOX = function(conf){	
	var defaults = {
		width: 400,
		appendTo: 'body',
		top: '40%',
		closeOnClick: false,
		load: true,
		loading: true,
		loadingText: '载入中...'
	};
	
	var conf = $.extend(true, {}, defaults, conf);
	var $uiBoxContent = $TAG('div', {cls:'uiBoxContent'});
	var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
	var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:conf.width});
	
	$uiBox.appendTo(conf.appendTo);
	$uiBox.overlay(conf);
	
	if( conf.loading ){
		$uiBoxContent.append($TAG('div', {cls:'uiBoxLoading'}).text(conf.loadingText));
	}
	
	return {
		getBox: function(){
			return $uiBox;
		},
		remove: function(){
			$uiBox.remove();
		}
	};
}

WBP = {
	TOPIC : '自定义话题',
	getSelected : function(element) {
	    if (!window.getSelection) { 
	        //IE浏览器
	        return document.selection.createRange().text;
	    } else {
	        return element.value.substr(element.selectionStart, element.selectionEnd - element.selectionStart);
	    }
	}, 
	setSelectText: function(textObj, start, end){
		end = end || start;
		
	    if (textObj.createTextRange) {
	        var range = textObj.createTextRange();
	        range.moveEnd("character", -1 * textObj.value.length) 
	        range.moveEnd("character", end);
	        range.moveStart("character", start);
	        range.select();
	    } else {
	        textObj.setSelectionRange(start, end);
	    	textObj.focus();
	    }
	},
	getSelectedText : function (textObj) {
        var text = "";
        var getText = function (obj) {
            if (obj.selectionStart != undefined && obj.selectionEnd != undefined) {
                return obj.value.substring(obj.selectionStart, obj.selectionEnd);
            } else {
                return "";
            }
        };
        if (window.getSelection) {
            text = getText(textObj);
        } else {
            text = document.selection.createRange().text;
        }
        return text;
    },
	getCursorPos : function (textObj) {
        var position = 0;
        if (document.selection) {
            textObj.focus();
            var range = document.selection.createRange();
            var caretPos = range.duplicate();
            caretPos.moveToElementText(textObj);
            caretPos.setEndPoint("EndToEnd", range);
            textObj.selectionStart = caretPos.text.length - range.text.length;
            textObj.selectionEnd = textObj.selectionStart + range.text.length;
            position = textObj.selectionStart;
        } else {
            if (textObj.selectionStart || textObj.selectionStart == "0") {
                position = textObj.selectionStart;
            }
        }
        return position;
    },
	cacheCur: function(textObj){
		var _self = this;
		var selectTxt = _self.getSelectedText(textObj);
		var txtLength = (selectTxt == "" || selectTxt == null) ? 0 : selectTxt.length;
		var cursorPosition = _self.getCursorPos(textObj);
		var rangeAttr = cursorPosition + "&" + txtLength;
		textObj.setAttribute("range", rangeAttr);
	},
	getCur: function (textObj) {
		var rangeAttr = textObj.getAttribute("range");
		return rangeAttr ? rangeAttr.split("&"):[0,0];
	},
	insertNewTopic : function(textObj) {
		var _self = this;
	    var topic = "#" + _self.TOPIC + "#", 
	    	value = textObj.value, 
	    	index = value.indexOf(topic);
	    
	    if (index === -1) {
	        //匹配
	        _self.insertText(textObj, topic);
	    } 
	    value = textObj.value;
	    index = value.indexOf(topic);
	    _self.setSelectText(textObj, index+1, index + topic.length - 1);
	},
	insertText : function(textObj, textFeildValue) {
		var _self = this;
		var cursorPosition = 0;
		
	    textObj.focus();
	    if (textObj.createTextRange) {
			var range = document.selection.createRange();
	        var caretPos = range.duplicate();
	        caretPos.text = textFeildValue;
	        
            caretPos.moveToElementText(textObj);
            caretPos.setEndPoint("EndToEnd", range);
            cursorPosition = caretPos.text.length - range.text.length + textFeildValue.length;
	    } else if (textObj.setSelectionRange) {
	        var rangeStart = textObj.selectionStart;
	        var rangeEnd = textObj.selectionEnd;
	        var tempStr1 = textObj.value.substring(0, rangeStart);
	        var tempStr2 = textObj.value.substring(rangeEnd);
	        textObj.value = tempStr1 + textFeildValue + tempStr2;
	        
			cursorPosition = rangeStart + textFeildValue.length;
		}
        _self.setSelectText(textObj, cursorPosition);
	},
	insertTopic: function(oTextarea){
		var _self = this;
		var textSelection = _self.getSelected(oTextarea);
	    if (!textSelection || textSelection === _self.TOPIC) {
	        //没有文字选中，光标处插入
	        _self.insertNewTopic(oTextarea);
	    } else {
	        _self.insertText(oTextarea, "#" + textSelection + "#");
	    }
	},
	getTextNum: function(txt){
		var str = txt.replace(/(^\s*)|(\s*$)/g, "")  ;
        var myLen = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) myLen++;
            else myLen += 2;
        }
        return (Math.ceil(myLen / 2));
	}
};