<template>
  <div>
    <rt-header v-bind:title="$t('new_srv_worker')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <!--****搜索条件****-->
      <template slot="more">
        <el-form label-position="left" label-width="120px" ref="queryForm" :model="queryForm">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="姓名" prop="new_name">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="new_phone">
                <el-input v-model="queryForm.new_phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="statecode">
                <el-select class="rt-portal-item-select" v-model="queryForm.statecode" clearable>
                  <el-option v-for="item in statusOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <el-form-item label="入司时间-起" prop="beginDate">
              <el-date-picker v-model="queryForm.beginDate" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入司时间-止" prop="endDate">
               <el-date-picker v-model="queryForm.endDate" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位" prop="new_job">
                <el-select class="rt-portal-item-select" v-model="queryForm.new_job" clearable>
                  <el-option v-for="item in jobOptions" :key="item.Value" :label="item.Text " :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template slot="toolbar">
      <rt-button type="enable" @click="enableDetail" />
      <rt-button type="disable" @click="disableDetail" />
      <rt-button type="export" :text="$t('BUTTON_SYNCHRONISE')" @click="syncDetail" />
      <rt-button type="add" @click="createDetail" />
      <!--<rt-button type="revert" @click="resetPassword" :text="$t('BUTTON_RESETPASS')" />-->
      <!-- <rt-button type="delete" @click="deleteDetail" /> -->
    </template>
      <!--****列表****-->
      <el-table stripe v-loading="loading" v-bind:data="tableData" ref="tableData" row-key="id" @sort-change="handleSortChange">
          <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="new_code" width="200" v-bind:label="$t('new_srv_worker.new_code')">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_code}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_srv_worker_code" label="上岗证编码" width="130">
        </el-table-column>
        <el-table-column prop="new_name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="new_phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="new_jobname" width="120" label="岗位名称">
        </el-table-column>
        <el-table-column prop="idnumber" label="身份证编号" width="150">
        </el-table-column>
        <el-table-column prop="new_workstartUTC" width="150" label="入司开始日期">
        </el-table-column>
        <el-table-column prop="new_workendUTC" width="130" label="结束日期">
        </el-table-column>
        <el-table-column prop="new_contracttypeName" width="130" label="工人类别">
        </el-table-column>
        <el-table-column prop="new_workyear" width="130" label="工作年限">
        </el-table-column>
          <el-table-column prop="statecodeName" width="100" label="状态">
        </el-table-column>
      </el-table>
    </rt-grid>
     <ResetPassword ref="resetpassword" :rowid="password_id"></ResetPassword>
  </div>
   
</template>

