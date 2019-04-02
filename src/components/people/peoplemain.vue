<template>
  <div class="maincontent">
    <Servicesiderbar  class="sidebar float"></Servicesiderbar >
    <!--<ServiceuploadDrag></ServiceuploadDrag>-->
    <div class="main float" >
      <div class="top"  ><Servicetop v-bind:peopleitems="peopleitems" v-on:peoplechanged="peoplechange($event)"></Servicetop></div>
      <Servicepeoplelist  v-bind:peopleitems="peopleitems" class="peopleitems" ></Servicepeoplelist>
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
        isLogin:false,
        peopleitems:[]
      }
    },
    components: {
      'Servicesiderbar':Servicesiderbar,
      'Servicetop':Servicetop,
      'Servicepeoplelist':Servicepeoplelist

        // 'Serviceuploaddrop':Serviceuploaddrop

    },
    mounted:async  function() {
     await  this._fetchRecords();
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
      peoplechange(event){
        debugger;
        this._fetchRecords();
      },
      async _fetchRecords(){ debugger;
        console.log(this.$cookies.get("menuid"));
        let result= await new Promise(async (resolve, reject) => {
          await    rt
          //.get("http://localhost:8057/docment/queryfile?_id="+this.$store.state.menu.id)
            .get("http://localhost:8057/peoples/querypeople?_id="+this.$cookies.get("menuid"))

            .then(res => {
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });

        console.log("查询文件")

        console.log(JSON.stringify(result.result.people));

  this.peopleitems = result.result.people;


      },
      gg(){

      },
      backToHome () {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
  .peopleitems{
    margin-left:50px;
  }
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
