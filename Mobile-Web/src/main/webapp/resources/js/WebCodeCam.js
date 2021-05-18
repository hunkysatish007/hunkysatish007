
(function($, window, document, undefined) {
	//'use strict';
	var Self, lastImageSrc, con, display, w, h,
		streams = {},
		camera = $('<video style="position: relative;visibility:hidden;display: inline-block;">')[0],
		flipped = false,
		isStreaming = false,
		//DecodeWorker = new Worker("js/DecoderWorker.js"),
		delay = false,
		pluginName = "WebCodeCam",
		defaults = {
			ReadQRCode: true,
			width: 320,
			height: 480,
			videoSource: {
				id: true,
				maxWidth: 240,
				maxHeight: 320,
			},
			flipVertical: false,
			flipHorizontal: false,
			zoom: -1,
			beep: "js/beep.mp3",
			resultFunction: function(resText, lastImageSrc) {},
			getUserMediaError: function() {},
			cameraError: function(error) {}
		};
	function Plugin(element, options) {
		this.element = element;
		display = $(element);
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this._id = $(element).attr('id');
		if (this.init()) {
			this.setEventListeners();
			if (this.options.ReadQRCode){
				this.setCallback();
			};
		}
	}
	Plugin.prototype = {
		init: function() {
			Self = this;
			con = Self.element.getContext('2d');
		//	Self.options.id = this._id;
			w = Self.options.width;
			h = Self.options.height;
			navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
			if (navigator.getUserMedia) {
				if (!streams[Self.options.videoSource.id] || !streams[Self.options.videoSource.id].active) {
					navigator.getUserMedia({
						video: {
							mandatory: {
								maxWidth: Self.options.videoSource.maxWidth,
								maxHeight: Self.options.videoSource.maxHeight
							},
							optional: [{
								sourceId: Self.options.videoSource.id
							}]
						},
						audio: false
					}, Self.cameraSuccess, Self.cameraError);
				} else {
					Self.cameraSuccess(streams[Self.options.videoSource.id]);
				}
			} else {
				Self.options.getUserMediaError();
				return false;
			}
			return true;
		},
		cameraSuccess: function(stream) {
			streams[Self.options.videoSource.id] = stream;
			var url = window.URL || window.webkitURL;
			camera.src = url ? url.createObjectURL(stream) : stream;
			camera.play();
		},
		cameraError: function(error) {
			Self.options.cameraError(error);
			return false;
		},
		setEventListeners: function() {
			camera.addEventListener('canplay', function(e) {
				if (!isStreaming) {
					if (camera.videoWidth > 0) h = camera.videoHeight /(camera.videoWidth / w);
					display[0].setAttribute('width', w);
					display[0].setAttribute('height', h);
					if (Self.options.flipHorizontal) {
						con.scale(-1, 1);
						con.translate(-w, 0);
					}
					if (Self.options.flipVertical) {
						con.scale(1, -1);
						con.translate(0, -h);
					}
					isStreaming = true;
					if (Self.options.ReadQRCode ){
						Self.delay();
					}
				}
			}, false);
			camera.addEventListener('play', function() {
				setInterval(function() {
					if (camera.paused || camera.ended) return;
					con.clearRect(0, 0, w, h);
					var z = Self.options.zoom;
					if (z < 0) {
						z = Self.optimalZoom();
					}
					con.drawImage(camera, (w * z - w) / -2, (h * z - h) / -2, w * z, h * z);
					var imageData = con.getImageData(0, 0, w, h);
					con.putImageData(imageData, 0, 0);
					qrcode.callback();
				}, 40);
			}, false);
		},
		setCallback: function() {
			
			qrcode.callback = function(a) {
				if (delay || camera.paused) return;
				Self.beep();
				delay = true;
				Self.delay();
				Self.options.resultFunction(a, lastImageSrc);
			};
		},
		tryParseQRCode: function() {
			try {
				lastImageSrc = display[0].toDataURL();//alert(Self.option.id)
				qrcode.setId(this._id);
				qrcode.decode();
			} catch (e) {
				if (!delay) {
					setTimeout(function() {
						Self.tryParseQRCode();
					}, 40 * 8);
				}
			};
		},
		delay: function() {
			Self.cameraPlay(true);
		},
		cameraPlay: function(skip) {
			if (!streams[Self.options.videoSource.id]) {
				Self.init();
			} else if (!skip) {
				Self.cameraSuccess(streams[Self.options.videoSource.id]);
			}
			delay = true;
			camera.play();
			setTimeout(function() {
				delay = false;
				if (Self.options.ReadQRCode) Self.tryParseQRCode();
			}, 2000);
		},
		getLastImageSrc: function() {
			return lastImageSrc;
		},
		optimalZoom: function(zoom) {
			return camera.videoHeight / h;
		},
		/*convolute: function(pixels, weights, opaque) {
			var sw = pixels.width,
				sh = pixels.height,
				w = sw,
				h = sh,
				side = Math.round(Math.sqrt(weights.length)),
				halfSide = Math.floor(side / 2),
				src = pixels.data,
				tmpCanvas = document.createElement('canvas'),
				tmpCtx = tmpCanvas.getContext('2d'),
				output = tmpCtx.createImageData(w, h),
				dst = output.data,
				alphaFac = opaque ? 1 : 0;
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var sy = y,
						sx = x,
						r = 0,
						g = 0,
						b = 0,
						a = 0,
						dstOff = (y * w + x) * 4;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = sy + cy - halfSide,
								scx = sx + cx - halfSide;
							if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
								var srcOff = (scy * sw + scx) * 4,
									wt = weights[cy * side + cx];
								r += src[srcOff] * wt;
								g += src[srcOff + 1] * wt;
								b += src[srcOff + 2] * wt;
								a += src[srcOff + 3] * wt;
							}
						}
					}
					dst[dstOff] = r;
					dst[dstOff + 1] = g;
					dst[dstOff + 2] = b;
					dst[dstOff + 3] = a + alphaFac * (255 - a);
				}
			}
			return output;
		},*/
		
		beep: function() {
			if (typeof Self.options.beep != 'string') return;
			var url = Self.options.beep;
			setTimeout(function() {
				new Audio(url).play();
			}, 0);
		}
	};
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);
