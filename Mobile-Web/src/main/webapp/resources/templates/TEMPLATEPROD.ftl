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
<link href="images/system/favicon.ico" rel="browser icon" type="image/x-icon">
<link rel="stylesheet" href="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
<link rel="stylesheet" type="text/css" href="css/mobile-web-overrides.css" />
<link rel="stylesheet" type="text/css" href="css/mobile-web-alertbox.css" />
<link rel="stylesheet" type="text/css" href="css/jquery.mobile.simpledialog.min.css">
<link rel="stylesheet" type="text/css" href="css/jquery.mobile.fixedToolbar.polyfill.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="css/keyboard.css">
<link rel="stylesheet" type="text/css" href="css/keyboard-dark.css">
<link rel="stylesheet" type="text/css" href="css/pagination.css">
<link rel="stylesheet" type="text/css" href="css/mdtimepicker.css">

<script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>

<script src="js/jquery.blockUI.js"></script>
<script src="js/jquery.cookie.js"></script>
<script src="js/jquery.timers.js"></script>

<script src="js/jquery.mobile.fixedToolbar.polyfill.js"></script>
<script src="js/Jquery.mobileweb.actions.js"></script>
<script src="js/Jquery.mobileweb.actionhelper.js"></script>
<script src="js/jQuery.mobileweb.adf.functions.js"></script>
<script src="js/Jquery.mobileweb.util.js"></script>

<script src="js/mobileweb-attr.js"></script>
<script src="js/mobileweb-core.js"></script>
<script src="js/mobileweb-dialog.js"></script>
<script src="js/mobileweb-errorhandler.js"></script>
<script src="js/mobileweb-gmap.js"></script>
<script src="js/mobileweb-numeric.js"></script>
<script src="js/mobileweb-page.js"></script>
<script src="js/mobileweb-screen.js"></script>
<script src="js/mobileweb-splitView.js"></script>
<script src="js/mobileweb-ui.js"></script>
<script src="js/mobileweb-ui-table.js"></script>
<script src="js/mobileweb-validation.js"></script>

<script src="js/customdateformatting.js"></script>
<script src="js/draggable.js"></script>
<script src="js/iscroll.js"></script>
<script src="js/recorder.js"></script>
<script src="js/RecordWorker.js"></script>
<script src="js/WebAudioTrack.js"></script>
<script src="js/WebCodeCam.js"></script>
<!--<script src="js/qrcodelib.js"></script>--> 
<script src="js/qrlib/html5-qrcode.js"></script>
<script src="js/qrlib/quagga.min.js"></script>
<script src="js/qrlib/jsqrcode-combined.min.js"></script>
<script src="js/mobileweb-pageScrollView.js"></script>
<script src="js/jquery.keyboard.js"></script>
<script src="js/paging/jquery.bootpag.min.js"></script>
<script src="js/mdtimepicker.js"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?region=ja&key=${keyContents}"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js"></script>
<script>
  var config = {${config}};
  firebase.initializeApp(config);
</script>
<script src="js/pn-firebase/firebase-push-notification.js"></script>

<!-- Encryption URL's -->
<!--<script src="https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
<script src="https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
<script src="https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js"></script>-->

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