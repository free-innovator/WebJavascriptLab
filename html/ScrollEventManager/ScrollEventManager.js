/*
    ==================================================
    ScrollEventManager
*/
function ScrollEventManager() {
    this.initialize.apply(this, arguments);
}

ScrollEventManager.prototype.initialize = function () {
    this._globalTimeScale = 1;
    this._globalDelay = 0;
};

ScrollEventManager.prototype.isShowing = function (target, yOffset, marginRate) {
    return window.pageYOffset + target.getBoundingClientRect().top < yOffset + window.innerHeight * (1 - Math.max(0, Math.min(1, marginRate)));
};
ScrollEventManager.prototype.register = function (target, marginRate, callback) {
    var tick = false;
    function handlingScrollEvent() {
        var pageYOffset = window.pageYOffset;
        if (!tick) {
            tick = true;
            window.requestAnimationFrame(function () {
                if (ScrollEventManager.prototype.isShowing(target, pageYOffset, marginRate)) {
                    callback();
                    window.removeEventListener("scroll", handlingScrollEvent);
                }
                tick = false;
            });
        }
    }
    window.addEventListener("scroll", handlingScrollEvent);
    return this;
};
ScrollEventManager.prototype.isInArea = function (target, marginRate) {
    var minY = target.offsetTop;
    var maxY = minY + target.offsetHeight;
    var margin = window.innerHeight * (1 - marginRate);
    var pageYOffset = window.pageYOffset;

    if (minY === void 0 || maxY === void 0) {
        var len = target.length;
        minY = Number.MAX_SAFE_INTEGER;
        maxY = 0;

        for (let i = 0; i < len; i++) {
            minY = Math.min(minY, target[i].offsetTop);
            maxY = Math.max(maxY, target[i].offsetTop + target[i].offsetHeight);
        }
    }

    return minY - margin <= pageYOffset && pageYOffset < maxY - margin;
};
ScrollEventManager.prototype.registerArea = function (target, marginRate, callback) {
    var _this = this;
    var tick = false;
    var isInArea = false;
    function handlingEvent() {
        if (!tick) {
            tick = true;
            window.requestAnimationFrame(function () {
                if (_this.isInArea(target, marginRate)) {
                    if (!isInArea) {
                        callback();
                        isInArea = true;
                    }
                } else if (isInArea) {
                    isInArea = false;
                }
                tick = false;
            });
        }
    }
    window.addEventListener("scroll", handlingEvent);
    window.addEventListener("resize", function () {
        isInArea = false;
        ScrollEventManager.prototype.dispatch();
    });
    return this;
};
ScrollEventManager.prototype.dispatch = function () {
    var scrollEvent = document.createEvent("Event");
    scrollEvent.initEvent("scroll", true, true);
    window.dispatchEvent(scrollEvent);
    return this;
};

ScrollEventManager.prototype.createTimeline = function () {
    return new TimelineSJ().delay(this._globalDelay).timeScale(this._globalTimeScale);
};
ScrollEventManager.prototype.registerTimeline = function (target, marginRate, callback) {
    var timelineSJ = this.createTimeline();
    timelineSJ = callback(timelineSJ) || timelineSJ;
    timelineSJ.init();

    this.register(target, marginRate, function () {
        timelineSJ.play();
    });
    return this;
};
ScrollEventManager.prototype.registerFromTo = function (targets, marginRate, callback) {
    var retObj = callback();
    var duration = retObj.duration;
    var fromVars = retObj.fromVars;
    var toVars = retObj.toVars;

    if (!targets.length) targets = [targets];
    var targetLen = targets.length;
    for (var i = 0; i < targetLen; i++) {
        this.registerTimeline(targets[i], marginRate, function (tl) {
            tl.fromTo(targets[i], duration, fromVars, toVars);
        });
    }
    return this;
}
ScrollEventManager.prototype.registerTimelines = function (target, marginRate, callback) {
    var i, len, curIndex;
    var mediaQuery, timelineSJ, timelineSJArray;
    var data = callback();

    len = data.length;
    timelineSJArray = [];
    for (i = 0; i < len; i++) {
        mediaQuery = data[i][0];
        timelineSJ = data[i][1];

        timelineSJ.reset();
        timelineSJArray.push(timelineSJ);
    }
    for (i = 0; i < len; i++) {
        mediaQuery = data[i][0];
        if (window.matchMedia(mediaQuery).matches) {
            timelineSJArray[i].init();
            break;
        }
    }

    curIndex = -1;
    function responseTimeline() {
        var i, j;
        var isFinish = false;
        var maxProgress, progress;
        var mediaQuery, timelineSJ;

        maxProgress = 0;
        for (i = 0; i < len; i++) {
            progress = timelineSJArray[i].progress() || 0;
            if (progress < 1) {
                maxProgress = Math.max(maxProgress, progress);
            } else {
                maxProgress = 1;
                isFinish = true;
                break;
            }
        }

        if (isFinish) {
            // window.removeEventListener("resize", responseTimeline);
        }
        for (i = 0; i < len; i++) {
            mediaQuery = data[i][0];
            timelineSJ = data[i][1];

            if (window.matchMedia(mediaQuery).matches) {
                if (i !== curIndex) {
                    for (j = 0; j < len; j++) {
                        timelineSJArray[j].reset();
                    }
                    timelineSJ.init();
                    timelineSJ.progress(maxProgress).play();
                    curIndex = i;
                }
                break;
            }
        }
    }

    this.register(target, marginRate, function () {
        var resizeEvent = document.createEvent("Event");
        resizeEvent.initEvent("resize", true, true);
        window.addEventListener("resize", responseTimeline);
        window.dispatchEvent(resizeEvent);
    });
    return this;
};

ScrollEventManager.prototype.setGlobalTimeScale = function (globalTimeScale) {
    this._globalTimeScale = globalTimeScale;
    return this;
};
ScrollEventManager.prototype.setGlobalDelay = function (globalDelay) {
    this._globalDelay = globalDelay;
    return this;
};
/*
    END ScrollEventManager
    ==================================================
*/