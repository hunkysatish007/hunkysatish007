
const messaging = firebase.messaging();
//messaging.usePublicVapidKey('BH6V6N4kwKHdfACsucR9nK_6e6ZfRHspXklMam_JmmAoBRl9duu3Pjh9N0eHZe1xp-oT-kFQQduM9oB5Ya_fc24');
//messaging.onMessage(function(payload) {
//    console.log('Message received. ', payload);
//    //alert(payload.notification.body);
//});

messaging.onMessage(function(payload) {
	console.log("payload-----",payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: 'images/system/favicon.ico',        
    };

    if (!("Notification" in window)) {
        console.log("This browser does not support system notifications");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(notificationTitle,notificationOptions);
        notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            //window.open(payload.notification.click_action , '_blank');
            notification.close();
        }
    }
});

// [START request_permission]
messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/pn-firebase/firebase-messaging-sw.js').then(function(registration) {
            messaging.useServiceWorker(registration);
            var data = {fullBaseURL : $.mobileweb['fullBaseURL'],config:config};
            registration.active.postMessage(JSON.stringify(data));
//            registration.active.postMessage(JSON.stringify(config));
            messaging.getToken().then(function(currentToken) {
            	$.utility('setPNToken',currentToken);
            	//Send client token for push notification
         		    var dataset = {
         		    	  did : $.utility('getUID')	,
         			      projectid : $.mobileweb['pid'],
         			      ProjectName : $.mobileweb['projectname'],
         			      projectstate : ($.mobileweb['state'] === 'preview') ? 'development' : $.mobileweb['applicationState'],
         			      Title : $.mobileweb['title'],
         			      clientid: currentToken,
          	    		  os : 'mw',
         		    };
         		    
         		    var url=[$.utility('getCommServerDomain'),'initPNS?jsonp=registerPNClientId&callbackdata={"ver":"2","token":"',currentToken,'",}&dataset=',
         		         JSON.stringify(dataset) ].join('');
         		    $.utility('sendRequest',url);
         		    setTimeout(function(){
         		    	$.utility('registerPNClient',false);
					},500);
            }).catch(function(err) {
                console.log('Unable to retrieve token ', err);
            });
        }, /*catch*/ function(error) {
            console.log('Service worker registration failed:', error);
        });
    } else {
        console.log('Service workers are not supported.');
    }
}).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
});
