<template>
  <div class="maincontent">

    <Servicesiderbar  class="sidebar float"></Servicesiderbar >
    <!--<ServiceuploadDrag></ServiceuploadDrag>-->
    <div class="main float" >
      <div class="top" ><Servicetop></Servicetop></div>
      <!--<div id="box">-->
      <!--<input type="button" value="按钮3"  @contextmenu.prevent="show(3)"-->
      <!--v-rightMenu = "menudata">-->

      <!--<input type="button" value="按钮" @contextmenu.prevent="show(3)">-->
      <!--<input type="button" value="按钮1" @contextmenu.prevent="callbackMethods()">-->


      <!--</div>-->
      <!--<div class="right-menu" id="rightmenu" v-if="false">-->
      <!--<a href="javascript:;" @click="copyMsg">复制</a>-->
      <!--<a href="javascript:;" @click="quoteMsg">引用</a>-->
      <!--<a href="javascript:;" @click="deleteMsg">删除</a>-->
      <!--</div>-->
      <el-row  class="download">

        <el-button type="success" v-if="downflag" @click="downloadfile"  class="el-icon-edit">下 载    文 件</el-button>
        <div class="icon">
        <img class="icon" @click="icongrid" :src="iconmode" />
        </div>


      </el-row>
<div class="content">

      <ul  :class="[this.flag?'show':'hidden']" v-if="flag">
        <div class="inputcheck">
        <input type="checkbox" style="margin-left:0%" v-model='checked' @click='checkedAll'> 全选
        </div>
        <li class="img-box" v-for="(ite,index) in fileitems">
          <input type="checkbox" class="weui-check" @click="checkclick(ite)" v-model="ite.state" name="checkbox" />
          <div class="img-file" @contextmenu="setfile(ite._id)" v-rightMenu="menudata">
            <img :src="ite.fileimgpath" height="38" width="33"/>
          </div>

          <!--<img src="../../../../../../Downloads/WORD.png"/>-->
          <div class="file-name">{{ite.filename}}</div>
        </li>
      </ul>
  <el-dialog title="重命名" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="新名称（含后缀名）：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="okrename()"  >确定</el-button>

    </div>
  </el-dialog>
  <Servicefilelist v-bind:hel="hel" v-bind:fileitems="fileitems" :class="[!this.flag?'show':'hidden']" class="filelist" v-if="!flag"></Servicefilelist>
</div>
    </div>
  </div>
</template>

<script>
  //侧边栏
  import Servicesiderbar from './siderbar'
  //文件列表
  import Servicefilelist from './filelist'
