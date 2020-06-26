//=============================================================================
// main.js  v0.8.0
//
// NOTE:
// 1. foreignObject태그는 IE에서 지원하지 않습니다.
//=============================================================================
var accentData = [
    [
        {        
            i: 0,
            j: 1,
            style: {
                width: "24px",
                height: "6px",
                top: "383px",
                left: "829px"
            }
        },            
        {
            i: 0,
            j: 1,
            style: {
                width: "22px",
                height: "6px",
                top: "398px",
                left: "829px"
            }
        },
        {
            i: 0,
            j: 1,
            style: {
                width: "24px",
                height: "6px",
                top: "413px",
                left: "829px"
            }
        },
        {
            i: 0,
            j: 1,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "828px"
            }
        },
        {
            i: 0,
            j: 2,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "860px"
            }
        },
        {
            i: 0,
            j: 2,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "882px"
            }
        },
        {
            i: 0,
            j: 4,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "936px"
            }
        },
        {
            i: 0,
            j: 5,
            style: {
                width: "30px",
                height: "6px",
                top: "383px",
                left: "952px"
            }
        },
        {
            i: 0,
            j: 5,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "963px"
            }
        },
        {
            i: 0,
            j: 6,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "991px"
            }
        },
        {
            i: 0,
            j: 8,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "1047px"
            }
        },
        {
            i: 0,
            j: 9,
            style: {
                width: "8px",
                height: "36px",
                top: "383px",
                left: "1074px"
            }
        }
    ],
    [
        {
            i: 1,
            j: 0,
            style: {
                width: "30px",
                height: "6px",
                top: "522px",
                left: "790px"
            }
        },
        {
            i: 1,
            j: 0,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "801px"
            }
        },
        {
            i: 1,
            j: 1,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "825px"
            }
        },
        {
            i: 1,
            j: 1,
            style: {
                width: "24px",
                height: "6px",
                top: "522px",
                left: "826px"
            }
        },
        {
            i: 1,
            j: 1,
            style: {
                width: "21px",
                height: "6px",
                top: "537px",
                left: "826px"
            }
        },
        {
            i: 1,
            j: 1,
            style: {
                width: "24px",
                height: "6px",
                top: "552px",
                left: "826px"
            }
        },
        {
            i: 1,
            j: 3,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "890px"
            }
        },
        {
            i: 1,
            j: 3,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "912px"
            }
        },
        {
            i: 1,
            j: 3,
            style: {
                width: "28px",
                height: "6px",
                top: "537px",
                left: "891px"
            }
        },
        {
            i: 1,
            j: 4,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "927px"
            }
        },
        {
            i: 1,
            j: 4,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "949px"
            }
        },
        {
            i: 1,
            j: 6,
            style: {
                width: "8px",
                height: "36px",
                top: "522px",
                left: "1001px"
            }
        },
        {
            i: 1,
            j: 6,
            style: {
                width: "22px",
                height: "6px",
                top: "552px",
                left: "1002px"
            }
        }
    ],
    [
        {
            i: 2,
            j: 0,
            style: {
                width: "30px",
                height: "6px",
                top: "661px",
                left: "790px"
            }
        },
        {
            i: 2,
            j: 0,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "801px"
            }
        },
        {
            i: 2,
            j: 1,
            style: {
                width: "28px",
                height: "6px",
                top: "676px",
                left: "840px"
            }
        },
        {
            i: 2,
            j: 1,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "839px"
            }
        },
        {
            i: 2,
            j: 1,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "861px"
            }
        },
        {
            i: 2,
            j: 2,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "890px"
            }
        },
        {
            i: 2,
            j: 3,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "919px"
            }
        },
        {
            i: 2,
            j: 3,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "941px"
            }
        },
        {
            i: 2,
            j: 4,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "970px"
            }
        },
        {
            i: 2,
            j: 5,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "1018px"
            }
        },
        {
            i: 2,
            j: 6,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "1047px"
            }
        },
        {
            i: 2,
            j: 6,
            style: {
                width: "8px",
                height: "36px",
                top: "661px",
                left: "1069px"
            }
        }
    ]
];

