function ScrollTimelineManager() { this.initialize.apply(this, arguments); }
ScrollTimelineManager.prototype.initialize = function (options) {
    this.tl = new TimelineMax().pause().addLabel("start");
    this.isStart = false;
    this.options = options;
    this.init();
}
ScrollTimelineManager.prototype.init = function () {
    if (!this.options) throw new Error("not exist options");

    this.container = document.querySelector(this.options.container);
    this.children = Array.prototype.slice.call(this.container.children);
    this.setupBoundary();
}
ScrollTimelineManager.prototype.setupBoundary = function () {
    this.boundary = [];
    for (let i = 0, len = this.children.length; i < len; i++) {
        this.boundary.push(this.children[i].offsetTop + this.children[i].offsetHeight);
    }
    this._devMessage("this.boundary === " + this.boundary);
}
ScrollTimelineManager.prototype.handleScroll = function (yOffset) {
    let i = 0, len = this.children.length;
    while (i < len - 1 && this.boundary[i] <= yOffset) i++;

    var s = (i <= 0) ? 0 : this.boundary[i - 1];
    var f = this.boundary[i];
    var progress = Math.max(((yOffset - s) / (f - s) + i) * 100, 0);

    this._devMessage("progress === " + progress);
    this._devMessage("finish .handleScroll()");

    this.tl.seek(progress, false);
}
ScrollTimelineManager.prototype.handleResize = function () {
    this.setupBoundary();
    this.dispatch();
}
ScrollTimelineManager.prototype.dispatch = function () {
    var scrollEvent = document.createEvent("Event");
    scrollEvent.initEvent("scroll", true, true);
    this.container.dispatchEvent(scrollEvent);
    return this;
};
ScrollTimelineManager.prototype.add = function (sProgress, duration, target, fromVars, toVars) {
    if (!target) {
        this._devError("add() - not exist target");
    } else {
        sProgress = sProgress || 0.001;
        toVars = toVars || fromVars;
        duration = duration || 0.001;
        this.tl.fromTo(target, duration, fromVars, toVars, "start+=" + sProgress);
    }
    return this;
}
ScrollTimelineManager.prototype.start = function () {
    if (!this.isStart) {
        this.isStart = true;
        var tick = false;
        var scrollPage = document.body;
        var callback = this.handleScroll.bind(this);
        function handlingScrollEvent() {
            var scrollY = scrollPage.scrollTop;
            if (!tick) {
                tick = true;
                window.requestAnimationFrame(function () {
                    callback(scrollY);
                    tick = false;
                });
            }
        }
        scrollPage.addEventListener("scroll", handlingScrollEvent);
        this.dispatch();
        this._devMessage("finish .start()");
    }
}
ScrollTimelineManager.prototype._devMessage = function (msg) { if (this.options.dev) console.log("#dev ScrollTimelineManager message: " + msg); }
ScrollTimelineManager.prototype._devError = function (msg) { if (this.options.dev) console.error("#dev ScrollTimelineManager message: " + msg); }