
var $ = require('jquery');
var _ = require('underscore');
var _s = require('underscore.string');
var webrtc = require('./webrtc');

$(function(){
    window.webrtc = webrtc;


    webrtc.getUserMedia({
        audio: true,
        video: true
    }, function(err, stream){

        var video = null;
        var canvas = null;
        var canvasBuffer = null;
        var gc = null;
        var gcBuffer = null;

        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;

        if(!err) {

            canvas = document.createElement('canvas');
            canvasBuffer = document.createElement('canvas');

            gc = canvas.getContext('2d');
            gcBuffer = canvasBuffer.getContext('2d');

            video = document.createElement('video');
            video.autoplay = true;
            video.play();

            video.addEventListener('play', function(){

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                canvasBuffer.width = video.videoWidth;
                canvasBuffer.height = video.videoHeight;

                var render = function() {

                    window.webkitRequestAnimationFrame(render);

                    gc.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    var imageData = gc.getImageData(0, 0, canvas.width, canvas.height);
                    var data = imageData.data;

                    var pixelLoops = data.length / 4;

                    for(var i = 0; i < pixelLoops; i++) {

                        r = data[i * 4 + 0];
                        g = data[i * 4 + 1];
                        b = data[i * 4 + 2];
                        a = data[i * 4 + 3];

                        r = 255 - r;
                        g = 255 - g;
                        b = 255 - b;

                        data[i * 4 + 0] = r;
                        data[i * 4 + 1] = g;
                        data[i * 4 + 2] = b;
                        data[i * 4 + 3] = a;
                    }

                    imageData.data = data;
                    gcBuffer.putImageData(imageData, 0, 0);
                };

                render();
            });

            // $('body').append(video);
            $('body').append(canvasBuffer);

            webrtc.connectStreamToVideo(stream, video);

        }
    });
});
