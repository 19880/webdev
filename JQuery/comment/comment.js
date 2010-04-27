/**
 *日期 : 2010-04-09
 *作者 : Naiguang Zheng
 *Email : znaiguang@163.com
 *版本 : v1.0
 */
 
;(function($){
	$.fn.extend({
		"comments" : function(options) {
			var self = this;
			
			var settings = {
				url : "",								//获取评注的URL
				editUrl : "",							//提交评注的URL
				tagid : "c",							//评注标注提示符ID
				highlight : "#highlight-floater",		//高亮显示DOM ID
				commentDOM : "p",						//添加评注的DOM对象
				commentBox : ".comment-indicator",		//评注区块
				commentText : "#fb-comment",			//评注区块
				modalWindow : "#facebox",				//弹出框DOM ID
				modalTab : ".tabs ul",					//弹出框上的TAB
				modalTabPanel : "#fb-text .tabPanel",	//弹出框上的TAB对应区域
				modalInner : "#fb-content-inner",		//弹出框上的文本区域
				resizeBtn : ".jqResize",				//改变弹出框大小按钮
				dragBtn : ".jqDrag",					//拖动弹出框按钮
				closeBtn : ".jqmClose",					//关闭弹出框按钮
				submitBtn : "#comment-submit"			//提交评注按钮
			};
			
			if(options) {
				$.extend(settings, options);
			}
			
			$window			=	$(window)
			$commentDOM		=	self.find(settings.commentDOM);
			$commentBox		=	$(settings.commentBox);
			$modalWindow	=	$(settings.modalWindow);
			$modalTab		=	$(settings.modalWindow + " " + settings.modalTab);
			$modalInner		=	$(settings.modalInner);
			$closeBtn		=	$(settings.closeBtn);
			
			//初始评注
			$commentDOM.each(function(index) {
				$.initComment( $(this), settings, index );
			})
			
			//加载评注
			$.loadComment( settings );
			
			// 绑定评注点击事件
			$commentBox.bind("click", { settings : settings }, $.clickBox);
		}
	});
	
	/*
	 * 初始评注标识和区块
	 */
	$.initComment = function( $element, settings, index) {
		domHeight = $element.height();
		
		var div = document.createElement("div");
		div.className		=	"comment-indicator";
		div.innerHTML		=	"<span></span>";
		div.id				=	settings.tagid + index;
		div.style.height	=	domHeight + "px";
		
		$element.append(div);
	}
	
	/*
	 * 加载评注
	 */
	$.loadComment = function( settings ) {
		$.get(
			settings.url,
			function(data, textStatus) {
				if(data != null) {
					$.each(data, function(){
						var $dom = $("#" + this.dom);				//JSON - "dom"
						$dom.addClass("has-comments");
						$dom.children("span").html(this.amount);	//JSON - "amount" - 此块评注数量
					});
				}	
			}
		);
	}
	
	/*
	 * 点击评注区块
	 */
	$.clickBox = function(event) {
		var settings = event.data.settings;
		var self = $(this);
		
		
	} 
	
})(jQuery);