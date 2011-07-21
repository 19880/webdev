var wbUserID = 11259342;

$(function(){	
	
	var firstLoad = true;						// 是否第一次加载
	var loadnum = 1;							// 加载次数
	var page = 1;								// 当前页
	var loadedpage = 1;							// 已加载的页号
	var totalpage = 0;							// 总页数
	var count = 8;								// 一页显示个数
	var num = 5;								// 一次加载页数
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
	var $forwardList = $('#forwardList');
	var originalImg = 'http://tp3.sinaimg.cn/2023728762/50/5597571831/0';
	var selectedClass = 'selected';
	
	function initUserGallery(){
		loadnum = 1;
		page = 1;
		loadedpage = 1;
		totalpage = 0;
		$userGalleryContainer.css('left', 0);
		$userGalleryContainer.empty();
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
			$userGallery.slideUp();
			loadUserWeibo(wbUserID);
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
		loadUserWeibo($this.attr('uid'));
	}
	// Ajax请求微博数据
	function loadUserWeibo(uid, page){
		uid = uid || wbUserID;
		page = page || 1;
		
		$.ajax({
			url: 'json/weibo_list_ajax.php',
			dataType: "json",
			data: {
				u_id: uid,
				page: page
			},
			beforeSend: function(){
				$forwardList.empty();
			},
			success: function( data ){
				//console.log(data);
				$forwardList.html(data.html);
			}
		});
	}
	loadUserWeibo(wbUserID);
	function loadUserGallery(q){		
		var ajaxdata = {page: loadnum,count: count*num,uid: wbUserID};
		
		if(q){
			ajaxdata.q = q;
		}
		
		$('#uc_loading').show();
		$.ajax({
			url: _ajaxUrl,
			dataType: "json",
			data: ajaxdata,
			success: function(data){
				//console.log(data);
				
				$('#uc_loading').hide();
				
				// 生成画廊Html
				$.each(data, function(i, n){
					var $uImg = $TAG('img',  _preImg+i).addClass('mts');
					if(firstLoad && i>= 8) {
						$uImg.attr('src', originalImg).attr('origina', n.uimg);
					} else {
						$uImg.attr('src', n.uimg);
					}
					//$uImg.attr('src', n.uimg);
					//var _imglink = $TAG('a').append($uImg);
					//var _link = $TAG('a').text(n.uname);
					var _link = 
						$TAG('a')
							.attr('uid', n.uid)
							.append($uImg, $TAG('div')
							.text(n.uname).addClass('mts'), '<i class="tick"></i>')
							.click(function(){
								clickImglink.call(this);
							});
					
					//$userGalleryContainer.append( $TAG('li').append(_imglink, $TAG('div').append(_link)) );
					$userGalleryContainer.append( $TAG('li').append(_link) );
				});
				
				firstLoad = false;
				loadnum++;
				totalpage += num;
				
				$userGallery.slideDown();
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
		
		if( page%num == 4 ){
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
		$userGallery.slideDown();
		_ajaxUrl = $(this).attr('action');
		loadUserGallery(_val);
		return false;
	})
});