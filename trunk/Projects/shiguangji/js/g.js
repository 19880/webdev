function $TAG(tagName, tagId){
	var _doc = document;
	var _dom = _doc.createElement(tagName);
	if( tagId ){
		_dom.setAttribute('id', tagId);
	}
	return $(_dom);
}