$(function(){
	var win = window;
	var wbUserID = '';
	var wbPage = 1;
	var isHome = 1;
	var wbLoading = false;
	var firstLoad = true;						// 是否第一次加载
	var loadnum = 1;							// 加载次数
	var page = 1;								// 当前页
	var loadedpage = 1;							// 已加载的页号
	var totalpage = 0;							// 总页数
	var totaluser = 0;							// 总用户
	var count = 8;								// 一页显示个数
	var galleryWidth = 688;						// 墙宽度
	var _preImg = 'ugimg_';						// 图片ID前缀
	var _hasAnimate = false;					// 是否进行动画
	var _ajaxUrl = 'json/user.php';				// 加载地址
	var $userGallery = $('#userGallery');
	var $userGalleryPrev = $userGallery.find('.prev');
	var $userGalleryNext = $userGallery.find('.next');
	var $userGalleryContainer = $userGallery.find('.main>ul');
	var $userCategoryItem = $('#userCategory .item');
	var $userSearchForm = $('#userSearchForm');
	var $userSearch = $('#userSearch');
	var $forwardList = $('#forwardList>ul');
	var $uiMorePager = $('.uiMorePager');
	var originalImg = 'http://tp3.sinaimg.cn/2023728762/50/5597571831/0';
	var selectedClass = 'selected';
	
	function initUserGallery(){
		loadnum = 1;
		page = 1;
		loadedpage = 1;
		totalpage = 0;
		totaluser = 0;
		$userGalleryContainer.css('left', 0);
		$userGalleryContainer.empty();
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
	
	function getNowtimeAddSecond( second ){
		second = second || 0;
		var _time = new Date().getTime();
		_time += second;
		return new Date(_time);
	}
	
	function getDateDay(date){
	  var y = date.getFullYear();
	  var m = date.getMonth()+1;//获取当前月份的日期
	  var d = date.getDate();
	
	  return y+"-"+m+"-"+d;
	}
	

	/**
	 * 用户分类
	 */
	$('#userCategory .item').click(function(){
		var $this = $(this);
		
		$userCategoryItem.removeClass(selectedClass);
		$(this).addClass(selectedClass);
		
		var _id = $this[0].id;
		_ajaxUrl = $this.attr('href');
		
		if( _id == 'uc_my' ){
			$userGallery.hide();
			wbUserID = '';
			wbPage = 1;
			isHome = 1;
			$forwardList.empty();
			loadUserWeibo();
		} else {
			initUserGallery();
			loadUserGallery();
		}
		
		return false;
	});	
	
	/**
	 * 用户画廊
	 */	
	// 点击头像链接加载微博
	function clickImglink(){
		var $this = $(this);
		$userGalleryContainer.find('a').removeClass(selectedClass);
		$this.addClass(selectedClass);
		wbUserID = $this.attr('uid');
		wbPage = 1;
		isHome = 0;
		$forwardList.empty();
		loadUserWeibo();
	}
	// Ajax请求微博数据
	win.loadUserWeibo = function(){		
		$uiMorePager.show();
		$uiMorePager.addClass('async_saving');
		if(!wbLoading){
			wbLoading = true;
			$.ajax({
				url: '/time/app/weibo_list_ajax.php',
				type: 'GET',
				dataType: "json",
				data: {
					ptfm_user_id_or_name: wbUserID,
					page: wbPage,
					is_home: isHome
				},
				success: function( data ){
					//console.log(data);
					wbLoading = false;
					$uiMorePager.removeClass('async_saving');
					if( data.data == '' ){
						$(win).unbind('.morepage');
					} else if(wbPage == 3){
						$(win).unbind('.morepage');
						wbPage++;
					} else {
						wbPage++;
						$forwardList.append(data.data);
					}
				}
			});
		}
	}
	loadUserWeibo();
	$(win).bind('scroll.morepage', function(){
		if  ($(win).scrollTop() >= $uiMorePager.offset().top - $(win).height()){
		   loadUserWeibo();
		}
	}); 
	function loadUserGallery(q){		
		var ajaxdata = {page: loadnum};
		
		if(q){
			ajaxdata.keyword = q;
		}
		
		$('#uc_loading').show();
		$.ajax({
			url: _ajaxUrl,
			dataType: "json",
			type: 'POST',
			data: ajaxdata,
			success: function(data){
				//console.log(data);
				var _length = data.length;
				
				if( _length ){
					$forwardList.empty().append('<li class="hCent"><img src="../images/usergallerytip.png"/></li>');
					$userGallery.removeClass('nodata');
					
					// 生成画廊Html
					$.each(data, function(i, n){
						var $uImg = $TAG('img',  {id:_preImg+i}).addClass('mts');
						if(firstLoad && i>= 8) {
							$uImg.attr('src', originalImg).attr('origina', n.small_avatar_url);
						} else {
							$uImg.attr('src', n.small_avatar_url);
						}
						//$uImg.attr('src', n.uimg);
						//var _imglink = $TAG('a').append($uImg);
						//var _link = $TAG('a').text(n.uname);
						var _link = 
							$TAG('a')
								.attr('uid', n.user_id)
								.append($uImg, $TAG('div')
								.text(n.screen_name).addClass('mts'), '<i class="tick"></i>')
								.click(function(){
									clickImglink.call(this);
								});
						
						//$userGalleryContainer.append( $TAG('li').append(_imglink, $TAG('div').append(_link)) );
						$userGalleryContainer.append( $TAG('li').append(_link) );
					});
					
					firstLoad = false;
					loadnum++;
					totaluser += _length;
					totalpage = Math.ceil( totaluser/8 );
					//console.log('length:'  + _length);
					//console.log('totaluser:'  + totaluser);
					//console.log('totalpage:'  + totalpage);
				} else {
					if( loadnum == 1 ){
						$forwardList.empty();
						$userGallery.addClass('nodata');
					}
				}
					
				$uiMorePager.hide();
				$('#uc_loading').hide();
				$userGallery.show();
			}
		});
	}
	
	$userGalleryPrev.click(function(e){
		if( _hasAnimate || page == 1 ) return false;
		
		page--;
		
		_hasAnimate = true;
		$userGalleryContainer.animate( { left: parseInt($userGalleryContainer.css('left'))+galleryWidth } , 600, function() {_hasAnimate = false;} );
	});
	
	$userGalleryNext.click(function(e){
		//console.log('page:' + page);
		if( _hasAnimate || page == totalpage ) return false;
		
		page++;
		
		// 替换图片文件src
		if( page > loadedpage ){
			var _begin = loadedpage * count;
			var _end = _begin + count;
			for(var i=_begin; i < _end; i++){
				var $uimg = $('#' + _preImg + i);
				$uimg.attr('src', $uimg.attr('origina'));
			}
			loadedpage++;
		}
		
		if( page == totalpage - 1 ){
			loadUserGallery();
		}
		
		_hasAnimate = true;
		$userGalleryContainer.animate( { left: parseInt($userGalleryContainer.css('left'))-galleryWidth } , 600, function() {_hasAnimate = false;} );
	});
	
	
	
	/**
	 * 搜索微博
	 */
	var _originval = $userSearch.val();
	$userSearch.focus(function(e){
		if( $userSearch.val() == _originval ){
			$userSearch.val('');
			$userSearch.removeClass('DOMControl_placeholder');
		}
	});
	$userSearch.blur(function(e){
		if( $userSearch.val() == '' ){
			$userSearch.val(_originval);
			$userSearch.addClass('DOMControl_placeholder');
		}
	});
	$userSearchForm.submit(function(){
		var _val = $userSearch.val();
		
		if(_val == '' || _val == _originval){
			$userSearch.select();
			return false;
		}
		
		initUserGallery();
		$userCategoryItem.removeClass(selectedClass);
		$userGallery.show();
		_ajaxUrl = '/time/app/user_search_list_ajax.php';
		loadUserGallery(_val);
		return false;
	})
	
	/**
	 * 转发微博
	 */
	win.post_rt_weibo = function( wbid ){
		
		var $wbitem = $('#mid_' + wbid);
		var $sms = $wbitem.find('.sms');
		var type = $sms.attr('type');
		
		var $wordNumBg = $('<div class="wordNumBg"><div class="surplus">你还可以输入<span class="pipsLim">140</span>字</div><div class="over">已超出<span class="pipsLim">0</span>字</div></div>');
		var $textarea = $TAG('textarea', {cls:'boxtextarea'}).attr('name', 'content').bind('keyup', WBP.wordNum);;
		var $face = $('<a title="表情" class="faceicon1" ></a>').click(function(){App.showFaces(this,$textarea[0],-29,$(window).scrollTop()+5);})

		var $confirmBtn = $TAG('button',{cls:'uiBtnp mrs'}).attr('type', 'submit').html('<span>定时转发</span>');
		var $nowPostBtn = $TAG('button',{cls:'uiBtng'}).attr('type', 'button').html('<span>立即转发</span>');
		
		if( type == 1 ){
			var _source = $sms.clone();
			_source.find('a:first').prepend('@');
		} else {
			var $source = $wbitem.find('.source');
			_source = $source.clone();
			$textarea.val('//@' + $sms.text());
		}
		
		var _date = getNowtimeAddSecond(600000);
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
			var content = $textarea.val();
			if( content == '' || $wordNumBg.hasClass('wordNumOver') ){
				$textarea.focus();
				WBP.noticeInput($textarea[0]);
				return false;
			}
			
			var _dates = $date.val();
			var _hour = $hour.val();
			var _minute = $minute.val();
			
			if( WBP.validatePostTime(_dates, _hour, _minute) ){
				$confirmBtn.attr('disabled', true).addClass('uiBtnLoading');
				$.ajax({
					url: 'post_rt_ajax.php',
					type: 'POST',
					data: {
						rt_id: wbid,
						content: content,
						schedule_ymd: _dates,
						schedule_hour: _hour,
						schedule_minute: _minute
					},
					success: function(data){
						if( parseInt(data.error) ){
							WBP.alertError(zfbox, data.error_info);
						} else {
							var successbody = 
								$TAG('div', {cls:'pal'}).append(
									$TAG('div', {cls:'lfloat successIco mrs'}),
									$TAG('div', {cls:'fsl mvm'}).text('定时转发设置成功！')
								);
							zfbox.setBody(successbody);
							setTimeout(function(){zfbox.close()},1000);
						}
					}
				});
			}
		});
		
		$nowPostBtn.click(function(){
			if( $textarea.val() == '' || $wordNumBg.hasClass('wordNumOver') ){
				$textarea.focus();
				WBP.noticeInput($textarea[0]);
				return false;
			}
			
			$.ajax({
				url: 'send_rt_weibo_now_ajax.php',
				type: 'POST',
				data: {
					content: $textarea.val(),
					rt_id: wbid
				},
				success: function(data){
					if( parseInt(data.error) ){
						WBP.alertError(zfbox, data.error_info);
					} else {
						var successbody = 
							$TAG('div', {cls:'pal'}).append(
								$TAG('div', {cls:'lfloat successIco mrs'}),
								$TAG('div', {cls:'fsl mvm'}).text('立即转发微博成功！')
							);
						zfbox.setBody(successbody);
						setTimeout(function(){zfbox.close()},1000);
					}
				}
			});
		});
		
		var _body = $TAG('div', {cls:'pam'}).append(
			$TAG('div',{cls:'pas mbm'}).html(_source.html()).css('background', '#F8F8F8'),
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
			$TAG('div', {cls:'hRight'}).append($confirmBtn, $nowPostBtn)
		);
		
		var zfbox = new SGJ.BOX({
			width: 450,
			loading: false,
			title: '定时转发微博',
			body: _body,
			mask: BOXMASK
		});
		
		$textarea.keyup().focus();
		WBP.setSelectText($textarea[0], 0, 0);
	}
});