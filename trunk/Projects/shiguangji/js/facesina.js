//执行时间：0.02162504196167秒
/**
 * @author chibin chibin@staff.sina.com.cn
 */
/*
 * Copyright (c) 2008, Sina Inc. All rights reserved. 
 * @fileoverview Sina类库的根节点和基础方法
 */
 
 
//全局变量定义
//if(!$CONFIG){
	$CONFIG = {};
//}
var scope = $CONFIG;
Function.prototype.bind2 = function(object){
    var __method = this;
    return function(){
        return __method.apply(object, arguments)
    }
};
scope.$VERSION = 't3';
scope.$BASEIMG = 'http://img.t.sinajs.cn/'+ scope.$VERSION +'/';
scope.$BASECSS = 'http://img.t.sinajs.cn/'+ scope.$VERSION +'/';
scope.$BASEJS = 'http://js.t.sinajs.cn/'+ scope.$VERSION +'/';
scope.$BASESTATIC = 'http://js.t.sinajs.cn/'+ scope.$VERSION +'/';
scope._ua = navigator.userAgent.toLowerCase();
scope.$IE = /msie/.test(scope._ua);
scope.$OPERA = /opera/.test(scope._ua);
scope.$MOZ = /gecko/.test(scope._ua);
scope.$IE5 = /msie 5 /.test(scope._ua);
scope.$IE55 = /msie 5.5/.test(scope._ua);
scope.$IE6 = /msie 6/.test(scope._ua);
scope.$IE7 = /msie 7/.test(scope._ua);
scope.$SAFARI = /safari/.test(scope._ua);
scope.$winXP = /windows nt 5.1/.test(scope._ua);
scope.$winVista = /windows nt 6.0/.test(scope._ua);
var $IE = scope.$IE, $MOZ = scope.$MOZ, $IE6 = scope.$IE6;
function $import(url){
}
var Boot = {};
/*Boot.addDOMLoadEvent = function(func){
	if (!window.__load_events) {
		var init = function(){
			if (arguments.callee.done) {
				return
			}
			arguments.callee.done = true;
			if (window.__load_timer) {
				clearInterval(window.__load_timer);
				window.__load_timer = null
			}
			for (var i = 0; i < window.__load_events.length; i++) {
				window.__load_events[i]()
			}
			window.__load_events = null
		};
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", init, false)
		}
		if (/WebKit/i.test(navigator.userAgent)) {
			window.__load_timer = setInterval(function(){
				if (/loaded|complete/.test(document.readyState)) {
					init()
				}
			}, 10)
		}
		if(window.ActiveXObject){				
			window.__load_timer = setInterval(function () {
			  try {
				document.body.doScroll('left');
				init();
			  } catch(ex) {				  	
			  };
			},10);
		}
		window.onload = init;
		window.__load_events = []
	}
	window.__load_events.push(func);
};*/
Boot.getJsVersion = function(){	
	var ver = false;
	if ($CONFIG) {
		ver = $CONFIG.js ? $CONFIG.js : "";
	}
	if (ver) {
		return "?v=" + ver;
	}
	else {
		return "";
	}
};
try {
	Boot.addDOMLoadEvent(main);
}catch(e){}



var $Debug = (function(){
	var contentList = [];
	// 添加一条信息
	function add_to_content(sText, oOpts, sCMD){
		var key;
		var text = sText != null ? sText : '';
		
		var opts = {
			color: null,
			bgcolor: null,
			html: null
		};
		var cmd = sCMD != null ? sCMD : 'log';
		oOpts = oOpts != null ? oOpts : {};
		for (key in opts) {
			if (oOpts[key] != null) {
				opts[key] = oOpts[key];
			}
		}
		contentList.push({
			label: text,
			cmd: cmd,
			opts: opts,
			time: new Date()
		});
	}
	function debug_proto(sText, oOpts){
		add_to_content(sText, oOpts, 'log');
	}
	debug_proto.fatal = function(sText, oOpts){
		add_to_content(sText, oOpts, 'fatal');
	};
	debug_proto.error = function(sText, oOpts){
		add_to_content(sText, oOpts, 'error');
	};
	debug_proto.warning = function(sText, oOpts){
		add_to_content(sText, oOpts, 'warning');
	};
	debug_proto.info = function(sText, oOpts){
		add_to_content(sText, oOpts, 'info');
	};
	debug_proto.log = function(sText, oOpts){
		add_to_content(sText, oOpts, 'log');
	};
	debug_proto.clear = function(){
		contentList = [];
	};
	debug_proto.contentList = contentList;
	return debug_proto;
})();



/**
 * @class Sina{Object}做为整个类结构的根scope
 * @author stan | chaoliang@staff.sina.com.cn
 */
if (typeof Sina == 'undefined') {
	Sina = {};
}

/**
 * 在Sina下建立子对象
 * @author stan | chaoliang@staff.sina.com.cn
 * @example
 		Sina.pkg("Core.Array");
 		alert(typeof Core.Array);	//[Object Object]
 */
