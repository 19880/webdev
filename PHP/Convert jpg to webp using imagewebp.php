<?php
// jpg图片转webp
// 需要php5.5以上支持
$filename = dirname(__FILE__) .'/example.jpg';
$im = imagecreatefromjpeg($filename);
$webp =imagewebp($im, str_replace('jpg', 'webp', $filename));
imagedestroy($im);
var_dump($webp);