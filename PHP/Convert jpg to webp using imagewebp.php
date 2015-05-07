<?php
// jpg图片转webp
$filename = dirname(__FILE__) .'/example.jpg';
$im = imagecreatefromjpeg($filename);
$webp =imagewebp($im, str_replace('jpg', 'webp', $filename));
imagedestroy($im);
var_dump($webp);