

<!DOCTYPE HTML> 
<html>
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link rel="apple-touch-startup-image" href="resources/image/splash.png">
<link rel="apple-touch-icon" sizes="144x144" href="resources/image/icon.jpg">
<title>${appTitle}</title> 
<link rel="stylesheet" href="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/mobile-web-overrides.css" />
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/mobile-web-alertbox.css" />
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/jquery.mobile.simpledialog.min.css">
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/jquery.mobile.fixedToolbar.polyfill.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/keyboard.css">
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/keyboard-dark.css">
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/pagination.css">
<link rel="stylesheet" type="text/css" href="/mobileweb/resources/css/mdtimepicker.css">

<script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
<script src="/mobileweb/resources/js/jquery.mobile.fixedToolbar.polyfill.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.14&sensor=true&region=ja&key=${keyContents}"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script src="/mobileweb/resources/js/jquery.cookie.js"></script>
<!-- <script src="/mobileweb/resources/js/google-services.js"></script> 
<script src="/mobileweb/resources/js/canvas2image.js"></script>
<script src="/mobileweb/resources/js/datepicker.js"></script>-->
<script src="/mobileweb/resources/js/mobileweb-gmap.js"></script>
<script src="/mobileweb/resources/js/WebCodeCam.js"></script>
<script src="/mobileweb/resources/js/WebAudioTrack.js"></script>
<script src="/mobileweb/resources/js/qrcodelib.js"></script>
<script src="/mobileweb/resources/js/customdateformatting.js"></script>
<script src="/mobileweb/resources/js/mobileweb-validation.js"></script>
<script src="/mobileweb/resources/js/mobileweb-numeric.js"></script>
<script src="/mobileweb/resources/js/jquery.timers.js"></script>
<script src="/mobileweb/resources/js/jquery.blockUI.js"></script>
<!-- <script src="/mobileweb/resources/js/mobileweb-util.js"></script> -->
<script src="/mobileweb/resources/js/Jquery.mobileweb.util.js"></script>
<script src="/mobileweb/resources/js/mobileweb-core.js"></script>
<script src="/mobileweb/resources/js/mobileweb-page.js"></script>
<script src="/mobileweb/resources/js/mobileweb-attr.js"></script>
<script src="/mobileweb/resources/js/mobileweb-splitView.js"></script>
<script src="/mobileweb/resources/js/mobileweb-ui.js"></script>
<script src="/mobileweb/resources/js/mobileweb-ui-table.js"></script>
<script src="/mobileweb/resources/js/mobileweb-dialog.js"></script>
<script src="/mobileweb/resources/js/Jquery.mobileweb.actions.js"></script>
<script src="/mobileweb/resources/js/Jquery.mobileweb.actionhelper.js"></script>
<script src="/mobileweb/resources/js/jQuery.mobileweb.adf.functions.js"></script> 
<!-- <script src="/mobileweb/resources/js/mobileweb-events.js"></script> -->
<script src="/mobileweb/resources/js/iscroll.js"></script>
<script src="/mobileweb/resources/js/draggable.js"></script>
<script src="/mobileweb/resources/js/mobileweb-numeric.js"></script>
<script src="/mobileweb/resources/js/mobileweb-errorhandler.js"></script>
<script src="/mobileweb/resources/js/recorder.js"></script>
<script src="/mobileweb/resources/js/RecordWorker.js"></script>
<script src="/mobileweb/resources/js/mobileweb-pageScrollView.js"></script>
<script src="/mobileweb/resources/js/jquery.keyboard.js"></script>
<script src="/mobileweb/resources/js/jquery.bootpag.min.js"></script>
<script src="/mobileweb/resources/js/mdtimepicker.js"></script>
<!-- Encription URL's -->
<!-- <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js"></script> -->

<script>
$(window).bind("load",function(){
	$.mobileweb({
		${contents}
	}).changeTab(1);
});
</script>
</head> 
<body id='page_body'>
</body>
</html>