<template>
  <div>
    <rt-section id="area6" title="套机产品明细">
      <template slot="toolbar">
        <rt-button type="add" @click="addUserProfile" v-if="this.workOrder.new_type!=13&&(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==16)&&!this.workOrder.usedApp&&this.workOrder.canEdit" />
        <rt-button type="delete" @click="deleteUserProfile" v-if="this.workOrder.new_type!=13&&(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)&&this.workOrder.canEdit" />
      </template>
      <el-table ref="gridTable" :data="workOrder2UserprofileList" @row-dblclick="showWorkOrder2Userprofile" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column label="套机类型" prop="new_settypetext">
        </el-table-column>
        <el-table-column label="套机标识" prop="new_setmark">
        </el-table-column>
        <el-table-column label="序列号" prop="new_name">
        </el-table-column>
        <el-table-column label="机型" prop="new_product_idName">
        </el-table-column>
        <el-table-column label="内外机类型" prop="new_insideoroutsidetext">
        </el-table-column>
        <el-table-column label="产品类别" prop="new_productmodel_idName">
        </el-table-column>
        <el-table-column label="保修开始时间" prop="new_begindate">
        </el-table-column>
        <el-table-column label="保修截止时间" prop="new_enddate">
        </el-table-column>
        <el-table-column label="是否故障机" prop="new_iserrortext">
        </el-table-column>
        <el-table-column label="退换机类型" prop="new_replacetypetext">
        </el-table-column>
        <el-table-column label="新条码" prop="new_changednumber">
        </el-table-column>
        <el-table-column label="是否过保" prop="new_isoutwarrantytext">
        </el-table-column>
        <el-table-column label="是否纳入结算" prop="new_issettlementtext">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
      </el-pagination>
      <workOrder2UserprofileDialog ref="workOrder2UserprofileDialog" :work-order="this.workOrder" @reLoad="reLoadData" @gotoNewOrder="gotoNewOrder"></workOrder2UserprofileDialog>
      <workOrder2UserprofileEditDialog ref="workOrder2UserprofileEditDialog" :work-order="this.workOrder" @reLoad="reLoadData" ></workOrder2UserprofileEditDialog>
    </rt-section>
  </div>
</template>

<script>
// import workOrder2UserprofileDialog from "./workOrder2UserprofileDialog";
export default {
  name: "WorkOrder2UserprofileModel",
  data: function() {
    return {
      loading: false,
      workOrder2UserprofileList: [],
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      isLoad: false
    };
  },
  components: {
    workOrder2UserprofileDialog: resolve => {
      require(["./workOrder2UserprofileDialog.vue"], resolve);
    },
    workOrder2UserprofileEditDialog: resolve => {
      require(["./workOrder2UserprofileEditDialog.vue"], resolve);
    }
  },
  props: {
    workOrder: {
      type: Object,
      require: true
    }
  },
  mounted: function() {
    this.workOrder2UserprofileList = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
    //this._fetchRecords();
  },
  methods: {
    //加载套机产品明细数据
    _fetchRecords: function() {
      if (this.workOrder && this.workOrder.id) {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          pageCookie: this.pageCookie,
          id: this.workOrder.id
        };
        this.loading = true;
        var requestStr = "../api/WorkOrder/WorkOrder2Userprofile";
        rt.get(requestStr, params)
          .then(res => {
            this.workOrder2UserprofileList = res.workOrder2UserprofileList;
            this.totalRecord = res.totalRecordCount;
            this.pageCookie = res.pagingCookie;
            this.loading = false;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
        this.isLoad = true;
      }
    },
    reLoadData: function() {
      this._fetchRecords();
      this.$emit("reLoad");
    },
    handleSizeChange(val) {
      this.pageCookie = "";
      this.pageSize = val;
      this._fetchRecords();
    },
    handleIndexChange(val) {
      this.pageIndex = val;
      this._fetchRecords();
    },
    addUserProfile: function() {
      this.$refs.workOrder2UserprofileDialog.show();
    },

    deleteUserProfile: function() {
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条数据"
        });
      } else {
        this.$confirm("此操作将永久删除该记录,是否继续", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: "取消",
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            var deleteList = [];
            for (var i in selection) {
              deleteList.push(selection[i].id);
            }
            var params = deleteList;
            var requestStr = "../api/WorkOrder/DeleteWorkOrder2Userprofile";
            rt.post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
                this.loading = false;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //跳转新服务单
    gotoNewOrder: function(val) {
      this.$emit("goToNewWorkOrder", val);
    },

    showWorkOrder2Userprofile: function(row) {
      if (!this.workOrder.canEdit) return;
      this.$refs.workOrder2UserprofileEditDialog.show(row.id);
    }
  }
};
</script>
