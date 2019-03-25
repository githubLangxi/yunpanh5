<template>
  <div>
    <rt-section id="area15" title="区域信息">
      <template slot="toolbar">
        <rt-button type="add" text="新增" @click="gotoAddPage()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
        <rt-button type="delete" text="删除" @click="deleteAreaInfo()" v-if="(this.workOrder.new_dealstage==6||this.workOrder.new_dealstage==7||this.workOrder.new_dealstage==10||this.workOrder.new_dealstage==15||this.workOrder.new_dealstage==16||this.workOrder.new_dealstage==17)||this.workOrder.new_tech_approvalstatus==3" />
      </template>
      <el-table ref="areaInfoTable" @row-dblclick="doubleClick" :data="areaInfo" row-key="new_workorderfunctionalareasid" stripe
        v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_placetypes_name" label="场所类型">
        </el-table-column>
        <el-table-column prop="new_functionalareas_name" label="功能区域">
        </el-table-column>
        <el-table-column prop="new_regionalidentity" label="区域标识">
        </el-table-column>
        <el-table-column prop="new_usearea" label="使用面积">
        </el-table-column>
        <el-table-column prop="new_referenceurc" label="参考单位制冷量">
        </el-table-column>
        <el-table-column prop="new_ismeet_value" label="匹配是否满足">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleIndexChange" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalRecord">
    </el-pagination>
    </rt-section>
    <areaInfoDialog ref="areaInfoDialog" :workOrder="this.workOrder" @reload="reLoad"></areaInfoDialog>
  </div>
</template>
<script>
import areaInfoDialog from "./areaInfoDialog";
export default {
  data: function() {
    return {
      loading: false,
      areaInfo: [], //区域信息
      pageCookie: "",
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [3, 5, 10],
      totalRecord: 0,
      layout: "total, sizes, prev, pager, next, jumper"
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    areaInfoDialog
  },
  mounted: function() {
    this.init();
  },
  methods: {
    SaveData: function() {},
    doubleClick: function(row) {
      this.$refs.areaInfoDialog.show(row.new_workorderfunctionalareasid);
    },
    gotoAddPage: function() {
      this.$refs.areaInfoDialog.show();
    },
    init: function() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        pageCookie: this.pageCookie,
        queryValue: this.workOrder.id
      };
      this.loading = true;
      //获取功能区域int pageSize, int pageIndex, string queryValue, string pageCookie
      var requestStr1 = "../api/VisitDesign/GetAreaInfo";
      rt
        .get(requestStr1, params)
        .then(res => {
          this.areaInfo = res.areaInfoList;
          this.totalRecord = res.totalRecordCount;
          this.pageCookie = res.pagingCookie;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    deleteAreaInfo: function() {
      //删除请求
      var selection = this.$refs.areaInfoTable.selection;
      if (selection == null || selection.length == 0) {
        alert("请至少选择一条记录！");
        return;
      }
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
            deleteList.push(selection[i].new_workorderfunctionalareasid);
          }
          var params = deleteList;
          var requestStr = "../api/VisitDesign/DeleteAreaInfo";
          rt
            .post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.init();
              this.loading = false;
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        })
        .catch(e => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.pageCookie = "";
      this.pageSize = val;
      this.init();
    },
    handleIndexChange(val) {
      this.pageIndex = val;
      this.init();
    },
    reLoad: function() {
      this.init();
      this.$emit("reload");
    }
  }
};
</script>