Sina.pkg = function(ns) {
    if (!ns || !ns.length){
		return null;
	}
    var levels = ns.split(".");
    var nsobj = Sina;
    for (var i= (levels[0] == "Sina") ? 1 : 0; i< levels.length; ++ i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
	return nsobj;
};

/**
 * 根据元素的id获取对应节点的引用
 * @author stan | chaoliang@staff.sina.com.cn
 * @param {String} id 节点的id或者节点本身
 * @modified 修正fangchao修改造成的无节点的情况下返回值前后不一致的问题
 */
function $E(oID) {
	//return typeof(id) == 'string' ? document.getElementById(id) : id;
	var node = typeof oID == "string"? document.getElementById(oID): oID;
	if (node != null) {
		return node;
	}
	else {
//		$Debug("对象: " + oID + " 不存在");
	}
	return null;
}

/**
 * 根据tagname创建制定类型的节点元素
 * @author stan | chaoliang@staff.sina.com.cn
 * @param {String} tagName 制定的节点类型
 */
function $C(tagName) { 
	return document.createElement(tagName);
}

try{
	document.execCommand("BackgroundImageCache", false, true);
}catch(e){}

/**
 * @author stan | chaoliang@staff.sina.com.cn
 * @desc 应用程序根节点
 */
if (typeof App == 'undefined') {
	var App = {};
}
/*
App.define = function(ns, func) {
    if (!ns || !ns.length){
		return null;	
	}
    var levels = ns.split(".");
    var nsobj = App;
    for (var i= (levels[0] == "App") ? 1 : 0; i< levels.length; ++ i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
	nsobj = func;
	return nsobj;
};

*/
/**
 * @author FlashSoft | fangchao@staff.sina.com.cn
 */
var Jobs = (function(){
	// 由于Jobs应该对于STK没有依赖,所以把Ready放在这里执行
	// FlashSoft 
	var E = function(id) {
        if (typeof id === 'string') {
            return document.getElementById(id);
        }
        else {
            return id;
        }
    };
    var addEvent = function(sNode, sEventType, oFunc) {
        var oElement = E(sNode);
        if (oElement == null) {
            return;
        }
        sEventType = sEventType || 'click';
        if ((typeof oFunc).toLowerCase() != "function") {
            return;
        }
        if (oElement.attachEvent) {
            oElement.attachEvent('on' + sEventType, oFunc);
        }
        else if (oElement.addEventListener) {
            oElement.addEventListener(sEventType, oFunc, false);
        }
        else {
            oElement['on' + sEventType] = oFunc;
        }
    };
	
	var Ready = (function() {
        var funcList = [];
        var inited = false;

        // 执行数组里的函数列表
        var exec_func_list = function() {
            if (inited == true) {return;}
            inited = true;
            for (var i = 0, len = funcList.length; i < len; i++) {
                if ((typeof funcList[i]).toLowerCase() == 'function') {
                    funcList[i].call();
                }
            }
            funcList = [];
        };
        // for IE
        if (document.attachEvent) {
            (function() {
                try {
                    document.documentElement.doScroll("left");
                }
                catch(e) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                exec_func_list();
            })();
        }

        // FireFox and Opera
        else if (document.addEventListener) {
            addEvent(document, 'DOMContentLoaded', exec_func_list);
        }
        // for Other
        else if (/WebKit/i.test(navigator.userAgent)) {
            (function() {
                if (/loaded|complete/.test(document.readyState.toLowerCase())) {
                    exec_func_list();
                    return;
                }
                setTimeout(arguments.callee, 25);
            })();
        }
        addEvent(window, 'load', exec_func_list);

        return function(oFunc) {
            // 如果还没有DOMLoad, 则把方法传入数组
            if (inited == false) {
                funcList.push(oFunc);
            }
            // 如果已经DOMLoad了, 则直接调用
            else {
                if ((typeof oFunc).toLowerCase() == 'function') {
                    oFunc.call();
                }
            }
        };
    })();
	
	
	
	
	function jobCls(){
		var regist_jobs_list = {};
		var run_job_list = [];
		
		/**
		 * job start
		 * @private
		 * @method start_event DOMLoad后执行的start动作
		 * @author FlashSoft | flashsoft@live.com
		 */
		function start_event(){
			var run_index = 0;
			var run_list_len = run_job_list.length;
			var jobName, jobFunc, startTime;
			(function(){
				if (run_list_len > run_index) {
					jobName = run_job_list[run_index];
					jobFunc = regist_jobs_list[jobName];
					startTime = new Date();
					
					if (typeof jobFunc == 'undefined') {
						$Debug.fatal('<b>Job [' + jobName + '] 未定义!</b>', {
							html: true
						});
						return;
					}
					try {
						jobFunc.call();
					} 
					catch (e) {
						$Debug.fatal('<b>Job [' + jobName + '] 执行失败!</b>' +
						'<br/>&nbsp;' +
						e.name +
						'<br/>&nbsp;' +
						(e.message || e.description) +
						(e.fileName ? '<br/>&nbsp;' +
						e.fileName : '') +
						(e.lineNumber ? '<br/>&nbsp;' +
						e.lineNumber : ''), {
							html: true
						});
					}
					finally {
						$Debug.info('<b>Job [' + jobName + '] 执行成功(' + (new Date() - startTime) + '毫秒)</b>', {
							html: true
						});
					}
					
					run_index++;
					setTimeout(arguments.callee, 25);
				}
			})();
		}
		/**
		 * @method jobCls.regist
		 * @param {String} sJobName Job的名字标示
		 * @param {Function} oJobFunc Job的函数引用
		 * @author FlashSoft | flashsoft@live.com
		 */
		this.regist = function(sJobName, oJobFunc){
			if (regist_jobs_list[sJobName] == null) {
				regist_jobs_list[sJobName] = oJobFunc;
			}
			run_job_list.push(sJobName);
		};
		Ready(start_event);
	}
	return new jobCls();
})();






/**
 * @author chibin chibin@staff.sina.com.cn
 */
/**
 * 
 * @author L.Ming | liming1@staff.sina.com.cn
 */
/*
 * Copyright (c) 2008, Sina Inc. All rights reserved. 
 * @fileoverview 注册 Core 命名空间
 * 		将 Core 注册为 Sina.Core 的简写形式
 * @author L.Ming | liming1@staff.sina.com.cn
 * @version 1.0 | 2008-08-25
 */

Sina.pkg("Core");

if (typeof Core == "undefined") {
	Core = Sina.Core;
}

Sina.pkg("Core.Events");
/**
 * 在指定节点上绑定相应的事件
 * @id Core.Events.addEvent  
 * @method addEvent
 * @param {String} elm 需要绑定的节点id
 * @param {Function} func 事件发生时相应的函数
 * @param {String} evType 事件的类型如:click, mouseover
 * @global $addEvent
 * @update 08.02.23
 * @author Stan | chaoliang@staff.sina.com.cn
 *         FlashSoft | fangchao@staff.sina.com.cn
 * @example
 * 		//鼠标点击testEle则alert "clicked"
 * 		addEvent("testEle", function () {
 * 			alert("clicked");
 * 		},'click');
 */
Core.Events.addEvent = function(elm, func, evType, useCapture) {
	var _el = $E(elm);
	if(_el == null){
		$Debug("addEvent 找不到对象：" + elm);return;
	}
	if (typeof useCapture == 'undefined') {
		useCapture = false;
	}
	if (typeof evType == 'undefined') {
		evType = 'click';
	}
	if (_el.addEventListener) {
		_el.addEventListener(evType, func, useCapture);
		return true;
	}
	else if (_el.attachEvent) {
		var r = _el.attachEvent('on' + evType, func);
		return true;
	}
	else {
		_el['on' + evType] = func;
	}
};
/**
 * 在指定节点上移除绑定的事件
 * @id Core.Events.removeEvent  
 * @method removeEvent2
 * @param {HTMLElement} elm 需要解除绑定的节点id
 * @param {Function} func 事件发生时相应的函数
 * @param {String} evType 事件的类型如:click, mouseover
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @global $removeEvent2
 * @update 08.02.23
 * @exception
 * 			function go() {};
 * 			Sina.events.removeEvent2(document.body, go, "click");
 * 			$removeEvent2(document.body, go, "click");
 */
Core.Events.removeEvent = function (oElement, fHandler, sName) {
	var _el = $E(oElement);
	if(_el == null){
		$Debug("removeEvent 找不到对象：" + oElement);return;
	}
	if (typeof fHandler != "function") {
		return;
	}
	if (typeof sName == 'undefined') {
		sName = 'click';
	}
	if (_el.addEventListener) {
		_el.removeEventListener(sName, fHandler, false);
	}
	else if (_el.attachEvent) {
		_el.detachEvent("on" + sName, fHandler);
	}
	fHandler[sName] = null;
};
﻿/**
 * @id Core.Base.detect
 * Copyright (c) 2009, Sina Inc. All rights reserved.
 * 浏览器类型检测
 */

Sina.pkg("Core.Base");

/**
 * @for Core.Base.detect
 * @method Sina.base.detect
 * @author Random | YangHao@staff.sina.com.cn
 * @update 2009-03-12
 */
(function(){
    var Detect = function(){
        var ua = navigator.userAgent.toLowerCase();
        this.$IE = /msie/.test(ua);
        this.$OPERA = /opera/.test(ua);
        this.$MOZ = /gecko/.test(ua);
        this.$IE5 = /msie 5 /.test(ua);
        this.$IE55 = /msie 5.5/.test(ua);
        this.$IE6 = /msie 6/.test(ua);
        this.$IE7 = /msie 7/.test(ua);
        this.$SAFARI = /safari/.test(ua);
        this.$winXP = /windows nt 5.1/.test(ua);
        this.$winVista = /windows nt 6.0/.test(ua);
        this.$FF2 = /Firefox\/2/i.test(ua);
        this.$IOS = /\((iPhone|iPad|iPod)/i.test(ua);
    };
    Core.Base.detect = new Detect();
})();

/**
 * 获取Event对象
 * @id Core.Events.getEvent  
 * @method getEvent
 * @return {Event} event对象
 * @author FlashSoft | fangchao@staff.sina.com.cn
 * @update 08.02.23
 * @global $getEvent
 * @exception
 * 			Core.events.getEvent();
 * 			$getEvent();
 */
Core.Events.getEvent = function () {
	return window.event;
};
if(!Core.Base.detect.$IE) {
	Core.Events.getEvent = function () {
		// 这里是为了处理高级版本的Opera里直接支持event的处理
		// FlashSoft 
		if(window.event)return window.event;
		var o = arguments.callee.caller;
		var e;
		var n = 0;
		while(o != null && n < 40){
			e = o.arguments[0];
			if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
				return e;
			}
			n ++;
			o = o.caller;
		}
		return e;
	};
}

/**
 * 停止事件冒泡
 * @id Core.Events.removeEvent  
 * @param {Event} el event对象
 */
Core.Events.stopEvent = function(el) {
	var ev = el? el: Core.Events.getEvent();
	ev.cancelBubble = true;
	ev.returnValue = false;
};
if(!$IE) {
	Core.Events.stopEvent = function(el) {
		var ev = el? el: Core.Events.getEvent();
		ev.preventDefault();
		ev.stopPropagation();
	};
}
/**
 * 触发指定节点上绑定相应的事件
 * @id Core.Events.fireEvent  
 * @method fireEvent
 * @param {String|HtmlElement} oElement 需要触发事件的对象
 * @param {String} sEvent 需要触发的类型，如：click, mouseover
 * @author L.Ming | liming1@staff.sina.com.cn
 * @version 1.0
 * @since 2008.10.21
 * @example
	// 触发 testEle 的 onclick 事件
	Core.Events.fireEvent("testEle", 'click');
 */
Core.Events.fireEvent = function(oElement, sEvent){
	oElement = $E(oElement) || oElement ;
	if($IE) {  
		oElement.fireEvent('on' + sEvent);  
	}
	else{  
		var evt = document.createEvent('HTMLEvents');  
		evt.initEvent(sEvent,true,true);  
		oElement.dispatchEvent(evt);  
	}  
};
/**
 * 
 * @author L.Ming | liming1@staff.sina.com.cn
 */

Sina.pkg("Core.Dom");
/**
* 获取指定节点的样式
* @id Core.Dom.getStyle
* @method getStyle
* @param {HTMLElement | Document} el 节点对象
* @param {String} property 样式名
* @return {String} 指定样式的值
* @author FlashSoft | fangchao@staff.sina.com.cn
* @update 08.02.23
* @global $getStyle
* @exception
* 			Core.Dom.getStyle(document.body, "left");
* 			$getStyle(document.body, "left");
*/ 
Core.Dom.getStyle = function (el, property) {
	switch (property) {
		// 透明度
		case "opacity":
			var val = 100;
			try {
					val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
			}
			catch(e) {
				try {
					val = el.filters('alpha').opacity;
				}catch(e){}
			}
			return val/100;
		 // 浮动
		 case "float":
			 property = "styleFloat";
		 default:
			 var value = el.currentStyle ? el.currentStyle[property] : null;
			 return ( el.style[property] || value );
	}
};
if(!Core.Base.detect.$IE) {
	Core.Dom.getStyle = function (el, property) {
		// 浮动
		if(property == "float") {
			property = "cssFloat";
		}
		// 获取集合
		try{
			var computed = document.defaultView.getComputedStyle(el, "");
		}
		catch(e) {
			traceError(e);
		}
		return el.style[property] || computed ? computed[property] : null;
	};
}
/**
 * 
 * @author L.Ming | liming1@staff.sina.com.cn
 */

Sina.pkg("Core.System");
/**
 * 获取滚动条的位置
 * @param {Object} oDocument 目标document对象，比如是当前窗口的document，还是某个iframe的窗口的document
 * @return {Array} oDocument的位置信息，数组中的元素依次是 xPosition,yPosition,width,height
 */
Core.System.getScrollPos = function(oDocument) {
	oDocument = oDocument || document;
	var dd = oDocument.documentElement;
	var db = oDocument.body;
	return [
			Math.max(dd.scrollTop, db.scrollTop), 
			Math.max(dd.scrollLeft, db.scrollLeft),
			Math.max(dd.scrollWidth, db.scrollWidth), 
			Math.max(dd.scrollHeight, db.scrollHeight)
			];
};

/**
* 获取节点对象的距文档的XY值
* @id Core.Dom.getXY
* @method getXY
* @param {HTMLElement } el 节点对象
* @return {Array} x,y的数组对象
* @author FlashSoft | fangchao@staff.sina.com.cn
* @update 08.02.23
* @global $getXY
* @exception
* 			Core.Dom.getXY($E("input"));
* 			$getXY($E("input"));
*/
Core.Dom.getXY = function (el) {
	if ((el.parentNode == null || el.offsetParent == null || Core.Dom.getStyle(el, "display") == "none") && el != document.body) {
		return false;
	}
	var parentNode = null;
	var pos = [];
	var box;
	var doc = el.ownerDocument;
	// IE
	box = el.getBoundingClientRect();
	var scrollPos = Core.System.getScrollPos(el.ownerDocument);
	return [box.left + scrollPos[1], box.top + scrollPos[0]];
	// IE end
//	parentNode = el.parentNode;
//	while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
//		if (Core.Dom.getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) { 
//			pos[0] -= parentNode.scrollLeft;
//			pos[1] -= parentNode.scrollTop;
//		}
//		parentNode = parentNode.parentNode; 
//	}
//	return pos;
};
if(!$IE) {
	Core.Dom.getXY = function (el) {
		if ((el.parentNode == null || el.offsetParent == null || Core.Dom.getStyle(el, "display") == "none") && el != document.body) {
			return false;
		}
		var parentNode = null;
		var pos = [];
		var box;
		var doc = el.ownerDocument;
		
		// FF
		pos = [el.offsetLeft, el.offsetTop];
		parentNode = el.offsetParent;
		var hasAbs = Core.Dom.getStyle(el, "position") == "absolute";
		
		if (parentNode != el) {
			while (parentNode) {
					pos[0] += parentNode.offsetLeft;
					pos[1] += parentNode.offsetTop;
					if (scope.$SAFARI && !hasAbs && Core.Dom.getStyle(parentNode,"position") == "absolute" ) {
							hasAbs = true;
					}
					parentNode = parentNode.offsetParent;
			}
		}
		
		if (scope.$SAFARI && hasAbs) {
			pos[0] -= el.ownerDocument.body.offsetLeft;
			pos[1] -= el.ownerDocument.body.offsetTop;
		}
		parentNode = el.parentNode;
		// FF End
		while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
			if (Core.Dom.getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) { 
				pos[0] -= parentNode.scrollLeft;
				pos[1] -= parentNode.scrollTop;
			}
			parentNode = parentNode.parentNode; 
		}
		return pos;
	};
}
(function(ns){
	/**
	 * dom builder 预先建立dom节点，在add后进行节点插入
	 * @param {Object} html   必选参数，html模板，使用 dd作为唯一标识返回对象，mm作为列表标识反回对象数组
	 * @param {Object} parent 必选参数，插入dom节点
	 * @author liusong@staff.sina.com.cn
	 * @example
	 * var dom = App.DomBuilder('<div dd="aa"><ul><li mm="a"></li><li mm="a"></li><li mm="a"></li><li mm="b"></li></ul></div>',document.body).add();
	 * {domList:{aa:div},actList:{a:[li,li,li],b:[li]},box:document.body}
	 */
	ns.DomBuilder = function(html, parent, param){
		param = typeof param == "object" ? param : {};
		var snap = $C('div');
			snap.innerHTML = html;
        var it = {}, domList = {}, actList = {}, nodes = snap.getElementsByTagName("*"), len = nodes.length, cv = param.clear || 1, mk = param.mm || "mm", dk = param.dd || "dd", c, mm, dd;
		for(var i=0; i<len; i++){
			c = nodes[i];
			dd = c.getAttribute(dk);
			mm = c.getAttribute(mk);
			dd && (domList[dd] = c) && (cv && c.removeAttribute(dk));
			mm && ((!actList[mm] && (actList[mm] = [c]))||(actList[mm] = actList[mm].concat([c])))&& (cv && c.removeAttribute(mk));
		}
		it.parent  = parent;
		it.domList = domList;
		it.actList = actList;
		it.add = function(){
			while(snap.firstChild){
				parent.appendChild(snap.firstChild);
			}
			return it;
		};
		return it;
	};
	/**
	 * dom builder 3  预先清除目标节点内容，将新内容插入
	 * @param {Object} html   必选参数，html模板，使用 dd作为唯一标识返回对象，mm作为列表标识反回对象数组
	 * @param {Object} parent 必选参数，插入dom节点
	 * @author liusong@staff.sina.com.cn
	 * @example
	 * var dom = App.builder3('<div dd="aa"><ul><li mm="a"></li><li mm="a"></li><li mm="a"></li><li mm="b"></li></ul></div>',document.body);
	 * {domList:{aa:div},actList:{a:[li,li,li],b:[li]},box:document.body}
	 */
	ns.builder3 = function(html, parent, param){
		parent.innerHTML = "";
		return ns.DomBuilder(html, parent, param).add();
	};
	
})(App);

