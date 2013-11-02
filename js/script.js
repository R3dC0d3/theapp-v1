function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
function downloadFile(link, fname){
    window.requestFileSystem(
                 LocalFileSystem.PERSISTENT, 0, 
                 function onFileSystemSuccess(fileSystem) {
                 fileSystem.root.getFile(
                             "dummy.html", {create: true, exclusive: false}, 
                             function gotFileEntry(fileEntry){
                             var sPath = fileEntry.fullPath.replace("dummy.html","");
                             var fileTransfer = new FileTransfer();
                             fileEntry.remove();
                             $('body').addClass('ui-loading');
                             fileTransfer.download(
                                       link,
                                       sPath + fname,
                                       function(theFile) {
                                       console.log("download complete: " + theFile.toURI());
                                       showLink(theFile.toURI());
                                       },
                                       function(error) {
                                       console.log("download error source " + error.source);
                                       console.log("download error target " + error.target);
                                       console.log("upload error code: " + error.code);
                                       }
                                       );
                             }, 
                             fail);
                 }, 
                 fail);
}
 
function showLink(url){
    alert('File saved to: '+ url);
    $('body').removeClass('ui-loading');
    var divEl = document.getElementById("ready");
    var aElem = document.createElement("a");
    aElem.setAttribute("target", "_blank");
    aElem.setAttribute("href", url);
    aElem.appendChild(document.createTextNode("Ready! Click To Open."))
    divEl.appendChild(aElem);
}
 
 
function fail(evt) {
    console.log(evt.target.error.code);
}
 
function onDeviceReady()
{
// do your thing!
    document.addEventListener("backbutton", onBackKeyDown, false);

    //get the location
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
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


//geolocation
function onSuccess(position) {
  $('body').addClass('ui-loading');
  $.post('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +','+ position.coords.longitude +'&sensor=false', {}, function(data){
    scountry = data['results'][data['results'].length -1]['address_components'][0]['short_name'];
    country_image = 'img/flags/'+ scountry.toLowerCase() +'.png';

    $('#country-flag').attr('src', country_image);
    $('#country-flag').show();
    $('#country-short').html(scountry);
    $('body').removeClass('ui-loading');
  });
}
function onError(error) {
  alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
}
//==================geolocation
