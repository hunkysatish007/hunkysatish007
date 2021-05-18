<!DOCTYPE HTML> 
<html>
<head> 

<title>language</title> 
<script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>


<script src="js/mobileweb-language.js"></script>

<script>
$(window).bind("load",function(){
	$.mobileweblanguage({
		${contents}
	}).redirectLanguageScreen(1);
});
</script>
</head> 
<body id='page_body'>
</body>
</html>