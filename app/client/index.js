
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
        var gc = null;

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

                canvasBuffer.width = canvas.width;
                canvasBuffer.height = canvas.height;

                window.setInterval(function() {

                    gc.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    var imageData = gc.getImageData(0, 0, canvas.width, canvas.height);
                    var data = imageData.data;

                    for(var i = 0; i < data; i+=4) {

                        var r = data[i];
                        var g = data[i+1];
                        var b = data[i+2];
                        var a = data[i+3];

                        imageData.data[i] = 0;
                        imageData.data[i+1] = 0;
                        imageData.data[i+2] = 0;
                        imageData.data[i+3] = 0;
                    }

                    imageData.data = data;
                    gcBuffer.putImageData(imageData, 0, 0);

                }, 1000);
            });

            $('body').append(video);
            $('body').append(canvas);
            $('body').append(canvasBuffer);

            webrtc.connectStreamToVideo(stream, video);

        }
    });
});