/**
 * 对于Textarea的处理方法
 * @fileoverview
 *  App.TextAreaUtils.selectionStart 获取指定Textarea的光标位置
 *  App.TextAreaUtils.selectText     选择指定有开始和结束位置的文本
 *  App.TextAreaUtils.insertText     在起始位置插入或替换文本	
 * @author liusong@staff.sina.com.cn
 */

App.TextareaUtils = (function(){
	
	var it = {}, ds=document.selection;
	/**
	 * 获取指定Textarea的光标位置
	 * @param {HTMLElement} oElement 必选参数，Textarea对像
	 */
	it.selectionStart = function( oElement ){
		if(!ds){return oElement.selectionStart}
		var er = ds.createRange(), value, len;
		var er1 = document.body.createTextRange();
			er1.moveToElementText(oElement);
			for(var s=0; er1.compareEndPoints("StartToStart", er)<0; s++){
				er1.moveStart('character', 1);
			}
		return s
	}
	it.selectionBefore = function( oElement ){
		return oElement.value.slice(0,it.selectionStart(oElement))
	}
	/**
	 * 选择指定有开始和结束位置的文本
	 * @param {HTMLElement} oElement 必选参数，Textarea对像
	 * @param {Number}      iStart   必选参数, 起始位置
	 * @param {Number}      iEnd     必选参数，结束位置
	 */
	it.selectText = function( oElement, nStart, nEnd) {
		oElement.focus();
		if (!ds){oElement.setSelectionRange(nStart, nEnd);return}
		var c = oElement.createTextRange();
			c.collapse(1);
			c.moveStart("character", nStart);
			c.moveEnd("character", nEnd - nStart);
			c.select()
	}
	/**
	 * 在起始位置插入或替换文本
	 * @param {HTMLElement} oElement    必选参数，Textarea对像
	 * @param {String}      sInsertText 必选参数，插入的文本
	 * @param {Number}      iStart      必选参数，插入位置
	 * @param {Number}      iLength     非必选参数，替换长度 
	 */
	it.insertText = function( oElement, sInsertText, nStart, nLen){
		oElement.focus();nLen = nLen||0;
		if(!ds){
			var text = oElement.value, start = nStart - nLen, end = start + sInsertText.length;
			oElement.value =text.slice(0,start)+sInsertText+text.slice(nStart,text.length);
			it.selectText(oElement, end, end);return
		}
		var c = ds.createRange();
			c.moveStart("character", -nLen);
			c.text = sInsertText
	}
	
	/**
	 * @param {object} 文本对象
	 */
	it.getCursorPos = function(obj){
		var CaretPos = 0; 
	    if ($IE) {   
	        obj.focus();
	        var range = null;
			range = ds.createRange();
			var stored_range = range.duplicate();
			stored_range.moveToElementText( obj );
			stored_range.setEndPoint('EndToEnd', range );
			obj.selectionStart = stored_range.text.length - range.text.length;
			obj.selectionEnd = obj.selectionStart + range.text.length;
			CaretPos = obj.selectionStart;
	    }else if (obj.selectionStart || obj.selectionStart =='0'){
			CaretPos = obj.selectionStart; 
		}
	    return CaretPos; 
	}
	/**
	 * @param {object} 文本对象
	 */
	it.getSelectedText = function(obj){
		var selectedText = '';
		var getSelection = function (e){
            if (e.selectionStart != undefined && e.selectionEnd != undefined) 
                return e.value.substring(e.selectionStart, e.selectionEnd);
            else 
                return '';
        };
        if (window.getSelection){
			selectedText = getSelection(obj);
		}else {
			selectedText = ds.createRange().text;
		}
		return selectedText;
	}
	/**
	 * @param {object} 文本对象
	 * @param {int} pars.rcs Range cur start
	 * @param {int} pars.rccl  Range cur cover length
	 * 用法
	 * setCursor(obj) cursor在文本最后
	 * setCursor(obj,5)第五个文字的后面
	 * setCursor(obj,5,2)选中第五个之后2个文本
	 */
	it.setCursor = function(obj,pos,coverlen){
		pos = pos == null ? obj.value.length : pos;
		coverlen = coverlen == null ? 0 : coverlen;
		obj.focus();
		if(obj.createTextRange) { //hack ie
	        var range = obj.createTextRange(); 
	        range.move('character', pos);
			range.moveEnd("character", coverlen);
	        range.select(); 
		} else {
	        obj.setSelectionRange(pos, pos+coverlen); 
	    }
	}
	/**
	 * @param {object} 文本对象
	 * @param {Json} 插入文本
	 * @param {Json} pars 扩展json参数
	 * @param {int} pars.rcs Range cur start
	 * @param {int} pars.rccl  Range cur cover length
	 * 
	 */
	it.unCoverInsertText = function(obj,str,pars){
		pars = (pars == null)? {} : pars ;
		pars.rcs = pars.rcs == null ? obj.value.length : pars.rcs*1;
		pars.rccl = pars.rccl == null ? 0 : pars.rccl*1;
		var text = obj.value,
			fstr = text.slice(0,pars.rcs),
			lstr = text.slice(pars.rcs + pars.rccl,text== ''?0:text.length);
		
		obj.value = fstr + str + lstr;
		this.setCursor(obj,pars.rcs+(str==null?0:str.length));
	}
	return it
})();



