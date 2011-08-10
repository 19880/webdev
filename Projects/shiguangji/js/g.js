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

var BOXMASK = {
	color: '#FFFFFF',
	loadSpeed: 200,
	opacity: 0.5,
	zIndex: 849
};

var SGJ = {};
SGJ.BOX = function(conf){	
	var defaults = {
		width: 400,
		appendTo: 'body',
		top: '30%',
		closeOnClick: false,
		load: true,
		loading: true,
		loadingText: '载入中...',
		title: '',
		body: '',
		oneInstance: false,
		onClose: function(){
			$uiBox.remove();
		}
	};
	
	function setStatLoaded(){
		if( conf.loading ){
			$uiBoxContent.empty().append($uiBoxClose, $uiBoxTitle, $uiBoxBody);
			conf.loading = false;
		}
	}
	
	var conf = $.extend(true, {}, defaults, conf);
	var $uiBoxContent = $TAG('div', {cls:'uiBoxContent'});
	var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
	var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:conf.width});
	var $uiBoxClose = $TAG('div', {cls:'uiClose'}).click(function(){$uiBox.overlay().close();});
	var $uiBoxTitle = $TAG('div', {cls:'uiBoxTitle'});
	var $uiBoxBody = $TAG('div');
	
	$uiBox.appendTo(conf.appendTo);
	$uiBox.overlay(conf);
	
	if( conf.loading ){
		$uiBoxContent.append($TAG('div', {cls:'uiBoxLoading'}).text(conf.loadingText));
	} else {
		$uiBoxContent.append($uiBoxClose, $uiBoxTitle, $uiBoxBody);
		$uiBoxTitle.append(conf.title);
		$uiBoxBody.append(conf.body);
	}
	
	return {
		setTitle: function( _title ){
			setStatLoaded();
			$uiBoxTitle.empty().append(_title);
		},
		setBody: function( _body ){
			setStatLoaded();
			$uiBoxBody.empty().append(_body);
		},
		bgiframe: function(){
			$uiBox.bgiframe();
		},
		getBox: function(){
			return $uiBox;
		},
		remove: function(){
			$uiBox.remove();
		},
		close: function(){
			$uiBox.overlay().close();
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
	},
	// 验证发送时间是否有效
	validatePostTime: function( _date, _hour, _minute ){
		
		var dateArray = _date.split('-');
		var dates = dateArray.join('/');
		var time = [_hour, _minute, '00'].join(':');
		
		var postTime = new Date(dates + ' ' + time).getTime();
		var nowTime = new Date().getTime();
		
		if( postTime < nowTime ){
			var alertbox = new SGJ.BOX({
				loading: false,
				title: '过去时间？',
				body: '<div class="fcr fsl fwb pam hCent">定时的时间已经失效，请检查！</div>',
				mask: BOXMASK
			});
			setTimeout(function(){alertbox.close()},1000);
			return false;
		} else {
			return true;
		}
	},
	alertError: function( obj, msg ){
		if( !obj ){
			obj = new SGJ.BOX({
				mask: BOXMASK
			});
		} 
		
		msg = msg || '出现异常';
		
		obj.setTitle('出错啦！！');
		obj.setBody(
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat errorIco mrs'}),
				$TAG('div', {cls:'fsl fcr tbcell'}).append('错误信息：' + msg, '<br>请联系 @时光机官方')
			)
		);
		setTimeout(function(){obj.close()}, 2000);
	},
	noticeInput: function( obj, orbit, times, delay ){
		orbit = orbit || ["#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
		times = times || 2;
		delay = delay || 50;
		
		var i = 0;
		var length = orbit.length;
		var total = times * length;
		var animate = setInterval(function(){
			obj.style.backgroundColor = orbit[i%length];
			i++;
			if( i == total ){
				clearInterval(animate);
			}
		}, delay);
	},
	// 统计字数
	wordNum: function(){
		var _self = this;
		var count = Math.floor( WBP.getTextNum(_self.value) );	
		var $wordNumBg = $('.wordNumBg');
		var $pipsLim = $wordNumBg.find('.pipsLim');
		
		if(count>140){
			$wordNumBg.addClass('wordNumOver');
			$pipsLim.text(count-140);
			$(_self).data('pubtextc',1);
		}else{
			$wordNumBg.removeClass('wordNumOver');
			$pipsLim.text(140-count);
			$(_self).data('pubtextc',0);
		}
	}
};