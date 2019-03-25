<template>
  <div>
    <rt-header title="服务商变更单">
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
              <el-form-item label="服务商编码" prop="new_code">
                <el-input v-model="queryForm.new_code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商名称" prop="new_name">
               <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="true">
              <el-form-item  label="审核状态" prop="new_approvalstatus">
                <el-select class="rt-portal-item-select" v-model="queryForm.new_approvalstatus" clearable>
                  <el-option v-for="item in statusOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id">
        <el-table-column type="selection" width="35" :selectable="isSelectedTable" >
        </el-table-column>
        <el-table-column prop="new_code" label="服务商编码" width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_code}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_name" label="服务商名称">
        </el-table-column>
        <el-table-column prop="new_bankaccountname" label="企业名称">
        </el-table-column>
        <el-table-column prop="new_corpowner" label="法人姓名">
        </el-table-column>
        <el-table-column prop="new_corp_owner_mobile" label="法人手机">
        </el-table-column>
        <el-table-column prop="new_approvalstatus" label="审核状态">
        </el-table-column>
        <el-table-column prop="CreatedOn" :formatter="(row, column) => DateFormatter(row, 'CreatedOn' )" sortable label="创建时间">
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
        new_code: "", //服务商编码
        new_name: "", //服务商编名称
        new_approvalstatus: "" //审批状态
      },
      /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      statusOptions: [], //审批状态
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      // pageCookie: "", //crm数据缓存，性能优化,
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
        filter += "new_code=" + this.queryForm.new_name + ",";
      }
      if (this.queryForm.applyType) {
        filter += "new_name=" + this.queryForm.new_code + ",";
      }
      if (this.queryForm.new_approvalstatus) {
        filter +=
          "new_approvalstatus=" + this.queryForm.new_approvalstatus + ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    /***数据初始化***/
    //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();
      this.loading = true;
      var params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter
      };
      var requestStr = "../api/StationApply/GetStationApplyList";
      this.isneedCookie = false; //回写为不需要cookie
      rt.get(requestStr, params)
        .then(res => {
          console.log(res);
          this.tableData = res.stationapplyList;
          // this.pageCookie = res.PagingCookie;
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
        "../api/crmpicklist/options/new_srv_station_apply/new_approvalstatus";
      rt.get(statusLoad)
        .then(res => {
          this.statusOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //重置按钮点击方法
    handleReset() {
      this.$refs.grid.quickSearch = "";
      this.queryForm.new_code = "";
      this.queryForm.new_name = "";
      this.queryForm.new_approvalstatus = "";
      this.$refs["queryForm"].resetFields();
      this._fetchRecords();
    },
    //搜索按钮点击方法
    handleSearch(val) {
      this._fetchRecords();
    },
    /***列表处理***/
    //创建记录
    gotoAddPage() {
      var params = {};
      var requestStr = "../api/StationApply/GetStationApply";
      rt.get(requestStr)
        .then(res => {
          //编辑记录
          this.$router.push({
            name: "StationApplyEdit",
            params: { id: res }
          });
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
      //创建记录
      // this.$router.push({ name: "StationApplyEdit" });
    },
    //删除请求
    deleteData() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      } else {
        var deleteList = "";
        for (var i in selection) {
          deleteList += selection[i].new_srv_station_applyId + ",";
        }
        var params = {
          idList: deleteList
        };
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            var requestStr = "../api/StationApply/DelStationApply";
            rt.get(requestStr, params)
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
      this.$router.push({
        name: "StationApplyEdit",
        params: { id: row.new_srv_station_applyId }
      });
    },
    //翻页处理
    handlePageChange() {
      this._fetchRecords();
    },
    //列表行是否可选
    isSelectedTable: function(row) {
      if (
        row.new_approvalstatus == "制单" ||
        row.new_approvalstatus == "已驳回"
      ) {
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
