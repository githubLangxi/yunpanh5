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
        <el-table-column prop="company" label="公司" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="work" label="职位/工作" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
        </el-table-column>

      </el-table>
    </div>
  </template>

</div>
</template>

<script>
export default {
  props: ['peopleitems'],
  data: function() {
    return {

      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定

      isneedCookie: false //页面变更时启用
    };
  },

  components: {},
  mounted: function() {

     this._fetchRecords();
  },
  computed: {


  },
  watch: {
    'tableData' (to, from) {
      console.log("watch")
      this.tableData = this.peopleitems;
      // console.log(this.getStatus(this.$route.path))
    },
    'peopleitems' (to, from) {
      console.log("watch")
      this.tableData = this.peopleitems;
      // console.log(this.getStatus(this.$route.path))
    }
  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords() {
debugger;
      this.tableData = this.peopleitems;
      this.loading = true;

    },



  }
};
</script>

<style scoped>

</style>
