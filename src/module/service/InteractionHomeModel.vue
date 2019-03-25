 <template>
  <div style="width:100%">
    <rt-header title="服务互动">
    </rt-header>
    <rt-grid ref="grid" quicksearch-placeholder="快速搜索服务单号" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset" style="width: 100%">
      <template slot="more">
        <el-form label-position="left" ref="queryForm" label-width="120px" :model="queryForm">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="服务单号" prop="new_srv_workorder_idname">
                <el-input v-model="queryForm.new_srv_workorder_idname"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="跟单内容" prop="new_content">
                <rt-picklist v-model="queryForm.new_content" entity="new_srv_interaction" attribute="new_content"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重电标识" prop="new_isrepeat">
                <rt-picklist v-model="queryForm.new_isrepeat" entity="new_srv_interaction" attribute="new_isrepeat"></rt-picklist>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="类型" prop="new_interactiontype">
                <rt-picklist v-model="queryForm.new_interactiontype" entity="new_srv_interaction" attribute="new_interactiontype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退单类型" prop="new_retreattype">
                <rt-picklist v-model="queryForm.new_retreattype" entity="new_srv_interaction" attribute="new_retreattype"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退单原因" prop="new_retreatreason">
                <rt-picklist v-model="queryForm.new_retreatreason" entity="new_srv_interaction" attribute="new_retreatreason"></rt-picklist>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="创建时间起" prop="begintime">
                <el-date-picker type="date" v-model="queryForm.begintime" @change="startDateCheck('begintime','endtime')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间止" prop="endtime">
                <el-date-picker type="date" v-model="queryForm.endtime" @change="endDateCheck('begintime','endtime')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处理单位" prop="new_unit">
                <rt-picklist v-model="queryForm.new_unit" entity="new_srv_interaction" attribute="new_unit"></rt-picklist>
              </el-form-item>
            </el-col>
        </el-row>
        </el-form>
      </template>

      <el-table ref="gridTable" v-bind:data="serviceData" row-key="id" stripe @row-dblclick="doubleClick" v-loading="loading" @sort-change="handleSortChange" style="width: 100%">
         <el-table-column prop="new_name" label="服务单号" show-overflow-tooltip sortable width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="doubleClick(scope.row)">{{scope.row.new_srv_workorder_idname}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_interactiontypetext" label="类型" show-overflow-tooltip width="140">
        </el-table-column>
        <el-table-column prop="new_contenttext" label="跟单内容" show-overflow-tooltip width="250">
        </el-table-column>
        <el-table-column prop="new_isrepeattext" label="重电标识" show-overflow-tooltip width="140">
        </el-table-column>
        <el-table-column prop="new_retreattypetext" label="退单类型" show-overflow-tooltip width="200">
        </el-table-column>
        <el-table-column prop="new_retreatreasontext" label="退单原因" show-overflow-tooltip width="250">
        </el-table-column>
        <el-table-column prop="new_desc" label="跟单描述" show-overflow-tooltip width="300">
        </el-table-column>
        <el-table-column prop="new_details" label="服务互动详情" show-overflow-tooltip width="300">
        </el-table-column>
        <el-table-column prop="new_unittext" label="处理单位" show-overflow-tooltip width="110">
        </el-table-column>
        <el-table-column prop="new_operator" label="操作人" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="createdon" label="创建时间" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column prop="new_repeatmemo" label="重电申诉/判定说明" show-overflow-tooltip width="500">
        </el-table-column>
      </el-table>
    </rt-grid>
  </div>
</template>

<script>
export default {
  name: "interactionHomeModel",
  data: function() {
    return {
      serviceData: [], //table数据绑定
      dataTotalCount: 0, //数据总条数
      loading: false,
      queryForm: {},
      orderby: "createdon,descending", //排序条件
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
      if (this.queryForm.new_srv_workorder_idname)
        filter +=
          "new_srv_workorder_idname=" +
          this.queryForm.new_srv_workorder_idname +
          ",";
      if (this.queryForm.new_content)
        filter += "new_content=" + this.queryForm.new_content + ",";
      if (this.queryForm.new_isrepeat)
        filter += "new_isrepeat=" + this.queryForm.new_isrepeat + ",";
      if (this.queryForm.new_interactiontype)
        filter +=
          "new_interactiontype=" + this.queryForm.new_interactiontype + ",";
      if (this.queryForm.new_retreattype)
        filter += "new_retreattype=" + this.queryForm.new_retreattype + ",";
      if (this.queryForm.new_retreatreason)
        filter += "new_retreatreason=" + this.queryForm.new_retreatreason + ",";
      if (this.queryForm.new_unit)
        filter += "new_unit=" + this.queryForm.new_unit + ",";
      if (this.queryForm.begintime)
        filter += "begintime=" + this.queryForm.begintime + ",";
      if (this.queryForm.endtime)
        filter += "endtime=" + this.queryForm.endtime + ",";
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
      this.serviceData = [];
      this._fetchRecords();
    },
    _fetchRecords: function() {
      var params = {
        pageIndex: this.$refs.grid.getPageIndex(),
        pageSize: this.$refs.grid.getPageSize(),
        filter: this.filter,
        orderby: this.orderby
      };
      this.loading = true;
      var requestStr = "../api/WorkOrder/GetInteractionList";
      rt.get(requestStr, params)
        .then(res => {
          this.serviceData = res.interactionList;
          this.pageCookie = res.pagingCookie;
          this.dataTotalCount = res.totalRecordCount;
          this.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    //双击某一行数据,跳转编辑页面
    doubleClick: function(row) {
      this.$router.push({ name: "interactionDetail", params: { id: row.id } });
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
</style>

