window.addEventListener("load", function () {
    var section1 = document.querySelector(".section1");
    var section2 = document.querySelector(".section2");
    var target = document.querySelectorAll(".section1 .ball");
    var target2 = document.querySelectorAll(".section2 .ball");

    var manager = new ScrollEventManager();
    var timeline1 = new TimelineSJ().delay(0.5);
    timeline1.fromTo(
        target,
        6,
        { y: 0 },
        {
            y: 500,
        }
    );
    var timeline2 = new TimelineSJ().delay(0.5);
    timeline2.fromTo(
        target,
        6,
        { x: 0 },
        {
            x: 500,
        }
    );
    var timeline3 = new TimelineSJ().delay(0.5);
    timeline3.fromTo(
        target2,
        6,
        { y: 0 },
        {
            y: 500,
        }
    );
    var timeline4 = new TimelineSJ().delay(0.5);
    timeline4.fromTo(
        target2,
        6,
        { x: 0 },
        {
            x: 500,
        }
    );

    manager.registerTimeline(section1, 0.2, [
        ["(max-width:1300px)", timeline1],
        ["all", timeline2],
    ]);
    manager.registerTimeline(section2, 0.2, [
        ["(max-width:1300px)", timeline3],
        ["all", timeline4],
    ]);
    manager.dispatch();
});
