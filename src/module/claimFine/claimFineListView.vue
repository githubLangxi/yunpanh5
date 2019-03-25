 <template>
  <div>
    <rt-header v-bind:title="$t('new_srv_claimfine')">
    </rt-header>
    <rt-grid ref="grid" :quicksearch-placeholder="$t('QuickSearch')" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch(1)" @search="handleSearch(2)" @reset="handleReset">
      <template slot="toolbar">
      </template>
      <template slot="more">
        <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_claimfine.new_findate')+$t('From')" prop="startdate">
                <el-date-picker type="date" v-model="queryForm.startdate" @change="startDateCheck" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_claimfine.new_findate')+$t('To')" prop="enddate">
                <el-date-picker type="date" v-model="queryForm.enddate" @change="endDateCheck" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_claimfine.new_finetype')" prop="new_finetype">
                <rt-picklist v-model="queryForm.new_finetype" entity="new_srv_claimfine" attribute="new_finetype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item v-bind:label="$t('new_srv_claimfine.new_approvalstatus')" prop="new_approvalstatus">
                <rt-picklist v-model="queryForm.new_approvalstatus" entity="new_srv_claimfine" attribute="new_approvalstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <el-table ref="gridTable" v-bind:data="claimFineData" row-key="id" stripe @row-dblclick="doubleClick" v-loading="loading" @sort-change="handleSortChange">
        <el-table-column prop="new_name" v-bind:label="$t('new_srv_claimfine.new_name')">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoDetailPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_finetypetext" v-bind:label="$t('new_srv_claimfine.new_finetype')">
        </el-table-column>
        <el-table-column prop="new_amount" v-bind:label="$t('new_srv_claimfine.new_amount')">
        </el-table-column>
        <el-table-column prop="new_findate" :formatter="(row, column) => DateFormatter(row, 'new_findate')" sortable v-bind:label="$t('new_srv_claimfine.new_findate')">
        </el-table-column>
        <el-table-column prop="new_checkitem" v-bind:label="$t('new_srv_claimfine.new_checkitem')">
        </el-table-column>
        <el-table-column prop="new_approvalstatustext" v-bind:label="$t('new_srv_claimfine.new_approvalstatus')">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);
export default {
  data: function() {
    return {
      //查询条件
      queryForm: {
        startdate: "",
        enddate: "",
        new_finetype: "", //调整类型
        new_approvalstatus: "" //审核状态
      },
      orderby: "createdon,descending", //排序条件

      claimFineData: [],
      dataTotalCount: 0, //数据总条数

      loading: false,
      searchtype: 1, //搜索类别
      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: "",
      canLoadData: true
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  computed: {
    filter: function() {
      this.canLoadData = true;
      var filter = "";
      if (
        this.$refs.grid.quickSearch != null &&
        this.$refs.grid.quickSearch != ""
      ) {
        filter = "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      //创建时间从
      if (this.queryForm.startdate) {
        filter +=
          "startdate=" +
          rt.formatDateTime(this.queryForm.startdate, "yyyy-mm-dd") +
          ",";
      }
      //到
      if (this.queryForm.enddate) {
        filter +=
          "enddate=" +
          rt.formatDateTime(this.queryForm.enddate, "yyyy-mm-dd") +
          ",";
      }
      if (this.queryForm.new_finetype) {
        filter += "new_finetype=" + this.queryForm.new_finetype + ",";
      }
      if (this.queryForm.new_approvalstatus) {
        filter +=
          "new_approvalstatus=" + this.queryForm.new_approvalstatus + ",";
      }
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return filter;
    }
  },
  methods: {
    //查询数据
    handleSearch: function(val) {
      this.searchtype = val;
      this._fetchRecords();
    },
    //提交页数变化,加载数据
    handlePageChange: function() {
      this._fetchRecords();
    },
    //加载数据
    _fetchRecords: function() {
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby
      };
      if (!this.canLoadData) {
        //对错误抛出停止数据筛选
        return;
      }
      this.loading = true;
      var requestStr = "../api/ClaimFine/GetClaimFine";
      rt
        .get(requestStr, params)
        .then(res => {
          this.claimFineData = res.claimFineList;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //点击单号进入奖惩结算单详细页面
    gotoDetailPage: function(row) {
      this.$router.push({ name: "claimfinedetail", params: { id: row.id } });
    },
    //双击进入奖惩结算单详细页面
    doubleClick: function(row) {
      this.$router.push({ name: "claimfinedetail", params: { id: row.id } });
    },
    //重置查询选项
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
      this._fetchRecords();
    },
    //结束时间change事件
    endDateCheck: function() {
      if (this.queryForm.startdate) {
        if (this.queryForm.startdate > this.queryForm.enddate) {
          this.$message({
            type: "error",
            message: this.$t("BeginNeedLessThanEnd")
          });
          this.queryForm.enddate = null;
        }
      }
    },
    //开始时间change事件
    startDateCheck: function() {
      if (this.queryForm.enddate) {
        if (this.queryForm.startdate > this.queryForm.enddate) {
          this.$message({
            type: "error",
            message: this.$t("BeginNeedLessThanEnd")
          });
          this.queryForm.startdate = null;
        }
      }
    },
    //排序
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.serviceData = [];
      this._fetchRecords();
    }
  }
};
</script>

