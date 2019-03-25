 <template>
    <div style="width:100%">
        <rt-header title="服务收费明细查询">
        </rt-header>
        <rt-grid ref="grid" quicksearch-placeholder="快速搜索服务单号" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset" style="width: 100%">
            <template slot="more">
                <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
                    <el-row :gutter="40">
                        <el-col :span="8">
                            <el-form-item label="服务单号" prop="new_workorder_idname">
                                <el-input v-model="queryForm.new_workorder_idname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="服务工程师" prop="new_srv_worker_id">
                                <rt-lookup v-model="queryForm.new_srv_worker_id" entity="new_srv_worker" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="费用分类" prop="new_item">
                                <rt-picklist v-model="queryForm.new_item" entity="new_expenseitem" attribute="new_item"></rt-picklist>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="8">
                            <el-form-item label="创建时间起" prop="dateFrom">
                                <el-date-picker type="datetime" v-model="queryForm.dateFrom" @change="startDateCheck('dateFrom','dateTo')"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="创建时间止" prop="dateTo">
                                <el-date-picker type="datetime" v-model="queryForm.dateTo" @change="endDateCheck('dateFrom','dateTo')" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>        
            <el-table ref="gridTable" v-bind:data="workorder2feedetailData" row-key="id" stripe v-loading="loading" @sort-change="handleSortChange" style="width: 100%">
                <el-table-column prop="new_workorder_idname" label="服务单号" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="new_expenseitem_idname" label="费用项目" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_itemtext" label="费用项目分类" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_memo" label="计价说明" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_qty" label="数量" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_auxprice" label="标准单价" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_stdamount" label="应收金额" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_amount" label="实收金额" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_srv_worker_idname" label="服务工程师" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="createdon" label="创建日期" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </rt-grid>
    </div> 
 </template>
 <script>
export default {
  data: function() {
    return {
      queryForm: {
        new_workorder_idname: "",
        new_srv_worker_id: {},
        new_item: null,
        dateFrom: "",
        dateTo: ""
      },
      workorder2feedetailData: [], //table数据绑定
      dataTotalCount: 0, //数据总条数
      pageCookie: "",
      orderby: "createdon,descending", //排序条件
      loading: false
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  created: function() {},
  watch: {},
  computed: {
    filter: function() {
      var filter = "";
      if (
        this.$refs.grid.quickSearch != null &&
        this.$refs.grid.quickSearch != ""
      ) {
        filter += "quicksearch=" + this.$refs.grid.quickSearch + ",";
      }
      if (this.queryForm.dateFrom)
        filter +=
          "dateFrom=" + this.queryForm.dateFrom.toLocaleDateString() + ",";
      if (this.queryForm.dateTo)
        filter += "dateTo=" + this.queryForm.dateTo.toLocaleDateString() + ",";
      if (this.queryForm.new_workorder_idname)
        filter +=
          "new_workorder_idname=" + this.queryForm.new_workorder_idname + ",";
      if (
        this.queryForm.new_srv_worker_id &&
        this.queryForm.new_srv_worker_id.id
      )
        filter +=
          "new_srv_worker_id=" + this.queryForm.new_srv_worker_id.id + ",";
      if (this.queryForm.new_item)
        filter += "new_item=" + this.queryForm.new_item + ",";
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  methods: {
    //查询数据
    handleSearch: function() {
      this._fetchRecords();
    },
    //页面发生变化
    handlePageChange: function() {
      this._fetchRecords();
    },
    //加载数据
    _fetchRecords: function() {
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby,
        workOrderType: this.workOrderType
      };
      this.loading = true;
      var requestStr = "../api/WorkOrder/GetWorkorder2feedetailList";
      rt.get(requestStr, params)
        .then(res => {
          this.workorder2feedetailData = res.workorder2feedetailList;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //重置查询选项
    handleReset: function() {
      this.$refs["queryForm"].resetFields();
      this.$refs.grid.quickSearch = "";
      this._fetchRecords();
    },
    //排序
    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.workorder2feedetailData = [];
      this._fetchRecords();
    },
    //结束时间change事件
    endDateCheck: function(from, to) {
      if (this.queryForm[from] && this.queryForm[to]) {
        if (this.queryForm[from] > this.queryForm[to]) {
          rt.showErrorToast("结束时间必须大于等于开始时间");
          this.queryForm[to] = null;
        }
      }
    },
    //开始时间change事件
    startDateCheck: function(from, to) {
      if (this.queryForm[from] && this.queryForm[to]) {
        if (this.queryForm[from] > this.queryForm[to]) {
          rt.showErrorToast("开始时间必须小于等于结束时间");
          this.queryForm[from] = null;
        }
      }
    }
  }
};
</script>
<style>
.el-col {
  font-size: 14px;
  color: #555;
}
.service h3 {
  padding: 8px 0;
  font-weight: bold;
  font-size: 15px;
}
.service a {
  text-decoration: underline;
  color: #20a0ff;
}

.el-row {
  padding: 5px 0;
}

.header-margin {
  margin-top: 5px;
}

.table-content2 {
  padding-left: 20px;
  padding-right: 20px;
  background: #fff;
}

#refresh {
  position: relative;
  z-index: 100;
  float: right;
  color: black;
  text-decoration: none;
  margin-right: 20px;
  margin-top: -10px;
  font-size: 14px;
  color: #555;
}

#servicemore:hover {
  color: #20a0ff;
  text-decoration: underline;
}

#servicename {
  font-size: 12px;
}

#servicename:hover {
  color: #20a0ff;
  text-decoration: underline;
}

.el-table th,
.el-table td {
  height: 36px !important;
  color: #555;
  font-size: 12px;
}

.el-table th > .cell {
  line-height: 36px !important;
}

.el-table .info-row {
  background: #fafafa;
}

.el-table .positive-row {
  background: #fff;
}

@media screen and (min-width: 1920px) {
  .header-margin {
    margin-top: 5px;
  }
  .table-content2 {
    padding-left: 20px;
    padding-right: 20px;
    background: #fff;
  }
}
</style>
 