<template>
    <el-dialog title="派工" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form>
            <el-input v-model="condition" auto-complete="off" icon="search" :on-icon-click="_fetchRecords" @keyup.enter.native="_fetchRecords"></el-input>
            <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row  v-loading="loading">
                <!-- <el-table-column type="selection" width="35" >
                </el-table-column>                 -->
                <el-table-column prop="new_name" label="服务人员">
                </el-table-column>
                <el-table-column prop="new_code" label="服务人员编码">
                </el-table-column>
                <el-table-column prop="new_job" label="岗位">
                </el-table-column>
                <el-table-column prop="ordercount" label="未完任务数">
                </el-table-column>
                <el-table-column label="操作" fixed="right" >
                    <template slot-scope="scope">
                        <el-button type="text" @click="addWorker(scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
                </el-pagination>
            </div>
        </el-form>
        <outsideLineEditModel ref="outsideLineEditModel" :workOrder="this.workOrder" :groupList="this.groupList" @reLoad="reLoadWorker" @close="handleClose"></outsideLineEditModel>   
    </el-dialog>
</template>
<script>
// import outsideLineEditModel from "./outsideLineEditModel";

export default {
  data: function() {
    return {
      dialogFormVisible: false, //设置主档表单禁用状态
      loading: false,
      dialogtableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //页面大小
      dataTotalCount: 0, //s数据总数
      pageCookie: "",
      condition: "",
      groupList: []
    };
  },
  mounted: function() {},
  watch: {},
  computed: {},
  components: {
    outsideLineEditModel:resolve => { require(['./outsideLineEditModel.vue'], resolve) },
  },
  props: {
    workOrder: Object
  },
  methods: {
    //加载数据
    _fetchRecords: function() {
      var workerIds = this.getWorkerIds();
      var params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        pageCookie: this.pageCookie,
        id: this.workOrder.id,
        condition: this.condition,
        workerIds: workerIds
      };
      this.loading = true;
      var requestStr = "../api/WorkOrder/GetWorkerById";
      rt
        .get(requestStr, params)
        .then(res => {
          this.dialogtableData = res.workerList;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.setList(val);
        this.dialogFormVisible = true;
        this._fetchRecords();
      });
    },

    setList: function(val) {
      this.groupList = [];
      for (var item in val) {
        if (!this.contains(this.groupList, val[item].new_group))
          this.groupList.push(val[item].new_group);
      }
    },
    contains: function(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    },

    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.dialogtableData = [];
      this.$refs.outsideLineEditModel.outLineData = [];
      this.$emit("reLoad");
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },
    //lookup的页面尺寸变更
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.show();
    },
    //lookup的页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.show();
    },
    addWorker: function(row) {
      var outLineData = this.$refs.outsideLineEditModel.outLineData;
      for (var item in outLineData) {
        if (row.id == outLineData[item].new_srv_worker_id) {
          this.pageCookie = "";
          this._fetchRecords();
          return;
        }
      }
      var data = {
        new_group: 1,
        new_issingle: false,
        new_srv_workorder_id: this.workOrder.id,
        new_srv_worker_id: row.id,
        new_srv_worker_idname: row.new_name,
        new_srv_worker_code: row.new_code
      };
      this.$refs.outsideLineEditModel.outLineData.push(data);
      this._fetchRecords();
    },

    getWorkerIds: function() {
      var workerIds = [];
      if (this.$refs.outsideLineEditModel) {
        var data = this.$refs.outsideLineEditModel.outLineData;
        for (var item in data) {
          workerIds.push(data[item].new_srv_worker_id);
        }
      }
      return workerIds;
    },

    reLoadWorker: function() {
      this.pageCookie = "";
      this._fetchRecords();
      this.$emit("reLoad");
    }
  }
};
</script>

