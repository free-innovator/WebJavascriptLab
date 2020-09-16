window.addEventListener("load", function () {
    var section1 = document.querySelector(".section1");
    var section2 = document.querySelector(".section2");

    var scrollEventManager = new ScrollEventManager();
    scrollEventManager
        .setGlobalTimeScale(0.75)
        .setGlobalDelay(0.5)
        .registerTimelines(section1, 0.3, function () {
            var pcTL = scrollEventManager.createTimeline();
            var moTL = scrollEventManager.createTimeline();
            var ball = document.querySelector(".section1 .ball");

            pcTL.fromTo(ball, 10, { x: 0 }, { x: 300 });
            moTL.fromTo(ball, 10, { y: 0 }, { y: 300 });
            return [
                ["(max-width:759px)", moTL],
                ["all", pcTL],
            ];
        })
        .registerTimelines(section2, 0.3, function () {
            var pcTL = scrollEventManager.createTimeline();
            var moTL = scrollEventManager.createTimeline();
            var ball = document.querySelector(".section2 .ball");

            pcTL.fromTo(ball, 10, { x: 0 }, { x: 300 });
            moTL.fromTo(ball, 10, { y: 0 }, { y: 300 });
            return [
                ["(max-width:759px)", moTL],
                ["all", pcTL],
            ];
        })
        .dispatch();
});