<script type="text/javascript">
import ResetPassword from "../dialog/ResetPassword";
export default {
  data() {
    return {
      //搜索项
      queryForm: {
        new_name: '', //姓名
        new_phone: '', //手机号
        statecode: '', //状态
        beginDate: null, //开始日期
        endDate: null, //结束日期
        new_job:''   //岗位
      },

            /*************/
      //页面初始化数据
      /*************/
      loading: false, //加载特效
      tableData: [], //table数据设定
      pageSize: 10, //每页显示数据条数
      dataTotalCount: 0, //总数局条数
      orderby: 'new_name,descending', //排序
      pageCookie: '', //crm数据缓存，性能优化,
      isneedCookie: false, //页面变更时启用

      mainid:"",  //当前服务站ID
      //数据加载
      reset_password: "", //重置密码
      confirm_password: "", //确认密码
      password_id: "",
      jobOptions:[],       //岗位下拉框
      statusOptions:[],     //状态下拉框
      
      tableDataRowId: ""
    };
  },
  computed: {
    //筛选条件
    filter: function() {
      var filter = ''
      if (this.$refs.grid.quickSearch) {
        filter += 'new_name=' + this.$refs.grid.quickSearch + ','
      }
      if (this.queryForm.new_name) {
        filter += 'new_name=' + this.queryForm.new_name + ','
      }
      if (this.queryForm.new_phone) {
        filter += 'new_phone=' + this.queryForm.new_phone + ','
      }
      if (this.queryForm.statecode==1||this.queryForm.statecode==0) {
        filter += 'statecode=' + this.queryForm.statecode + ','
      }
      if (this.queryForm.beginDate) {
        filter += 'beginDate=' + rt.formatDateTime(this.queryForm.beginDate, "yyyy-mm-dd") + ','
      }
      if (this.queryForm.endDate) {
        filter += 'endDate=' + rt.formatDateTime(this.queryForm.endDate, "yyyy-mm-dd") + ','
      }
      if (this.queryForm.new_job) {
        filter += 'new_job=' + this.queryForm.new_job + ','
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1)
      }
      return ''
    }
  },
  components: { ResetPassword },
  mounted() {
    //主档ID
    if (this.$store.state.user.departId) {
      this.mainid = this.$store.state.user.departId;
    }
    this.loadData();
    this.bindSelectType();
  },
  methods: {
    gotoEditPage(row) {
      //编辑记录
         this.$router.push({ name: 'basicdetailedit', params: { id: row.new_srv_workerid } })
    },
    //排序处理
    handleSortChange(sort) {
      //排序处理
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this.loadData();
    },
       //翻页处理
    handlePageChange() {
      this.loadData()
    },
     //搜索按钮点击方法
    handleSearch(val) {
      this.loadData()
    },
     //重置按钮点击方法
    handleReset() {
      this.$refs.grid.quickSearch = ''
      this.queryForm.new_name= ''
      this.queryForm.new_phone= '' 
      this.queryForm.statecode= '' 
      this.queryForm.beginDate=null 
      this.queryForm.endDate=null 
      this.queryForm.new_job=''   
      this.$refs['queryForm'].resetFields()
      this.loadData()
    },
    //创建明细
    createDetail: function() {
       this.$router.push({ name: 'basicdetailcreate' })
    },
    //删除明细
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
        confirmButtonText: this.$t("BUTTON_DETERMINE"),
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: this.$t("BUTTON_CANCEL"),
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].new_srv_workerid);
          }
          var params = deleteList;
          var deleteStr = "../api/SrvWorker/DelSrvWorker";
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.loadData();
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
    },
    //停用服务人员
    disableDetail: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.loading = true;
      var disableList = [];
      for (var i in selection) {
        disableList.push(selection[i].new_srv_workerid);
      }
      var params = disableList;
      var disableStr = "../api/SrvWorker/InActiveStationUser";
      rt
        .post(disableStr, params)
        .then(res => {
          rt.showSuccessToast(this.$t("Successfullydeactivated"));
          this.loadData();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //启用服务人员
    enableDetail: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.loading = true;
      var enableList = [];
      for (var i in selection) {
        enableList.push(selection[i].new_srv_workerid);
      }
      var params = enableList;
      var enableStr = "../api/SrvWorker/ActiveStationUser";
      rt
        .post(enableStr, params)
        .then(res => {
          rt.showSuccessToast(res);
          this.loadData();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //同步服务人员
    syncDetail: function() {
      var syncStr = "../api/SrvWorker/SyncCRMWorkerToProtal";
      rt
        .post(syncStr)
        .then(res => {
          //rt.showSuccessToast(res);
          rt.showSuccessToast("服务人员同步成功");
          this.loadData();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
     //加载下拉框数据
    bindSelectType: function() {
       //岗位下拉列表
      var typeLoad = "../api/crmpicklist/options/new_srv_worker/new_job";
      rt
        .get(typeLoad)
        .then(res => {
          this.jobOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });


      var statusLoad = "../api/crmpicklist/options/new_srv_worker/statecode";
      rt
        .get(statusLoad)
        .then(res => {
          this.statusOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    //加载数据
    loadData() {
      var self = this;
     /* self.loading = true;
      self
        .loadLineData()
        .then(function(res) {
          self.tableData = res.newsrvwrokerlist;
          self.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        }); */
      var pageIndex = this.$refs.grid.getPageIndex()
      var pageSize = this.$refs.grid.getPageSize()
      this.loading = true
      var params = {
        stationID:this.mainid,
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: this.filter,
        orderby: this.orderby
      }
      var requestStr = '../api/SrvWorker/GetWorkerListByStationID'
      this.isneedCookie = false //回写为不需要cookie
      rt
        .get(requestStr, params)
        .then(res => {
          this.tableData = res.workerList
          this.pageCookie = res.pagingCookie
          this.dataTotalCount = res.totalRecordCount
          this.loading = false
        })
        .catch(error => {
          rt.showErrorToast(error)
          this.loading = false
        })
    },
    gotoChangePage:function(row){
       this.$router.push({ name: 'infochange', params: { id: row.new_srv_workerid } })
    },
    resetPassword: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      } else if (selection.length > 1) {
        rt.showErrorToast(this.$t("ResetCanOnlySelectOne"));
        return;
      }
      var disableList = [];
      for (var i in selection) {
        disableList.push(selection[i].new_srv_workerid);
      }
      this.password_id = disableList[0];
      this.$refs.resetpassword.show();
    },
    clearPassword: function() {
      this.confirm_password = "";
      this.reset_password = "";
    }
  }
};
</script>

<style>
.el-loading-mask {
  z-index: 2;
}
</style>


