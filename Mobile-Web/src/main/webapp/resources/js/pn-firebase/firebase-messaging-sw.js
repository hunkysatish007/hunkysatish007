importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

// Your web app's Firebase configuration
//var firebaseConfig = {
//	    apiKey: "AIzaSyABa-E2GAYFbGtDLWFBFAYgvelktqIl3Yk",
//	    authDomain: "mwapi-219706.firebaseapp.com",
//	    databaseURL: "https://mwapi-219706.firebaseio.com",
//	    projectId: "mwapi-219706",
//	    storageBucket: "mwapi-219706.appspot.com",
//	    messagingSenderId: "265031277556",
//	    appId: "1:265031277556:web:af88d07053334ce3e137a1"
//	  };
//var firebaseConfig = config;
//	  // Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//const message = firebase.messaging();

self.addEventListener('message', function(event){
    var data = JSON.parse(event.data);
    var firebaseConfig = data.config;
    var url = data.fullBaseURL + 'bin/mobileweb2/images/system/favicon.ico';
	  // Initialize Firebase
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("SW Received Message:");
    console.log(data);
    
    const message = firebase.messaging();
    message.setBackgroundMessageHandler(function(payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = payload.data.title;
      const notificationOptions = {
          body: payload.data.body,
          icon: url,        
      };

      return self.registration.showNotification(notificationTitle,
        notificationOptions);
    });

});

//const message = firebase.messaging();
//message.setBackgroundMessageHandler(function(payload) {
//  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//  // Customize notification here
//  var notificationTitle = 'Background Message Title';
//  var notificationOptions = {
//    body: 'Background Message body.',
//    icon: '/firebase-logo.png'
//  };
//
//  return self.registration.showNotification(notificationTitle,
//    notificationOptions);
//});


