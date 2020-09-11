/*
    ==================================================
    TimelineSJ
*/
function TimelineSJ() {
    this.initialize.apply(this, arguments);
}

TimelineSJ.prototype.initialize = function () {
    this._timeline = this._createTimeline();
    this._tweenMaxAffectElements = [];
};

TimelineSJ.prototype._createTimeline = function (options) {
    return new TimelineMax(options).pause();
};
TimelineSJ.prototype.getTimeline = function () {
    return this._timeline;
};
TimelineSJ.prototype.reset = function () {
    var i, j, len, len2;
    this._timeline.progress(0).pause();

    len = this._tweenMaxAffectElements.length;
    for (i = 0; i < len; i++) {
        len2 = this._tweenMaxAffectElements[i].length;
        if (!len2) {
            this._tweenMaxAffectElements[i].style = {};
        } else {
            for (j = 0; j < len2; j++) {
                this._tweenMaxAffectElements[i][j].style = {};
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
    this._tweenMaxAffectElements.push(target);
    this._timeline.to(target, duration, vars, position);
    return this;
};
TimelineSJ.prototype.fromTo = function (target, duration, fromVars, toVars, position) {
    this._tweenMaxAffectElements.push(target);
    this._timeline.fromTo(target, duration, fromVars, toVars, position);
    return this;
};
TimelineSJ.prototype.set = function (target, vars, position) {
    this._tweenMaxAffectElements.push(target);
    this._timeline.set(target, vars, position);
    return this;
};
TimelineSJ.prototype.play = function (from, suppressEvents) {
    this._timeline.play(from, suppressEvents);
    return this;
};
/*
    END TimelineSJ
    ==================================================
*/
