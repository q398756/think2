/*
 用于index模块header
 */
function cookieExist() {
    var cookieJson = cookieToJson(document.cookie);
    if( cookieJson.id != undefined){
        return true;
    }else{
        return false;
    }
}

/*
 根据json数据修改myheader上的btn
 */
function changeLoginbtn(data) {
    debugger;
    var str = "欢迎您，" + data.nickname;
    $("#loginbtn").text(str);
}

/*
 集合上两个
 */
function tryChangeLoginbtn() {
    debugger;
    var cookieJson = cookieToJson(document.cookie);
    if( cookieExist()){
        changeLoginbtn(cookieJson);
    }
}

/*
 检查用户收藏的图片数并显示到#headerNewsInfo上
 */
function picColNumShow() {
    if( cookieExist()){
        var cookieJson = cookieToJson(document.cookie);
        if( cookieJson.picnum){
            $("#headerNewsInfo").text(cookieJson.picnum);
        }
    }
}
