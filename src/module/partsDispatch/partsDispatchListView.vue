<template>
  <div>
    <rt-header title="服务站档案">
    </rt-header>
  
    <rt-grid ref="grid" quicksearch-placeholder="请输入配件单号或服务单号" :totalRecord="dataTotalCount" @page-change="handlePageChange" @quick-search="handleSearch" @search="handleSearch" @reset="handleReset">
      <template slot="toolbar">
        <rt-button type="add" @click="gotoAddPage" />
        <rt-button type="delete" @click="deleteData" />
      </template>
  
      <template slot="more">
        <el-form label-position="left" label-width="120px">
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <!--new_srv_instationid-->
              <el-form-item label="服务站" >
                <el-input v-model="queryForm.new_srv_instationidname" readonly icon="search" :on-icon-click="stationlookup"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--new_transportstatus//:origin-selected=""-->
              <el-form-item label="发运状态">
                <rt-picklist v-model="queryForm.new_transportstatus" entity="new_srv_shipconfirm" attribute="new_transportstatus"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--new_shipstatus-->
              <el-form-item label="紧急程度">
                <rt-picklist v-model="queryForm.new_shipstatus" entity="new_srv_shipconfirm" attribute="new_shipstatus"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" type="flex">
            <el-col :span="8">
              <!--createdon-->
              <el-form-item label="创建日期从">
                <el-date-picker class="rt-portal-item-date" v-model="queryForm.datefrom" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--createdon-->
              <el-form-item label="到">
                <el-date-picker class="rt-portal-item-date" v-model="queryForm.dateto" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--new_name-->
              <el-form-item label="发运单号">
                <el-input v-model="queryForm.new_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
  
      <el-table ref="gridTable" v-bind:data="tableData" row-key="new_srv_shipconfirmid" stripe @sort-change="handleSortChange" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="new_name" label="发运单号" sortable width="180">
          <!--new_name-->
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)">{{scope.row.new_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="new_srv_stationidName" label="服务站" width="180">
          <!--new_srv_instationidName-->
        </el-table-column>
        <el-table-column prop="new_receiver" label="收货人">
          <!--new_receiver-->
        </el-table-column>
        <el-table-column prop="new_receiver_tel" label="收货人联系电话">
          <!--new_receiver_tel-->
        </el-table-column>
        <el-table-column prop="new_shipstatus" label="紧急程度">
          <!--new_shipstatus-->
        </el-table-column>
        <el-table-column prop="new_transportstatus" label="发运单状态">
          <!--new_transportstatus-->
        </el-table-column>
        <el-table-column prop="new_transportdate" label="发运日期">
          <!--new_transportdate-->
        </el-table-column>
        <el-table-column prop="createdon" label="创建日期">
          <!--createdon-->
        </el-table-column>
      </el-table>
  
      <el-dialog title="查询" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="查找内容" :label-width="formLabelWidth">
            <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
          </el-form-item>
          <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect">
            <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
            </el-pagination>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
          <el-button @click="dialogFormVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
          <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
        </div>
      </el-dialog>
    </rt-grid>
  </div>
</template>



