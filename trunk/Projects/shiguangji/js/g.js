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
	funGetSelected : function(element) {
	    if (!window.getSelection) { 
	        //IE浏览器
	        return document.selection.createRange().text;
	    } else {
	        return element.value.substr(element.selectionStart, element.selectionEnd - element.selectionStart);
	    }
	}, 
	funInsertTopic : function(textObj) {
		var _self = this;
	    var topic = "#" + _self.TOPIC + "#", value = textObj.value, index = value.indexOf(topic);
	    if (index === -1) {
	        //匹配
	        _self.funTextAsTopic(textObj, topic);
	    } 
	    value = textObj.value;
	    index = value.indexOf(topic);
	    if (textObj.createTextRange) {
	        var range = textObj.createTextRange();
	        range.moveEnd("character", -1 * value.length)           
	        range.moveEnd("character", index + 6);
	        range.moveStart("character", index + 1);
	        range.select();    
	    } else {
	        textObj.setSelectionRange(index + 1, index + 6);
	        textObj.focus();
	    }
	}, 
	funTextAsTopic : function(textObj, textFeildValue) {
	    textObj.focus();
	    if (textObj.createTextRange) {
	        var caretPos = document.selection.createRange().duplicate();
	        document.selection.empty();
	        caretPos.text = textFeildValue;
	    } else if (textObj.setSelectionRange) {
	        var rangeStart = textObj.selectionStart;
	        var rangeEnd = textObj.selectionEnd;
	        var tempStr1 = textObj.value.substring(0, rangeStart);
	        var tempStr2 = textObj.value.substring(rangeEnd);
	        textObj.value = tempStr1 + textFeildValue + tempStr2;
	        textObj.blur();
	    }
	},
	insertTopic: function(oTextarea){
		var _self = this;
		var textSelection = _self.funGetSelected(oTextarea);
	    if (!textSelection || textSelection === _self.TOPIC) {
	        //没有文字选中，光标处插入
	        _self.funInsertTopic(oTextarea);    
	    } else {
	        _self.funTextAsTopic(oTextarea, "#" + textSelection + "#");
	    }
	}
};