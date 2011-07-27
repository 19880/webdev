$(function(){
	$('.iptFile').change(function(){
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
	});
	
	/**
	 * 视频
	 */
	$('.po_video .OnTit').click(function(){
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

		var $uiBox = postOptionTipbox.call(this, '.po_video', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$form.submit(function(){
			//console.log( $(this).serialize() );
			$uiBox.remove();
			WBP.funTextAsTopic($('#publish_editor')[0],'http://video/url ');
			$('#publish_editor')[0].focus();
			return false;
		});
		
		return false;
	});
	
	
	/**
	 * 音乐
	 */
	$('.po_music .OnTit').click(function(){
		// 内容
		var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
		var $uiClose = $TAG('a', {cls:'uiClose rfloat mas'}).click(function(){$(this).parents('.uiBox').remove();});
		var $input = $TAG('input',{cls:'pas fsl w250'}).attr('name', 'long_name');
		var $button = $TAG('button', {cls:'uiBtng mls'}).attr('type','submit').html('<span>确定</span>');
		var $form = $TAG('form').append($input, $button);
		var $content = $TAG('div',{cls:'pam fsm'}).append(
			'<div class="mbs">输入完整的音乐链接地址</div>',
			$form
		);
		
		var $uiBox = postOptionTipbox.call(this, '.po_music', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$form.submit(function(){
			console.log( $uiBox );
			console.log( $(this).serialize() );
			return false;
		});
		
		return false;
	});
	
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
	 * 话题
	 */
	$('.po_topic .OnTit').click(function(){
		WBP.insertTopic($('#publish_editor')[0]);
		return false;
	});
});