<script>
import picklistComponent from '@/components/common/picklist'
export default {
  data() {
    return {
      queryForm: {
        new_srv_instationid: '',//服务站id
        new_srv_instationidname: '',//服务站名称
        new_transportstatus: '',//发运状态
        new_shipstatus: '',//紧急程度
        datefrom: '',//创建日期从
        dateto: '',//创建日期到
        new_name: '',//发运单号
      },

      visible: false,
      //table数据设定
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      dataTotalCount: 0,
      orderby: 'new_name,descending',

      //crm数据缓存，性能优化,//页面变更时启用
      pageCookie: '',
      isneedCookie: false,
      loading: false,
      multipleSelection: [],


      //lookup
      lookupid:'',
      lookupidname:'',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      dialogtableData: [],
      lookupCondition: '',
      quickSearch: 'new_name',
      entityName: 'new_province',
      attributeList: 'new_name,new_code',
      filterList: '',////'name=苏州瑞泰信息技术有限公司';
      lookupOptions: [],
    }
  },

  mounted: function () {
    this._fetchRecords();
  },
  computed: {
    filter: function () {
      var filter = '';
      if (this.queryForm.new_srv_instationidname) {
        filter += 'new_srv_stationid=' + this.queryForm.new_srv_instationid + ',';
      }
      if (this.queryForm.new_name) {
        filter += 'new_name=' + this.queryForm.new_name + ',';
      }
      if (this.queryForm.new_transportstatus) {
        filter += 'new_transportstatus=' + this.queryForm.new_transportstatus + ',';
      }
      if (this.queryForm.new_shipstatus) {
        filter += 'new_shipstatus=' + this.queryForm.new_shipstatus + ',';
      }
      if (this.queryForm.datefrom) {
        this.queryForm.datefrom = rt.formatDateTime(this.queryForm.datefrom, "yyyy-mm-dd")
        filter += 'datefrom=' + this.queryForm.datefrom + ',';
      }
      if (this.queryForm.dateto) {
        this.queryForm.dateto = rt.formatDateTime(this.queryForm.dateto, "yyyy-mm-dd")
        filter += 'dateto=' + this.queryForm.dateto + ',';
      }
      //rt.formatDateTime(partsApply.new_requiredate, "yyyy-mm-dd hh:mm:ss")
      if (filter.length > 0) {
        return filter.substring(filter, filter.length - 1);
      }

      return '';
    }
  },
  methods: {
    //撤回
    recall() {
      var entityname = 'account';
      var entityid = 'F14E7CE9-925C-E711-80D3-000C298D75DE';
      rt.revoke(entityname, entityid);
    },
    handleReset() {

    },
    //搜索
    handleSearch() {
      this._fetchRecords();
    },
    handlePageChange() {
      this._fetchRecords();
    },
    //排序处理
    handleSortChange(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + ',' + sort.order;
      this.tableData = [];
      this._fetchRecords();
    },
    //数据加载
    _fetchRecords() {
      var pageIndex = this.$refs.grid.getPageIndex();
      var pageSize = this.$refs.grid.getPageSize();

      this.loading = true;
      var requestStr = '../api/ShipConfirm/GetShipConfirm?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&filter=' + this.filter + '&orderby=' + this.orderby;
      this.isneedCookie = false;//回写为不需要cookie
      rt.get(requestStr).then((res) => {
        this.tableData = res.ShipConfirmList;
        this.pageCookie = res.PagingCookie;
        this.dataTotalCount = res.TotalRecordCount;
        this.loading = false;
      }).catch((error) => {
        rt.showErrorToast(error);
        this.loading = false;
      });
    },
    //创建记录
    gotoAddPage() {
      //创建记录
      this.$router.push({ name: "dispatchcreate" })
    },
    //编辑记录
    gotoEditPage(row) {
      //编辑记录
      this.$router.push({ name: "dispatchedit", params: { id: row.new_srv_shipconfirmid } })
    },
    //删除记录
    deleteData() {
      //删除请求
      var selection = this.$refs.gridTable.store.states.selection;
      if (selection == null || selection.length == 0) {
        alert("请至少选择一条记录！");
        return;
      }
      this.loading = true;

      var deleteList = [];
      for (var i in selection) {
        deleteList.push(selection[i].new_srv_partsapplyid);
      }

      var params = deleteList;
      var requestStr = '../api/Part/DeletePartsApply';
      rt.post(requestStr, params).then((res) => {
        rt.showSuccessToast(res);
        this._fetchRecords();
      }).catch((error) => {
        rt.showErrorToast(error);
      });
    },

    stationlookup: function () {
      this.entityName = 'new_srv_station'
      this.lookupOptions = [{ label: '服务站', name: 'new_name' }]
      this.handleclick('new_srv_instationid')
    },
    //lookup的页码变更
    handleCurrentChange(val) {
      //页码改变
      this.currentPage = val;
      this.handleclick();
    },
    //lookup的页面尺寸变更
    handleSizeChange(val) {
      //每页尺寸改变
      this.pageSize = val;
      this.handleclick();
    },
    //lookup选择
    lookupSelect() {
      this.dialogFormVisible = false;
      this.queryForm[this.lookupid] = this.currentRow.new_id;
      this.queryForm[this.lookupidname] = this.currentRow.new_name;
    },
    //lookup移除值
    lookupSelectClear() {
      this.dialogFormVisible = false;
      this.queryForm[this.lookupid] = '';
      this.queryForm[this.lookupidname] = '';
    },
    //lookup快速查询
    lookupsearch() {
      this.handleclick();
    },
    //lookup选中行
    selectRowChange(val) {
      this.currentRow = val;
    },
    //处理lookup逻辑
    handleclick: function (ev) {
      if (this.disabledform) {
        return;
      }
      this.lookupid = ev;
      this.lookupidname = ev + 'name';
      this.dialogFormVisible = true;
      this.dialogtableData = [];
      var params = {
        entityName: this.entityName,
        attributeList: this.attributeList,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      }
      var lookupQueryStr = '/api/Lookup/GetLookupData';
      if (this.lookupCondition) {
        params.quickSearch = this.quickSearch + '-' + this.lookupCondition;
      }
      if (this.filterList) {
        params.filterList = this.filterList;
      }
      this.attrList = params.attributeList.split(',');
      let that = this;
      rt.post(lookupQueryStr, params).then(function (res) {
        var data = res;
        that.dataTotalCount = data.TotalRecordCount;

        for (var i in data.Entities) {
          var result = data.Entities[i];
          var resultlength = result.Attributes.length;
          var obj = {};
          obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
          obj.new_id = result.Attributes[resultlength - 1].Value;
          for (var m in that.attrList) {
            obj[that.attrList[m]] = result.Attributes[m].Value;
          }

          //获取部分格式化后的数据
          for (var j in result.FormattedValues) {
            var format = result.FormattedValues[j];
            obj[format.Key] = format.Value;
          }
          that.dialogtableData.push(obj); //将obj添加到数据集
        }
      })
        .catch((error) => {
          rt.showErrorToast(error);
        });
      return;
    }
  }
}
</script>

<style scoped>

</style>