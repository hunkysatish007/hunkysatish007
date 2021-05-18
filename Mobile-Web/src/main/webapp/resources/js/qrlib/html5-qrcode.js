(function($) {
    jQuery.fn.extend({
        html5_qrcode: function(qrcodeSuccess, qrcodeError, videoError) {
            return this.each(function() {
                var currentElem = $(this);

				/* var worker = $.data(currentElem[0], "worker") || new Worker('jsqrcode-combined.min.js');
				$.data(currentElem[0], "worker", worker); */

                var height = currentElem.height();
				if (height == null) {
                    height = 250;
                }

                var width = currentElem.width();                
                if (width == null) {
                    width = 300;
                }
				
                currentElem.empty();	//Remove current items in parent element so it does add a new one

                var vidElem = $('<video width="' + width + 'px" height="' + height + 'px" muted playsinline webkit-playsinline></video>').appendTo(currentElem);
                var canvasElem = $('<canvas id="qr-canvas" width="' + (width - 2) + 'px" height="' + (height - 2) + 'px" style="display:none;"></canvas>').appendTo(currentElem);

                var video = vidElem[0];
                var canvas = canvasElem[0];
                var context = canvas.getContext('2d');
                var localMediaStream;

                var scan = function() {
                    if (localMediaStream) {
                        context.drawImage(video, 0, 0, width - 2, height - 2);

                        try {
                            qrcode.decode();
                        } catch (e) {
                            qrcodeError(e, localMediaStream);
                            $.data(currentElem[0], "timeout", setTimeout(scan, 500));
                        }
                    } else {
                        $.data(currentElem[0], "timeout", setTimeout(scan, 500));
                    }
                };//end snapshot function

                window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;                
				/*window.requestAnimationFrame = window.requestAnimationFrame ||	window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
													function( callback ){
														window.setTimeout(callback, 300);
													};*/

                var successCallback = function(stream) {
					try {
						if(stream != undefined)
							video.srcObject = stream;						
					} catch (error) {
						video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
					}
                   
                    localMediaStream = stream;
                    $.data(currentElem[0], "stream", stream);

					var playPromise = video.play(); 
					if(playPromise !== undefined) {
						playPromise.then(function() {
							console.log('video is playing');
						}).catch(function(error) {
							console.log('video play error :- '+error);
						});
					}

                    $.data(currentElem[0], "timeout", setTimeout(scan, 500));
					//$.data(currentElem[0], "timeout", setInterval(scan, 1000));
                };
                
                var errorCallback = function(error) {
                	videoError(error, localMediaStream);
                }
				
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                // Call the getUserMedia method with our callback functions
				if(navigator.mediaDevices != undefined){
					if (navigator.mediaDevices.getUserMedia != undefined){
						var constraints = {};
						if (typeof navigator.mediaDevices.enumerateDevices === 'undefined'/* ||
						typeof MediaStreamTrack.getSources === 'undefined'*/) {
							$.errorhandler('alertBox','This browser does not support Camera.\n\nTry Chrome.');
						}else {
							var videoFlag = false;//In reference of bug #8201
							///MediaStreamTrack.getSources(gotSources);
							navigator.mediaDevices.enumerateDevices()
							.then(function(devices){
								devices.forEach(function(device) {
									if(device.kind == "videoinput") {
										constraints = { video: { facingMode: { exact: "environment" } } };
										videoFlag = true;
									}
									if(!videoFlag){
										constraints = { audio:true , video:false};
									}
								});
							})
						}
						setTimeout(function(){
							var Promise = navigator.mediaDevices.getUserMedia(constraints);
							if (Promise !== undefined) {
								Promise.then(function(stream) {
									if(constraints['video'] == false)
										errorCallback(error);// Bug #11940 fix
									else
										successCallback(stream);
							    }).catch(function(error) {
							    	errorCallback(error);
							  	});
							}
						},2000);
					}
				}
				else{
					if (navigator.getUserMedia) {
	                    navigator.getUserMedia({video: { facingMode: { exact: "environment" } }}, successCallback, errorCallback);
	                } else {
	                    console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
	                    // Display a friendly "sorry" message to the user
	                }
				}

                qrcode.callback = function (result) {
                    qrcodeSuccess(result, localMediaStream);
                };

				/* worker.addEventListener('message', function(e) {
					var data = e.data;
					if(data.indexOf("data:") === 0){
						qrcodeSuccess(data.substring(5), localMediaStream);
					}
					else if (data.indexOf("error:") === 0){
						qrcodeError(data.substring(6), localMediaStream);
					}
					requestAnimationFrame(scan);
				}, false); */





            }); // end of html5_qrcode
        },
        html5_qrcode_stop: function() {
            return this.each(function() {
                //stop the stream and cancel timeouts
                $(this).data('stream').getVideoTracks().forEach(function(videoTrack) {
                    videoTrack.stop();
                });

                clearTimeout($(this).data('timeout'));
				clearInterval($(this).data('timeout'));
            });
        }
    });
})(jQuery);
