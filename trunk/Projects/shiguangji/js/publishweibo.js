$(function(){
	var win = window;
	
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
		var $postTimeBtn = $postForm.find('.postTimeBtn');
		var $postNowBtn = $postForm.find('.postNowBtn');
		
		$postTimeBtn.attr('disabled', true).addClass('uiBtnDisabled');
		$postNowBtn.attr('disabled', true).addClass('uiBtnDisabled');
		
		var $mask = $TAG('div', {cls:'mask'});
		var $cancelupload = $TAG('a',{cls:'uiClose'}).click(function(){removeBox()});
		var $statustext = $TAG('span', {cls:'vMiddle'}).text('上传中...');
		var $loading = $TAG('div', {cls:'mvl'}).append(
				$TAG('img', {cls:'mrs vMiddle'}).attr('src', 'http://img.t.sinajs.cn/t3/style/images/common/loading.gif'), 
				$statustext, 
				$cancelupload
			);
			
		var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
		var $uiBoxContent = $TAG('div', {cls:'uiBoxContent hCent clearfix'}).append($mask, $uiBoxArrow, $loading);
		var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
		var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:143});
		var $newIptFile = $TAG('input',{cls:'iptFile'}).attr({'type': 'file', 'name': 'upload_pic'}).change(WBImageUpload);
		var removeBox = function(){$uiBox.remove();$editor.data('img', '');$iframe.remove();}
		
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
					.click(removeBox);
			
			$editor.data('img', output.image);
			$statustext.html('上传完成<br>图片载入中...');
			$postTimeBtn.attr('disabled', false).removeClass('uiBtnDisabled');
			$postNowBtn.attr('disabled', false).removeClass('uiBtnDisabled');
			var $img = $TAG('img', {cls:'clear'}).attr('src', output.image).width(120).height(120).load(function(){				
				$loading.remove();
				$uiBoxContent.append($delLink, $img);
			});
			
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
		var $button = $TAG('button', {cls:'uiBtng mls'}).attr({'type':'button'}).html('<span>确定</span>');
		//var $form = $TAG('form').append($input, $button);
		var $content = $TAG('div',{cls:'pam fsm'}).append(
			'<div class="mbs">输入视频网站播放页链接地址</div>',
			$input, $button,
			'<div class="mts fcg">目前支持新浪播客、优酷网、土豆网、酷6网、56网等网站</div>'
		);

		var $uiBox = postOptionTipbox.call(_self, '.po_video', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$button.click(function(){
			if( $.browser.msie ){
				var cursor = WBP.getCur($editor[0]);
				WBP.setSelectText($editor[0], cursor[0],cursor[1]);
			}
			
			$button.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/to_short_url.php',
				data: {
					long_url: $input.val()
				},
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
		//var $form = $TAG('form').append($input, $button);
		var $content = $TAG('div',{cls:'pam fsm'}).append(
			'<div class="mbs">输入完整的音乐链接地址</div>',
			$input, $button
		);
		
		var $uiBox = postOptionTipbox.call(_self, '.po_music', 380, [$uiBoxArrow, $uiClose, $content]);
		
		$uiClose.click(function(){
			$uiBox.remove();
		});
		$button.click(function(){
			if( $.browser.msie ){
				var cursor = WBP.getCur($editor[0]);
				WBP.setSelectText($editor[0], cursor[0],cursor[1]);
			}
			
			$button.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/to_short_url.php',
				data: {
					long_url: $input.val()
				},
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
	var WBPostTimeSubmit = function(_id, _onSuccess){
		var _self = this;
		
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');
		var _content = $editor.val();
		var _img = $editor.data('img');
		
		if( _content == '' || $postForm.find('.wordNumBg').hasClass('wordNumOver') ){
			$editor.focus();
			WBP.noticeInput($editor[0]);
			return;
		}		
		
		var $date = $postForm.find('[name=date]');
		var $hour = $postForm.find('[name=hour]');
		var $minute = $postForm.find('[name=minute]');
		var _dates = $date.val();
		var _hour = $hour.val();
		var _minute = $minute.val();
		if( WBP.validatePostTime(_dates, _hour, _minute) ){
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
					schedule_minute: _minute,
					id: _id || 0
				},
				success: function(data){
					$(_self).attr('disabled', false).removeClass('uiBtnLoading');
					if( parseInt(data.error) ){
						WBP.alertError(null, data.error_info);
					} else {
						if( _onSuccess ){
							_onSuccess(data);
						} else {
							$editor.val('').data('img', '').addClass('post_success').keyup();
							setTimeout(function(){$editor.removeClass('post_success');}, 1500);
							$('.po_image .uiBox').remove();
							$('.precordGrid tr:eq(1)').after(data.data);
						}
					}
				}
			});
		}
		
		return false;
	}
	
	/**
	 * 提交立即发布
	 */
	function WBPostNowSubmit(_id, _onSuccess, _ajaxUrl){
		var _self = this;
		var $postForm = $(_self).parents('.postForm');
		var $editor = $postForm.find('.publish_textarea');

		var _content = $editor.val();
		if( _content == '' || $postForm.find('.wordNumBg').hasClass('wordNumOver') ){
			$editor.focus();
			WBP.noticeInput($editor[0]);
			return;
		}
		
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('确定');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).text('取消');
		
		confirmBtn.click(function(){
			var _img = $editor.data('img');
			
			$(_self).attr('disabled', true).addClass('uiBtnLoading');
			confirmbox.close();
			
			$.ajax({
				url: _ajaxUrl || '/time/app/send_weibo_now_ajax.php',
				type:'POST',
				dataType: 'json',
				data: {
					content: _content,
					image_url: _img,
					id: _id || 0
				},
				success: function(data){
					$(_self).attr('disabled', false).removeClass('uiBtnLoading');
					
					if( parseInt(data.error) ){
						WBP.alertError(null, data.error_info);
					}else{
						if( _onSuccess ){
							_onSuccess(data);
						} else {
							$editor.val('').data('img', '').addClass('post_success').keyup();
							setTimeout(function(){$editor.removeClass('post_success');}, 1500);
							$('.po_image .uiBox').remove();
							$('.precordGrid tr:eq(1)').after(data.data);
						}
					}
				}
			});
		});
		
		cancelBtn.click(function(){
			confirmbox.close();
		});
		
		var _body = 
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat confirmIco mrs'}),
				$TAG('div', {cls:'fcr fsl pvm'}).text('确认要立即发布微博吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
		
		var confirmbox = new SGJ.BOX({
			loading: false,
			title: '立即发布？',
			body: _body,
			mask: BOXMASK
		});
		confirmbox.bgiframe();
	}
	
	/**
	 * 事件绑定
	 */
	$('.po_faces .OnTit').click(WBFace);
	$('.iptFile').change(WBImageUpload);
	$('.po_video .OnTit').click(WBVideo);
	$('.po_music .OnTit').click(WBMusic);
	$('.po_topic .OnTit').click(WBTopic);
	$('.postTimeBtn').click(function(){WBPostTimeSubmit.call(this)});
	$('.postNowBtn').click(function(){WBPostNowSubmit.call(this)});
	$('.publish_textarea').bind('keyup', WBP.wordNum);
	$('.publish_textarea').bind('mouseup keyup', function(){
		WBP.cacheCur(this);
	});
	
	/**
	 * 立即发布
	 */
	win.send_now = function( obj, wbid ){
		var _self = this;
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('<span>确定</span>');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).html('<span>取消</span>');
		
		var _body = 
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat confirmIco mrs'}),
				$TAG('div', {cls:'fsl pvm'}).text('确认要立即发布微博吗？'),
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
					if( parseInt(data.error) ){
						WBP.alertError(confirmbox, data.error_info);
					} else {
						var successbody = 
							$TAG('div', {cls:'pal'}).append(
								$TAG('div', {cls:'lfloat successIco mrs'}),
								$TAG('div', {cls:'fsl mvm'}).text('微博发送成功！')
							);
						confirmbox.setBody(successbody);
						setTimeout(function(){confirmbox.close()},1000);
						$(obj).parents('tr').after(data.data).remove();
					}
				}
			})
		});
		cancelBtn.click(function(){
			confirmbox.close();
		});
				
		var confirmbox = new SGJ.BOX({
			title: '立即发布？',
			loading: false,
			body: _body,
			mask: BOXMASK
		});
		confirmbox.bgiframe();
	}
	
	/**
	 * 修改微博
	 */
	win.update_post = function( obj, _id ){
		var _box = new SGJ.BOX({
			width: 540,
			mask: BOXMASK
		});
		_box.bgiframe();
		
		$.ajax({
			url: 'update_post.php',
			type: 'POST',
			data: {
				id: _id		
			},
			dataType: 'json',
			success: function(data){
				var _body = $(data.data);
				
				var $faces = _body.find('.po_faces .OnTit');
				var $file = _body.find('.iptFile');
				var $image = _body.find('.po_image');
				var $video = _body.find('.po_video .OnTit');
				var $music = _body.find('.po_music .OnTit');
				var $topic = _body.find('.po_topic .OnTit');
				var $postTime = _body.find('.postTimeBtn');
				var $postNow = _body.find('.postNowBtn');
				var $textarea = _body.find('.publish_textarea');
				
				function successTip( text ){
					var successbody = 
						$TAG('div', {cls:'pal'}).append(
							$TAG('div', {cls:'lfloat successIco mrs'}),
							$TAG('div', {cls:'fsl mvm'}).text(text)
						);
					_box.setBody(successbody);
					setTimeout(function(){_box.close()},1000);
				}
				
				$faces.click(WBFace);
				$file.change(WBImageUpload);
				$video.click(WBVideo);
				$music.click(WBMusic);
				$topic.click(WBTopic);
				$postTime.click(function(){
					WBPostTimeSubmit.call(this,_id, function(data){
						$(obj).parents('tr').after(data.data).remove();
						successTip('修改微博成功！')
					});
				});
				$postNow.click(function(){
					_box.close();
				});
				$textarea.bind('keyup', WBP.wordNum);
				$textarea.bind('mouseup keyup', function(){
					WBP.cacheCur(this);
				});
				
				
				if( data.image_url ){
					var $delLink = 
						$TAG('a', {cls:'fcmb fsm mrs tinyico-del rfloat'})
							.text('删除')
							.click(function(){
								$uiBox.remove();
								$textarea.data('img', '');
							});
					var $img = $TAG('img', {cls:'clear'}).attr('src', data.image_url).width(120);
					var $mask = $TAG('div', {cls:'mask'});
					var $uiBoxArrow = $TAG('div', {cls:'uiBoxArrow'});
					var $uiBoxContent = $TAG('div', {cls:'uiBoxContent hCent clearfix'}).append($mask, $uiBoxArrow,$delLink, $img);
					var $uiBoxContainer = $TAG('div', {cls:'uiBoxContainer'}).append($uiBoxContent);
					var $uiBox = $TAG('div', {cls:'uiBox'}).append($uiBoxContainer).css({width:143});
					$image.append($uiBox);
				}
				
				$textarea.data('img', data.image_url);
				
				_box.setTitle('修改微博');
				_box.setBody($TAG('div', {cls:'pvm'}).append(_body));
				
				$textarea.keyup().focus();
			}
		});
	}
	
	/**
	 * 删除微博
	 */
	win.del_posted_status_ajax = function( obj, wbid ){
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('<span>确定</span>');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).html('<span>取消</span>');
		var _body = 
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat confirmIco mrs'}),
				$TAG('div', {cls:'fsl pvm'}).text('确认删除微博吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
			
		confirmBtn.click(function(){
			confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/del_weibo_ajax.php',
				type: 'POST',
				data:{
					id: wbid
				},
				dataType: 'json',
				success: function(data){
					confirmBtn.attr('disabled', false).removeClass('uiBtnLoading');
					if( parseInt(data.error) ){	
						WBP.alertError(confirmbox, data.error_info);
					} else {
						$(obj).parents('tr').remove();
						confirmbox.close();
					}
				}
			})
		});
		cancelBtn.click(function(){
			confirmbox.close();
		});
		
		var confirmbox = new SGJ.BOX({
			title: '删除微博？',
			loading: false,
			body: _body,
			mask: BOXMASK
		});
		confirmbox.bgiframe();
	}
	
	/**
	 * 删除记录
	 */
	win.del_post = function(obj, wbid){
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('<span>确定</span>');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).html('<span>取消</span>');
		var _body = 
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat confirmIco mrs'}),
				$TAG('div', {cls:'fsl pvm'}).text('确认删除这条记录吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
		
		confirmBtn.click(function(){
			confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/del_post_ajax.php',
				type: 'POST',
				data:{
					id:wbid
				},
				dataType: 'json',
				success: function(data){
					confirmBtn.attr('disabled', false).removeClass('uiBtnLoading');
					if( parseInt(data.error) ){	
						WBP.alertError(confirmbox, data.error_info);
					} else {
						$(obj).parents('tr').remove();
						confirmbox.close();
					}
				}
			})
		});
		cancelBtn.click(function(){
			confirmbox.close();
		});
		
		var confirmbox = new SGJ.BOX({
			title: '删除记录？',
			loading: false,
			body: _body,
			mask: BOXMASK
		});
		confirmbox.bgiframe();
	}
	
	function getDateDay(date){
	  var y = date.getFullYear();
	  var m = date.getMonth()+1;//获取当前月份的日期
	  var d = date.getDate();
	
	  return y+"-"+m+"-"+d;
	}
	function timeCycle(_start, _end){
		var val = [];
		for( var i = _start; i <= _end; i++ ){
			var t = i.toString();
			t = t.length == 1 ? '0' + t : t;
			val.push(t);
		}
		return val;
	}
	win.update_rt_post = function(obj, _id){
		var zfbox = new SGJ.BOX({
			width: 450,
			loading: true,
			mask: BOXMASK
		});
		
		$.ajax({
			url: 'update_rt_post.php',
			type: 'POST',
			dataType: 'json',
			data: {
				id: _id
			},
			success: function(data){
				
				if( parseInt(data.error) ){
					WBP.alertError(zfbox, data.error_info);
				} else {
					var trinfo = data.rt_info;
					var trdata = data.data;
					var $wordNumBg = $('<div class="wordNumBg"><div class="surplus">你还可以输入<span class="pipsLim">140</span>字</div><div class="over">已超出<span class="pipsLim">0</span>字</div></div>');
					var $textarea = $TAG('textarea', {cls:'boxtextarea'}).attr('name', 'content').bind('keyup', WBP.wordNum).val(trdata.content);
					var $face = $('<a title="表情" class="faceicon1" ></a>').click(function(){App.showFaces(this,$textarea[0],-29,$(window).scrollTop()+5);})
					
					var $confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('<span>定时转发</span>');
					var $cancelBtn = $TAG('button',{cls:'uiBtng'}).attr('type', 'button').html('<span>取消</span>');
	
					var _date = new Date(trdata.schedule_post_time.replace(/-/g, '/'));
					var $date = $('<input type="text" autocomplete="off" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\',minDate:\'%y-%M-%d\'})" class="hasDatepicker mrs" name="schedule_ymd" value="" id="pickdater_0" readonly="">').val(getDateDay(_date));
					
					var houroption = [];
					$.each(timeCycle(0,23), function(i,n){
						houroption.push('<option value="' + n + '">' + n + '</option>');
					});
					var hourVal = _date.getHours().toString();
					var $hour = $('<select autocomplete="off" name="schedule_hour">' + houroption.join('') + '</select>').val(hourVal);
					var minuteoption = [];
					$.each(timeCycle(0,59), function(i,n){
						minuteoption.push('<option value="' + n + '">' + n + '</option>');
					});
					var minuteVal = _date.getMinutes().toString();
					var $minute = $('<select autocomplete="off" name="schedule_minute">' + minuteoption.join('') + '</select>').val(minuteVal.length == 1?'0'+minuteVal:minuteVal);
					
					$confirmBtn.click(function(){
						if( $textarea.val() == '' || $wordNumBg.hasClass('wordNumOver') ){
							$textarea.focus();
							WBP.noticeInput($textarea[0]);
							return false;
						}
						
						$confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
						$.ajax({
							url: 'post_rt_update_ajax.php',
							type: 'POST',
							data: {
								id: _id,
								content: $textarea.val(),
								schedule_ymd: $date.val(),
								schedule_hour: $hour.val(),
								schedule_minute: $minute.val()
							},
							dataType: 'json',
							success: function(data){
								if( parseInt(data.error) ){
									WBP.alertError(zfbox, data.error_info);
								} else {
									var successbody = 
										$TAG('div', {cls:'pal clearfix'}).append(
											$TAG('div', {cls:'lfloat successIco mrs'}),
											$TAG('div', {cls:'fsl pvm'}).text('定时转发设置成功！')
										);
									zfbox.setBody(successbody);
									setTimeout(function(){zfbox.close()},1000);
									$(obj).parents('tr').after(data.data).remove();
								}
							}
						});
						return false;
					});
					
					$cancelBtn.click(function(){
						zfbox.close();
					});
					
					var _body = $TAG('div', {cls:'pam'}).append(
						$TAG('div',{cls:'pas mbm'}).append($TAG('a').append('@' + trinfo.user_info.screen_name),'：',trinfo.text).css('background', '#F8F8F8'),
						$TAG('div',{cls: 'clearfix mbs'}).append(
							$TAG('div', {cls:'lfloat'}).append($face),
							$TAG('div', {cls:'rfloat relayNum'}).append($wordNumBg)
						),
						$textarea,
						$TAG('div', {cls:'date mvs'}).append(
							'定时转发时间：',
							$date,
							$hour,
							' : ',
							$minute
						),
						$TAG('div', {cls:'hRight'}).append($confirmBtn, $cancelBtn)
					);
					
					zfbox.setTitle('修改定时转发');
					zfbox.setBody(_body);
					
					$textarea.keyup().focus();
					WBP.setSelectText($textarea[0], 0, 0);
				}
			}
		});
	};
	
	win.send_rt_now = function( obj, wbid ){
		var confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).html('<span>确定</span>');
		var cancelBtn = $TAG('button',{cls:'uiBtng'}).html('<span>取消</span>');
		
		var _body = 
			$TAG('div', {cls:'pal clearfix'}).append(
				$TAG('div', {cls:'lfloat confirmIco mrs'}),
				$TAG('div', {cls:'fsl pvm'}).text('确认要立即转发微博吗？'),
				$TAG('div', {cls:'hRight'}).append(confirmBtn, cancelBtn)
			);
			
		confirmBtn.click(function(){
			confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
			$.ajax({
				url: '/time/app/send_rt_weibo_now_ajax.php',
				type: 'POST',
				data:{
					id: wbid
				},
				dataType: 'json',
				success: function(data){
					confirmBtn.attr('disabled', false).removeClass('uiBtnLoading');
					if( parseInt(data.error) ){	
						WBP.alertError(confirmbox, data.error_info);
					} else {
						var successbody = 
							$TAG('div', {cls:'pal'}).append(
								$TAG('div', {cls:'lfloat successIco mrs'}),
								$TAG('div', {cls:'fsl mvm'}).text('微博发送成功！')
							);
						confirmbox.setBody(successbody);
						setTimeout(function(){confirmbox.close()},1000);
						$(obj).parents('tr').after(data.data).remove();
					}
				}
			})
		});
		cancelBtn.click(function(){
			confirmbox.close();
		});
				
		var confirmbox = new SGJ.BOX({
			title: '立即转发？',
			loading: false,
			body: _body,
			mask: BOXMASK
		});
	};
});