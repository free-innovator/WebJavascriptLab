/*
    ==================================================
    ScrollEventManager
*/
function ScrollEventManager() {
    this.initialize.apply(this, arguments);
}

ScrollEventManager.prototype.initialize = function () {};

ScrollEventManager.prototype.isShowing = function (target, yOffset, marginRate) {
    return window.pageYOffset + target.getBoundingClientRect().top < yOffset + screen.availHeight * (1 - Math.max(0, Math.min(1, marginRate)));
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
    return handlingScrollEvent;
};
ScrollEventManager.prototype.dispatch = function () {
    var scrollEvent = document.createEvent("Event");
    scrollEvent.initEvent("scroll", true, true);
    window.dispatchEvent(scrollEvent);
};

ScrollEventManager.prototype.registerTimeline = function (target, marginRate, data) {
    var i, len, curIndex;
    var mediaQuery, timelineJS, timelineJSArray;

    len = data.length;
    timelineJSArray = [];
    for (i = 0; i < len; i++) {
        timelineJSArray.push(data[i][1]);
    }

    curIndex = -1;
    function responseTimeline() {
        var i;
        var isFinish = false;
        var maxProgress, progress;

        maxProgress = 0;
        for (i = 0; i < len; i++) {
            progress = timelineJSArray[i].progress();
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
            timelineJS = data[i][1];

            if (window.matchMedia(mediaQuery).matches) {
                if (i !== curIndex) {
                    if (curIndex >= 0) {
                        timelineJSArray[curIndex].reset();
                    }
                    timelineJS.progress(maxProgress).play();
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
};
/*
    END ScrollEventManager
    ==================================================
*/
