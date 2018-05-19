'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  demoAction(){
    return this.display();
  }

  demo2Action(){
    return this.display();
  }

  showgroupAction() {
    return this.display();
  }

  showallAction(){
    return this.display();
  }

  uploadAction(){
      return this.display();
  }

  test2Action(){
    return this.display();
  }

  testzuiAction(){
    return this.display();
  }

    async usercollectcancelAction(){
        let allParams = this.get();
        let userid = allParams.userid,
            picid = allParams.picid;

        let sUserid = await this.session('userid');//session中的用户id
        var model, num;
        if( userid == sUserid){
            model = this.model('usercollection');
            try{
                let insertId = await model.where({
                    userId: userid,
                    picId: picid
                }).delete();

                model = this.model("user");

                try{
                    let usercol = await model.where({Id: userid}).find();
                    console.log(usercol + "************" + usercol.PictureNum);
                    let upuser = await model.where({Id: userid}).update({PictureNum: usercol.PictureNum-1});//返回受影响的行数
                    num = usercol.PictureNum-1;
                }catch (e) {
                    throw e;
                }

                let pic;
                model = this.model("picture");
                try{
                    pic = await model.where({Id: picid}).find();
                    let uppic = await model.where({Id: picid}).update({Heat: pic.Heat-1});
                }catch (e) {
                    console.log(e)
                }

                model = this.model("picturetype");
                try{
                    let pictype = await model.where({Id: pic.TypeId}).find();
                    let uptype = await model.where({Id: pic.TypeId}).update({Heat: pictype.Heat-1});
                }catch (e) {

                }
            }catch (e) {//这里晚些要改
                if(e.code == "ER_DUP_ENTRY"){
                    this.json({"errmsg": "该用户名ID已存在或电话已被注册"});
                }
                else{
                    this.json({"errmsg": e + "，请尝试修改您的输入，如果错误持续，请联系管理员"});
                }
            }

            //设置 cookie 值
            this.cookie('picnum', num, {
                timeout: 3600 * 1//有效期为一小时
            });
            this.success({"errmsg":"", "errno":0})// 此处待修改
        }else{
            this.fail({"errmsg":"登录信息过期", "errno":1});
        }
        // let model = this.model('picture');
        // // let data = await model.where({TypeId: allParams.picType}).find();
        // let data = await model.where({TypeId: allParams.picType}).page(pageindex, pagenum).order('Heat DESC').countSelect()
    }

  async usercollectAction(){
    let allParams = this.get();
    let userid = allParams.userid,
        picid = allParams.picid;

    let sUserid = await this.session('userid');//session中的用户id
    var model, num;
    if( userid == sUserid){
        model = this.model('usercollection');
        try{
            let insertId = await model.add({
                userId: userid,
                picId: picid
            })

            model = this.model("user");

            try{
                let usercol = await model.where({Id: userid}).find();
                console.log(usercol + "************" + usercol.PictureNum);
                let upuser = await model.where({Id: userid}).update({PictureNum: usercol.PictureNum+1});//返回受影响的行数
                num = usercol.PictureNum+1;
            }catch (e) {
                throw e;
            }

            let pic;
            model = this.model("picture");
            try{
                pic = await model.where({Id: picid}).find();
                let uppic = await model.where({Id: picid}).update({Heat: pic.Heat+1});
            }catch (e) {
              console.log(e)
            }

            model = this.model("picturetype");
            try{
                let pictype = await model.where({Id: pic.TypeId}).find();
                let uptype = await model.where({Id: pic.TypeId}).update({Heat: pictype.Heat+1});
            }catch (e) {

            }
        }catch (e) {//这里晚些要改
            if(e.code == "ER_DUP_ENTRY"){
                this.json({"errmsg": "该用户名ID已存在或电话已被注册"});
            }
            else{
                this.json({"errmsg": e + "，请尝试修改您的输入，如果错误持续，请联系管理员"});
            }
        }

        //设置 cookie 值
        this.cookie('picnum', num, {
            timeout: 3600 * 1//有效期为一小时
        });
        this.success({"errmsg":"", "errno":0})// 此处待修改
    }else{
      this.fail({"errmsg":"登录信息过期", "errno":1});
    }
    // let model = this.model('picture');
    // // let data = await model.where({TypeId: allParams.picType}).find();
    // let data = await model.where({TypeId: allParams.picType}).page(pageindex, pagenum).order('Heat DESC').countSelect()
  }

  async getpictypejsonAction(){
    let model = this.model('picturetype');
    let data = await model.page(this.get('page'), 25).order('Heat DESC, Num DESC').countSelect()
    console.log(data);
    this.success(data)// Q：对查询到的数据是否为空等检查应该在服务端还是客户端
  }

  async getpicjsonAction(){
    let allParams = this.get();
    var pageindex = allParams.pageindex,
        pagenum = allParams.num;
    if (pageindex == undefined){
      pageindex = 1;
    }
    if (pagenum == undefined){
        pagenum = 10;
    }
    console.log(allParams);
    let model = this.model('picture');
    // let data = await model.where({TypeId: allParams.picType}).find();
    let data = await model.where({TypeId: allParams.picType}).page(pageindex, pagenum).order('Heat DESC').countSelect()
    this.success(data)// Q：对查询到的数据是否为空等检查应该在服务端还是客户端
  }

  testAction(){
    console.log("something");
    // let name = this.get('name');
    let allParams = this.get(); //获取所有 GET 参数

    // console.log("name:" + name);
    console.log("allP:" + allParams.text);
    this.success(allParams);
    // this.fail(1000, 'connect error')
  }

  async testdbAction(){
    console.log("something in db");
    let allParams = this.get(); //获取所有 GET 参数
    // console.log(allParams.uId);
    let model = this.model('user');
    let data = await model.where({Id: allParams.uId}).find();
    console.log(data);
    this.success(data.Nickname)// Q：对查询到的数据是否为空等检查应该在服务端还是客户端
    //data returns {name: 'thinkjs', email: 'admin@thinkjs.org', ...}
  }
}