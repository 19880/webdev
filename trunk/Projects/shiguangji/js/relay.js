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
	var $userGalleryWrap = $userGallery.find('.wrap');
	var $userGalleryPrev = $userGallery.find('.prev');
	var $userGalleryNext = $userGallery.find('.next');
	var $userGalleryContainer = $userGallery.find('.main>ul');
	var $userCategoryItem = $('#userCategory .item');
	var $userSearchForm = $('#userSearchForm');
	var $userSearch = $('#userSearch');
	var originalImg = 'http://tp3.sinaimg.cn/2023728762/50/5597571831/0';
	
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
		
		initUserGallery();
		
		UserGalleryStateLoading();
		
		$userCategoryItem.removeClass('selected');
		$(this).addClass('selected');
		
		var _id = $this[0].id;
		_ajaxUrl = $this.attr('href');
		loadUserGallery();
		
		return false;
	});	
	
	/**
	 * 用户画廊
	 */
	function UserGalleryStateLoading(){
		$userGallery.addClass('loading');
		$userGalleryWrap.addClass('hidden');
	}
	function UserGalleryStateCompleted(){
		$userGallery.removeClass('loading');
		$userGalleryWrap.removeClass('hidden');
	}
	function loadUserGallery(q){		
		var ajaxdata = {page: loadnum,count: count*num,uid: 823};
		
		if(q){
			ajaxdata.q = q;
		}
		
		$.ajax({
			url: _ajaxUrl,
			dataType: "json",
			data: ajaxdata,
			success: function(data){
				//console.log(data);
				UserGalleryStateCompleted();
				
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
					var _link = $TAG('a').append($uImg, $TAG('div').text(n.uname).addClass('mts'), '<i class="tick"></i>');
					
					//$userGalleryContainer.append( $TAG('li').append(_imglink, $TAG('div').append(_link)) );
					$userGalleryContainer.append( $TAG('li').append(_link) );
				});
				
				firstLoad = false;
				loadnum++;
				totalpage += num;
			}
		});
	}
	loadUserGallery('json/user.php');
	
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
		UserGalleryStateLoading();
		$userCategoryItem.removeClass('selected');
		_ajaxUrl = $(this).attr('action');
		loadUserGallery(_val);
		return false;
	})
});