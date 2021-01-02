function ScrollTimelineManager() { this.initialize.apply(this, arguments); }
ScrollTimelineManager.prototype.initialize = function () {
    this.tl = new TimelineMax().pause();
    this.isStart = false;
    this.init();
}
ScrollTimelineManager.prototype.init = function () {
    const wrap = document.querySelector("#wrap");
    wrap.style.height = document.querySelectorAll(".section").length * 100 + "vh";

    const section02 = document.querySelector(".section-02");
    this.tl.fromTo(section02, 1, { y: 0, opacity: 0 }, { y: 800, opacity: 1 });
}
ScrollTimelineManager.prototype.handleScroll = function (yOffset) {
    const maxYOffset = document.body.clientHeight - (window.innerHeight - 16);
    console.log(yOffset);

    this.tl.seek(Math.max(yOffset / 1000 - 1, 0));
}
ScrollTimelineManager.prototype.start = function (callback = this.handleScroll.bind(this)) {
    if (!this.isStart) {
        this.isStart = true;
        var tick = false;
        function handlingScrollEvent() {
            var pageYOffset = window.pageYOffset;
            if (!tick) {
                tick = true;
                window.requestAnimationFrame(function () {
                    callback(pageYOffset);
                    tick = false;
                });
            }
        }
        window.addEventListener("scroll", handlingScrollEvent);
    }
}