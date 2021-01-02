/**
  * ScrollEventManager.js
  * 
  * NOTE:
  * NEED TweenMax Plugin.
  * 
  * EXAMPLE:
  * var section1 = document.querySelector(".section-01");
  * var scrollEventManager = new ScrollEventManager();
  * scrollEventManager
  *     .setGlobalTimeScale(0.75)
  *     .setGlobalDelay(0.5)
  *     .registerTimelines(section1, 0.3, function () {
  *         var pcTL = scrollEventManager.createTimeline();
  *         var moTL = scrollEventManager.createTimeline();
  *  
  *         pcTL.fromTo(section1, 10, { backgroundColor: "#ffffff" }, { backgroundColor: "#000000" });
  *         moTL.fromTo(section1, 10, { backgroundColor: "#ffffff" }, { backgroundColor: "#ff0000" });
  *         return [
  *             ["(max-width:759px)", moTL],
  *             ["all", pcTL],
  *         ];
  *     })
  *     .dispatch();
  */

/*
    ==================================================
    Matrix - by transform
*/
function Matrix() { this.initialize.apply(this, arguments); }
Matrix.prototype.initialize = function (createData) {
    this.matrix = this.create(createData);
};
Matrix.prototype.create = function (createData) {
    var matrix = new Array(3).fill(0).map(function () { return new Array(3).fill(0); });
    var data = null;
    switch (typeof createData) {
        case "string":
            createData = createData.match(/matrix\((.*)\)/);
            data = createData ? createData[1].split(",").map(function (x) { return +x; }) : [1, 0, 0, 1, 0, 0];
            break;
        default:
            data = [1, 0, 0, 1, 0, 0];
            break;
    }
    matrix[0][0] = data[0];
    matrix[1][0] = data[1];
    matrix[0][1] = data[2];
    matrix[1][1] = data[3];
    matrix[0][2] = data[4];
    matrix[1][2] = data[5];
    matrix[2][2] = 1;
    return matrix;
}
Matrix.prototype.mul = function (descData) {
    var desc = this.create(descData);
    var result = new Array(3).fill(0).map(function () { return new Array(3).fill(0); });
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                result[i][j] += this.matrix[i][k] * desc[k][j];
            }
        }
    }
    this.matrix = result;
    return this;
}
Matrix.prototype.getMatrix = function () { return this.matrix; }
/*
    END Matrix
    ==================================================
*/

/*
    ==================================================
    TimelineBySM - Timeline by ScrollManager
*/
function TimelineBySM() {
    this.initialize.apply(this, arguments);
}

TimelineBySM.prototype.initialize = function (options, unit) {
    this._unit = unit || "px";
    this._timeline = new TimelineMax(options).pause();
    this._initCallbackList = [];
    this._tweenMaxAffectData = [];
};
TimelineBySM.prototype.isExistUnit = function (x) { return parseInt(x) !== x; };
TimelineBySM.prototype.getTimeline = function () { return this._timeline; };
TimelineBySM.prototype.removeStyle = function (target) {
    var removePropertyArray = ["left", "right", "bottom", "top", "width", "height", "opacity"]; // need change static val;
    function _rs(t) {
        for (var i = 0, len = removePropertyArray.length; i < len; i++) {
            t.style.removeProperty(removePropertyArray[i]);
        }
        t.style = {}; // IE, not working
    }

    var len = target.length;
    if (!len)
        _rs(target);
    else
        for (var i = 0; i < len; i++) { this.removeStyle(target[i]); }
};

TimelineBySM.prototype.reset = function () {
    this._timeline.pause().progress(0);
    for (var i = 0, len = this._tweenMaxAffectData.length; i < len; i++) {
        this.removeStyle(this._tweenMaxAffectData[i][0]); // param: target
    }
};
TimelineBySM.prototype.assignStyle = function (element, obj) {
    function _as(element, obj) {
        var keys = Object.keys(obj).filter(function (x) {
            return ["x", "y", "scale", "rotation"].indexOf(x) < 0;
        });
        for (var i = 0, len = keys.length; i < len; i++) {
            switch (keys[i]) {
                case "right":
                case "left":
                case "top":
                case "bottom":
                    element.style[keys[i]] = obj[keys[i]] + this.isExistUnit(obj[keys[i]]) ? "" : this._unit;
                    break;
                default:
                    element.style[keys[i]] = obj[keys[i]];
                    break;
            }
        }

        var x = obj["x"] || 0;
        var y = obj["y"] || 0;
        var scale = obj["scale"] === undefined ? 1 : obj["scale"];
        var rotation = obj["rotation"] || 0;
        var deg = Math.PI * rotation / 180;

        var matrix = new Matrix(window.getComputedStyle(element).transform)
            .mul([scale, 0, 0, scale, 0, 0]) // scale
            .mul([Math.cos(deg), Math.sin(deg), -Math.sin(deg), Math.cos(deg), 0, 0]) // rotate
            .mul([1, 0, 0, 1, x, y]) // translate
            .getMatrix();

        element.style.transform = "matrix(" + [matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]].join(",") + ")";
    }

    var len = element.length;
    if (!len) {
        _as(element, obj);
    } else {
        for (var i = 0; i < len; i++) {
            this.assignStyle(element[i], obj);
        }
    }
};
TimelineBySM.prototype.init = function () {
    this.reset();
    for (var len = this._initCallbackList.length, i = 0; i < len; i++) {
        this._initCallbackList[i]();
    }
    for (var len = this._tweenMaxAffectData.length, i = len - 1; i >= 0; i--) {
        this.assignStyle(this._tweenMaxAffectData[i][0], this._tweenMaxAffectData[i][1]); // target, vars
    }
};

