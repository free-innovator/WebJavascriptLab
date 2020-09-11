/*
    ==================================================
    TimelineSJ
*/
function TimelineSJ() {
    this.initialize.apply(this, arguments);
}

TimelineSJ.prototype.initialize = function () {
    this._timeline = this._createTimeline();
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
TimelineSJ.prototype.getTimeline = function () {
    return this._timeline;
};
TimelineSJ.prototype.reset = function () {
    var i, j, len, len2;
    var target;

    this._timeline.pause();
    len = this._tweenMaxAffectData.length;
    for (i = 0; i < len; i++) {
        target = this._tweenMaxAffectData[i][0];
        len2 = target.length;
        if (!len2) {
            this._removeStyle(target);
        } else {
            for (j = 0; j < len2; j++) {
                this._removeStyle(target[j]);
            }
        }
    }
};
TimelineSJ.prototype.init = function () {
    function assignStyle(element, obj) {
        var keys = Object.keys(obj);
        var len = keys.length;
        var i;
        for (i = 0; i < len; i++) {
            switch (keys[i]) {
                case "right":
                case "left":
                case "top":
                case "bottom":
                    if (parseInt(obj[keys[i]]) === obj[keys[i]]) {
                        element.style[keys[i]] = obj[keys[i]] + "rem";
                    } else {
                        element.style[keys[i]] = obj[keys[i]];
                    }
                    break;
                default:
                    element.style[keys[i]] = obj[keys[i]];
                    break;
            }
        }
    }

    var i, j, len, len2;
    var target, vars;

    this.reset();
    len = this._tweenMaxAffectData.length;
    for (i = 0; i < len; i++) {
        target = this._tweenMaxAffectData[i][0];
        vars = this._tweenMaxAffectData[i][1];

        len2 = target.length;
        if (!len2) {
            assignStyle(target, vars);
        } else {
            for (j = 0; j < len2; j++) {
                assignStyle(target[j], vars);
            }
        }
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
/*
    END TimelineSJ
    ==================================================
*/