$(function(){
	
	/**
	 * 创建选项BOX
	 */	
	function postOptionTipbox(_type, _width, _content){
		var $this = $(this);
		var $doc = $(document);
		var $parent = $this.parent();
		
		// 是否已显示
		if( $parent.children('.uiBox').length ){
			return false;
		}
		
		$parent.parents('.postOption').find('.uiBox').remove();
		
		var $uiBoxContent = $TAG('div', {cls:'uiBoxContent'});
		var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
		var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:_width});

		// 创建Box
		$uiBoxContent.append.apply($uiBoxContent, _content);
		$parent.append($uiBox);
		
		$uiBox.bgiframe();
		
		$doc.bind('click.ontit', function(e){
			if( !$(e.target).parents(_type).length ){
				$uiBox.remove();
				$doc.unbind('.ontit');
			}
		})
		
		return $uiBox;
	}
	
	/**
	 * 表情
	 */
	var WBFace = function(){
		var _self = this;
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		App.showFaces(this,$editor[0],-29,5);
	};
	
	/**
	 * 图片上传
	 */
	var WBImageUpload = function(){
		var $form = $(this).parent().parent();
		var target = $form.attr('target');
		
		$iframe = $('<iframe class="hidden" name="' + target + '" src="about:blank"></iframe>');
		$iframe.appendTo('body');
		$form.submit();

		$EVENT( $iframe[0], 'load', function(){
			var doc = $iframe[0].contentDocument ? $iframe[0].contentDocument: $iframe[0].contentWindow.document;
			var output = eval("(" + doc.body.innerHTML + ")");
			console.log(output);
			$iframe.remove();
		});
	};
	
	/**
	 * 视频
	 */
	var WBVideo = function(){
		var _self = this;
		
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		
		// 内容
		var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
		var $uiClose = $TAG('a', {cls:'uiClose rfloat mas'});
		var $input = $TAG('input',{cls:'pas fsl w250'}).attr('name', 'long_name');
		var $button = $TAG('button', {cls:'uiBtng mls'}).attr('type','submit').html('<span>确定</span>');
		var $form = $TAG('form').append($input, $button);
		var $content = $TAG('div',{cls:'pam fsm'}).append(
			'<div class="mbs">输入视频网站播放页链接地址</div>',
			$form,
			'<div class="mts fcg">目前支持新浪播客、优酷网、土豆网、酷6网、56网等网站</div>'
		);

		var $uiBox = postOptionTipbox.call(_self, '.po_video', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$form.submit(function(){
			//console.log( $(this).serialize() );
			$uiBox.remove();
			if( $.browser.msie ){
				var cursor = WBP.getCur($editor[0]);
				//console.log(cursor[0]);
				//console.log(cursor[1]);
				WBP.setSelectText($editor[0], cursor[0],cursor[1]);
			}
			WBP.insertText($editor[0],'http://video/url ');
			$editor.keyup();
			return false;
		});
		
		return false;
	}
	
	/**
	 * 音乐
	 */
	var WBMusic = function(){
		var _self = this;
		
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		
		// 内容
		var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
		var $uiClose = $TAG('a', {cls:'uiClose rfloat mas'}).click(function(){$(_self).parents('.uiBox').remove();});
		var $input = $TAG('input',{cls:'pas fsl w250'}).attr('name', 'long_name');
		var $button = $TAG('button', {cls:'uiBtng mls'}).attr('type','submit').html('<span>确定</span>');
		var $form = $TAG('form').append($input, $button);
		var $content = $TAG('div',{cls:'pam fsm'}).append(
			'<div class="mbs">输入完整的音乐链接地址</div>',
			$form
		);
		
		var $uiBox = postOptionTipbox.call(_self, '.po_music', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$form.submit(function(){
			console.log( $uiBox );
			console.log( $(_self).serialize() );
			return false;
		});
		
		return false;
	}
	
	/**
	 * 话题
	 */
	var WBTopic = function(){
		var $postForm = $(this).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		WBP.insertTopic($editor[0]);
		$editor.keyup();
		return false;
	}
	
	/**
	 * 提交微博表单
	 */
	var WBPostTimeSubmit = function(){
		var _self = this;
		
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		var $date = $postForm.find('[name=date]');
		var $hour = $postForm.find('[name=hour]');
		var $minute = $postForm.find('[name=minute]');
		
		var _date = $date.val().split('-').join(' ');
		var _time = [$hour.val(), $minute.val(), '00'].join(':');
		var _postTime = new Date( _date + ' ' + _time ).getTime();
		var _nowTime = new Date().getTime();
		
		if( _postTime < _nowTime ){
			console.log('定时时间已超过现在时间');
		} else {
			
		}
		
		return false;
	}
	
	/**
	 * 统计字数
	 */
	var WBWordnum = function(){
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
	
	/**
	 * 事件绑定
	 */
	$('.po_faces .OnTit').click(WBFace);
	$('.iptFile').change(WBImageUpload);
	$('.po_video .OnTit').click(WBVideo);
	$('.po_music .OnTit').click(WBMusic);
	$('.po_topic .OnTit').click(WBTopic);
	$('.publish_textarea').bind('mouseup keyup', function(){
		WBP.cacheCur(this);
	});
	$('.publish_textarea').bind('keyup', WBWordnum);
	$('.postTimeBtn').click(WBPostTimeSubmit);
});