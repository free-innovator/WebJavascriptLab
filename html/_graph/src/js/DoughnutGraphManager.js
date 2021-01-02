import ProgressBar from '@/progressbar';

function DoughnutGraphManager() { this.initialize.apply(this, arguments); }
DoughnutGraphManager.prototype.initialize = function ({ container, data, duration, strokeWidth, percentMin }) {
    this.canvas = document.querySelector(container);
    this.length = data.length;
    this.duration = duration;
    this.strokeWidth = strokeWidth;
    this.percentMin = percentMin;
    this.orgData = data;
    this.color = [];
    this.vData = [];
    this.circleRate = null;
    this.init();
}
DoughnutGraphManager.prototype.init = function () {
    this._arrangeData();
    this.pElem = this._createElement();
}
DoughnutGraphManager.prototype._arrangeData = function () {
    this.orgData.forEach(([value, color]) => {
        this.vData.push(value);
        this.color.push(color);
    });

    const len = this.length;
    const ret = new Array(len);
    ret[0] = this.vData[0];
    for (let i = 1; i < len; i++) {
        ret[i] = ret[i - 1] + this.vData[i];
    }
    this.circleRate = ret.map(x => x / ret[len - 1]);
}
DoughnutGraphManager.prototype._createElement = function () {
    const len = this.length;
    const style = window.getComputedStyle(this.canvas);
    const height = style.height;
    const position = style.position;
    const pElem = [];

    if (position === "static") this.canvas.style.position = "relative";
    for (let i = 0; i < len; i++) {
        this.canvas.insertAdjacentHTML("beforeend", `
                        <div class="circle${i}" style="width:100%;position:absolute;left:0;top:0;bottom:0;z-index:${len - i}"></div>
                    `);
        pElem.push(new ProgressBar.Circle(`.circle${i}`, {
            strokeWidth: this.strokeWidth,
            color: this.color[i],
            easing: "easeInOut",
            duration: this.duration,
            svgStyle: {
                display: 'block',
                width: '100%'
            }
        }));
    }

    const sum = this.vData.reduce((a, c) => a + c);
    const pivot = 0.5 - (this.strokeWidth * 2 / parseInt(height));
    this.canvas.insertAdjacentHTML("beforeend", `
        <ul class="percent-list" style="display:block;width:100%;position:absolute;left:0;top:0;bottom:0;z-index:100;">
            ${this.vData.map((x, i) => {
        const percent = Math.round(x / sum * 100);
        const deg = Math.PI * ((i ? (this.circleRate[i] + this.circleRate[i - 1]) : this.circleRate[0]) + 0.5);
        return `<li class="percent" style="
                        ${percent < this.percentMin ? "display:none;" : "display:block;"}
                        position:absolute;left:${(0.5 - pivot * Math.cos(deg)) * 100}%;top:${(0.5 - pivot * Math.sin(deg)) * 100}%;
                        opacity:0;
                        text-align:center;transform:translate(-50%,-50%);transition:opacity 0.3s ease-in-out;"
                    >${Math.round(percent)}%</li>`
    }).join("")
        }
        </ul >
    `);

    this._percentElems = Array.prototype.slice.call(this.canvas.querySelectorAll(".percent"));
    return pElem;
}

DoughnutGraphManager.prototype.start = function () {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        this.pElem[i].animate(this.circleRate[i], null, () => {
            this._percentElems[i].style.opacity = 1;
        });
    };
}

export default DoughnutGraphManager;