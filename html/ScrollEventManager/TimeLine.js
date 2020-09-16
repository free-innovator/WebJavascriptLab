/*
    ==================================================
    TimelineSJ
*/
function TimelineSJ() {
    this.initialize.apply(this, arguments);
}

TimelineSJ.prototype.initialize = function () {
    this._unit = "px";
    this._timeline = this._createTimeline();
    this._callbackList = [];
    this._tweenMaxAffectData = [];
    this._removePropertyArray = ["left", "right", "bottom", "top", "width", "height"];
};

TimelineSJ.prototype._createTimeline = function (options) {
    return new TimelineMax(options).pause();
};
TimelineSJ.prototype._removeStyle = function (target) {
    var i, len;
    len = this._removePropertyArray.length;
    for (i = 0; i < len; i++) {
        target.style.removeProperty(this._removePropertyArray[i]);
    }
    target.style = {}; // IE, not working
};
TimelineSJ.prototype._assignStyle = function (element, obj) {
    var keys = Object.keys(obj).filter(function (x) {
        return ["x", "y", "scale", "rotation"].indexOf(x) < 0;
    });
    var len = keys.length;
    var i;
    for (i = 0; i < len; i++) {
        switch (keys[i]) {
            case "right":
            case "left":
            case "top":
            case "bottom":
                if (parseInt(obj[keys[i]]) === obj[keys[i]]) {
                    element.style[keys[i]] = obj[keys[i]] + this._unit;
                } else {
                    element.style[keys[i]] = obj[keys[i]];
                }
                break;
            default:
                element.style[keys[i]] = obj[keys[i]];
                break;
        }
    }

    var x, y, scale, rotation;
    x = obj["x"] || 0;
    y = obj["y"] || 0;
    scale = obj["scale"] === undefined ? 1 : obj["scale"];
    rotation = obj["rotation"] || 0;
    element.style.transform = "scale(" + scale + ") rotate(" + rotation + "deg) translate(" + x + this._unit + "," + y + this._unit + ")";
};

TimelineSJ.prototype.getTimeline = function () {
    return this._timeline;
};
TimelineSJ.prototype.reset = function () {
    var _removeStyle = this._removeStyle.bind(this);
    function removeStyle(target) {
        var i, len;
        len = target.length;
        if (!len) {
            _removeStyle(target);
        } else {
            for (i = 0; i < len; i++) {
                removeStyle(target[i]);
            }
        }
    }

    var i, len;
    var target;

    this._timeline.pause();
    len = this._tweenMaxAffectData.length;
    for (i = 0; i < len; i++) {
        target = this._tweenMaxAffectData[i][0];
        removeStyle(target);
    }
};
TimelineSJ.prototype.init = function () {
    var _assignStyle = this._assignStyle.bind(this);
    function assignStyle(element, obj) {
        var i, len;
        len = element.length;
        if (!len) {
            _assignStyle(element, obj);
        } else {
            for (i = 0; i < len; i++) {
                assignStyle(element[i], obj);
            }
        }
    }

    var i, len;
    var target, vars;

    this.reset();
    len = this._tweenMaxAffectData.length;
    for (i = len - 1; i >= 0; i--) {
        target = this._tweenMaxAffectData[i][0];
        vars = this._tweenMaxAffectData[i][1];
        assignStyle(target, vars);
    }

    len = this._callbackList.length;
    for (i = 0; i < len; i++) {
        this._callbackList[i]();
    }
};

TimelineSJ.prototype.timeScale = function (timeScale) {
    if (timeScale === undefined) {
        return this._timeline.timeScale();
    } else {
        this._timeline.timeScale(timeScale);
        return this;
    }
};
TimelineSJ.prototype.delay = function (delay) {
    if (delay === undefined) {
        return this._timeline.delay();
    } else {
        this._timeline.delay(delay);
        return this;
    }
};
TimelineSJ.prototype.progress = function (progress) {
    if (progress === undefined) {
        return this._timeline.progress();
    } else {
        this._timeline.progress(progress);
        return this;
    }
};

TimelineSJ.prototype.to = function (target, duration, vars, position) {
    this._timeline.to(target, duration, vars, position);
    return this;
};
TimelineSJ.prototype.fromTo = function (target, duration, fromVars, toVars, position) {
    this._tweenMaxAffectData.push([target, fromVars]);
    this._timeline.fromTo(target, duration, fromVars, toVars, position);
    // this._timeline.set(target, fromVars, position);
    // this._timeline.to(target, duration, toVars, position);
    return this;
};
TimelineSJ.prototype.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteScope) {
    this._tweenMaxAffectData.push([targets, fromVars]);
    this._timeline.staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteScope);
    return this;
};
TimelineSJ.prototype.set = function (target, vars, position) {
    this._tweenMaxAffectData.push([target, vars]);
    this._timeline.set(target, vars, position);
    return this;
};
TimelineSJ.prototype.add = function (value, position, align, stagger) {
    if (value instanceof TimelineSJ) {
        this._tweenMaxAffectData = this._tweenMaxAffectData.concat(value._tweenMaxAffectData);
        value = value.getTimeline();
    }
    this._timeline.add(value, position, align, stagger);
    return this;
};
TimelineSJ.prototype.play = function (from, suppressEvents) {
    this._timeline.play(from, suppressEvents);
    return this;
};
TimelineSJ.prototype.pause = function (atTime, suppressEvents) {
    this._timeline.pause(atTime, suppressEvents);
    return this;
};
TimelineSJ.prototype.addLabel = function (label, position) {
    this._timeline.addLabel(label, position);
    return this;
};
TimelineSJ.prototype.call = function (callback, params, scope, position) {
    this._timeline.call(callback, params, scope, position);
    return this;
};
TimelineSJ.prototype.registerCallback = function (callback) {
    this._callbackList.push(callback);
    return this;
};
/*
    END TimelineSJ
    ==================================================
*/
