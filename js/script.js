function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(e) {
	e.preventDefault();
	
	removePicker();

    //window.location = 'index.html';
    $.mobile.changePage("index.html", {transition:"slide", reverse: true})

    $('body').removeClass('ui-loading');
}


function init(){
	$('.content').height($(document).height()-76);
}
$(function(){

	init();

	$('#page').live('pagebeforeshow', function(){
		init();	
	});
	
});

function removePicker(){
	if($('#height, #weight').hasClass('not-open')){
		SpinningWheel.close();
	}
}
