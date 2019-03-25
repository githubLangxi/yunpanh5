<template>
    <div class="reassignDialog">
        <el-dialog title="改派负责人" :visible.sync="dialogFormVisible" :before-close="beforeClose" size="large">
            <el-form :model="queryForm" class="detail-form" label-position="left" label-width="85px">
                <el-row :gutter="50">
                    <el-col :span="5">
                        <el-form-item label="服务人员">
                            <el-input v-model="queryForm.new_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="人员岗位">
                            <rt-picklist v-model="queryForm.new_job" entity="new_srv_worker" attribute="new_job"></rt-picklist>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="人员技能">
                            <el-input v-model="queryForm.new_skill"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="服务量小于">
                            <el-input v-model="queryForm.limitCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData" v-loading="loading" ref="tableData" height="300" highlight-current-row @current-change="selectRowChange" @row-dblclick="onSave">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="new_name" label="服务人员">
                </el-table-column>
                <el-table-column prop="new_phone" label="联系电话">
                </el-table-column>
                <el-table-column prop="ordercount" label="当前服务单量">
                </el-table-column>
                <el-table-column prop="new_skill" label="人员技能">
                </el-table-column>
                <el-table-column prop="new_job" label="人员岗位">
                </el-table-column>
            </el-table>
            <div class="button">
                <el-button @click="beforeClose">取 消</el-button>
                <el-button type="primary" @click="onSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "reassign",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      tableData: [], //服务人员数据
      queryForm: {
        new_name: "", //服务人员
        new_job: 0, //人员岗位
        new_skill: "", //人员技能
        limitCount: 0 //服务量
      }
    };
  },
  props: {
    workOrderId: String
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    show: function() {
      this.dialogFormVisible = true;
    },
    _fetchRecords: function() {
      var params = {
        name: this.queryForm.new_name,
        job: this.queryForm.new_job,
        skill: this.queryForm.new_skill,
        limitCount: this.queryForm.limitCount,
        IsActive: true
      };
      if (this.workOrderId) {
        var requestStr = "../api/WorkOrder/GetWorkerData";
        this.loading = true;
        rt
          .get(requestStr, params)
          .then(res => {
            this.tableData = res;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },
    //查询按钮
    search: function() {
      this._fetchRecords();
    },
    beforeClose: function() {
      this.dialogFormVisible = false;
    },
    //选中行
    selectRowChange: function(val) {
      this.currentRow = val;
      this.toggleRowSelection(row);
    },
    onSave: function() {
      var self = this;
      var params = {
        id: this.workOrderId,
        workerId: this.currentRow.id,
        workerPhone: this.currentRow.new_phone
      };
      rt
        .post("../api/WorkOrder/ChangeWorker", params)
        .then(function(res) {
          self.$message({
            message: self.$t("Successfullyreassigned"),
            type: "success"
          });
          self.dialogFormVisible = false;
          self.$emit("selected");
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
<style>
.reassignDialog .button {
  margin: 20px 0;
  float: right;
}
</style>