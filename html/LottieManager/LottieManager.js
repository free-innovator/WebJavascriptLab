/*
    ==================================================
    LottieManager
*/
function LottieManager() {
    this.initialize.apply(this, arguments);
}

LottieManager.prototype.initialize = function (lottieAnimation) {
    this._animation = lottieAnimation;
    this._rqAnimationFrame = null;
    this._waitCallbackId = null;
    this._currentFrame = 0;
    this._frameRate = 60;
    this._delay = 0;
};

LottieManager.prototype._cubicBezier = function (A, B, C, D, t) {
    if (t == 0) return A;
    if (t == 1) return D;

    var s = 1 - t;
    return 1 * Math.pow(s, 3) * A + 3 * Math.pow(s, 2) * t * B + 3 * s * Math.pow(t, 2) * C + Math.pow(t, 3) * D;
};
LottieManager.prototype._getEasingArray = function (step, easing) {
    var array = new Array(step + 1);
    var A, B, C, D;
    switch (easing) {
        default:
            A = 0.4;
            B = 0;
            C = 0.6;
            D = 1;
            break;
    }

    for (var i = 0; i <= step; i++) array[i] = this._cubicBezier(0, B, D, 1, i / step); // y좌표 기준
    return array;
};

LottieManager.prototype.fromTo = function (fromFrame, toFrame, duration, easing) {
    var _this = this;
    var diffFrame = toFrame - fromFrame;
    var minFrame = Math.ceil(1000 / this._frameRate);
    var step = Math.floor((duration * 1000) / minFrame);
    var easingArray = this._getEasingArray(step, easing);

    var i = 0;
    function callback() {
        _this.setFrame(fromFrame + diffFrame * easingArray[i++]);
        if (i <= step) _this._rqAnimationFrame = requestAnimationFrame(callback);
    }
    if (this._rqAnimationFrame) cancelAnimationFrame(this._rqAnimationFrame);
    if (this._waitCallbackId) clearTimeout(this._waitCallbackId);
    this._waitCallbackId = setTimeout(function () {
        _this._rqAnimationFrame = requestAnimationFrame(callback);
    }, this._delay);
    this._delay = 0;
};
LottieManager.prototype.to = function (toFrame, duration, easing) {
    this.fromTo(this._currentFrame, toFrame, duration, easing);
};

LottieManager.prototype.setFrame = function (value) {
    this._animation.goToAndStop(value >= 0 ? value : 0, true);
    this._currentFrame = value;
};
LottieManager.prototype.play = function () {
    this._animation.play();
};
LottieManager.prototype.setSpeed = function (value) {
    this._animation.setSpeed(value);
};
LottieManager.prototype.getDuration = function (isFrames) {
    return this._animation.getDuration(isFrames);
};
LottieManager.prototype.delay = function (value) {
    this._delay = value * 1000;
};

/*
    END LottieManager
    ==================================================
*/