<template>
  <div>
    <rt-header title="质量反馈单">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
      </template>
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="反馈单号" prop="new_name">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务单号" prop="workordername">
                <el-input v-model="queryForm.workordername"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="反馈时间" prop="feedbacktime">
                <el-date-picker v-model="queryForm.feedbacktime" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="反馈现象描述" prop="error">
                <el-input v-model="queryForm.error"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="反馈原因描述" prop="errorgroup">
                <el-input v-model="queryForm.errorgroup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态" prop="approvalstatus">
                <el-select class="rt-portal-item-select" v-model="queryForm.approvalstatus" clearable>
                  <el-option v-for="item in statusOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="机型" prop="feedbackproductname">
                <el-input v-model="queryForm.feedbackproductname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件名称" prop="productname">
                <el-input v-model="queryForm.productname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="handleSortChange">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_name" label="反馈单号" sortable width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_srv_workorder_idName" label="服务单号">
        </el-table-column>
        <el-table-column prop="new_feedbacktime" :formatter="(row, column) => DateFormatter(row, 'new_feedbacktime' )" label="反馈时间">
        </el-table-column>
        <el-table-column prop="new_approvalstatusText" label="审核状态">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //搜索项
      queryForm: {
        id:"",
        new_name: "", //反馈单号
        workordername: "", //服务单号
        feedbacktime: "", //反馈时间
        error: "", //反馈现象描述
        errorgroup: "", //反馈原因描述
        approvalstatus: "", //审核状态
        feedbackproductname: "", //机型
        productname: "" //配件名称
      },

      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      typeOptions: [], //下拉列表申请类型
      statusOptions: [], //审批状态
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: "new_name,descending", //排序
      pageCookie: "", //crm数据缓存，性能优化,
      isneedCookie: false //页面变更时启用
    };
  },

  mounted: function() {
    this._fetchRecords();
    this.bindSelectType();
  },
  computed: {
    //筛选条件
    filter: function() {
      var filter = "";
      if (this.$refs.grid.quickSearch) {
        filter += "new_name=" + this.$refs.grid.quickSearch + ",";
      }
      if (this.queryForm.new_name) {
        filter += "new_name=" + this.queryForm.new_name + ",";
      }
      if (this.queryForm.workordername) {
        filter += "new_srv_workorder_idName=" + this.queryForm.workordername + ",";
      }
      if (this.queryForm.feedbacktime) {
        filter +=
          "new_feedbacktime=" +
          rt.formatDateTime(this.queryForm.feedbacktime, "yyyy-mm-dd") +
          ",";
      }
      if (this.queryForm.error) {
        filter += "new_srv_error_idName=" + this.queryForm.error + ",";
      }
      if (this.queryForm.errorgroup) {
        filter +="new_srv_errorgroup_idName=" + this.queryForm.errorgroup + ",";
      }
      if (this.queryForm.approvalstatus) {
        filter += "new_approvalstatus=" + this.queryForm.approvalstatus + ",";
      }
      if (this.queryForm.feedbackproductname) {
        filter += "feedbackproductname=" + this.queryForm.feedbackproductname + ",";
      }
      if (this.queryForm.productname) {
        filter += "productname=" + this.queryForm.productname + ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    /***************/
    /***数据初始化***/
    /***************/
    //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      };
      var requestStr = "../api/QualityFeedback/GetQualityFeedbackList";
      this.isneedCookie = false; //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          console.log(res);
          this.tableData = res.QualityFeedbackList;
          this.pageCookie = res.PagingCookie;
          this.dataTotalCount = res.TotalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //加载下拉框数据
    bindSelectType: function() {
      var statusLoad =
        "../api/crmpicklist/options/new_srv_partsapply/new_approvalstatus";
      rt
        .get(statusLoad)
        .then(res => {
          this.statusOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    /***************/
    /***搜索框处理***/
    /***************/
    //重置按钮点击方法
    handleReset() {
      this.$refs.grid.quickSearch = "";
      this.queryForm.applyType = "";
      this.queryForm.approvalStatus = "";
      this.$refs["queryForm"].resetFields();
      this._fetchRecords();
    },
    //搜索按钮点击方法
    handleSearch(val) {
      this._fetchRecords();
    },

    /*************/
    /***列表处理***/
    /*************/
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "qualityFeedbackCreate" });
    },
    //删除请求
    deleteData() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      } else {
        var deleteList = [];
        for (var i in selection) {
          if (selection[i].new_approvalstatusText == "制单") {
            this.id = selection[i].Id;
            deleteList.push(this.id);
          } else {
            rt.showErrorToast(this.$t("CanNotDelete"));
            continue;
          }
        }
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            var params = deleteList;
            var requestStr = "../api/QualityFeedback/DeleteQualityFeedback";
            rt
              .post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("HasCancelled")
            });
          });
      }
    },
    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$router.push({ name: "qualityFeedbackEdit", params: { id: row.Id } });
    },
    //排序处理
    handleSortChange(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this._fetchRecords();
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords();
    },
    //列表行是否可选
    isSelectedTable: function(row) {
      if (row.new_approvalstatus == 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>