/**
 * @author liusong@staff.sina.com.cn
 */


/**
 * 简单ajax 主要用于请求数据, 如果请求过慢或过于频繁可以调用abort进行中断
 * @param {Object} url     必选参数，接口地址，如果有参数自行拼接
 * @param {Object} success 非必选参数，成功回调
 * @param {Object} fail    非必选参数，失败回调
 */
App.simpleAjax = function( url, success, error, fail){
	var req, res, error;
	//创建组件
	req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	if(!req){return}
	//请求状态管理
	req.onreadystatechange = function(){try {
		if (req.readyState == 4) {
			res = eval("(" + req.responseText + ")");
			if(res && res.code=="A00006"){
				success && success(res);
				return
			}
			error && error(res)
		}
	}catch(e){ fail && fail(e.message); return false }}
	//发起请求
	try {
		req.open("GET", url, true);
		req.send(null)
	}catch(e){ fail && fail(e.message); return false }
	//返回可控abort对像
	return {
		//中断当前请求
		abort: function(){ req.abort(); return false }
	}
};
/**
 * 基础弹层
 * @author liusong@staff.sina.com.cn
 */

/**
 * 集联继承
 * @author liusong@staff.sina.com.cn
 * @example
 		var a = function(){
 			it = App.unit(), u = it.u;
 			it.close = u(function(){
 				console.log(1);
 			})
 			return it;
 		}
 		var b = function(){
 			var it = a(), e = it.u;
 			it.close = e(function(){
 				console.log(2);
 				this.sup();
 			},"close")
 			return it;
 		}
 		var c = function(){
 			var it = b(), e = it.u;
 			it.close = e(function(){
 				console.log(3);
 				this.sup();
 			},"close")
 			return it;
 		}
 		c().close()  // 3 2 1
 */


