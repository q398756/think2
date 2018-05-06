var Myheader = React.createClass({

    componentDidMount : function(){// 在第一次渲染后调用
        // 检查是否登录并修改
        tryChangeLoginbtn()//index-toolkit
        picColNumShow();

        $("#logout").on("click", function () {
            $.ajax({
                type: "get",
                url: "/user/logout",
                async: true,
                success: function(data){
                    debugger;
                    console.log(data)
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
/* {marginTop:"12px"} */
        return (
            <div>
                <div className=" myheader container">
                    <div className="row">
                        <a href="/index/showall"><div className="col-md-4  myh1">Tomoz。</div></a>
                        <div className="col-md-offset-4 col-md-4" id="myheaderbtnbar">
                            <ul className="nav nav-pills">
                                <li className="active"><a href="/index">首页</a></li>
                                <li><a href="/index/showall">图片</a></li>
                                <li><a href="/edit/picedit">编辑</a></li>
                                <li><a href="/index/showall">个人 <span id="headerNewsInfo" className="label label-badge label-success"></span></a></li>
                                <li>
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="your/nice/url">
                                        账户 <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/user/login" id="loginbtn" className="text-ellipsis">登入</a></li>
                                        <li><a href="javascript:void (0)" id="logout">登出</a></li>
                                        <li><a href="/user/changeinfo">信息修改</a></li>
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