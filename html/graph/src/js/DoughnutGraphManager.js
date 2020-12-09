import ProgressBar from '@/progressbar';

function DoughnutGraphManager() { this.initialize.apply(this, arguments); }
DoughnutGraphManager.prototype.initialize = function ({ container, rateData, colorList, duration, strokeWidth }) {
    this.canvas = document.querySelector(container);
    this.color = colorList;
    this.length = colorList.length;
    this.duration = duration;
    this.strokeWidth = strokeWidth;
    this.circleRate = this._arrangeData(rateData);
    this.init();
}
DoughnutGraphManager.prototype.init = function () {
    this.pElem = this._createElement();
}
DoughnutGraphManager.prototype._arrangeData = function (data) {
    const len = this.length;
    for (let i = 1; i < len; i++) {
        data[i] += data[i - 1];
    }
    return data.map(x => x / data[len - 1]);
}
DoughnutGraphManager.prototype._createElement = function () {
    const len = this.length;
    const style = window.getComputedStyle(this.canvas);
    const height = style.height;
    const width = style.width;
    const position = style.position;
    const pElem = [];

    if (position === "static") this.canvas.style.position = "relative";
    for (let i = 0; i < len; i++) {
        this.canvas.insertAdjacentHTML("beforeend", `
                        <div class="circle${i}" style="width:${width};height:${height};position:absolute;left:0;top:0;z-index:${len - i}"></div>
                    `);
        pElem.push(new ProgressBar.Circle(`.circle${i}`, {
            strokeWidth: this.strokeWidth,
            color: this.color[i],
            easing: "easeInOut",
            duration: this.duration,
        }));
    }
    return pElem;
}

DoughnutGraphManager.prototype.start = function () {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        this.pElem[i].animate(this.circleRate[i]);
    };
}

export default DoughnutGraphManager;