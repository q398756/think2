

/*
 JS获取url参数
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

/*
 JS修改url参数
 */
function setQueryVariable(variable, value) {
    var href = window.location.href;
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var str = href.substring(0, href.indexOf("?")+1);

    if( href.indexOf(variable) == -1){
        return href + "&" + variable + "=" + value;
    }
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            pair[1] = value;
        }
        str = str + pair[0] + "=" + pair[1] + "&";
    }
    return str.substring(0, str.length-1)
}

/*
 监察字符串是否符合手机号
 */
function checkMobile(num) {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(num))){
        console.log("不是完整的11位手机号或者正确的手机号前七位");
        return false;
    }else{
        return true;
    }
}

/*
 将cookie字符串转为json对象
 */
function cookieToJson(str) {// eg:"id=1002; nicknam=Darling; errmsg=0"
    var arr = str.split("; ")
    var result = {}, temp;
    for( var i=0; i<arr.length; i++){
        temp = arr[i].split("=");
        result[temp[0]] = temp[1]
    }
    return result;
}

//取cookie某一值
function getCookie($name){
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
        var varName=dataArray[i].split("=");
        if(varName[0]==$name){
            return decodeURI(varName[1]);
        }

    }
}

//删除cookie中指定变量函数
function f() {
    //待完成
}
