

var Myheader = React.createClass({

    componentDidMount : function(){// 在第一次渲染后调用
        // 检查是否登录并修改
        tryChangeLoginbtn();//index-toolkit
        tryChangeActiveBtn();//index-toolkit
        picColNumShow();

        $("#logout").on("click", function () {
            $.ajax({
                type: "get",
                url: "/user/logout",
                async: true,
                success: function(data){
                    window.location.reload();
                },
                error: function(data){

                },
                complete: function(data){
                    console.log("do logout complete");
                }
            })
        })
    },

    render: function () {
        return (
            <div>
                <div className=" myheader container">
                    <div className="row">
                        <a href="/index/showall">
                            <div className="col-md-4  myh1">Tomoz。</div>
                        </a>
                        <div className="col-md-offset-4 col-md-4" id="myheaderbtnbar">
                            <ul className="nav nav-pills">
                                <li className=""><a href="/index/showall">首页</a></li>
                                <li id="registerbtn"><a href="/user/login">登录/注册</a></li>
                                <li id="personbtn" className="hidden"><a href="/user/collection">个人 <span id="headerNewsInfo" className="label label-badge label-success"></span></a></li>
                                <li><a href="/edit/picedit">编辑</a></li>
                                <li>
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="your/nice/url">
                                        账户 <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/user/login" id="loginbtn" className="text-ellipsis">登入</a></li>
                                        <li className="hidden" id="uploadbtn"><a href="/index/upload" className="text-ellipsis">图片上传</a></li>
                                        <li className="hidden" id="logoutli"><a href="javascript:void (0)" id="logout">登出</a></li>
                                        <li className="hidden" id="changeinfoli"><a href="/user/changeinfo">信息修改</a></li>
                                        <li><a href="">帮助</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})