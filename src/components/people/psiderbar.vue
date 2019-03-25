<template>
  <!--左侧菜单组件-->
  <el-menu default-active="0" class="el-menu-vertical-demo" onclick="kk" @select="menuSelected"
           background-color="#F0F6F6"
           text-color="#3C3F41"
           active-text-color="black">
    <nav-menu :navMenus="leftMenus"></nav-menu>
  </el-menu>

</template>

<script>
  import NavMenu from './NavMenu.vue'
  // import {request} from 'request'
  // 0000a0000a0000a0000a0000  一级菜单的父id


  export   default{
    data(){
      //   request.get("http://localhost:8057/docment/querymenu")

      return  {
        leftMenus:[]
        // [{
        //   "entity": {
        //     "_id": "43543543543534",
        //     "parentMenuId": "055555fffffrfrf",
        //     "name": "contentManage",
        //     "icon": "el-icon-rank",
        //     "alias": "内容管理",
        //     "state": "ENABLE",
        //     "sort": 2,
        //     "value": null,
        //     "type": "NONE",
        //     "discription": "用于内容管理的菜单",
        //     "createUserId": 1
        //   },
        //   "childs": []
        // }]
      }
    },
    components:{
      NavMenu
    },
    mounted: async function() {
      await   this._fetchRecords();
    },
    created(){
      console.log('数据信息',this.leftMenus)
    },
    methods:{
      async _fetchRecords(){
        let result= await new Promise(async (resolve, reject) => {
          await    rt
            .get("http://localhost:8057/docment/querymenulist")
            .then(res => {
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });
        console.log("start")
        console.log(result.result);
        console.log(JSON.stringify(result.result));
        this.leftMenus=result.result;

      },
      kk(){
        alert(1);
      },
      menuSelected(index,indexPath){
        alert(index);
        alert(indexPath);
        console.log('当前绑定的index值',index)
        console.log('当前绑定的index与path值',indexPath)
      }
    }
  }
</script>

<style>
</style>
