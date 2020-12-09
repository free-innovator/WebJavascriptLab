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
    this._initCallbackList = [];
    this._tweenMaxAffectData = [];
    this._removePropertyArray = ["left", "right", "bottom", "top", "width", "height", "opacity"]; // need change static val
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
TimelineSJ.prototype._createMatrix = function (transformData) {
    var matrix = new Array(3).fill(0).map(_ => new Array(3).fill(0));
    var data = null;
    switch (typeof transformData) {
        case "string":
            transformData = transformData.match(/matrix\((.*)\)/);
            data = transformData ? transformData[1].split(",").map(function (x) { return +x; }) : [1, 0, 0, 1, 0, 0];
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
TimelineSJ.prototype._mulMatrix = function (src, desc) {
    var matrix = new Array(3).fill(0).map(_ => new Array(3).fill(0));
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                matrix[i][j] += src[i][k] * desc[k][j];
            }
        }
    }
    return matrix;
}
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

    var matrix = this._createMatrix(window.getComputedStyle(element).transform);

    var x, y, scale, rotation;
    x = obj["x"] || 0;
    y = obj["y"] || 0;
    scale = obj["scale"] === undefined ? 1 : obj["scale"];
    rotation = obj["rotation"] || 0;
    deg = Math.PI * rotation / 180;

    matrix = this._mulMatrix(matrix, this._createMatrix([scale, 0, 0, scale, 0, 0])); // scale
    matrix = this._mulMatrix(matrix, this._createMatrix([Math.cos(deg), Math.sin(deg), -Math.sin(deg), Math.cos(deg), 0, 0])); // rotate
    matrix = this._mulMatrix(matrix, this._createMatrix([1, 0, 0, 1, x, y])); // translate
    element.style.transform = "matrix(" + [matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]].join(",") + ")";
};

TimelineSJ.prototype.getTimeline = function () {
    return this._timeline;
};
TimelineSJ.prototype.reset = function () {
    var _this = this;
    function removeStyle(target) {
        var i, len;
        len = target.length;
        if (!len) {
            _this._removeStyle(target);
        } else {
            for (i = 0; i < len; i++) {
                removeStyle(target[i]);
            }
        }
    }

    var i, len;
    var target;

    this._timeline.pause().progress(0);
    len = this._tweenMaxAffectData.length;
    for (i = 0; i < len; i++) {
        target = this._tweenMaxAffectData[i][0];
        removeStyle(target);
    }
};
TimelineSJ.prototype.init = function () {
    var _this = this;
    function assignStyle(element, obj) {
        var i, len;
        len = element.length;
        if (!len) {
            _this._assignStyle(element, obj);
        } else {
            for (i = 0; i < len; i++) {
                assignStyle(element[i], obj);
            }
        }
    }

    var i, len;
    var target, vars;

    this.reset();
    len = this._initCallbackList.length;
    for (i = 0; i < len; i++) {
        this._initCallbackList[i]();
    }

    len = this._tweenMaxAffectData.length;
    for (i = len - 1; i >= 0; i--) {
        target = this._tweenMaxAffectData[i][0];
        vars = this._tweenMaxAffectData[i][1];
        assignStyle(target, vars);
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
    // this._timeline.fromTo(target, duration, fromVars, toVars, position);
    this._timeline.set(target, fromVars, position);
    this._timeline.to(target, duration, toVars, position);
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
TimelineSJ.prototype.registerInitCallback = function (callback) {
    // 초기화시 실행되는 callback
    this._initCallbackList.push(callback);
    return this;
};
/*
    END TimelineSJ
    ==================================================
*/