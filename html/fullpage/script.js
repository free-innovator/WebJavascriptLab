function ScriptManager() { this.initialize.apply(this, arguments); }
ScriptManager.prototype.initialize = function () {
    this.tl = new TimelineMax().pause();
    this.isStart = false;
    this.init();
}
ScriptManager.prototype.init = function () {
    const wrap = document.querySelector("#wrap");
    wrap.style.height = document.querySelectorAll(".section").length * 100 + "vh";

    const section02 = document.querySelector(".section-02");
    this.tl.fromTo(section02, 1, { y: 0, opacity: 0 }, { y: 800, opacity: 1 });
}
ScriptManager.prototype.handleScroll = function (yOffset) {
    const maxYOffset = document.body.clientHeight - (window.innerHeight - 16);
    console.log(yOffset);

    this.tl.seek(Math.max(yOffset / 1000 - 1, 0));
}
ScriptManager.prototype.start = function (callback = this.handleScroll.bind(this)) {
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

// window.addEventListener("load", function () {
//     const manager = new ScriptManager();
//     manager.start();
// });

window.addEventListener("load", function () {
    var section1 = document.querySelector(".section-01");
    var scrollEventManager = new ScrollEventManager();
    scrollEventManager
        .setGlobalTimeScale(0.75)
        .setGlobalDelay(0.5)
        .registerTimelines(section1, 0.3, function () {
            var pcTL = scrollEventManager.createTimeline();
            var moTL = scrollEventManager.createTimeline();

            pcTL.fromTo(section1, 10, { backgroundColor: "#ffffff" }, { backgroundColor: "#000000" });
            moTL.fromTo(section1, 10, { backgroundColor: "#ffffff" }, { backgroundColor: "#ff0000" });
            return [
                ["(max-width:759px)", moTL],
                ["all", pcTL],
            ];
        })
        .dispatch();
});