<template>
  <div class="navMenu">
    <el-dialog title="重命名" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okrenamedir()"  >确定</el-button>

      </div>
    </el-dialog>
    <label v-for="navMenu in navMenus">
      <!--只有一级菜单-->
      <!--<el-menu-item @click="dirbottom(navMenu.entity.name,navMenu.entity.id,navMenu.entity.value)" v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"-->
      <!--:key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"-->
      <!--&gt;-->
      <el-menu-item @click="dirbottom(navMenu.entity.alias,navMenu._id,navMenu.entity.value)"
                    v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity._id" :data="navMenu" v-rightMenu="menudata" :index="navMenu.entity.name"
      >
        <span @contextmenu="setmenu(navMenu._id)" v-rightMenu="menudata">
        <!--图标-->
        <i :class="navMenu.entity.icon"></i>
          <!--标题-->
        <span slot="title">{{navMenu.entity.alias}}</span>
          </span>
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                  :key="navMenu.entity._id" :data="navMenu" :index="navMenu.entity.name">


        <template slot="title">
  <span @contextmenu="setmenu(navMenu._id)" v-rightMenu="menudata">
          <i :class="navMenu.entity.icon"></i>
          <span @click="dirtop(navMenu.entity.alias,navMenu._id,navMenu.entity.value)"> {{navMenu.entity.alias}}</span>
</span>
        </template>



        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.childs"></nav-menu>
      </el-submenu>
    </label>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu', //使用递归组件必须要有
    props: ['navMenus'], // 传入子组件的数据
    data() {

      return {
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
        formLabelWidth: '120px',
        dialogFormVisible: false,
        menudata: {
          // 菜单box的样式   Menu box style
          boxStyle: "width:150px;background:#f55;",
          // 菜单选项的样式 Style of menu options
          optionStyle: "color:#fff;line-height:30px;font-size:15px;",
          menus: [
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
              content: "移动到此文件夹",
              callback: "callbackMethods",
              style: "border-bottom:3px solid #fff;  cursor:pointer;   color: #fff;\n" +
                "    background-color: #abcccc;\n" +
                "   line-height:30px;",
              // icon: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&fm=27&gp=0.jpg",
              iconStyle: "width:20px;height:20px;",
              iconPosition: "left",
            },
            {
              content: "复制到此文件夹",
              callback: "otherMethods",
              style: "border-bottom:1px solid #fff;  cursor:pointer; :hover   {color:red;}  color: #fff;\n" +
                "    background-color: #abcccc;\n" +
                "    line-height:30px;",
              // icon: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&fm=27&gp=0.jpg",
              iconStyle: "width:20px;height:20px;",
              iconPosition: "left",
            }
            ,
            {
              content: "重命名此文件夹",
              callback: "renamedir",
              style: "border-bottom:1px solid #fff;  cursor:pointer; :hover   {color:red;}  color: #fff;\n" +
                "    background-color: #abcccc;\n" +
                "    line-height:30px;",
              // icon: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&fm=27&gp=0.jpg",
              iconStyle: "width:20px;height:20px;",
              iconPosition: "left",
            }
          ],
        }
      }
    },
    methods: {
      async renamemethod(name){
        let result= await new Promise(async (resolve, reject) => {
          console.log("http://local.gankao.com:8057/menu/renamedir?_id="+this.$cookies.get("menuid"))
          debugger;
          let renamestr="http://localhost:8057/menu/renamedir?_id="+this.$cookies.get("menuid")+"&name="+name;
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
      async  okrenamedir(){
       // alert(this.form.name);
        if(!this.form || !this.form.name)
        {
          this.$message({
            message: '请填写文件夹名',
            type: 'warning'
          });

        }else{
          this.renamemethod(this.form.name)
        }
      },
     async  renamedir(){
       console.log("renamedir");
       this.dialogFormVisible= true;
      },
      dirtop(key, index, route) {
        // alert(index);
        this.$store.state.menu.id = index;

        let dirname = "dirname";
        this.$cookies.set(dirname, key)
        this.$router.push({
          path: "/filemain?id=" + this.random(1, 100),
          kk: "d"
        });
        let menuid = "menuid";
        this.$cookies.set(menuid, index)

        //this.$router.go(0)
        // location.reload();
      },
      //文件移动触发
      setmenu(index) {
        console.log(this.$cookies.get("filetotalchecks"));
        console.log(JSON.parse( this.$cookies.get("filetotalchecks")))
        // alert(index);
        // alert(index);
        let menuid = "menuid";
        this.$cookies.set(menuid, index)
      },
      async  getCookie(list) {

  var listcookie=list.split(',');



    return await listcookie;

  }
,
      async callbackMethods(ee, a) {
        console.log(this.$cookies.get("fileschecks"))



        let fileidlist = [];
        if (this.$cookies.get("fileschecks")) {
          fileidlist = await  this.getCookie(this.$cookies.get("fileschecks"));


        } else {
          fileidlist = [];
        }
        let body = {
          parentid: this.$cookies.get("menuid"),
          fileidlist: fileidlist

        }
        console.log(body);
        let result = await new Promise(async (resolve, reject) => {
          await rt
            .post("http://local.gankao.com:8057/menu/migratefile", body)
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
        alert("迁移成功！");

        // do something
      },
      async otherMethods(e, a) {
        console.log(this.$cookies.get("filetotalchecks"))
        let fileidlist = [];
        if (this.$cookies.get("filetotalchecks")) {
           console.log(JSON.parse( this.$cookies.get("filetotalchecks")))
          fileidlist =JSON.parse( this.$cookies.get("filetotalchecks"));
        } else {
          fileidlist = [];
        }
        let body = {
          parentid: this.$cookies.get("menuid"),
          file: fileidlist

        }
        let result = await new Promise(async (resolve, reject) => {
          await rt
            .post("http://local.gankao.com:8057/menu/copyfile", body)
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
        alert("复制成功！");
        // do something
      }, random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
      },
      dirbottom(key, index, route) {
        // alert(this.random(1, 100));
        this.$store.state.menu.id = index;
        let menuid = "menuid";
        this.$cookies.set(menuid, index)
        let dirname = "dirname";
        this.$cookies.set(dirname, key)
        this.$router.push({
          path: "/filemain?id=" + this.random(1, 100)
        });
        this.$router.go(0)
        // location.reload();
      },


    }
  }
</script>

<style scoped>
  .active {
    background: white;
  }
</style>
