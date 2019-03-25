<template>
  <div class="maincontent">
    <Servicesiderbar  class="sidebar float"></Servicesiderbar >
    <!--<ServiceuploadDrag></ServiceuploadDrag>-->
    <div class="main float" >
      <div class="top" ><Servicetop></Servicetop></div>

      <ul>

        <li class="img-box"><div class="img-file">
          <img src="./file.png" height="38" width="33"/>
        </div>

          <!--<img src="../../../../../../Downloads/WORD.png"/>-->
          <div class="file-name">文件名称</div>
        </li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>
        <li class="img-box"><div class="img-file"><img src="./file.png" height="38" width="33"/></div><div class="file-name">文件名称</div></li>

      </ul>
    </div>
  </div>
</template>

<script>
  //侧边栏
  import Servicesiderbar from './siderbar'
import Servicetop from './top'
  //import ServiceuploadDrag from './uploadDrag'
  // import Serviceuploaddrop from './uploaddrop'

  export default {
    data () {
      return {
        isLogin:false
      }
    },
    components: {
      'Servicesiderbar':Servicesiderbar,
      'Servicetop':Servicetop
      //'ServiceuploadDrag':ServiceuploadDrag

        // 'Serviceuploaddrop':Serviceuploaddrop

    },
    mounted: function() {
      if(this.$store.state.auth.isLoggedIn){
        this.isLogin = true
      }
    },
    methods: {
      gg(){
        alert(1)
        alert(this.$store.state.menu.id);
      },
      backToHome () {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
  .maincontent{
    margin-top:20px;
    margin-left:20px;
  }
  .float{
    float:left;
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
  }
  .example {
    display: block;
  margin: 5em auto;
  border-radius: 10px;
  }
  </style>
