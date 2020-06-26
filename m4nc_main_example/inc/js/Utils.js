//=============================================================================
// Utils.js v0.4.0
//=============================================================================
(function(global){
    /** 
     *  cubicBezier
     * 
     *  3차 베지에 곡선
     * 
     *  ref = https://blog.coderifleman.com/2017/03/19/bezier-curves-for-frontend-engineer-3/
     * 
     *  @version 1.0 
     */
    function cubicBezier(A, B, C, D, t){
        if(t === 0) return A;
        if(t === 1) return D;
        
        var s = 1 - t;
        return ( // s^3*A + 3*s^2*t*B + 3*s*t^2*C + t^3*D
            1 * Math.pow(s, 3) * A
        + 3 * (Math.pow(s, 2) * t) * B
        + 3 * (s * Math.pow(t, 2)) * C
        + Math.pow(t, 3) * D
        );
    }

    /**
     * Utils
     * 
     * 유용한 함수를 구현해놓는 객체
     * 
     * @version 0.1
     * @author Sejong Park
     */
    function Utils(){
        throw new Error('This is a static class');
    } 

    /**
     * Utils.getEasingArray
     * 
     * 베지에 곡선 계산 값을 배열로 반환한다.
     * 
     * @version 0.1
     * @author Sejong Park
     */
    Utils.getEasingArray = function(type, size, data){
        var array = new Array(size + 1);
        var A, B, C, D;

        type = type || 'ease';
        switch(type){
            case 'ease':
                A = 0.25;
                B = 0.1;
                C = 0.25;
                D = 1;
                break;
            case 'custom':
                if(!(data && data.length === 4)) 
                    throw new Error('invalid data');
                A = data[0];
                B = data[1];
                C = data[2];
                D = data[3];
                break;
            default:
                throw new Error('not exist type - easing function');
        }
        
        A = 0;
        C = 1;
        for(var i=0; i<=size; i++)
        array[i] = cubicBezier(A, B, D, C, i/size); // y좌표 기준
        return array;
    }

    /**
     * Utils.getRandomArbitrary
     * 
     * ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     * 
     * @version 0.1 
     */
    Utils.getRandomArbitrary = function(min, max){
        return Math.random() * (max - min) + min;
    }

    /**
     * Utils.getRandomNumber
     * 
     * [min ~ max) 범위의 숫자를 랜덤하게 반환합니다.
     * 
     * @version 0.1 
     */
    Utils.getRandomNumber = function(min, max){
        return parseInt(Utils.getRandomArbitrary(min, max));
    }

    /**
     * Utils.getDivElement
     * 
     * css를 적용한 div 태그를 반환합니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils.getDivElement = function(cssText, innerHTML){
        var retElement = document.createElement('div');
        retElement.style.cssText = cssText;
        retElement.innerHTML = innerHTML || "";
        return retElement;
    }


    /**
     * Utils._parseElementTransform
     * 
     * element transform를 파싱하고 해당 배열을 반환합니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils._parseElementTransform = function(element){
        var originTransform = element.style.transform;
        var reg = /([^(|\s]+)\(([^)]+)\)/gi;

        var transformData = [];
        var result = reg.exec(originTransform);
        while(result){
            transformData.push([result[1], result[2]]);
            result = reg.exec(originTransform);
        }
            
        return transformData;
    }

    /**
     * Utils.setElementTransformByFunc
     * 
     * element transform의 특정한 funcName을 가진 함수의 매개변수 값을 value로 바꿉니다. 없으면 추가합니다.
     * isBefore가 true면 앞에 추가합니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils.setElementTransformByFunc = function(element, funcName, value, isBefore){
        var willAddTransformStr = funcName + "(" + value + ") ";
        var transformData = Utils._parseElementTransform(element);
        var transformStr = "";
        var isExist = false;

        for(var i=0; i<transformData.length; i++){
            if(transformData[i][0] !== funcName){
                transformStr += (transformData[i][0] + "(" + transformData[i][1] + ") " );
            }else{
                isExist = true;
                transformStr += willAddTransformStr;
            }
        }
        if(!isExist){
            if(isBefore)
                transformStr = willAddTransformStr + transformStr;
            else
                transformStr += willAddTransformStr;
        }

        element.style.transform = transformStr;
    }

    /**
     * Utils.getElementTransformByFunc
     * 
     * element transform의 특정한 funcName을 가진 함수의 매개변수 값을 반환합니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils.getElementTransformByFunc = function(element, funcName){
        var transformData = Utils._parseElementTransform(element);
        var ret = null;

        for(var i=0; i<transformData.length; i++){
            if(transformData[i][0] === funcName){
                ret = transformData[i][1];
                break;
            }
        }
        return ret;
    }

    /**
     * Utils.accElementTransformValue
     * 
     * element transform의 특정한 funcName을 가진 함수의 매개변수 값을 누산합니다.
     * 현재 px만 계산 가능합니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils.accElementTransformByFunc = function(element, funcName, value){
        var willAddTransformStr = funcName + "(" + parseFloat(value) + "px) ";
        var transformData = Utils._parseElementTransform(element);
        var transformStr = "";
        var isExist = false;

        for(var i=0; i<transformData.length; i++){
            if(transformData[i][0] !== funcName){
                transformStr += (transformData[i][0] + "(" + transformData[i][1] + ") " );
            }else{
                isExist = true;
                transformStr += funcName + "(" + (value + parseFloat(transformData[i][1])) + "px) ";
            }
        }
        if(!isExist){
            transformStr += willAddTransformStr;
        }
        element.style.transform = transformStr;
    }

    /**
     * Utils.delayExecuteCode
     * 
     * callback 함수 실행을 paint 이후로 미룹니다.
     * 
     * @version 0.2
     * @author Sejong Park
     */
    Utils.delayExecuteCode = function(callback){
        window.requestAnimationFrame(function(){
            window.requestAnimationFrame(callback)
        });
    }

    /**
     * Utils.makeid
     * 
     * 랜덤 문자열 생성
     * ref: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
     * 
     * @version 1.0
     */
    Utils.makeid = function(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Utils.replaceRandomClassName
     * 
     * 클래스 이름을 랜덤으로 변경
     * 
     * @version 0.1
     * @author Sejong Park
     */
    Utils.replaceRandomClassName = function(element){
        if(element.className)
            element.className += "_" + Utils.makeid(8);

        // children = element.childNodes;
        // for(i = 0; i < children.length; i++){
        //     Utils.replaceRandomClassName(children[i]);
        // }
    }

    /**
     * Utils.replaceRandomId
     * 
     * 아이디를 랜덤으로 변경
     * 
     * @version 0.1
     * @author Sejong Park
     */
    Utils.replaceRandomId = function(element){
        if(element.id)
            element.id += "_" + Utils.makeid(8);
    }

    global.Utils = Utils;
})(this);

// export default Utils;