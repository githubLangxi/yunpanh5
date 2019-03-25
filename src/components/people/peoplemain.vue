<template>
  <div class="maincontent">
    <Servicesiderbar  class="sidebar float"></Servicesiderbar >
    <!--<ServiceuploadDrag></ServiceuploadDrag>-->
    <div class="main float" >
      <div class="top" ><Servicetop></Servicetop></div>

    </div>
  </div>
</template>

<script>
  //侧边栏
  import Servicesiderbar from './psiderbar'
import Servicetop from './ptop'
  import Servicepeoplelist from './peoplelist'
  // import Serviceuploaddrop from './uploaddrop'

  export default {
    data () {
      return {
        isLogin:false
      }
    },
    components: {
      'Servicesiderbar':Servicesiderbar,
      'Servicetop':Servicetop,
      'Servicepeoplelist':Servicepeoplelist

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
     width:66px; height:96px;
    /*background-color:red;*/
      /*background-image:url(../../../../../filedir.jpg);width:35px; height:35px; background-position: 190px 190px;background-color:red;*/
    }
  .top{
    margin-left:50px;
    height:100px;
    /*background-color:red;*/

  }
  .img-file{
    background-image:url(file.png);width:66px; height:76px;
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
    text-align:center;
  }
  </style>
