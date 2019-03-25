<template>
    <rt-section id="area5" title="服务工程师">
        <template slot="toolbar">
          <el-button type="primary" @click="dispath()" :disabled="disabledDispatch" >确认派工</el-button>
        </template>
        <el-table ref="gridTable" :data="outLineData" v-loading="loading" max-height="500">
            <!-- <el-table-column type="selection" width="35">
            </el-table-column> -->
            <el-table-column label="服务工程师编码" prop="new_srv_worker_code">
            </el-table-column>
            <el-table-column label="服务工程师名称" prop="new_srv_worker_idname">
            </el-table-column>
            <el-table-column label="组别" prop="new_group">
              <template slot-scope="scope">
                <el-input size="small" @keyup.native="if(scope.row.new_group.length==1){scope.row.new_group=scope.row.new_group.replace(/[^1-9]/g,'')}else{scope.row.new_group=scope.row.new_group.replace(/\D/g,'')}" @change="issingleChange(scope.row)" type="number" max="10" v-model="scope.row.new_group" placeholder="请输入内容" ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否接单" prop="new_issingle" >
              <template slot-scope="scope">
                 <el-checkbox v-model="scope.row.new_issingle" @change="issingleChange(scope.row)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteWorker(scope.$index, outLineData)">移除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </rt-section>
</template>

<script>
export default {
  name: "outsideLineEditModel",
  data: function() {
    return {
      loading: false,
      outLineData: [],
      disabledDispatch: false
    };
  },
  components: {},
  props: {
    workOrder: Object,
    groupList: Array
  },
  mounted: function() {
    this.outLineData = [];
  },
  methods: {
    issingleChange: function(row) {
      if (!row.new_issingle) {
        return;
      }
      for (var index in this.outLineData) {
        if (
          this.outLineData[index].new_srv_worker_id != row.new_srv_worker_id &&
          this.outLineData[index].new_group == row.new_group &&
          this.outLineData[index].new_issingle
        ) {
          this.outLineData[index].new_issingle = false;
        }
      }
    },

    deleteWorker: function(index, rows) {
      rows.splice(index, 1);
      this.$emit("reLoad");
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

    dispath: function() {
      var self = this;
      var params = self.outLineData;
      if (params == null || params.length <= 0) {
        rt.showErrorToast("请添加服务人员");
        return;
      }
      if (this.groupList && this.groupList.length > 0) {
        for (var item in params) {
          if (this.contains(this.groupList, params[item].new_group)) {
            rt.showErrorToast("分组【" + params[item].new_group + "】已添加过");
            return;
          }
        }
      }

      this.disabledDispatch = true;
      rt
        .post("../api/WorkOrder/DispatchWorkOrder", params)
        .then(function(res) {
          rt.showSuccessToast("派工成功");
          self.disabledDispatch = false;
          self.$emit("close");
        })
        .catch(error => {
          self.disabledDispatch = false;
          rt.showErrorToast(error);
        });
    },

    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.dialogtableData = [];
    }
  }
};
</script>
