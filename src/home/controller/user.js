'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    loginAction(){
        //auto render template file index_index.html
        return this.display();
    }

    registerAction(){
        return this.display();
    }

    changeinfoAction(){
        return this.display();
    }

    collectionAction(){
        return this.display();
    }

    userhelpAction(){
        return this.display();
    }

    async changeAction(){

        // data: {
        //     id: data.id,
        //         nickn: data.nickn,
        //         sex: data.sex.substring(0,1).toUpperCase(),
        //         pwd: data.pwd1
        // },
        if(this.isPost()){//判断是否以post发送消息给后台了
            let key = this.post();
            let data = await this.model('user').where({"Id": key.id}).find();
            // 查询数据库
            var redata = {
                Id: data.Id,
                Nickname: data.Nickname,
                Sex: data.Sex,
                Cellphone: data.Cellphone,
                PictureNum: data.PictureNum
            }
            if( think.isEmpty(data)){//查询不到用户，这里直接用think.isEmpty()
                this.json({"errmsg":"用户不存在", "errno":1});//USER_NOTEXIST
            }
            else{//查询到用户则检查密码
                if( key.pwdold == data.Password){//密码正确，转成功登陆

                    var updata = {
                        Id: data.Id,
                        Nickname: key.nickn,
                        Sex: key.sex
                    }
                    let upstate = await this.model('user').where({Id: key.id}).update(updata);
                    var tempstr = escape(updata.Nickname);
                    console.log("**************************************" + tempstr);
                    if(upstate == 1){
                        await this.session('userid', updata.Id);

                        this.cookie('id', updata.Id, {
                            timeout: 3600 * 1 //有效期为一小时
                        });
                        this.cookie('nickname', tempstr, {
                            timeout: 3600 * 1 //有效期为一小时
                        });
                        this.cookie('errmsg', 0, {
                            timeout: 3600 * 1 //有效期为一小时
                        });
                        this.cookie('sex', updata.Sex, {
                            timeout: 3600 * 1 //有效期为一小时
                        });
                        this.success({"upstate": upstate});
                    }else{
                        this.fail();
                    }


                }
                else{//密码错误，转密码错误
                    this.json({"errmsg":"密码错误", "errno":2});//PASSWORD_ERR
                }
            }
        }
        else{
            this.json({"errmsg":"请先登录"});
        }
    }

    async getcolpicjsonAction(){

        let allParams = this.get();
        let userid = allParams.userid;

        let sUserid = await this.session('userid');//session中的用户id
        var model;
        if( userid == sUserid){
            model = this.model('usercolview');
            try{
                var data = await model.where({userId: userid}).limit(50).select();
                console.log(data);
                this.success(data);
            }catch (e) {//这里晚些要改
                throw e;
            }
        }else{
            this.fail({"errmsg":"登录信息过期", "errno":1});
        }
    }

    async logoutAction(){
        //清除当前用户的 session
        await this.session();
        this.cookie('id', null);
        this.cookie('nickname', null);
        this.cookie('errmsg', null);
        this.cookie('picnum', null);
        this.success();
    }

    async logincheckAction(){
        if(this.isPost()){//判断是否以post发送消息给后台了
            let key = this.post();
            let data = await this.model('user').where({"Cellphone": key.id}).find();
            // 查询数据库
            var redata = {
                Id: data.Id,
                Nickname: data.Nickname,
                Sex: data.Sex,
                Cellphone: data.Cellphone,
                PictureNum: data.PictureNum
            }
            if( think.isEmpty(data)){//查询不到用户，这里直接用think.isEmpty()
                this.json({"errmsg":"用户不存在", "errno":1});//USER_NOTEXIST
            }
            else{//查询到用户则检查密码
                if( key.password == data.Password){//密码正确，转成功登陆

                    var tempstr = escape(redata.Nickname);
                    console.log("**************************************" + tempstr);
                    await this.session('userid', data.Id);

                    this.cookie('id', data.Id, {
                        timeout: 3600 * 1 //有效期为一小时
                    });
                    this.cookie('nickname', tempstr, {
                        timeout: 3600 * 1 //有效期为一小时
                    });
                    this.cookie('errmsg', 0, {
                        timeout: 3600 * 1 //有效期为一小时
                    });
                    this.cookie('picnum', data.PictureNum, {
                        timeout: 3600 * 1 //有效期为一小时
                    });
                    this.cookie('sex', data.Sex, {
                        timeout: 3600 * 1 //有效期为一小时
                    });
                    this.success(redata);
                }
                else{//密码错误，转密码错误
                    this.json({"errmsg":"密码错误", "errno":2});//PASSWORD_ERR
                }
            }
        }
        else{
            this.json({"errmsg":"请先登录"});
        }
    }

    async reigstercheckAction(){
        /*
            errno为0表示正确完成注册
            为1表示账户已经存在
            为2表示
         */
        // data: {
        //     id: data.id,
        //         nickn: data.nickn,
        //         sex: data.sex.substring(0,1).toUpperCase(),
        //         pwd: data.pwd1
        // },
        if(this.isPost()){//判断是否以post发送消息给后台了
            let key = this.post();
            let data = await this.model('user').max('Id');//获得对应的json数据
            console.log(data+1);
            var redata = {
                Id: data+1,
                Nickname: key.nickn,
                Sex: key.sex,
                Cellphone: key.id,
                Password: key.pwd
            }

            try{
                let result = await this.model('user').thenAdd(redata, {Cellphone: key.id});
                this.success(result);
                console.log(result);
            }
            catch(e){
                console.log(e);
                if(e.code == "ER_DUP_ENTRY"){
                    this.json({"errmsg": "该用户名ID已存在或电话已被注册"});
                }
                else{
                    this.json({"errmsg": e + "，请尝试修改您的输入，如果错误持续，请联系管理员"});
                }
            }


        }
        else{
            this.json({"errmsg":"请先登录"});
        }
    }
}