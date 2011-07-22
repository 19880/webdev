<?php
$html = <<<EOF
  <ul>
    <li class="item pvm">
      <div class="UIImageBlock clearfix">
        <a href="" class="UIImageBlock_Image"><img class="img" src="http://tp4.sinaimg.cn/1767167227/50/1297651947/0" alt=""></a>
        <div class="UIImageBlock_Content">
          <div class="mbs">
            <div class="mbs">
              <a href="http://weibo.com/aboutfacebook" title="Facebook那点事儿" class="fwb">Facebook那点事儿</a>：Google+现在正成为Facebook的竞争对手，其用户量在不到一个月的时间内达到1000万人。这一信息也显示Facebook团队也想体验一下谷歌最新社交网络。<a title="http://btui.it/byS6" href="http://t.cn/aW04at?u=1777378505" target="_blank" mt="url">http://t.cn/aW04at</a>
            </div>
            <a href="#"><img vimg="1" class="imgicon" src="http://ww1.sinaimg.cn/thumbnail/6954d4fbjw1djby812yj1j.jpg"></a>
          </div>
          <div>
            <div class="lfloat">
              <a target="_blank" href="http://api.t.sina.com.cn/1045313254/statuses/14762812966">2011-07-19 10:33</a>
            </div>
            <div class="rfloat">
              <a class="fcmb tinyico-forward" href="#">转发微博</a>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="item pvm">
      <div class="UIImageBlock clearfix">
        <a href="" class="UIImageBlock_Image"><img class="img" src="http://tp4.sinaimg.cn/1767167227/50/1297651947/0" alt=""></a>
        <div class="UIImageBlock_Content">
          <div class="mbs">
            <a href="http://weibo.com/aboutfacebook" title="Facebook那点事儿" class="fwb">Facebook那点事儿</a>：Google+现在正成为Facebook的竞争对手，其用户量在不到一个月的时间内达到1000万人。这一信息也显示Facebook团队也想体验一下谷歌最新社交网络。<a title="http://btui.it/byS6" href="http://t.cn/aW04at?u=1777378505" target="_blank" mt="url">http://t.cn/aW04at</a>
          </div>
          <div class="MIB_assign mbs">
            <i class="ufiNub"></i>
            <div class="mbs">
              <a href="http://weibo.com/sumclcn">@尚客茶品</a>：如果错过了西藏，错过了云南，错过了台湾游，那么还有一个人间天堂等着你，“欲把西湖比西子，从来佳茗似佳人”，闻名全国的西湖龙井茶就产于这里。<a href="#">#梦回茶乡#</a>
            </div>
            <a href="#"><img src="http://ww4.sinaimg.cn/thumbnail/71bb4938jw1djc0m3kj7rj.jpg" class="imgicon"/></a>
          </div>
          <div>
            <div class="lfloat">
              <a target="_blank" href="http://api.t.sina.com.cn/1045313254/statuses/14762812966">2011-07-19 10:33</a>
            </div>
            <div class="rfloat">
              <a class="fcmb tinyico-forward" href="#">转发微博</a>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <div class="uiPager">
    <a href="#" class="uiBtnlink selected">1</a>
    <a href="#" class="uiBtnlink">2</a>
    <a href="#" class="uiBtnlink">3</a>
  </div>
EOF;
$output = array(
	'html' => $html
);
echo json_encode( $output );
?>