App.unit = function(){
	var it = {}, udf;
	it.u = u = function(func, key){
		var context = {"it":it, "sup": it[key]};
		return function(){
			func.apply(context, arguments);
			return it;
		}
	}
	return it;
};

(function(proxy){
	
	var d = document, zIndex = 1000;
	
	function b2(t, b){return App.builder3(t,b,{"dd":"id", "mm":"action"})};
	
	proxy.PopUp = function(){
		var it = App.unit(), u = it.u, wrap, body, mask, cp = "position:absolute;clear:both;", ch = "visibility:hidden;display:none", cs = "width:100%;height:100%", rall = App.removeChildren;
		it.wrap = wrap = $C("div");
		wrap.appendChild(it.body = body = $C("div"));
		wrap.style.cssText = [cp,ch,"z-index:"+zIndex++].join(";");
		/**
		 * 设置弹层蒙板,默认不进行初始化，如果有需要则执行 PopUp.mask()
		 */
		it.mask = u(function(){
			if(!mask){
				wrap.insertBefore(mask = $C("iframe"),body);
				
				mask.frameborder = 0;
				mask.src = "about:blank";
				mask.style.cssText = [cp,cs,"filter:alpha(opacity=0);opacity:0;z-index:-1"].join(";");
			}
		})
		/**
		 * 设置弹层内容
		 * @param {String} html 必选参数，弹层内部html代码
		 */
		it.content = u(function(html){
			rall(body);
			it.dom = b2(html, body)["domList"];
		})
		/**
		 * 设置弹层x,y坐标
		 * @param {Number} x 必选能数
		 * @param {Number} y 必选能数
		 */
		it.position = u(function(x, y){
			wrap.style.left = x + "px";
			wrap.style.top = y + "px";
		})
		/**
		 * 显示隐藏弹层
		 * @param {Boolean} b 必选参数，可选参数为 true, false, 1, 0
		 */
		it.visible = u(function( b ){
			wrap.style.visibility = b? "visible": "hidden";
			wrap.style.display = b? "": "none";
		})
		/**
		 * 设置弹层深度
		 * @param {Number} nIndex 必选参数
		 */
		it.zIndex = u(function(nIndex){
			wrap.style.zIndex = nIndex;
		})
		/**
		 * 移除弹层
		 */
		it.destroy = u(function(){
			wrap.parentNode.removeChild(wrap);
			wrap = body = mask = dom = null;
		})
		d.body.appendChild(wrap);
		return it;
	}
	
})(App);
/**
 * 弹出动画播放层
 * @author liusong@staff.sina.com.cn
 */
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject = function(){
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function(){
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1", ag = [0, 0, 0], ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        }
        else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } 
                catch (Z) {
                }
            }
        }
        return {
            w3: aa,
            pv: ag,
            wk: af,
            ie: X,
            win: ae,
            mac: ac
        }
    }(), k = function(){
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function(){
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) {
                    (function(){
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } 
                        catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) {
                (function(){
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    }();
    function f(){
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } 
        catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }
    function K(X){
        if (J) {
            X()
        }
        else {
            U[U.length] = X
        }
    }
    function s(Y){
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        }
        else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            }
            else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                }
                else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function(){
                            X();
                            Y()
                        }
                    }
                    else {
                        O.onload = Y
                    }
                }
            }
        }
    }
    function h(){
        if (T) {
            V()
        }
        else {
            H()
        }
    }
    function V(){
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function(){
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                }
                else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        }
        else {
            H()
        }
    }
    function H(){
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        }
                        else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            }
                            else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                }
                else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }
    function z(aa){
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            }
            else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }
    function A(){
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }
    function P(aa, ab, X, Z){
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            }
            else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            }
            else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function(){
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    }
                    else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }
    function p(Y){
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function(){
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                }
                else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        }
        else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }
    function g(ab){
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        }
        else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }
    function u(ai, ag, Y){
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        }
                        else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            }
                            else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            }
            else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        }
                        else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }
    function e(Z, X, Y){
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }
    function y(Y){
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function(){
                    if (X.readyState == 4) {
                        b(Y)
                    }
                    else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            else {
                X.parentNode.removeChild(X)
            }
        }
    }
    function b(Z){
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }
    function c(Z){
        var X = null;
        try {
            X = j.getElementById(Z)
        } 
        catch (Y) {
        }
        return X
    }
    function C(X){
        return j.createElement(X)
    }
    function i(Z, X, Y){
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }
    function F(Z){
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }
    function v(ac, Y, ad, ab){
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        }
        else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }
    function w(Z, X){
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        }
        else {
            v("#" + Z, "visibility:" + Y)
        }
    }
    function L(Y){
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function(){
        if (M.ie && M.win) {
            window.attachEvent("onunload", function(){
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z){
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            }
            else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function(X){
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac){
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function(){
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            }
                            else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    }
                    else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        }
                        else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            }
            else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function(){
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function(){
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X){
            if (M.w3) {
                return u(Z, Y, X)
            }
            else {
                return undefined
            }
        },
        showExpressInstall: function(Z, aa, X, Y){
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function(X){
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function(aa, Z, Y, X){
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa){
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function(){
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();

/**
 * @id Core.Dom.setStyle
* <pre>
* 设定指定节点的样式
* </pre>
* @method setStyle
* @param {HTMLElement | Document} el 节点对象
* @param {String} property 样式名
* @param {String} val 样式值
* @author FlashSoft | fangchao@staff.sina.com.cn
* @update 08.02.23
* @global $setStyle
* @exception
* 			Core.Dom.setStyle(document.body, "backgroundColor", "red");
* 			$setStyle(document.body, "opacity", "0.2");
*/
Core.Dom.setStyle = function (el, property, val) {
	switch (property) {
		case "opacity":
			el.style.filter = "alpha(opacity=" + (val * 100) + ")";
			if (!el.currentStyle || !el.currentStyle.hasLayout) {
				el.style.zoom = 1;
			}
			break;
		case "float":
			property = "styleFloat";
		default: 
			el.style[property] = val;
	}
};
if(!Core.Base.detect.$IE) {
	Core.Dom.setStyle = function(el, property, val) {
		if (property == "float") {
			property = "cssFloat";
		}
		el.style[property] = val;
	};
}
/**
 * @id Core.System.winSize
 * 获取浏览器实际内容的大小
 * @author stan | chaoliang@staff.sina.com.cn
 * @param {Object}	_target 需要获得的窗口引用，默认为本窗口
 * @return {Object} 存储页面大小的对象
 * @example
 * 		var win = Core.System.winSize();
 * 		alert(win.width);	//800
 * 		alert(win.height);	//600
 */
Core.System.winSize = function(_target) {
	var w, h;
	if (_target) {
		target = _target.document;
	}
	else {
		target = document;
	}
	if (self.innerHeight) { // all except Explorer
		if (_target) {
			target = _target.self;
		}
		else {
			target = self;
		}
		w = target.innerWidth;
		h = target.innerHeight;
	}
	else if (target.documentElement && target.documentElement.clientHeight) { // Explorer 6 Strict Mode
		w = target.documentElement.clientWidth;
		h = target.documentElement.clientHeight;
	}
	else if (target.body) { // other Explorers
		w = target.body.clientWidth;
		h = target.body.clientHeight;
	}
	return 	{
				width : w,
				height : h
			};
};
/**
 * @id Core.System.pageSize
 * 页面大小
 * @param {Object} _target 目标窗口对象
 * @return {Array} [pageWidth,pageHeight,windowWidth,windowHeight]
 */
Core.System.pageSize = function(_target){
		if (_target) {
			target = _target.document;
		}
		else {
			target = document;
		}
		var _rootEl = (target.compatMode=="CSS1Compat"?target.documentElement:target.body);
		
		var xScroll, yScroll;
		if (window.innerHeight && window.scrollMaxY) {
			xScroll = _rootEl.scrollWidth;
			yScroll = window.innerHeight + window.scrollMaxY;
		}
		else if (_rootEl.scrollHeight > _rootEl.offsetHeight) {
			xScroll = _rootEl.scrollWidth;
			yScroll = _rootEl.scrollHeight;
		}
		else {
			xScroll = _rootEl.offsetWidth;
			yScroll = _rootEl.offsetHeight;
		}
		var win_s = Core.System.winSize(_target);
		//$Debug("win_s : " + win_s.h + win_s.w);
		if(yScroll < win_s.height){
			pageHeight = win_s.height;
		}else { 
			pageHeight = yScroll;
		}
		if(xScroll < win_s.width){
			pageWidth = win_s.width;
		}else {
			pageWidth = xScroll;
		}
		return [pageWidth,pageHeight,win_s.width,win_s.height];
};

/**
 * 创建一个iframe蒙板
 * @param {Object} zIndex  必选参数，蒙板把在的z-index值，默认为 799;
 * @param {Object} fResize 可选参数，在窗口尺寸发生改变时回调，并将窗口尺寸回传给注册函数
 * @author Liusong liusong@staff.sina.com.cn
 * @example 
 *  <div id="divExample" style="position:absolute;background-color:#990000;z-index:800">
 *     信教主，教主让你吃白薯
 *  </div>
 *  function fOnResize(pageSize){
 *      var oDiv = $E("divExample");
 *      oDiv.style.left = (aPos[2] - this.offsetWidth)/2+"px";
 *      oDiv.style.top  = (aPos[3] - this.offsetHeight)/2+"px";
 *  }
 *  var oMask = App.iframeMask(799,fOnResize);
 *      oMask.show();
 */

App.iframeMask = function(zIndex,fResize){
	var IM = {};
	var oParent = IM.oParent = document.getElementsByTagName("body")[0];
	var oMask = IM.oMask = oParent.appendChild($C("div"));
	var oProtective = IM.oProtective = oParent.appendChild($C("iframe"));
		oProtective.frameborder = 0;
	var oMStyle = oMask.style;
	var oPStyle = oProtective.style;
	var oPStyle = oProtective.style;
		oMStyle.top             = oPStyle.top             = "0px";
		oMStyle.left            = oPStyle.left            = "0px";
		oMStyle.overflow        = oPStyle.overflow        = "hidden";
		oMStyle.border          = oPStyle.border          = "0px";
		oMStyle.position        = oPStyle.position        = "absolute";
		oMStyle.display         = oPStyle.display         = "none";
		oMStyle.backgroundColor = oPStyle.backgroundColor = "#000000";
		oMStyle.zIndex = zIndex || 799;
		oPStyle.zIndex = (zIndex - 1)||798;
		Core.Dom.setStyle(oMask,       "opacity", "0.15");
		Core.Dom.setStyle(oProtective, "opacity", "0");
		//重置蒙板尺寸
		IM.oMaskResize = (function(p){
			return function(){
				var pageSize = Core.System.pageSize();
				p.oMask.style.width  = p.oProtective.style.width  = Math.max(document.body.scrollWidth, (document.documentElement)?document.documentElement.scrollWidth:0) + "px";
				p.oMask.style.height = p.oProtective.style.height = pageSize[1] + "px";
				if(fResize){fResize(pageSize)};
			};
		})(IM);
		//隐藏iframe蒙板
		IM.hidden = (function(p){
			return function(){
				p.oMask.style["display"] = p.oProtective.style["display"] = "none";
			};
		})(IM);
		//显示iframe蒙板
		IM.show = (function(p){
			return function(){
				p.oMask.style["display"] = p.oProtective.style["display"] = "block";
			};
		})(IM);
		IM.oMaskResize();
		Core.Events.addEvent(window, IM.oMaskResize, "resize");
	return IM;
};

App.PopUpSwfPlayer = (function(){
	var popUp, panel, view, clock, ce = Core.Events, add = ce.addEvent, unadd = ce.removeEvent;
	return function(url){
		var id = "view_ani", w = window, d = document, dd = d.documentElement||{}, b = d.body;
		//魔法表情播放统计
		if(scope.statistics){
			scope.statistics({"type":"ani","source":encodeURIComponent(url)});
		}
		//如果用户的flash播放器不达标，则进行提示
		if(!swfobject.hasFlashPlayerVersion("9.0.0")){
			App.alert({"code":"您还未安装flash播放器！"});
			return
		}
		//创建包装容器
		if(!panel){
			document.body.appendChild(panel = $C("div"));
			panel.style.position = "absolute";
			panel.style.zIndex = "2012";
		}
		panel.style.display = "";
		//创建动画容器
		if(!view){
			panel.innerHTML = "";
			panel.appendChild(view = $C("div"));
			view.id = id;
			view.innerHTML = ['<div style="padding-left:202px;padding-top:172px;"><center><img src="',[scope.$BASECSS,'style/images/common/loading.gif'].join(""),'"/></center></div>'].join("")
		}
		//重置包装容器位置
		var justify = function(size){
			var top = w.pageYOffset||Math.max(dd.scrollTop, b.scrollTop);
			panel.style.left = (size[2] - 440)/2 + "px";
			panel.style.top  = ((size[3] - 360)/2 + top) + "px";
		}
		//如果没有遮挡容器则进行创建
		if(!popUp){
			popUp = App.iframeMask(2000,justify);
		}
		//如果已有遮挡容器则重置屏幕位置
		else{
			justify(Core.System.pageSize());
		}
		//初始化动画参数，如果不想第三方随意弹广告请严格按此参数进行设置
		var flashParams = {
			id : "view_ani",
            quality: "high",
            allowScriptAccess: "never",
            wmode: "transparent",
            allowFullscreen: true,
			allownetworking:"internal"
        };
		//有没有都可以
        var flashVars = {
            playMovie: "true"
        };
		var clear = function(e){
			//如果用户按esc退出播放
			if(e && e.keyCode!==27 && e.type!=="mouseup"){return}
			//清除所有时钟
			clearInterval(clock);
			//移除动画
			swfobject.removeSWF(id);
			//gc动画容器
			panel.style.display = "none";
			view = null;
			//隐藏遮挡层
			popUp.hidden();
			//事件gc
			unadd(b, clear, "keyup");
			unadd(b, clear, "mouseup");
			if(!e){return}
			Core.Events.stopEvent()
		};
        //向view容器插入动画
		swfobject.embedSWF(url, id, "440", "360", "10.0.0", null, flashVars, flashParams);
		//显示iframe遮挡
		popUp.show();
		//清除历史时钟
		w.clearInterval(clock)
		//注册一个新时钟用于监测动画是否可用
		clock = setInterval(function(){
			var swf = swfobject.getObjectById(id), snap = 0;
			//监测动画加载百分比
			if(swf && swf.PercentLoaded()==100){
				//清除监测可用时钟
				w.clearInterval(clock);
				//注册播放进度时钟
				clock = setInterval(function(){
					//currentframe为当前动画贞
					var c = swf.CurrentFrame(), t;
					//对ie及其它浏览器区分获取总动画贞
					try {t = swf.TotalFrames()}catch(e){t = swf.TotalFrames}
					//如果c等于-1则说明还没准备好
					if( c<0 ){return}
					//如果当前贞小于总贞并且缓存的贞数不大于当前贞则重置缓存贞
					//由于时钟不可能过于频繁的监测所以需要一个缓存值来比对动画是否又循环播放了
					if( c<t && snap<=c ){
						snap = c;
					}
					//如果动画重新播放了或已经播放完成，则终止动画播放并且清除容器以便下一动画播放不会出现问题
					//这里不使用StopPlay()、GoToFrame()、Rewin()对动画进行控制这些指令需要动画配合domain，无法要求所有动画加入该设置
					else{
						clear();
					}
				},80);
			}
		},100);
		
		//监听用户点击esc
		add(b, clear, "keyup");
		//点击任意位置取消显示
		add(popUp.oMask, clear, "mouseup");
		popUp.oMask.title = '点击关闭';
	}
})();

/**
 * @author liusong@staff.sina.com.cn
 */


App.group = function(items, action, setClass){
	var it = {}, len = items.length, selectedStyle, unselectedStyle, add = Core.Events.addEvent;
	it.current = -1;
	it.items = items;
//	it.selected
	selectedStyle   = setClass && setClass["selected"]   || null;
	unselectedStyle = setClass && setClass["unselected"] || null;
	for(var i=0; i<len; i++){
		(function(item, index){
			add(item, function(e){
				if(it.current == index && setClass){return}
				unselectedStyle && (it.current!=-1) && (items[it.current].className = unselectedStyle);
				selectedStyle && (item.className = selectedStyle);
				it.current = index;
				action(item, index, it);
				return false;
			},"mouseup");
		})(items[i], i);
	}
};

/**
 * 移除所有子节点
 * @author liusong@staff.sina.com.cn
 */


App.removeChildren = function(parent){
	var n;
	while(n = parent.firstChild){
		parent.removeChild(n);
	}
};

/**
 * @id Core.String.leftB
 * Copyright (c) 2008, Sina Inc. All rights reserved. 
 * 
 * @author L.Ming | liming1@staff.sina.com.cn
 */

Sina.pkg("Core.String");
/**
 * @id Core.String.byteLength
 * Copyright (c) 2008, Sina Inc. All rights reserved. 
 *
 * 将unicode字符计算为2个
 * @param {String} str 需要进行处理的字符串
 * @return {Number} 返回长度
 * @for Core.String.byteLength
 * @example
	var nStrLength = Core.String.byteLength("中国");	//return 4
 */
 Core.String.byteLength = function(str){
	if(typeof str == "undefined"){
		return 0;
	}
	var aMatch = str.match(/[^\x00-\x80]/g);
	return (str.length + (!aMatch ? 0 : aMatch.length));
};


/**
 * @for Core.String.leftB
 * 返回指定长度的字符[中文算2]
 * @param {String} str 源字符串
 * @param {Number} len 截取长度
 * @return {String} 从str中截取len长度的字符串
 * @author FlashSoft | fangchao@staff.sina.com.cn
 */
Core.String.leftB = function(str, len){
	var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
	str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
	if(Core.String.byteLength(str) > len) str = str.slice(0,str.length -1);
	return str;
};

/**
 * 表情弹层
 * @author liusong@staff.sina.com.cn
 */


(function(){
	var d         = document,
		api       = "/face/aj_face.php",
		ce        = Core.Events,
		cs        = Core.String,
		st        = ce.stopEvent,
		add       = ce.addEvent,
		unadd     = ce.removeEvent,
		fire      = ce.fireEvent,
		ajax      = App.simpleAjax,
		getXY     = Core.Dom.getXY,
		group     = App.group,
		removeAll = App.removeChildren,
		popUp     = App.PopUp,
		req;
		
		function b2(t, b){return App.builder3(t,b,{"dd":"id", "mm":"action"})};
		
		function encodeTitle(value){
			return value.replace(/[^\w\u4e00-\u9fa5\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u2014\uff3f]/g,"");
		}
		
		App.showFaces = (function(){
			var cache = {},
				dom,
				panel,
				inited = false,
				hotinited = false,
				insertFunc,
				setCss = { "selected": "cur", "unselected": " "};
				splitHTML = '<li class="magiclicur" style="visibility:hidden">|</li>',
				panelHTML = '<table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox phiz_layerN"><div class="layerBoxTop"><div class="layerArrow" style="left:6px;"></div><div class="topCon"><ul class="phiz_menu"><li id="face" class="cur"><a href="#" onclick="this.blur();return false;">常用表情</a></li><li id="ani" act="topTab" class="magic"><a href="#" onclick="this.blur();return false;"><strong></strong>魔法表情</a></li></ul><a id="close" href="#" onclick="return false;" title="关闭" class="close"></a><div class="clearit"></div></div></div><div class="magicT"><div class="magicTL"><ul id="tab"></ul></div><div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="上一页"></a><a href="#" onclick="return false;" id="nextBtn" title="下一页" class="magicbtnR02"></a></div><div class="clear"></div></div><div class="layerBoxCon" style="width:450px;"><div id="hotPanel" class="faceItemPicbgT"><ul id="hot"></ul><div class="clearit"></div></div><div id="normPanel" class="faceItemPicbg"><ul id="norm"></ul><div class="clearit"></div></div><div id="pagePanel" class="magicB"><div id="magicNotes" class="magic_tit" style="display:none">点击<em class="play_btn2"></em>预览魔法动画</div><div class="pages" id="pageing"></div></div></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table>';
			return function(target,editor,offsetX,offsetY,width,flush,fInsertFunc){
				if(target.tagName == "A"){target.href = "####";}
				insertFunc = fInsertFunc || function(){return false;};
				if(!inited){
					//初始化层
					panel = popUp().zIndex(1500).content(panelHTML);
					var dom        = panel.dom,
						close      = dom.close, 
						hot        = dom.hot,
						hotPanel   = dom.hotPanel,
						magicNotes = dom.magicNotes,
						norm       = dom.norm,
						normPanel  = dom.normPanel,
						pageing    = dom.pageing,
						prevBtn    = dom.prevBtn,
						nextBtn    = dom.nextBtn,
						tab        = dom.tab
						face       = dom.face,
						ani        = dom.ani,
						cType      = 1,
						tabIndex   = 0;
					function insertIcon(data, parent){
						removeAll(parent);
						var len = data.length, iconList = [], c, acts, icons, plays, className = '', viewButton = '', nv;
						for(var i=0; i<len; i++){
							c = data[i];
							nv = encodeTitle(c.title);
							cType == 1 && (className = 'class="face_box"');
							cType == 1 && (viewButton = ('<a action="play" title="表情预览" class="play_btn" href="#" onclick="return false;"></a><span class="face_box_tex">' + (cs.byteLength(nv)>8?cs.leftB(nv,6)+"...":nv) + '</span>'));
							iconList.push(['<li action="icon" title="', nv, '"><a href="#" onclick="return false;" ', className, '>', '<img src="', c.icon, '"/>', '</a>', viewButton, '</li>'].join(""));
						}
						acts = b2(iconList.join(""), parent)["actList"];
						icons = acts["icon"];
						plays = acts["play"];
						if(plays){
							//初始化播放按钮
							group(plays,
							//点击播放按钮打开动画播放层
							function(item, index, c){
								item.onclick = function(){return false}
								st();
								App.PopUpSwfPlayer(data[index].src);
								return false;
							});
						}
						//初始化图标
						group(icons,
						//点击图标执行插入图标动作
						function(item, index, c){
							item.onclick = function(){return false};
							setTimeout(function(){tArea.focus()},0);
							setTimeout(function(){
								var range = tArea.getAttribute('range');
								var value = data[index].value + " ";
								if(insertFunc(value)){
									
								}else if(document.selection){
									var sel = document.selection.createRange();
									document.selection.empty();	
									sel.text = value;
								}else if(tArea.setSelectionRange){
									var start = tArea.selectionStart;
									var end = tArea.selectionEnd;
									var str1 = tArea.value.substring(0, start);
									var str2 = tArea.value.substring(end);
									var v = str1 + value,len = v.length;
									tArea.value =  v + str2 ;
									tArea.setSelectionRange(len,len);
								}else{
									tArea.value += value;
								}
								if(reflush){reflush()}
								panel.visible(false);
							},200);
							return false;
						});
					};
						
					//初始化页
					function initPage(data){
						removeAll(pageing);
						var len = data.length, pageList = [], pages;
						if(!len){return}
						for(var i=0; i<len; i++){
							pageList.push('<a action="pageBtn" href="#" onclick="return false;">' + (i+1) + '</a>');
						}
						pages = b2(pageList.join(""),pageing)["actList"]["pageBtn"];
						group(pages,function(item, index){
							item.onclick = function(){return false};
							hotPanel.style.display = (!cType && !tabIndex && !index)?"":"none";
							setTimeout(function(){insertIcon(data[index], norm)},50);
							item.blur();
						},setCss);
						pageing.style.display = pages.length<2? "none": "";
						fire(pages[0],"mouseup");
					}
					//初始化分类
					function initTab(json){
						//循环类别
						removeAll(tab);
						var data = [{"type":'默认',"icon":json.data.norm}].concat(json.data.more);
						var len = data.length, current, tabList = [], tabs;
						for(var i=0; i<len; i++){
							current = data[i];
							if(!current || !current.type){continue}
							tabList.push('<li style="visibility:hidden"><a action="tabs" onclick="return false;" href="#">' + current.type + '</a></li>')
						}
						if(!tabList.length){return}
						tabs = b2(tabList.join(splitHTML),tab)["actList"]["tabs"];
						group(tabs, function(item, index){
							item.onclick = function(){return false};
							tabIndex = index;
							initPage(data[index].icon);
							item.blur();
						},{ "selected": "magicTcur", "unselected": " "});
						fire(tabs[0],"mouseup");
						var pi = 1, lil = tab.getElementsByTagName("li"), ml = lil.length, pageList = [], step = 0, cacheList = [], pl;
						setTimeout(function(){
							for(var mi=0; mi<ml; mi++){
								lil[mi].style.visibility = "visible";
								lil[mi].style.display = "";
								var width = lil[mi].innerHTML=="|"? 8: lil[mi].offsetWidth;
								if(step + width > 400){
									step = 0;
									pageList.push(cacheList);
									cacheList = [];
								}
								lil[mi].style.display = "none";
								cacheList.push(lil[mi]);
								step += width;
							}
							cacheList.length && pageList.push(cacheList);
							pl = pageList.length - 1;
							function setPN(){
								prevBtn.className = pi==0?  "magicbtnL01": "magicbtnL02";
								nextBtn.className = pi==pl? "magicbtnR01": "magicbtnR02";
							}
							function toggle(list, b){
								var len = list.length, end = Math.max(len - 1,0);
								for(var i=0; i<len; i++){
									list[i].style.visibility = b?"visible":"hidden";
									list[i].style.display = !b?"none": ((i==0||i==end)&&list[i].innerHTML=="|")?"none":"";
								}
							}
							function dep(key, n){
								var snap = Math[key](pi + n, n>0? pl: 0);
								if(pi == snap){setPN();return}
								pageList[pi] && toggle(pageList[pi],false);
								pageList[snap] && toggle(pageList[snap],true);
								pi = snap; 
								setPN();
							}
							prevBtn.onclick = function(){
								dep("max",-1);
								prevBtn.blur();
								return false;
							};
							nextBtn.onclick = function(){
								dep("min",1);
								nextBtn.blur();
								return false;
							};
							dep("max",-1);
						},100);
						
					}
					//常用表情/魔法表情页签点击动作
					function onTabChange(item, index, data){
						st();
						item.onclick = function(){return false};
						//初始化显示
						removeAll(norm);
						removeAll(tab);
						removeAll(pageing);
						//初始化tab样式
						face.className           = index? ""           : "cur";
						ani.className            = index? "magic cur"  : "magic";
						normPanel.className      = index? "magic_list" : "faceItemPicbg";
						hotPanel.style.display   = index? "none"       : "";
						magicNotes.style.display = index? ""           : "none";
						pageing.style.display    = "none";
						prevBtn.className = "magicbtnL01";
						nextBtn.className = "magicbtnR01";
						prevBtn.onclick = function(){return false;}
						nextBtn.onclick = function(){return false;}
						cType = index;
						//如果已经请求过该舌签数据，则直接使用缓存数据
						req && req.abort();
						if(cache[index]){initTab(cache[index]); return false};
						//如果该舌签没有缓存数据，则选将内容区初始化为loading状态
						norm.innerHTML = '<center><img style="margin-top:10px;margin-bottom:10px" src="' + scope.$BASEIMG + 'style/images/common/loading.gif"/></center>';
						//请求舌签数据
						var type = index?'ani': 'face';		
						var url = '/sina/faces?type='+type;
						req = ajax(
							url,
							function(json){
								var data;
								if (json.code == "A00006" && (data = json.data)) {
									initTab(json)
									if(!hotinited && data.hot){
										hotinited = true;
										insertIcon(data.hot, hot)
									}
									cache[index] = json;
								}
							}
						);
						item.blur();
						return false;
					}
					//初始化 常用表情/魔法表情页签切换
					group([face, ani], onTabChange);
					inited = true;
					//清除弹层的冒泡
					add(close,function(){close.onclick = function(){return false};panel.visible(false);st()},"mouseup");
					add(panel.wrap, function(){st()},"mouseup");
					//如果在非层地区点击则隐藏弹层
					add(d.body, function(){panel.visible(false);},"mouseup");
					var s = Core.System.winSize();
					add(window, function(event){
						var s1 = Core.System.winSize();
						if(s.width!=s1.width || s.height!=s1.height){
							panel.visible(false);
							s = s1;
						}
					},"resize");
				}
				//初始化发布器
				tArea = editor;
				reflush = flush;
				var point = getXY(target);
				panel.position(point[0] + 19 +(offsetX||0),point[1]+target.offsetHeight+(offsetY||5));
				fire(face,"mouseup");
				//显示表情弹出层
				setTimeout(function(){panel.visible(true)},0);
				return false;
			}
		})();
		
})();
/**
<table class="mBlogLayer">
	<tbody>
		<tr>
			<td class="top_l"></td>
			<td class="top_c"></td>
			<td class="top_r"></td>
		</tr>
		<tr>
			<td class="mid_l"></td>
			<td class="mid_c">
				<div class="layerBox phiz_layerN">
					<div class="layerBoxTop">
						<div class="layerArrow"></div>
						<div class="topCon">
							<ul class="phiz_menu">
								<li id="face" class="cur"><a href="#" onclick="this.blur();return false;">#{CL0901}</a></li>
								<li id="ani" act="topTab" class="magic"><a href="#" onclick="this.blur();return false;"><strong></strong>#{CL0902}</a></li>
							</ul>
							<a id="close" href="#" onclick="return false;" title="#{CL0701}" class="close"></a>
							<div class="clearit"></div>
						</div>
					</div>
					<div class="magicT">
						<div class="magicTL">
							<ul id="tab"></ul>
						</div>
						<div class="magicTR"><a href="#" onclick="return false;" id="prevBtn" class="magicbtnL02" title="#{CX0076}"></a><a href="#" onclick="return false;" id="nextBtn" title="#{CX0077}" class="magicbtnR02"></a></div>
						<div class="clear"></div>
					</div>
					<div class="layerBoxCon" style="width:426px;">
						<div id="hotPanel" class="faceItemPicbgT">
							<ul id="hot"></ul>
							<div class="clearit"></div>
						</div>
						<div id="normPanel" class="faceItemPicbg">
							<ul id="norm"></ul>
							<div class="clearit"></div>
						</div>
						<div id="pagePanel" class="magicB">
							<div id="magicNotes" class="magic_tit" style="display:none"><em class="play_btn"></em>#{CL0904}</div>
							<div class="pages" id="pageing"></div>
						</div>
					</div>
				</div>
			</td>
			<td class="mid_r"></td>
		</tr>
		<tr>
			<td class="bottom_l"></td>
			<td class="bottom_c"></td>
			<td class="bottom_r"></td>
		</tr>
	</tbody>
</table>
**/












