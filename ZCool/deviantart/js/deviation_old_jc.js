/*
 *  © 2000-2010 deviantART, Inc. All rights reserved.
 */
if(!window.AutoExec){AutoExec=[]}if(window.vms_feature&&vms_feature("sparta")){}else{function checkDelay(C,D){var A,B;A=arguments.callee.checks;B=(new Date()).valueOf();if((!A[C])||(A[C]+D)<B){A[C]=B;return true}else{return false}}if(!window.cancelEvent){cancelEvent=function(){if(window.event){event.cancelBubble=true;event.returnValue=false}return false}}if(!window.setCookie){window.setCookie=function(C,B){var A=new Date();document.cookie=C+"="+B+"; expires=7 Aug, "+String(A.getFullYear()+1)+" 13:33:37 GMT; "+(deviantART.isLocal?"path=/; domain=deviantart.com":"path=/");delete A}}if(!window.getCookie){window.getCookie=function(C,B){var A=(document.cookie+"; "+C+"="+(B||"")+";").match(RegExp("\\b"+C+"=(.*?);"));return A?A[1]:null}}checkDelay.checks={};Deviation={ready:false,width:300,padding:380,extra:150,mode:2,timer:null,invalid:true,faveBusy:false,stickyMenu:false,nodes:{zoomButton:null,view:null,outView:null,inView:null,litView:null,wearView:null,favButton:null,favButtonIcon:null,tools:null},zoomClick:function(A){if(A.innerHTML.indexOf("Full View")>=0){Deviation.zoomIn(true)}else{Deviation.zoomOut(true)}return cancelEvent()},lubExpire:function(){if(window.da_minish_lub&&da_minish_lub.locks){da_minish_lub.locks=0;da_minish_lub.hide();document.cookie="lubfavexp="+Math.floor((new Date()).valueOf()/1000)+"; path=/; domain=.deviantart.com"}},faveClick:function(A){Deviation.lubExpire();if(A.innerHTML.indexOf("Add")>=0){return Deviation.fave(deviantART.pageData.deviationid)}else{return Deviation.unFave(deviantART.pageData.deviationid)}},init:function(){var eax;Deviation.go();if(eax=document.getElementById("deviation-links")){if(eax.offsetWidth<50){this.mode=1}}with(this.nodes){zoomButton=Tree.get("#zoom-button");if(view=document.getElementById("deviation")||document.getElementById("deviation2")){view=Tree.get(view,"div.deviant");outView=Tree.get("#zoomed-out");inView=Tree.get("#zoomed-in");if(inView){litView=Tree.get(inView,"div.text")}tools=Tree.get("#deviation-tools")}else{if(wearView=Tree.get("#deviantwear-item")){}}favButton=Tree.get("#fav-button");favButtonIcon=Tree.get("#fav-button-icon")||favButtonIcon;if(litView){this.width=Tree.hasClass(Tree.get("#lit-view"),"mod-black")?Tree.get("#lit-view").offsetWidth:litView.offsetWidth}else{if(outView&&(!(inView&&Tree.get(inView,"img")))){this.width=Tree.get(outView,"img").offsetWidth;this.width=Math.max(this.width,300)}else{if(deviantART.pageData.fullview&&deviantART.pageData.fullview.width){this.width=Number(deviantART.pageData.fullview.width)}}}}this.ready=true},unFilter:function(){var B,A;this.init();if(this.nodes.inView){B=Tree.get(this.nodes.inView,"img")}if(this.nodes.outView){A=Tree.get(this.nodes.outView,"img")}if(A&&A.getAttribute("swapsrc")){A.src=A.getAttribute("swapsrc")}else{if(B&&deviantART.pageData.fullview.src){B.src=B.getAttribute("swapsrc")}}Tree.removeClass(this.nodes.view,"filtered");this.unFilter=new Function()},wear:{currentIndex:0,loadView:function(A){Deviation.wear.currentIndex=A;if(Tree.get("#deviantwear-item-zoom").style.display=="block"){Deviation.wear.loadFullView(A)}Tree.get("#deviantwear-item-mid").innerHTML='<a style="cursor:default" onclick="if (window.event)event.cancelBubble=true;return false" href="'+window.location.href+'"><img src="'+deviantART.pageData.deviantWEAR.midViews[A].src+'" width="'+deviantART.pageData.deviantWEAR.midViews[A].width+'"  height="'+deviantART.pageData.deviantWEAR.midViews[A].height+'"/></a>'},loadFullView:function(A){Deviation.wear.currentIndex=A;Tree.get("#deviantwear-item-zoom").innerHTML="";Tree.get("#deviantwear-item-zoom").appendChild(Tree.create("div.huge-img",{},Tree.create("img",deviantART.pageData.deviantWEAR.fullViews[A])))},loadClick:function(B,A){var C;if(Tree.hasClass(B,"active")){A=0}if(C=Tree.get(B.parentNode,B.tagName.toLowerCase()+".active")){Tree.removeClass(C,"active")}if(A){B.className+=" active"}Deviation.wear.loadView(A);return cancelEvent()},buyChange:function(A,B){var D,C;C=Tree.get(Tree.ancestor(A,"form"),"a");D=A.getElementsByTagName("option")[A.selectedIndex];if(D&&(D.text||D.innerText).indexOf(B)>0){C.className="soldout"}else{C.className="cart"}},buyClick:function(B){var H,E,C,G,A,D;E=Tree.ancestor(B,"form");if(B.className=="soldout"){if(confirm("Send the deviantWEAR team a request for this design to be reprinted?")){H=Tree.get(E,"select.size").value;DiFi.pushPost("deviantWEAR","requestReprint",[H],Deviation.wear.requestDone,B);DiFi.send()}}else{A=Tree.get(E,"input.for");G=Tree.get(E,"input.foruserid");var F=Tree.get(E,"select.quantity").value;H=Tree.get(E,"select.size").value;B.className="cart";if(A){D=Tree.create("form",{display:"none",style:{width:"350px"}});D.innerHTML='<div class="light" style="padding:32px;text-align:center"><h2>Buy This deviantWEAR</h2><br/><br/><input name="give" type="submit" style="font-size:10pt;width:16ex" value="For '+A.value+'"/><br/><br/><input name="buy" type="submit" style="font-size:10pt;width:16ex" value="For Me"/><br/><br/><br/><input name="cancel" type="submit" value="Cancel"/>';Modals.push(D,function(K,J){var I=(K=="give")?G.value:0;if(K!="cancel"){Tree.addClass(B,"adding-cart");DiFi.pushPost("PrintShop","addToCart2",[H,0,I,F],Deviation.wear.addToCartDone,B);DiFi.send()}})}else{Tree.addClass(B,"adding-cart");DiFi.pushPost("PrintShop","addToCart2",[H,0,0,F],Deviation.wear.addToCartDone,B);DiFi.send()}}return cancelEvent()},addToCartDone:function(C,B,A){var A=this;Tree.removeClass(A,"adding-cart");if(C){Tree.addClass(Tree.get("a.checkout"),"checkout-show");Tree.addClass(A,"in-cart-success");Deviation.wear.button=A;location.href="https://www.deviantart.com/checkout"}else{Tree.addClass(this,"error-cart")}},requestDone:function(B,A){if(B){alert("Thanks! We'll let you know if we get it back in stock!")}else{alert("Reprint request not sent.\n\nPlease try again.")}}},zoomIn:function(fromMenu){this.init();if(!checkDelay("deviationZoom",500)){return cancelEvent()}if(fromMenu!=true){fromMenu=false}this.nodes.zoomButton.innerHTML="Small View";this.nodes.zoomButton.previousSibling.className="i2";if(this.nodes.wearView){this.wear.loadFullView(Deviation.wear.currentIndex);Tree.get("#deviantwear-item-zoom").style.display="block";Tree.get("#deviantwear-item-mid").style.display="none";return cancelEvent()}else{var i,l;this.nodes.outView.style.display="none";with(this.nodes.inView){style.display="block";if(!getElementsByTagName("img")[0]){i=document.createElement("img");i.setAttribute("width",deviantART.pageData.fullview.width);i.setAttribute("height",deviantART.pageData.fullview.height);i.setAttribute("src",deviantART.pageData.fullview.src);firstChild.appendChild(i)}}with(Tree.get(this.nodes.view,"a")){focus();blur()}this.width=Math.min(Tree.get(this.nodes.inView,"img").offsetWidth);this.invalid=true;this.resize(fromMenu);this.repaint();return cancelEvent()}},zoomOut:function(){this.init();if(!checkDelay("deviationZoom",500)){return cancelEvent()}this.nodes.zoomButton.innerHTML="Full View";this.nodes.zoomButton.previousSibling.className="i1";if(this.nodes.wearView){Tree.get("#deviantwear-item-zoom").style.display="none";Tree.get("#deviantwear-item-mid").style.display="block";return cancelEvent()}else{var l;this.nodes.inView.style.display="none";this.nodes.outView.style.display="block";with(Tree.get(Tree.get("#zoomed-out"),"img")){setAttribute("src",deviantART.pageData.smallview.src);setAttribute("width",deviantART.pageData.smallview.width);setAttribute("height",deviantART.pageData.smallview.height)}with(Tree.get(this.nodes.view,"a")){focus();blur()}this.width=Math.min(300,Tree.get(this.nodes.outView,"img").offsetWidth);this.invalid=true;this.resize();this.repaint();return cancelEvent()}},repaint:function(){if(Browser.isIE&&this.nodes.tools){this.nodes.tools.parentNode.appendChild(this.nodes.tools)}},go:function(){if(arguments.callee.gone){return }arguments.callee.gone=true;if((document.getElementById("deviation")||document.getElementById("deviation2"))&&!deviantART.pageData.film_duration){Events.hook(window,"resize",Deviation.resize);Deviation.resize(false)}},resize:function(fromMenu){with(Deviation){init();if(!Deviation.nodes||!Deviation.nodes.view){return }w=Browser.isIE?(document.body.clientWidth-335):nodes.view.parentNode.offsetWidth;if(w<(width+padding+extra)){if(mode>1||invalid){mode=1;if(fromMenu!=true){menu(false)}}if(w<width+extra){if(mode>0||invalid){mode=0;Tree.addClass(document.body,"widescreen")}}else{if(mode<1||invalid){mode=1;Tree.removeClass(document.body,"widescreen")}}}else{if(mode<2||invalid){if(mode<1){Tree.removeClass(document.body,"widescreen")}mode=2;menu(true)}}invalid=false;if(!Browser.isIE){nodes.view.style.display="none";nodes.view.style.display="block"}}},menu:function(B){var A,F;if(deviantART.pageData.film_duration){return }if(!B&&this.mode>=2||this.stickyMenu){return }F=document.getElementById("deviation-links").offsetWidth;var D=34;var C=240;var G=B?C:D;if(F==G){return }var E=$j("#deviation-links strong.c");if(G==D){E.css("visibility","hidden")}else{E.css("visibility","visible")}Station.run(document.getElementById("deviation-links"),"width",{from:F,to:B?C:D,time:200,f:Interpolators.pulse})},fave:function(A){this.init();if(!A){document.title="missing "+A;return true}if(!this.faveBusy){this.stickyMenu=true;this.faveBusy=true;this.nodes.favButton.innerHTML="Adding...";this.nodes.favButtonIcon.className="icon i11";this.nodes.favButton.style.display="none";this.nodes.favButton.style.display="block";DiFi.pushPost("Deviation","Favourite",[A],this.faved,this);DiFi.timer(1)}return cancelEvent()},unFave:function(A){this.init();if(!A){document.title="missing -id";return true}if(!this.faveBusy){this.stickyMenu=true;this.faveBusy=true;this.nodes.favButton.innerHTML="Removing...";this.nodes.favButtonIcon.className="icon i11";this.nodes.favButton.style.display="none";this.nodes.favButton.style.display="block";DiFi.pushPost("Deviation","Favourite",[A],this.unFaved,this);DiFi.timer(1)}return cancelEvent()},faved:function(B,A){Deviation.lubExpire();if(B){this.nodes.favButton.innerHTML='<b style="color:orange;text-decoration:none !important">Thanks!</b>';setTimeout("Deviation.favedOver.call(Deviation)",2500);if(window.LOTCC){LOTCC.bcpw("act","add favorite")}}else{this.nodes.favButton.innerHTML='<b style="color:#D22;text-decoration:none !important">Error! Please Try Again</b>';setTimeout("Deviation.unFavedOver.call(Deviation)",4000)}},unFaved:function(B,A){if(B){this.nodes.favButton.innerHTML='<b style="color:#222;text-decoration:none !important">Favourite Removed</b>';setTimeout("Deviation.unFavedOver.call(Deviation)",2500);if(LOTCC){LOTCC.bcpw("act","remove favorite")}}else{this.nodes.favButton.innerHTML='<b style="color:#D22;text-decoration:none !important">Error! Please Try Again</b>';setTimeout("Deviation.favedOver.call(Deviation)",4000)}},favedOver:function(){Deviation.init();this.stickyMenu=false;this.faveBusy=false;this.menu(false);this.nodes.favButtonIcon.className="icon i10";this.nodes.favButton.innerHTML="Remove Favourite";this.repaint()},favedOverMore:function(){var A,B;A=document.getElementById("artist-comments");A=(A&&A.getElementsByTagName("img")||[])[0];if(A&&GMI.query("TalkPostWrapper")[0]){B=Popup.create({className:"darkspeech",no_shadow:1,bias:"bottom"});B.node.innerHTML="<div class=dsp>&nbsp;</div><i class=pbq></i>";B.node.onclick=function(){GMI.query("TalkPostWrapper")[0].talkpost.focus();Popup.completeAll()};Popup.show(B,Ruler.screen.node(A));Station.push(B.node.firstChild.firstChild,"nodeValue",{from:"",to:"Don't forget to\nadd a comment!",time:500,f:Interpolators.line})}},unFavedOver:function(){this.stickyMenu=false;this.faveBusy=false;this.menu(false);this.nodes.favButtonIcon.className="icon i3";this.nodes.favButton.innerHTML="Add to Favourites";this.repaint()},requestPrint:function(A){this.init();printReqButton=Tree.get("#printReq-button");this.stickyMenu=true;printReqButton.setAttribute("onclick","return cancelEvent()");printReqButton.innerHTML="Sending Request...";DiFi.pushPost("Deviation","RequestPrint",[Deviation.deviationId],Deviation.printRequestReturn);DiFi.send();return cancelEvent()},printRequestReturn:function(){printReqButton=Tree.get("#printReq-button");printReqButton.innerHTML='<b style="color:orange">Print Requested</b>';Deviation.stickyMenu=false;setTimeout("Deviation.menu(false);Deviation.repaint();",2000)},navigate:function(B){var A;A=deviantART.pageData.for_Cookies.view;if(Deviation.nodes.outView){if(A!="full"&&Deviation.nodes.inView.style.display=="block"){A="full"}else{if(A!="small"&&Deviation.nodes.outView.style.display=="block"){A="small"}else{}}}if(A){B.href+="&view="+A}B.href+="&st="+(Browser.isGecko?document.documentElement.scrollTop:document.body.scrollTop);B.blur();return true},_delete:function(A){Modals.push(document.getElementById("delete_modal").getElementsByTagName("form")[0].cloneNode(true),function(B,C){if(B!="delete"){return }if(!confirm("About to delete deviation; this cannot be undone!\n\nAre you sure?")){return false}DiFi.pushPost("Deviation","DeleteSingle",[A,C.reasonid],function(E,D){if(E){alert("Deviation deleted successfully.");window.location.href="http://me.deviantart.com/"}else{alert("An unexpected error occured while trying to delete deviation. Please try again later.")}});DiFi.send()})},pictureClick:function(link,w,h){var popup;if(Browser.isTouch){return true}popup=window.open("",null,"toolbar = 0, scrollbars = 1, location = 0, statusbar = 0, menubar = 0, resizable = 1, width= "+(w||640)+", height= "+(h||480));if(!popup){return true}if(window.event){event.cancelBubble=true}with(popup.document){open();write('<html><body style="padding:0;margin:0;background:#76827B"><img src="'+link.href.replace(/"/g,"&quot;")+'"></body></html>');close()}popup.focus();return false}};$j(Deviation.go);Litty={states:{2:"size",4:"black",8:"font",16:"indent"},labels:{size:"A<span>A</span>",font:"T",indent:"&para;",black:"<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>"},toggles:{any:function(B){var A;if(A=Tree.get("#lit-view")){if(Tree.hasClass(A,"mod-"+B)){Tree.removeClass(A,"mod-"+B)}else{Tree.addClass(A,"mod-"+B)}}},black:function(){Litty.toggles.any("black");if(Deviation.nodes.litView){Deviation.width=Tree.hasClass(Tree.get("#lit-view"),"mod-black")?Tree.get("#lit-view").offsetWidth:Deviation.nodes.litView.offsetWidth;Deviation.resize()}},indent:function(){var C,D,B,A;C=Tree.get(Tree.get("#lit-view"),"div.text");if(C&&!Tree.get(C,"span.push")){D=Tree.gets(C,"br");do{A=Tree.create("span.push");A.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";if(!B){if(C.firstChild){C.insertBefore(A,C.firstChild)}}else{if(B.nextSibling){B.parentNode.insertBefore(A,B.nextSibling)}}}while(B=D.pop())}Litty.toggles.any("indent")}},initty:function(){var A,C,B,E,D;if(deviantART.pageData.deviation_poetry||deviantART.pageData.deviation_prose){D=Litty.read();A=Tree.get("#lit-view");B=[];if(A){B.push('<i class="c tl"><b></b></i><i class="c tr"><b></b></i><i class="c bl"><b></b></i><i class="c br"><b></b></i>');for(C in Litty.labels){if(C=="indent"&&!deviantART.pageData.deviation_prose){continue}B.push('<a href="" class="t-'+C+'" onclick="return Litty.click(this)">'+Litty.labels[C]+"</a>")}E=Tree.create("div.textbar ch");A.insertBefore(E,A.firstChild);E.innerHTML=B.join("\n")}for(C in Litty.states){if(D&C){if(Litty.states[C]=="indent"&&!deviantART.pageData.deviation_prose){continue}Litty.toggle(Litty.states[C])}}A.style.visibility="visible"}},read:function(){return getCookie("litview"+(deviantART.pageData.deviation_poetry?"poetry":"prose"),0)},store:function(A){setCookie("litview"+(deviantART.pageData.deviation_poetry?"poetry":"prose"),A)},toggle:function(A){if(Litty.toggles[A]){Litty.toggles[A]()}else{Litty.toggles.any(A)}},click:function(B){var C,A;B.blur();C=B.className.match(/t\-(.+)\b/)[1];dre_assert(C);Litty.toggle(C);for(A in Litty.states){if(C==Litty.states[A]){Litty.store(Litty.read()^A);return cancelEvent()}}alert("Unavailable");return cancelEvent()}}}if(window.DWait){DWait.run("jms/pages/art/deviation.js")}BL_REG_OLD_DEVIATION=/^h[t]tp:\/\/[^\.]+\.deviantart\....\/(?:deviation|view)\/()([0-9]+)\/?$/;BL_REG_DEVIATION=/^h[t]tp:\/\/[^\.]+\.deviantart\....\/(?:art\/)?([0-9A-Za-z\-\.]+)\-([0-9]+)\/?$/;Blogobox={get:function(A){return Tree.ancestor(A,"div.pimp")},noteModal:function(){var A;A=Modals.push.call({gecko_fix:true},document.getElementById("pimp").cloneNode(true));A.getElementsByTagName("kbd")[0].innerHTML=Browser.isMac?"&#8984; enter":"Ctrl-Enter";try{A.getElementsByTagName("input")[0].focus()}catch(B){}},next:function(A,C){var B,D;if(Browser.isOpera){Tree.ancestor(A,"div.modal").style.overflow="hidden"}A=Tree.get(this.get(A),"div.pimp-holder");B=Tree.get(A,"div.pimp-"+C);if(D=Tree.get(A,"div.active")){Tree.removeClass(D,"active")}B.className+=" active";if(Browser.isMac&&C=="note"){Tree.get(B,"kbd").innerHTML="&#8984; enter"}Station.push(A,"left",{from:0,to:-450,time:200,f:Interpolators.pulse},function(){var E;if(C=="note"){Tree.get(B,"input.itext").focus()}else{if(C=="space"){E=Tree.get(B,"textarea");E.select();if(!E.getAttribute("pimp_original")){E.setAttribute("pimp_original",E.value);E.onchange=E.onclick=E.onkeypress=Blogobox.embedChange}}}});return cancelEvent()},embedChange:function(){var A=this;setTimeout(function(){if(A.value!=A.getAttribute("pimp_original")){A.value=A.getAttribute("pimp_original")}A.select()},1)},back:function(A){A=Tree.get(this.get(A),"div.pimp-holder");Station.push(A,"left",{from:-450,to:0,time:200,f:Interpolators.pulse});return cancelEvent()},noteFocus:function(A){Tree.get(Tree.get(this.get(A),"div.pimp-note"),"textarea").focus();return cancelEvent()},noteFriend:function(node){var floater_result;if(floater_result=node.getAttribute("floaterresult")){with(Tree.get(Tree.get(this.get(node),"div.pimp-note"),"input.itext")){if(value!=""){value=String(value).replace(/(^\s+|\s+$)/g,"")+", "+floater_result}else{value=floater_result}focus()}}},note:function(node){var notes,input,to,i,duplicates,href,matches;notes={node:null,id:null,deviants:[],remaining:0,wants_comment:null};notes.node=Tree.get(this.get(node),"div.pimp-note");if(Tree.get(notes.node,"input.isend").disabled){return }href=Tree.get(Tree.get(notes.node,"div.preview"),"a").href;matches=(href||"").split("?")[0].match(BL_REG_DEVIATION);if(!matches){matches=href.match(BL_REG_OLD_DEVIATION)}notes.id=matches[2];input=Tree.get(notes.node,"input.itext");to=input.value.replace(/ /g,",").split(",");duplicates={};for(i=0;i!=to.length;i++){if(to[i]){if(!duplicates[to[i]]){duplicates[to[i]]=true;notes.deviants.push({username:to[i],error:null})}}}for(i=0;notes.deviants[i];i++){notes.remaining++;DiFi.pushPost("Notes","pimp",[notes.id,notes.deviants[i].username,Tree.get(notes.node,"textarea").value],this.noteDone,notes)}if(notes.deviants.length){with(Tree.get(notes.node,"input.isend")){disabled=true;style.cursor="wait";value="Sending"}notes.wants_comment=Boolean(window.TalkPostWrapper&&GMI.query("TalkPostWrapper")[0]);DiFi.send()}else{input.value="";input.focus();this.flashNode(input)}},flashNode:function(A){Station.push(A,"visibility",{to:"hidden",time:150},{to:"visible",time:150},{to:"hidden",time:150},{to:"visible",time:150},{to:"hidden",time:150},{to:"visible",time:150})},keep_message:null,noteDone:function(F,E){var C,B,D,G,A;if(!E.request){if(!--this.remaining){Blogobox.sendOver(this.node);alert("Unable to connect to deviantART to send your note.\n\nPlease try again.")}return }for(C=0;this.deviants[C];C++){if(this.deviants[C].username==E.request.args[1]){if(F){}else{this.deviants[C].error=E.response.content.error}break}}if(--this.remaining==0){if(window.LOTCC){LOTCC.bcpw("act","share deviation");LOTCC.bcpw("int","devianART")}B=0;D=0;G=[];for(C=0;this.deviants[C];C++){if(this.deviants[C].error){D++;G.push('<img src="http://e.deviantart.com/emoticons/f/frown.gif" alt=""/> Couldn\'t send to '+this.deviants[C].username)}else{B++;G.push('<img src="http://e.deviantart.com/emoticons/s/smile.gif" alt=""/> Sent to '+this.deviants[C].username)}}A=Tree.get(Blogobox.get(this.node),"div.funzone");Station.push(A,"opacity",{to:0},"display",{to:"block"},"opacity",{from:0,to:1,time:300,f:Interpolators.sineCurve});if(D>0){G='<div class="readout">'+G.join("<br/>")+'</div><input type="button" class="iclose" value="Back" onclick="Blogobox.screenOff(this)"/>'}else{G='<div class="readout" '+(G.length==1?' style="text-align:center" ':"")+">"+G.join("<br/>")+"</div>"+((deviantART.pageData.pimp_deviation_artist!=deviantART.pageData.pimp_me&&this.wants_comment)?('<div class="pp">Don\'t forget to <a class="a" href="#reply" onclick="setTimeout(Blogobox.leaveComment, 1)">leave a comment</a>'+(deviantART.pageData.pimp_deviation_artist?" for the artist":"")+"!</div>"):"")+'<form><input type="button" class="iclose" value="Close" onclick="Modals.pop()"/></form>'}Blogobox.sendOver(this.node);A.innerHTML=G}},leaveComment:function(){var A;Modals.pop();GMI.query("TalkPostWrapper").pop().talkpost.focus()},sendOver:function(node){with(Tree.get(node,"input.isend")){value="Send";style.cursor="default";disabled=false}},screenOff:function(A){A=Tree.get(this.get(A),"div.funzone");Station.push(A,"opacity",{from:1,to:0,time:250,f:Interpolators.sineCurve},"display",{to:"none"})},inputKey:function(B,A){if(B.keyCode==13){if(((Browser.isMac&&B.metaKey)&&!Browser.isOpera)||B.ctrlKey){Blogobox.note(A);B.cancelBubble=true;return false}else{if(A.tagName=="INPUT"){Tree.get(Tree.ancestor(A,"div.pimp-note"),"textarea").focus()}}}return true}};if(window.DWait){DWait.run("jms/pages/blogobox.js")}ResourcePagePreviewStream=PreviewStream.extend({gmiConstructor:function(){this.gmi_node.style.display="none";this.resource_page_initial_fetch=1;this.base();Selection.focused=this.preview_selector;if(vms_feature("dev_test_b")){this.navigationMouseHint()}},streamSelect:function(D,C,B){var A=0;for(A in D){break}if(!(B in {temporary_blank_selection:1,relative:1})){if(!D[A]){return window.location.href=this.gmi_args.url}}if(!this.hijacked_already&&this.resview){if(deviantART.pageData.overlay_sponsor){this.resview.meta_node.innerHTML='<div id="gmi-ResourcePageAd" name="gmi-ResourcePageAd"></div>';this.resview.ad=GMI.query(this.preview_node,"ResourcePageAd")[0]}this.hijacked_already=1}return this.base(D,C,B)},previewEnsure:function(B,C){var D,A;if(this.preview_node){this.preview_node.style.height=(Ruler.screen.rect().y2+(Browser.isIE?32:0))+"px";return }this.hookKeyboard(1);D=this.preview_node=document.getElementById("dv7");if(Browser.isIE){D.style.height=(Ruler.screen.rect().y2+(Browser.isIE?32:0))+"px"}else{D.style.minHeight=(Ruler.screen.rect().y2+(Browser.isIE?32:0))+"px"}D.setAttribute("gmi-redirect",this.gmi_node.getAttribute("gmindex"));this.resview=GMI.query("ResViewContainer")[0];this.resview.owner_stream=this;if(!vms_feature("pachunkajunk")){document.getElementById("depths").style.display="none"}document.getElementById("output").style.display="block";this.preview_selector.preview_active=1;if(this.preview_controls){if(vms_feature("dev_test_b")){this.preview_controls.hijackStream(this,this.stream_hijack_immediate);this.gmi_node.style.display="block";this.domDrawRange(this.gs_offset,this.gs_count_per_page)}if(document.body){document.body.appendChild(this.preview_controls.gmi_node)}this.preview_controls.gmi_node.style.display="block"}if(!vms_feature("dev_test_b")){this.beforeHijackStream()}da_preview_master.current_stream=this;if(this.resview){this.resview.autoFullView()}},onkeydown:function(){this.navigationMouseHint();this.base.apply(this,arguments)},dataAdd:function(){var C,A,B;this.base.apply(this,arguments);if(this.resource_page_initial_fetch){C=this.domFindVisible();for(A in C){B=this.contents[A];if(B&&B[2]&&B[0]==1&&B[1]==Number(deviantART.pageData.deviationid)){this.preview_selector.select(B[2]);break}}this.resource_page_initial_fetch=0}},navigationMouseHint:function(){if(this.mouse_hover_done){return }this.mouse_hover_done=1;this.gs_offset=0;this.gs_total=undefined;this.domDrawRange(0,24)}});if(window.DWait){DWait.run("jms/pages/superbrowse/types/resview_preview_stream.js")}DWait.count();