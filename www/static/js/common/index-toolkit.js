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
    var str = "欢迎您，" + unescape(unescape(data.nickname));//unescape(
    $("#loginbtn").text(str);
    $("#registerbtn").addClass("hidden");
    $("#personbtn").removeClass("hidden");
    $("#logoutli").removeClass("hidden");
    $("#changeinfoli").removeClass("hidden");
}

/*
 集合上两个
 */
function tryChangeLoginbtn() {
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

/*
 调整导航上的active按钮
 */
function tryChangeActiveBtn() {
    var href = window.location.href + "/";
    var startIndex = href.indexOf("8360") + 5,
        endIndex = href.substring(startIndex).indexOf("/")+startIndex;

    var targetStr = href.substring( startIndex, endIndex);

    switch(targetStr)
    {
        case "edit":
            $("#myheaderbtnbar li:eq(3)").addClass("active");
            break;
        case "user":
            $("#myheaderbtnbar li:eq(1)").toggleClass("active");
            $("#myheaderbtnbar li:eq(2)").toggleClass("active");
            break;
        case "":
        case "index":
        default:
            $("#myheaderbtnbar li:eq(0)").addClass("active");
            break;
    }
}