TimelineBySM.prototype.timeScale = function (timeScale) {
    if (timeScale === undefined) {
        return this._timeline.timeScale();
    } else {
        this._timeline.timeScale(timeScale);
        return this;
    }
};
TimelineBySM.prototype.delay = function (delay) {
    if (delay === undefined) {
        return this._timeline.delay();
    } else {
        this._timeline.delay(delay);
        return this;
    }
};
TimelineBySM.prototype.progress = function (progress) {
    if (progress === undefined) {
        return this._timeline.progress();
    } else {
        this._timeline.progress(progress);
        return this;
    }
};

TimelineBySM.prototype.to = function (target, duration, vars, position) {
    this._timeline.to(target, duration, vars, position);
    return this;
};
TimelineBySM.prototype.fromTo = function (target, duration, fromVars, toVars, position) {
    this._tweenMaxAffectData.push([target, fromVars]);
    // this._timeline.fromTo(target, duration, fromVars, toVars, position);
    this._timeline.set(target, fromVars, position);
    this._timeline.to(target, duration, toVars, position);
    return this;
};
TimelineBySM.prototype.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteScope) {
    this._tweenMaxAffectData.push([targets, fromVars]);
    this._timeline.staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteScope);
    return this;
};
TimelineBySM.prototype.set = function (target, vars, position) {
    this._tweenMaxAffectData.push([target, vars]);
    this._timeline.set(target, vars, position);
    return this;
};
TimelineBySM.prototype.add = function (value, position, align, stagger) {
    if (value instanceof TimelineBySM) {
        this._tweenMaxAffectData = this._tweenMaxAffectData.concat(value._tweenMaxAffectData);
        value = value.getTimeline();
    }
    this._timeline.add(value, position, align, stagger);
    return this;
};
TimelineBySM.prototype.play = function (from, suppressEvents) {
    this._timeline.play(from, suppressEvents);
    return this;
};
TimelineBySM.prototype.pause = function (atTime, suppressEvents) {
    this._timeline.pause(atTime, suppressEvents);
    return this;
};
TimelineBySM.prototype.addLabel = function (label, position) {
    this._timeline.addLabel(label, position);
    return this;
};
TimelineBySM.prototype.call = function (callback, params, scope, position) {
    this._timeline.call(callback, params, scope, position);
    return this;
};
TimelineBySM.prototype.registerInitCallback = function (callback) {
    // 초기화시 실행되는 callback
    this._initCallbackList.push(callback);
    return this;
};
/*
    END TimelineBySM
    ==================================================
*/

/*
    ==================================================
    ScrollEventManager
*/
function ScrollEventManager() {
    this.initialize.apply(this, arguments);
}

ScrollEventManager.prototype.initialize = function (type) {
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
    return new TimelineBySM().delay(this._globalDelay).timeScale(this._globalTimeScale);
};
ScrollEventManager.prototype.registerTimeline = function (target, marginRate, callback) {
    var timeline = this.createTimeline();
    timeline = callback(timeline) || timeline;
    timeline.init();

    this.register(target, marginRate, function () {
        timeline.play();
    });
    return this;
};
ScrollEventManager.prototype.registerTimelines = function (target, marginRate, callback) {
    var i, len, curIndex;
    var mediaQuery, timeline, timelineArray;
    var data = callback();

    len = data.length;
    timelineArray = [];
    for (i = 0; i < len; i++) {
        mediaQuery = data[i][0];
        timeline = data[i][1];

        timeline.reset();
        timelineArray.push(timeline);
    }
    for (i = 0; i < len; i++) {
        mediaQuery = data[i][0];
        if (window.matchMedia(mediaQuery).matches) {
            timelineArray[i].init();
            break;
        }
    }

    curIndex = -1;
    function responseTimeline() {
        var i, j;
        var isFinish = false;
        var maxProgress, progress;
        var mediaQuery, timeline;

        maxProgress = 0;
        for (i = 0; i < len; i++) {
            progress = timelineArray[i].progress() || 0;
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
            timeline = data[i][1];

            if (window.matchMedia(mediaQuery).matches) {
                if (i !== curIndex) {
                    for (j = 0; j < len; j++) {
                        timelineArray[j].reset();
                    }
                    timeline.init();
                    timeline.progress(maxProgress).play();
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