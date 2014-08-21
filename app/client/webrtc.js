
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

window.URL =
    window.URL ||
    window.webkitURL ||
    window.mozURL;



var webrtc = {}

webrtc.getUserMedia = function(constraints, cb) {
    navigator.getUserMedia(constraints, function(stream){
        cb(null, stream);
    }, cb);
};

webrtc.connectStreamToVideo = function(stream, video) {

    if(video.srcObject) {
        video.srcObject = stream;
    } else if(video.mozSrcObject) {
        video.mozSrcObject = stream;
    } else {
        video.src = window.URL.createObjectURL(stream);
    }
};

webrtc.getUserMediaElement = function(constraints, cb) {

    var self = this;

    self.getUserMedia(constraints, function(err, stream){

        var element = null;

        if(err !== void(0) && err !== (null)) {

            cb(err);

        } else {

            //element = document.createElement('video');
            element = document.getElementById('camera');
            //element.src = window.URL.createObjectURL(stream);
            element.mozSrcObject = stream;
            element.autoplay = true;
            element.width = 300;
            element.height = 200;
            element.play();

            cb(null, element);
        }
    });
};

module.exports = webrtc;