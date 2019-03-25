<template>
<div>
<!--<rt-header :title="人员表单">-->
  <!--</rt-header>-->
  <template>
    <div class="table-content" >
      <el-table :data="tableData" :row-class-name="222" style="width: 100%;" border >
        <el-table-column prop="name" label="姓名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tel" label="电话" show-overflow-tooltip>
        </el-table-column>

      </el-table>
    </div>
  </template>

</div>
</template>

<script>
export default {
  data: function() {
    return {

      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [{_id:"123",name:"a",tel:"1398775567"}], //table数据设定

      isneedCookie: false //页面变更时启用
    };
  },

  components: {},
  mounted: function() {

    this._fetchRecords();
  },
  computed: {


  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords() {


      this.loading = true;
alert(  this.$store.state.menu.id);
let params={
  _id:  this.$store.state.menu.id
}
      var requestStr = "http://localhost:8057/people/querypeople";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.result;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },



  }
};
</script>

<style scoped>

</style>