var COMMON_MIN_TRANSITION_TIME      = 900;
var COMMON_MAX_TRANSITION_TIME      = 1500;
var ACCENT_MIN_TRANSITION_TIME      = 700;
var ACCENT_MAX_TRANSITION_TIME      = 1300;
var ACCENT_THICK_TRANSITION_TIME    = 500;
var ACCENT_CREATE_TIME              = 600;
var ACCENT_MERGE_TIME               = 800;
var ACCENT_THICKNESS                = 16;
window.addEventListener('load', function(){
/********************************************************************************
    Intro Animation
********************************************************************************/
    var i;
    var animationElement = document.getElementById('animation');
    var canvasElement = document.querySelector('.canvas');
    var M4NCElements = document.querySelectorAll('.wrap-M4NC>div');
    var letterElements = document.querySelectorAll('.word>div');
    var titleWrapElement = document.querySelector('.wrap-title');
    var titleElements = document.querySelectorAll('.wrap-title>div');
    var plusElements = document.querySelectorAll('.wrap-plus>div');
    var liElements = document.querySelectorAll('.content .box-wrap>li');

    // bug fix.
    liElements[0].style.visibility = 'none';
    window.requestAnimationFrame((function(){
        window.requestAnimationFrame((function(){
            this.ele.style.display = 'display';
        }).bind(this));
    }).bind({ele: liElements[0]}));

    /* M4NC */
    var w = animationElement.offsetWidth, h = animationElement.offsetHeight, p = 100;
    var ow = (1920 - w)*0.5, oh = (1024 - h)*0.5;
    for(i=0; i<M4NCElements.length; i++){
        M4NCElements[i].style.left = (i%2 === 0)
            ? (Utils.getRandomArbitrary( p, (w - 340) * 0.5 - p ) + ow) + "px"
            : (Utils.getRandomArbitrary( (w - 340) * 0.5 + 340 + p, w - p ) + ow) + "px";
        M4NCElements[i].style.top = (i < 2)
            ? (Utils.getRandomArbitrary( p, h * 0.5 ) + oh) + "px"
            : (Utils.getRandomArbitrary( h * 0.5, h - p ) + oh) + "px";
    }
    Utils.delayExecuteCode(function(){
        var i;
        for(i=0; i<M4NCElements.length; i++){
            M4NCElements[i].style.transition = "1s";
        }
    });

    /* Letter */
    for(i=0; i<letterElements.length; i++){
        letterElements[i].style.top 
            = Utils.getRandomArbitrary(-window.innerHeight * 0.35, window.innerHeight * 0.35) + "px";
        letterElements[i].style.left 
            = Utils.getRandomArbitrary(-window.innerWidth * 0.4, window.innerWidth * 0.4) + "px";
    }

    canvasElement.style.display = "flex";
    /* Letter Animation */
    var transitionTime;
    for(i=0; i<letterElements.length; i++){
        transitionTime = Utils.getRandomNumber(
            COMMON_MIN_TRANSITION_TIME, 
            COMMON_MAX_TRANSITION_TIME
        );
        letterElements[i].style.transition = transitionTime*0.001 + "s";
        setTimeout((function(){
            letterElements[this.i].style.top = 0;
            letterElements[this.i].style.left = 0;
        }).bind({ i: i }), COMMON_MAX_TRANSITION_TIME - transitionTime);
    }

    setTimeout((function(){
        /* Accent */
        var i, j, k;
        var data, ele, accentParentNode, accentNode;
        var limitOffset;
        var startOffset = [382 - 540, 1007 - 960, 682 - 540];
        var accentOffset = [0, 0, 0];
        var plusLimitThick = [96, 126, 96];

        accentParentNode = document.getElementsByClassName('wrap-accent')[0];
        accentNode = [[], [], []];
        for(i=0; i<3; i++){
            limitOffset = (plusLimitThick[i] - ACCENT_THICKNESS);
            while(accentOffset[i] <= limitOffset){
                ele = document.createElement('div');
                switch(i){
                    case 0:
                        ele.style["background-color"] = "#53c0d0";
                        ele.style.width = "40px";
                        ele.style.height = ACCENT_THICKNESS + "px";
                        ele.style.left = 940 - 960 + "px";
                        ele.style.top = (startOffset[i] + accentOffset[i]) + "px";
                        break;
                    case 1:
                        ele.style["background-color"] = "#4d38d1";
                        ele.style.width = ACCENT_THICKNESS + "px";
                        ele.style.height = "40px";
                        ele.style.left = (startOffset[i] - accentOffset[i]) + "px"; 
                        ele.style.top = 520 - 540 + "px";
                        break;
                    case 2:
                        ele.style["background-color"] = "#ce4fe1";
                        ele.style.width = "40px";
                        ele.style.height = ACCENT_THICKNESS + "px";
                        ele.style.left = 940 - 960 + "px";
                        ele.style.top = (startOffset[i] - accentOffset[i]) + "px";
                        break;
                    default:
                        break;
                }
                accentNode[i].push(ele);
                accentParentNode.appendChild(ele);

                if(accentOffset[i] === limitOffset) break;                
                accentOffset[i] = Math.min(accentOffset[i] + (ACCENT_THICKNESS - 1), limitOffset);
            }
        }

        var k;
        var dw, dh, dl, dt;
        var nl, nt;
        var data, node;
        var rotateType;
        var accentAnimationTime;
        var maxAccentAnimationTime = 0;
        var timingArr, cntArr = [];
        for(i=0; i<3; i++){
            cntArr[i] = [];
            for(j=0; j<accentData[i].length; j++) 
                cntArr[i][j] = 0;
            
            for(j=0; j<accentNode[i].length; j++){
                timingArr = Utils.getEasingArray('custom', accentNode[i].length, [.25, 0, .25, 1]);
                accentAnimationTime = Utils.getRandomNumber(ACCENT_MIN_TRANSITION_TIME, ACCENT_MAX_TRANSITION_TIME);
                maxAccentAnimationTime = Math.max(accentAnimationTime, maxAccentAnimationTime);

                k = Utils.getRandomNumber(0, accentData[i].length);
                while( cntArr[i][k] > (j / accentData[i].length) )
                    k = (k + 1) % accentData[i].length;
                cntArr[i][k]++;

                data = accentData[i][k];
                node = accentNode[i][j];

                dw = parseInt(data.style.width);
                dh = parseInt(data.style.height);
                dl = parseInt(data.style.left) - 960;
                dt = parseInt(data.style.top) - 540;
                nl = parseInt(node.style.left);
                nt = parseInt(node.style.top);

                Utils.setElementTransformByFunc(node, 'translateX', (dl - nl) + 'px');
                Utils.setElementTransformByFunc(node, 'translateY', (dt - nt) + 'px');
                switch(i){
                    case 0:
                    case 2:                        
                        if(dw > dh){
                            node.style.width = data.style.width;
                            node.style.height = data.style.height;
                            rotateType = 0;
                        }
                        else{
                            node.style.width = data.style.height;
                            node.style.height = data.style.width;
                            rotateType = 1;
                            if(dl > 940) rotateType *= -1;
                            if(i === 2) rotateType *= -1;
                        }

                        if(rotateType === 1){
                            Utils.accElementTransformByFunc(node, 'translateX', dw);
                            Utils.setElementTransformByFunc(node, 'rotate', '90deg');
                        }
                        else if(rotateType === -1){
                            Utils.accElementTransformByFunc(node, 'translateY', dh);
                            Utils.setElementTransformByFunc(node, 'rotate', '-90deg')
                        }
                        break;
                    case 1:
                        if(dw < dh){
                            node.style.width = data.style.width;
                            node.style.height = data.style.height;
                        }
                        else{
                            node.style.width = data.style.height;
                            node.style.height = data.style.width;
                            Utils.accElementTransformByFunc(node, 'translateX', dw);
                            Utils.setElementTransformByFunc(node, 'rotate', '90deg');
                        }
                        break;
                    default:
                        break;
                }
                switch(i){
                    case 0:
                    case 2:
                        node.style.width = 0;
                        break;
                    case 1:
                        node.style.height = 0;
                        break;
                }

                node.style.transition = 
                    accentAnimationTime*0.001 + "s transform ease-in-out, " +
                    ACCENT_THICK_TRANSITION_TIME*0.001 + "s width, " +
                    ACCENT_THICK_TRANSITION_TIME*0.001 + "s height";

                // slide animation
                setTimeout((function(){
                    var dw = this.dw, dh = this.dh;
                    var node = this.node, data = this.data;
                    switch(data.i){
                        case 0:
                        case 2:
                            node.style.width = (dw > dh)? data.style.width : data.style.height;
                            break;
                        case 1:
                            node.style.height = (dw > dh)? data.style.width : data.style.height;
                            break;
                    }
                }).bind({dw: dw, dh: dh, node: node, data: data}), ACCENT_CREATE_TIME * timingArr[j+1]);

                setTimeout((function(){
                    var node = this.node;
                    var data = this.data;
                    node.style.transform = "";
                    switch(data.i){
                        case 0:
                        case 2:
                            node.style.width = "40px";
                            node.style.height = ACCENT_THICKNESS + "px";
                            break;
                        case 1:
                            node.style.width = ACCENT_THICKNESS + "px";
                            node.style.height = "40px";
                            break;
                    }
                    
                }).bind({ node: node, data: data }), ACCENT_CREATE_TIME + ACCENT_THICK_TRANSITION_TIME + ACCENT_MERGE_TIME * timingArr[j+1]);
            }
        }

        // plus animation
        setTimeout(function(){
            var i;

            titleWrapElement.style.display = "flex";
            plusElements[0].parentNode.style.display = "block";
            accentParentNode.parentNode.removeChild(accentParentNode);

            for(i=0; i<M4NCElements.length; i++)
                M4NCElements[i].style.opacity = 0;
            Utils.delayExecuteCode((function(){
                // plus
                Utils.setElementTransformByFunc(plusElements[0], "translateY", 50 + "px");
                plusElements[1].style.width = "200px";
                Utils.setElementTransformByFunc(plusElements[2], "translateY", -50 + "px");
                // title
                titleElements[0].style.opacity = 1;
                titleElements[0].style.transform = "translateY(0)";                
                titleElements[1].style.opacity = 1;
                titleElements[1].querySelectorAll('div')[0].style.width = 0;
                titleElements[1].querySelectorAll('div')[1].style.width = 0;
                titleElements[2].style.opacity = 1;
                titleElements[2].style.transform = "translateY(0)";
            }).bind(this));

            // frame animation
            setTimeout((function(){
                animationElement.style.height = "564px";
                animationElement.style.transform = "translateY(-50px)";
            }).bind(this), 800);

/********************************************************************************
    fadein animation
********************************************************************************/
            var liElements = document.querySelectorAll('.content .box-wrap>li');
            var showElement = liElements[0];
            var ei = 0; // element index
            var isShowing = false;
             
            var fadeinInterval = window.setInterval(function(){
                if(!isShowing){
                    isShowing = true;
                    if(showElement.getBoundingClientRect().top < window.innerHeight - 300){
                        showElement.style.opacity = 1;
                        showElement.style.transform = "translateY(0)";
                        
                        if(++ei >= liElements.length){
                            clearInterval(fadeinInterval);
                        }else{
                            showElement = liElements[ei];
                            showElement.style.display = 'block';
                        }
                    }
                    setTimeout(function(){
                        isShowing = false;
                    }, 300);
                }
            }, 100);

        }, maxAccentAnimationTime + ACCENT_CREATE_TIME + ACCENT_THICK_TRANSITION_TIME + ACCENT_MERGE_TIME - 150);
    }).bind(this), COMMON_MAX_TRANSITION_TIME + 500);

/********************************************************************************
    menu open
********************************************************************************/
    var btn_open_menu = document.getElementById('btn_open_menu');
    var btn_close_menu = document.getElementById('btn_close_menu');
    var menu = document.getElementById('menu');

    btn_open_menu.addEventListener('click', function(){
        menu.style.display = "block"; 
    });
    btn_close_menu.addEventListener('click', function(){
        menu.style.display = "none"; 
    });

/********************************************************************************
    hover animation
********************************************************************************/
    var boxElements = document.getElementsByClassName('box');
    var hoverTargets = document.querySelectorAll('#container .content .box-wrap>li');
    var cloneElements = [];

    switch(true){
        case /Trident/.test(navigator.userAgent): // IE
        default:
            for(i=0; i<boxElements.length; i++){
                cloneElements[i] = boxElements[i].cloneNode(true);
                Utils.replaceRandomClassName(cloneElements[i]);
                Utils.replaceRandomId(cloneElements[i]);
                boxElements[i].parentNode.appendChild(cloneElements[i]);
            }
            for(i=0; i<hoverTargets.length; i++){
                hoverTargets[i].addEventListener('mouseenter', (function(){
                    cloneElements[this.i].style.display = 'block';
                }).bind({ i: i }));
            }
            break;
    }
});