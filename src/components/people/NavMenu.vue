<template>
  <div class="navMenu">

    <label v-for="navMenu in navMenus">
      <!--只有一级菜单-->
      <!--<el-menu-item @click="dirbottom(navMenu.entity.name,navMenu.entity.id,navMenu.entity.value)" v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"-->
                    <!--:key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"-->
      <!--&gt;-->
      <el-menu-item @click="dirbottom(navMenu.entity.name,navMenu._id,navMenu.entity.value)" v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity._id" :data="navMenu" :index="navMenu.entity.name" :indexPath="navMenu.entity.name"
      >
        <!--图标-->
        <i :class="navMenu.entity.icon"></i>
        <!--标题-->
        <span  slot="title" v-bind:class="{ classred:navMenu.entity._id==current}" :class="setClass(navMenu.entity._id)">{{navMenu.entity.alias}}</span>
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu  v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                  :key="navMenu.entity._id" :data="navMenu" :index="navMenu.entity.name" >
        <template slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span   :class="{'classred':(cc==current)}" v-bind:class="classfun" @click="dirtop(navMenu.entity.name,navMenu._id,navMenu.entity.value,current)"> {{navMenu.entity.alias}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.childs"></nav-menu>
      </el-submenu>
    </label>
    <!--<div v-bind:class="classObject">ggg</div>-->
  </div>
</template>

<script>
  export default {
    name: 'NavMenu', //使用递归组件必须要有
    props: ['navMenus'], // 传入子组件的数据
    data() {
    // :class="setClass(navMenu.entity._id)"
      return {
        error: null,
        isActive:true,
        cc:"5c932d5a9e54a3a56551f62a",
        current:"5c932d5a9e54a3a56551f62a",
        styleObject: {
          color: 'red',
          fontSize: '13px'
        }
      }
    },
    methods: {
      classObject: function () {
        return {
          styleObject

        }
      },
      setClass(key) {
        let obj = {}
        obj[`menu${key}`] = true
        return obj
      },
      random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
      },
    async   dirtop(key,index,route,sty){
        // alert(index);
      debugger
      alert(index)
      alert(sty)
      alert(index==sty)
        let menuid = "menuid";
      debugger
      await   this.$cookies.set(menuid, index)

      this.current=index;

      // await this.$router.replace({
     //   path: '/people?id=' + this.random(1, 100),
     //   name: 'people'
     // })
      this.$router.push({
        path: "/people?id=" + this.random(1, 100)
      });

          // await   this.$emit("peoplechanged","ok");
      },
    async    dirbottom(key,index,route){
        // alert(index);
      debugger
        let menuid = "menuid";
       await  this.$cookies.set(menuid, index)

      this.current=index;

      await this.$router.replace({
        path: '/people',
        name: 'people'
      })
       // await    this.$emit("peoplechanged","ok");
      }
    }
  }
</script>

<style >
  .classred {
    color: red;
  }
  .active {
    background: white;
  }
  .el-icon-message{
    cursor:pointer;


  }
  .el-menu-item, .el-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: rgb(72, 195, 106);
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .el-icon-message:visited{
    background-color:cyan;

  }
  .el-icon-message:hover{
    background-color:red;

  }
  .el-icon-message:active{
    background-color:blueviolet;

  }
  .el-icon-message:focus{
    background-color:blue;

  }
</style>
