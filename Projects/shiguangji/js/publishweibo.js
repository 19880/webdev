$(function(){
	var win = window;
	var BOXMASK = {
		color: '#FFFFFF',
		loadSpeed: 200,
		opacity: 0.4
	};
	
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
		
		$parent.parents('.postOption').find('.tipbox').remove();
		
		var $uiBoxContent = $TAG('div', {cls:'uiBoxContent'});
		var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
		var $uiBox = $TAG('div', {cls:'uiBox tipbox'}).append($uiBoxContainer).css({width:_width});

		// 创建Box
		$uiBoxContent.append.apply($uiBoxContent, _content);
		$parent.append($uiBox);
		
		$uiBox.bgiframe();
		
		$doc.bind('click.ontit', function(e){
			if( !$(e.target).parents(_type).length ){
				$uiBox.remove();
				$doc.unbind('.ontit');
			}
		});
		
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
		var _self = this;
		var $form = $(this).parent().parent();
		var target = $form.attr('target');
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		
		var $mask = $TAG('div', {cls:'mask'});
		var $loading = $TAG('div', {cls:'mvm'}).append($TAG('img', {cls:'mrs vMiddle'}).attr('src', 'http://img.t.sinajs.cn/t3/style/images/common/loading.gif'), '<span class="vMiddle">上传中...</span>');
		var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
		var $uiBoxContent = $TAG('div', {cls:'uiBoxContent hCent clearfix'}).append($mask, $uiBoxArrow, $loading);
		var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
		var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:143});
		var $newIptFile = $TAG('input',{cls:'iptFile'}).attr({'type': 'file', 'name': 'upload_pic'}).change(WBImageUpload);
		
		
		$iframe = $('<iframe class="hidden" name="' + target + '" src="about:blank"></iframe>');
		$iframe.appendTo('body');
		$form.submit();

		$(_self).parents('.po_image').append($uiBox);
		$(_self).after($newIptFile).remove();

		$EVENT( $iframe[0], 'load', function(){
			var doc = $iframe[0].contentDocument ? $iframe[0].contentDocument: $iframe[0].contentWindow.document;
			var output = eval("(" + doc.body.innerHTML + ")");
			
			var $delLink = 
				$TAG('a', {cls:'fcmb fsm mrs tinyico-del rfloat'})
					.text('删除')
					.click(function(){
						$uiBox.remove();
						$editor.data('img', '');
					});
			var $img = $TAG('img', {cls:'clear'}).attr('src', output.image).width(120);
			
			$editor.data('img', output.image);
			$loading.remove();
			$uiBoxContent.append($delLink, $img);
			
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
		var $uiClose = $TAG('a', {cls:'uiClose'});
		var $input = $TAG('input',{cls:'pas fsl w250'}).attr('name', 'long_url');
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
			if( $.browser.msie ){
				var cursor = WBP.getCur($editor[0]);
				WBP.setSelectText($editor[0], cursor[0],cursor[1]);
			}
			
			$button.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/to_short_url.php',
				data: $form.serialize(),
				type: 'POST',
				dataType: 'json',
				success: function( data ){
					data.short_url = data.short_url || $input.val();
					WBP.insertText($editor[0], data.short_url + ' ');
					$editor.keyup();
					$uiBox.remove();
				}
			});
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
		var $uiClose = $TAG('a', {cls:'uiClose'}).click(function(){$(_self).parents('.uiBox').remove();});
		var $input = $TAG('input',{cls:'pas fsl w250'}).attr('name', 'long_url');
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
			if( $.browser.msie ){
				var cursor = WBP.getCur($editor[0]);
				WBP.setSelectText($editor[0], cursor[0],cursor[1]);
			}
			
			$button.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/to_short_url.php',
				data: $form.serialize(),
				type: 'POST',
				dataType: 'json',
				success: function( data ){
					data.short_url = data.short_url || $input.val();
					WBP.insertText($editor[0], data.short_url + ' ');
					$editor.keyup();
					$uiBox.remove();
				}
			});
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
		var _content = $editor.val();
		
		if( _content == '' ){
			$editor.select();
			return;
		}
		
		
		var $date = $postForm.find('[name=date]');
		var $hour = $postForm.find('[name=hour]');
		var $minute = $postForm.find('[name=minute]');
		var _dates = $date.val();
		var _date = _dates.split('-').join(' ');
		var _hour = $hour.val();
		var _minute = $minute.val();
		var _time = [_hour, _minute, '00'].join(':');
		var _postTime = new Date( _date + ' ' + _time ).getTime();
		var _nowTime = new Date().getTime();
		var _img = $editor.data('img');
		
		if( _postTime < _nowTime ){
			var alertbox = new SGJ.BOX({
				loading: false,
				title: '过去时间？',
				body: '<div class="fcr fsl fwb pam hCent">定时的时间已经失效，请检查！</div>',
				mask: BOXMASK
			});
			setTimeout(function(){alertbox.close()},1000);
		} else {
			$(_self).attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/post_ajax.php',
				type:'POST',
				dataType: 'json',
				data: {
					content: _content,
					image_url: _img,
					schedule_ymd: _dates,
					schedule_hour: _hour,
					schedule_minute: _minute
				},
				success: function(data){
					$(_self).attr('disabled', false).removeClass('uiBtnLoading');
					if( parseInt(data.error) ){
					} else {
						$editor.val('').data('img', '').addClass('post_success').keyup();
						setTimeout(function(){$editor.removeClass('post_success');}, 1500);
						$('.po_image .uiBox').remove();
					}
				}
			});
		}
		
		return false;
	}
	
	/**
	 * 提交立即发布
	 */
	function WBPostNowSubmit(){
		var _self = this;
		
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('确定');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).text('取消');
		
		confirmBtn.click(function(){
			var $postForm = $(_self).parents('.postForm');
			var $editor = $postForm.find('.publish_textarea');
			var _content = $editor.val();
			var _img = $editor.data('img');
			
			$(_self).attr('disabled', true).addClass('uiBtnLoading');
			confirmbox.close();
			
			$.ajax({
				url: '/time/app/send_weibo_now_ajax.php',
				type:'POST',
				dataType: 'json',
				data: {
					content: _content,
					image_url: _img
				},
				success: function(data){
					$(_self).attr('disabled', false).removeClass('uiBtnLoading');
					
					if( parseInt(data.error) ){
					}else{
						$editor.val('').data('img', '').addClass('post_success').keyup();
						setTimeout(function(){$editor.removeClass('post_success');}, 1500);
						$('.po_image .uiBox').remove();
					}
				}
			});
		});
		
		cancelBtn.click(function(){
			confirmbox.close();
		});
		
		var _body = 
			$TAG('div', {cls:'pal'}).append(
				$TAG('div', {cls:'fcr fsl mbs'}).text('确认要立即发布微博吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
		
		var confirmbox = new SGJ.BOX({
			loading: false,
			title: '立即发布？',
			body: _body,
			mask: BOXMASK
		});
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
	$('.postTimeBtn').click(WBPostTimeSubmit);
	$('.postNowBtn').click(WBPostNowSubmit);
	$('.publish_textarea').bind('keyup', WBWordnum);
	$('.publish_textarea').bind('mouseup keyup', function(){
		WBP.cacheCur(this);
	});
	
	/**
	 * 立即发布
	 */
	win.send_now = function( wbid ){
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('确定');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).html('取消');
		
		var _body = 
			$TAG('div', {cls:'pal'}).append(
				$TAG('div', {cls:'fcr fsl mbs'}).text('确认要立即发布微博吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
			
		confirmBtn.click(function(){
			confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/send_weibo_now_ajax.php',
				type: 'POST',
				data:{
					id: wbid
				},
				dataType: 'json',
				success: function(data){
					confirmBtn.attr('disabled', false).removeClass('uiBtnLoading');
				}
			})
		});
		cancelBtn.click(function(){
			confirmbox.close();
		});
				
		var confirmBox = new SGJ.BOX({
			title: '立即发布？',
			loading: false,
			body: _body,
			mask: BOXMASK
		});
	}
});