import Servicetop from './top'
  import wordimg from './a.svg';
  import icongridimg from './../../assets/imgs/icon-grid.svg'
  import iconlistimg from './../../assets/imgs/icon_list.svg'
  export default {
    data () {
      return {
        downflag:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '200px',
        dialogFormVisible: false,
        hel:"hello",
        iconmode:icongridimg,
        flag:true,
        checked:false,
        fileitems:[],
        items:{state:false},
        rightmenu:false,
        isLogin:false,
        menudata:{
          // 菜单box的样式   Menu box style
          boxStyle:"width:150px;background:#f55;",
          // 菜单选项的样式 Style of menu options
          optionStyle:"color:#fff;line-height:30px;font-size:15px;",
          menus:[
            {
              /**
               * content 菜单显示的文字 <支持html>
               * callback：菜单点击要触发函数  需要在methods定义
               * style ： 本项菜单的单独样式 可以覆盖掉optionStyle
               * icon : icon图片地址
               * iconStyle: icon 图片的样式（例如大小等 直接作用于图片）
               * iconPosition : 支持left / right (其余全部按照left处理);
               * content The text displayed on the menu(can use html)
               * callback: Menu clicks to trigger functions need to be defined in methods
               * style :  The single style of this menu can override option Style
               * icon : your icon's url
               * iconStyle : you icon's style ,is image's style
               * iconPosition :you can use left or right ;The rest are all processed according to left
               */
              /**
               * 字段(field)           类型(type)                 是否可以为空(is can null)    默认值
               * content            [ html | text ]                       Y                   ""
               * callback           [  methods function ]                 Y                   return false
               * style                   [ css ]                          Y                   ""
               * icon                   [ url ]                           Y                   ""
               * iconStyle              [ css ]                           Y                   ""
               * iconPosition           [string]                          Y                   "left"
               */
              content:"删除文件",
              callback:"movefile",
              style:"border-bottom:1px solid #fff;cursor:pointer;background:#333;line-height:30px;",

              iconStyle:"width:20px;height:20px;",
              iconPosition:"left",
            },{
              content: "重命名",
              callback: "rename",
              style: "border-bottom:1px solid #fff;cursor:pointer;background:#333;line-height:30px;",
              // icon: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&fm=27&gp=0.jpg",
              iconStyle: "width:20px;height:20px;",
              iconPosition: "left",
            }
          ],
        },

      }
    },
    components: {
      'Servicesiderbar':Servicesiderbar,
      'Servicetop':Servicetop,
      'Servicefilelist':Servicefilelist
    },
    mounted:async  function() {

      await this._fetchRecords();
      if(this.$store.state.auth.isLoggedIn){
        this.isLogin = true
      }
    },
    watch: {
      '$route' (to, from) {
      console.log("watch")
      this._fetchRecords();
      // console.log(this.getStatus(this.$route.path))
    }
  },
    methods: {
     async  okrename(){
        alert(this.form.name);
        if(!this.form || !this.form.name)
        {
          this.$message({
            message: '请填写文件名',
            type: 'warning'
          });

        }else
        if(this.form && this.form.name && !this.form.name.indexOf('.'))
        {
          this.$message({
            message: '请填写文件名后缀名',
            type: 'warning'
          });

        }else{
          this.renamemethod(this.form.name)
        }
      },
      async icongrid(){
this.flag=!this.flag;

this.iconmode=this.flag==true?icongridimg:iconlistimg;
  },
      async setfile(id){
        let fileid = "fileid";
        this.$cookies.set(fileid, id)
      },
      async rename(){
        console.log("rename");
        this.dialogFormVisible= true;
      },
      async renamemethod(name){
        let result= await new Promise(async (resolve, reject) => {
          console.log("http://local.gankao.com:8057/menu/renamefile?_id="+this.$cookies.get("fileid"))
          let renamestr="http://localhost:8057/menu/renamefile?_id="+this.$cookies.get("fileid")+"&name="+name;
          await    rt
            .get(renamestr)
            .then(res => {
              console.log("resheader")

              console.log(res);
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });
        console.log(result);
        this.$router.go(0)
      },
     async  movefile(){
debugger;
       let result= await new Promise(async (resolve, reject) => {
         console.log("http://local.gankao.com:8057/menu/movefile?_id="+this.$cookies.get("fileid"))
         let movefilestr="http://localhost:8057/menu/movefile?_id="+this.$cookies.get("fileid");
         await    rt
           .get(movefilestr)
           .then(res => {
             console.log("resheader")
             console.log(res.headers)
             console.log(res);
             resolve(res)
           })
           .catch(res => {
             rt.showErrorToast(res);
           });
       });
       console.log(result);
       this.$router.go(0)
       //location.reload();

      },
     async  downloadfile(){
       console.log(this.$cookies.get("dirname"));
       let filelist=[]

       let filetotal={}
      await  this.fileitems.forEach(async function(item, index) {
         if(item.state===true)
         {
           let fileone={}
           fileone.path=item.filepath;
           fileone.name=item.filename;
         await  filelist.push(fileone);


         }
       });

       // http://local.gankao.com:8057/documentlogic/downtest
       let body={
         filelist:filelist,//[{"path":"https://img.qiaoxuesi.com/qr_api/img/OW3eSZagZiPA.png","name":"你好"}],

         dirname:this.$cookies.get("dirname")
       }
        console.log(body);




       let result= await new Promise(async (resolve, reject) => {
         await    rt
           .post("http://local.gankao.com:8057/documentlogic/downfile",body)
           .then(res => {
             console.log("resheader")
             console.log(res.headers)
             console.log(res);
             resolve(res)
           })
           .catch(res => {
             rt.showErrorToast(res);
           });
       });
       console.log(result);
       // let a = document.createElement('a');
       //
       // a.href = "data:text/json;charset=utf-8,"+ result;
       // a.download = "myfilename";
       // a.click();

      //  let url = window.URL.createObjectURL(result)
       console.log(result.downpath);
console.log(result.result.downpath);
       let link = document.createElement('a')
       link.style.display = 'none'
       link.href = result.result.downpath//"http://local.gankao.com:8057/static/images/qrimgzip/hahda2019-03-28.zip" //"data:application/zip;charset=utf-8,"+result;
       link.setAttribute('download',this.$cookies.get("dirname") + '.zip')// this.$cookies.get("dirname") + '.zip'
       document.body.appendChild(link)
       link.click()
       return result;

      },
      async _fetchRecords(){
       debugger;
       console.log(this.$cookies.get("menuid"));
        let result= await new Promise(async (resolve, reject) => {
          await    rt
            //.get("http://localhost:8057/docment/queryfile?_id="+this.$store.state.menu.id)
            .get("http://localhost:8057/docment/queryfile?_id="+this.$cookies.get("menuid"))

            .then(res => {
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });
        console.log(this.$store.state.menu.id)
        console.log("查询文件")

        console.log(JSON.stringify(result.result.file));

        this.fileitems=result.result.file;

      },
      checkedAll: function() {
        var _this = this;
        console.log(_this.fileitems);
        console.log(!_this.checked);
        if (!_this.checked==false) { //实现反选
          this.fileitems.forEach(function(item, index) {
            item.state=false;
          });
        } else { //实现全选

          this.fileitems.forEach(function(item, index) {
            item.state=true;
          });
        }
      },
      async checkclick(items)
      {

         items.state = !items.state;
        console.log(items);
        let filescheck=[];
        let filetotalcheck=[]
        this.downflag=false;
        let that=this;
        await  this.fileitems.forEach(async function(item, index) {
          if(item.state===true)
          {
            that.downflag=true;
            let fileone={}

            fileone._id=item._id;

            fileone.name=item.filename;
            let filesave = {
                filepath: item.filepath,
                filename: item.filename,
                filesize: item.filesize,
                filetype: item.filetype,
                fileimgpath: item.fileimgpath
            }

            await  filescheck.push(item._id);
            await filetotalcheck.push(filesave)



          }
        });
        let fileschecks = "fileschecks";
        this.$cookies.set(fileschecks, filescheck)
        let filetotalchecks = "filetotalchecks";
        console.log(JSON.stringify(filetotalcheck));
        this.$cookies.set(filetotalchecks, JSON.stringify(filetotalcheck))
        console.log(filescheck)


      },
      callbackMethods(){
        console.log(wordimg)
        // do something
      },
      otherMethods(){
        // do something
      },
      show:function(){
        alert(1);
        // visible
        this.rightmenu=true;
        // this.isPersoncontextMenus = true;
        // let menu = document.getElementById("msgRightMenu");
        // alert(2);
        // var e = e || window.event;
        // var marginWidths = 332;
        // var marginHeight = 55;
        // //鼠标点的坐标
        // var oX = e.clientX - marginWidths;
        // alert(oX);
        // var oY = e.clientY - marginHeight;
        // if(oX>423){
        //   oX = 423;
        // }
        // //菜单出现后的位置
        // menu.style.display = "block";
        // menu.style.left = oX + "px";
        // menu.style.top = oY + "px";
        // //阻止浏览器默认事件
        // console.log(menu);
        // alert(menu);
        // alert(8);
       // return false;//一般点击右键会出现浏览器默认的右键菜单，写了这句代码就可以阻止该默认事件
      },
      show1:function(e){
        alert(2);

        // 菜单位置
        var menuX = e.pageX || e.pageY ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;//获取pageX 兼容ie
        var menuY = e.pageX || e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;
        // 右键显示遮罩层

        let boxDiv = document.getElementById("rightmenu");
        boxDiv.style = `color:#333;background:#fff;position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
        /**
         * 判断是否超出屏幕宽度
         */
        if (menuX + boxDiv.clientWidth >= document.body.clientWidth) {

          boxDiv.style.left = menuX - boxDiv.clientWidth + "px";
        }
        /**
         * 判断是否超出屏幕高度
         */
        if (menuY + boxDiv.clientHeight >= document.body.clientHeight) {

          boxDiv.style.top = menuY - boxDiv.clientHeight + "px";
        }
        this.rightmenu=true;
      },
      gg(){

        alert(this.$store.state.menu.id);
      },
      ggg(a){
        var GLOBLEsize = 0;
        // 防止id重复  每次累计加一
        let currentSize = GLOBLEsize;
        alert(a)
        var Mask = document.createElement("div");
        var Maskstyle = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99997;"
        Mask.style = Maskstyle + "display:none";
        Mask.setAttribute("id", "TT_MASK");
        document.body.appendChild(Mask);
        var e = event || window.event;
        e.stopPropagation();//阻止冒泡事件
        e.cancelBubble = true;//阻止冒泡事件ie
        e.preventDefault();//阻止默认事件
        // 隐藏所有菜单
        // for (let i = 0; i < GLOBLEsize; i++) {
        //   if (document.getElementById("tt_right_menu" + i)) {
        //     document.getElementById("tt_right_menu" + i).style = `display:none`
        //   }
        // }
        // 菜单位置
        var menuX = e.pageX || e.pageY ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;//获取pageX 兼容ie
        var menuY = e.pageX || e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;
        // 右键显示遮罩层
        document.getElementById("TT_MASK").style = Maskstyle + "display:block";
        let boxDiv = document.getElementById("tt_right_menu" + currentSize);
        boxDiv.style = `color:#333;background:#fff;${binding.value["boxStyle"] ? binding.value["boxStyle"] : ""};position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
        /**
         * 判断是否超出屏幕宽度
         */
        if (menuX + boxDiv.clientWidth >= document.body.clientWidth) {

          boxDiv.style.left = menuX - boxDiv.clientWidth + "px";
        }
        /**
         * 判断是否超出屏幕高度
         */
        if (menuY + boxDiv.clientHeight >= document.body.clientHeight) {

          boxDiv.style.top = menuY - boxDiv.clientHeight + "px";
        }
        alert(this.$store.state.menu.id);
      },
      backToHome () {
        this.$router.push('/home')
      }
    }
  }

</script>



<style scoped>
  .icon {
      font-family: yunfont!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 30px;
      height: 30px;
      float: right;
    }
  .icon:hover{
    cursor:pointer
  }
  .icon:focus{

  }

  .content{

  }
  .download{
    margin-left:50px;
    margin-top:-50px;
    margin-bottom:60px;
  }
  .inputcheck{
   /*// background-color:red;*/
    margin-left:50px;
  }
  .maincontent{
    margin-top:20px;
    margin-left:20px;
  }
  .float{
    float:left;
  }
  .filelist{
    margin-left:50px;
  }
  .img-box{
      margin-left:50px;
      float:left;
      margin-top:50px;
     width:60px; height:58px;
    /*background-color:red;*/
      /*background-image:url(../../../../../filedir.jpg);width:35px; height:35px; background-position: 190px 190px;background-color:red;*/
    }
  .top{
    margin-left:50px;
    height:100px;
    /*background-color:red;*/

  }
  .img-file{
    z-index: 1!important;
    /*background-image:url(../people/file.png);*/
  /*; height:33px;*/
    /*background-image:url(../../../../../filedir.jpg);width:35px; height:35px; background-position: 190px 190px;background-color:red;*/
  }
  /*侧边栏*/
  .sidebar{
    /*width:160px;*/
    min-width: 12%;
    height:100%;
  }
  .main{
    width:74%;
  }
  .file-name{
    font-size:6px !important;
    text-align:left;
    margin-top:6px;
    font-weight: lighter;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .example {
    display: block;
  margin: 5em auto;
  border-radius: 10px;
  }




  /*rightmenu*/
  h1,
  h2 {
    font-weight: normal;
  }
  a {
    color: #333;
  }
  .right-menu {
    position: fixed;
    background: #fff;
    border: solid 1px rgba(0, 0, 0, .2);
    border-radius: 3px;
    z-index: 999;
   /*// display: none;*/
  }
  .right-menu a {
    width: 75px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    color: #1a1a1a;
  }
  .right-menu a:hover {
    background: #eee;
    color: #fff;
  }

  .right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
  }
  a {
    text-decoration: none;
  }
  .right-menu a {
    padding: 2px;
  }
  .right-menu a:hover {
    background: #42b983;
  }
  </style>
