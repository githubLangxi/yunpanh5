 <template>
    <div style="width:100%">
        <rt-header title="服务人员派工规则">
        </rt-header>
        <rt-grid ref="grid" quicksearch-placeholder="快速搜索服务人员编码" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset" style="width: 100%">
            <template slot="toolbar">
                <rt-button type="add" @click="gotoAddPage()" />
                <rt-button type="delete" @click="deleteData()"/>
            </template>
            <template slot="more">
                <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
                    <el-row :gutter="40">
                        <el-col :span="8">
                            <el-form-item label="服务工程师" prop="new_srv_worker_id">
                                <rt-lookup v-model="queryForm.new_srv_worker_id" entity="new_srv_worker" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="购买单位类型" prop="new_channeltype">
                                <rt-picklist v-model="queryForm.new_channeltype" entity="new_srv_worker2dispatch" attribute="new_channeltype"></rt-picklist>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="服务类型" prop="new_type">
                                <rt-picklist v-model="queryForm.new_type" entity="new_srv_worker2dispatch" attribute="new_type"></rt-picklist>
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
                        <el-col :span="8">
                            <el-form-item label="产品线" prop="new_productgroupid">
                                <rt-lookup v-model="queryForm.new_productgroupid" entity="new_productgroup" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="8">
                            <el-form-item label="城市" prop="new_city_id">
                                <rt-lookup v-model="queryForm.new_city_id" entity="new_city" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="区县" prop="new_county_id">
                                <rt-lookup v-model="queryForm.new_county_id" entity="new_county" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="城镇" prop="new_town_id">
                                <rt-lookup v-model="queryForm.new_town_id" entity="new_town" nameField="new_name"  />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>        
            <el-table ref="gridTable" v-bind:data="worker2dispatchData" row-key="id" stripe v-loading="loading" @sort-change="handleSortChange" style="width: 100%">
                <el-table-column type="selection" width="35" :selectable="selecTable">
                </el-table-column>
                <el-table-column prop="new_worker_code" label="服务人员编号" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="new_worker_idname" label="姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_productgroupidname" label="产品线" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_channeltypetext" label="购买单位类型" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_multiconnectedtext" label="大多联" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_ismodularitytext" label="模块机" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_typetext" label="服务类型" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_province_idname" label="省份" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_city_idname" label="城市" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="new_county_idname" label="县区" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="new_town_idname" label="街道" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="createdon" label="创建日期" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </rt-grid>
        
        <worker2dispatchDialog ref="worker2dispatchDialog" @reLoad="_fetchRecords"></worker2dispatchDialog>
    </div> 
 </template>
 <script>
export default {
  data: function() {
    return {
      queryForm: {
        new_srv_worker_id: {},
        new_channeltype: null,
        new_type: null,
        dateFrom: "",
        dateTo: "",
        new_productgroupid: {},
        new_city_id: {},
        new_county_id: {},
        new_town_id: {}
      },
      worker2dispatchData: [], //table数据绑定
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
      if (
        this.queryForm.new_srv_worker_id &&
        this.queryForm.new_srv_worker_id.id
      )
        filter +=
          "new_srv_worker_id=" + this.queryForm.new_srv_worker_id.id + ",";
      if (this.queryForm.new_channeltype)
        filter += "new_channeltype=" + this.queryForm.new_channeltype + ",";
      if (this.queryForm.new_type)
        filter += "new_type=" + this.queryForm.new_type + ",";
      if (this.queryForm.dateFrom)
        filter +=
          "dateFrom=" + this.queryForm.dateFrom.toLocaleDateString() + ",";
      if (this.queryForm.dateTo)
        filter += "dateTo=" + this.queryForm.dateTo.toLocaleDateString() + ",";
      if (
        this.queryForm.new_productgroupid &&
        this.queryForm.new_productgroupid.id
      )
        filter +=
          "new_productgroupid=" + this.queryForm.new_productgroupid.id + ",";
      if (this.queryForm.new_city_id && this.queryForm.new_city_id.id)
        filter += "new_city_id=" + this.queryForm.new_city_id.id + ",";
      if (this.queryForm.new_county_id && this.queryForm.new_county_id.id)
        filter += "new_county_id=" + this.queryForm.new_county_id.id + ",";
      if (this.queryForm.new_town_id && this.queryForm.new_town_id.id)
        filter += "new_town_id=" + this.queryForm.new_town_id.id + ",";
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }
      return "";
    }
  },
  components: {
    worker2dispatchDialog: resolve => {
      require(["./new_srv_worker2dispatchDialog.vue"], resolve);
    }, //派工规则维护
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
      var requestStr = "../api/WorkOrder/GetWorker2dispatchList";
      rt.get(requestStr, params)
        .then(res => {
          this.worker2dispatchData = res.workorder2dispatchList;
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
    },
    gotoAddPage:function(){
      this.$refs.worker2dispatchDialog.show();
    },
    deleteData() {
      //删除请求
      var selection = this.$refs.gridTable.selection;
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
            deleteList.push(selection[i].id);
          }
          var params = deleteList;
          var requestStr = "../api/WorkOrder/DeleteWorkorder2dispatch";
          rt.post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this._fetchRecords();
              this.loading = false;
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
    },
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
 