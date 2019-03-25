<template>
  <div class="navMenu">

    <label v-for="navMenu in navMenus">
      <!--只有一级菜单-->
      <!--<el-menu-item @click="dirbottom(navMenu.entity.name,navMenu.entity.id,navMenu.entity.value)" v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"-->
                    <!--:key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"-->
      <!--&gt;-->
      <el-menu-item @click="dirbottom(navMenu.name,navMenu._id,navMenu.value)" v-if="navMenu.childs==null&&navMenu&&navMenu.state==='ENABLE'"
                    :key="navMenu._id" :data="navMenu" :index="navMenu.name"
      >
        <!--图标-->
        <i :class="navMenu.icon"></i>
        <!--标题-->
        <span slot="title">{{navMenu.alias}}</span>
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu @click="dirtop(navMenu.name,navMenu._id,navMenu.value)"  class="cmenu" v-if="navMenu.childs&&navMenu&&navMenu.state==='ENABLE'"
                                :key="navMenu._id" :data="navMenu" :index="navMenu.name">
        <template class="aaa"  slot="title" style="background-color:red !important;" >
          <i :class="navMenu.icon"></i>
          <span  class="bbb" > {{navMenu.alias}}</span>
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

      return {}
    },
    methods: {
      dirtop(key,index,route){
        alert(index);
        this.$store.state.menu.id=index;
      },
      dirbottom(key,index,route){
        alert(index);
        this.$store.state.menu.id=index;
      }
    }
  }
</script>

<style scoped>
.cmenu{
  background-color:red;
}
  .aaa{
    background-color:deeppink;
  }
  .bbb{
    background-color:khaki;
  }
</style>
