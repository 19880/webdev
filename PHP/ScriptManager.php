<?php

/**
 * ScriptManager
 * 
 * @author Thomas RAMBAUD
 * @copyright 2010
 * @version 1.0
 * @access public
 */
class ScriptManager {

    private $core, $scripts_blocks, $scripts_includes, $scripts_startup, $css_blocks, $css_includes;

    const SCRIPT_BLOCK_TAG = '<script type="text/javascript">%s</script>';
    const SCRIPT_INCLUDE_TAG = '<script type="text/javascript" src="%s"></script>';
    const CSS_BLOCK_TAG = '<style type="text/css">%s</style>';
    const CSS_INCLUDE_TAG = '<link href="%1$s" rel="stylesheet" type="text/css" media="%2$s" />';
    const LINK_TAG = '<link href="%1$s" rel="%2$s" type="%3$s" media="%4$s" />';

    public function __construct() {
        $this->core = iJ_Core::instance();
        $this->clear();
    }

    public function clear() {
        $this->scripts_blocks = array();
        $this->scripts_includes = array();
        $this->css_includes = array();
        $this->css_blocks = array();
        $this->scripts_startup = array();
    }

    public function registerClientScriptBlock($block) {
        $this->scripts_blocks[] = $block;
    }

    public function writeClientScriptBlock($scriptBlock) {
        printf(self::SCRIPT_BLOCK_TAG . "\r\n", $scriptBlock);
    }

    public function registerClientScriptInclude($alias, $src) {
        if (!in_array($alias, $this->scripts_includes))
            $this->scripts_includes[$alias] = $src;
    }

    public function registerStartupScript($alias, $script_block) {
        if (!in_array($alias, $this->scripts_startup))
            $this->scripts_startup[$alias] = $script_block;
    }

    public function registerCssBlock($cssBlock) {
        $this->css_blocks[] = $cssBlock;
    }

    public function registerCssInclude($alias, $href, $media = 'all', $type = self::CSS_INCLUDE_TAG) {
        if (!in_array($alias, $this->css_includes))
            $this->css_includes[$alias] = array('href' => $href, 'media' => $media, 'type' => $type);
    }

    public function registerCssIncludeIE($alias, $href, $expression, $media = 'all') {
        $this->registerCssInclude($alias, $href, $media, '<!--[if ' . $expression . ']>' . self::CSS_INCLUDE_TAG . '-->');
    }

    public function registerCssLtIE7Include($alias, $href, $media = 'all') {
        $this->registerCssInclude($alias, $href, 'lt IE 7', $media);
    }

    public function registerCssLtIE8Include($alias, $href, $media = 'all') {
        $this->registerCssInclude($alias, $href, 'lt IE 8', $media);
    }

    public function registerCssLtIE9Include($alias, $href, $media = 'all') {
        $this->registerCssInclude($alias, $href, 'lt IE 9', $media);
    }

    public function writeJavaScripts($merge = false) {
        if ($merge) {
            // TODO : compact code for merging included files
        } else {
            foreach ($this->scripts_includes as $alias => $src)
                printf(self::SCRIPT_INCLUDE_TAG . "\r\n", $src);
        }
        foreach ($this->scripts_blocks as $block)
            $this->writeClientScriptBlock($block);

        // @TODO : allow not to rely on jQuery...
        if (count($this->scripts_startup) !== 0) {
            $this->writeClientScriptBlock('jQuery(document).ready(function(){' . implode("\n", $this->scripts_startup) . '});');
        }
    }

    public function writeCss($merge = false) {
        foreach ($this->css_includes as $alias => $infos)
            printf($infos['type'] . "\r\n", $infos['href'], $infos['media']);

        echo '<style type="text/css">' . implode("\r\n", $this->css_blocks) . '</style>';
    }

    public function writeAll() {
        $this->writeCss();
        $this->writeJavaScripts();
    }

}