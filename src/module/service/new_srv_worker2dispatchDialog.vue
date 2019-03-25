<template>
        <div>
        <el-dialog title="派工" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
            <el-row :gutter="40">
                <el-col :span="7">
                    <el-tag style="margin-bottom:10px">第一步:请选择服务人员</el-tag>
                    <el-button style="float:right" @click="getWorker">刷新</el-button>
                    <el-form label-position="left" label-width="50px" :model="queryForm">
                        <el-form-item label="姓名" prop="new_name">
                            <el-input v-model="queryForm.new_name"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位" prop="new_job">
                            <rt-picklist v-model="queryForm.new_job" entity="new_srv_worker" attribute="new_job"></rt-picklist>
                        </el-form-item>
                    </el-form>
                    <el-table ref="workerData" :data="workerData" style="width: 100%" max-height="500" highlight-current-row  v-loading="workerloading">
                        <el-table-column type="selection" width="35"></el-table-column>
                        <el-table-column prop="new_name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="new_phone" label="手机号">
                        </el-table-column>
                        <el-table-column prop="new_job" label="岗位名称">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="11">
                    <el-tag style="margin-bottom:10px">第二步:请选择适合的业务资质</el-tag>
                    <el-button style="float:right" @click="getQualification">刷新</el-button>
                    <el-form label-position="left" label-width="50px" :model="queryForm">
                        <el-form-item label="产品线" prop="new_productgroupid">
                            <el-input v-model="queryForm.new_productgroup_idName" readonly @keyup.enter.native="quickChooseProductgroup" icon="search" :on-icon-click="productgroupLookup"></el-input>
                        </el-form-item>
                        <el-form-item label="购买单位类型" prop="new_channeltype">
                            <rt-picklist v-model="queryForm.new_channeltype" entity="new_srv_station2qualification" attribute="new_channeltype"></rt-picklist>
                        </el-form-item>
                            <el-form-item label="服务类型" prop="new_type">
                            <rt-picklist v-model="queryForm.new_type" entity="new_srv_station2qualification" attribute="new_type"></rt-picklist>
                        </el-form-item>
                    </el-form>
                    <el-table ref="qualificationData"  :data="qualificationData" style="width: 100%" max-height="500" highlight-current-row v-loading="qualificationloading" @current-change="handleCurrentChange">
                        <el-table-column  width="55">
                            <template slot-scope="scope">
                                <i class="el-icon-check" v-if="scope.row == currentRow"></i>
                            </template>
                        </el-table-column>
                        <el-table-column prop="new_channeltypetext" label="购买单位类型">
                        </el-table-column>
                        <el-table-column prop="new_typetext" label="服务类型">
                        </el-table-column>
                        <el-table-column prop="new_productgroupidname" label="产品线">
                        </el-table-column>
                        <el-table-column prop="new_multiconnectedtext" label="是否大多联">
                        </el-table-column>
                        <el-table-column prop="new_ismodularitytext" label="是否模块机">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="6">
                    <el-tag style="margin-bottom:10px">第三步:请指定负责区域</el-tag>
                    <el-button style="float:right" @click="getArea">刷新</el-button>
                    <el-form label-position="left" label-width="50px" :model="queryForm">                        
                        <el-form-item label="县区" prop="new_county_idname">
                            <el-input v-model="queryForm.new_county_idname"></el-input>
                        </el-form-item>
                        <el-form-item label="街道" prop="new_town_idname">
                            <el-input v-model="queryForm.new_town_idname"></el-input>
                        </el-form-item>
                    </el-form>                    
                    <el-table ref="areaData" :data="areaData" style="width: 100%" max-height="500" highlight-current-row  v-loading="arealoading">
                        <el-table-column type="selection" width="35"></el-table-column>
                        <el-table-column prop="new_county_idname" label="所属县区">
                        </el-table-column>
                        <el-table-column prop="new_town_idname" label="街道/乡镇">
                        </el-table-column>
                    </el-table>                
                </el-col>
            </el-row>
            <rt-toolbar  style="float:right">
                <rt-button text="添加"  type="submit" @click="addDispatch" />
                <rt-button text="移除" type="submit" @click="removeDispatch"/>
                <rt-button type="save" @click="saveDispatch" />
            </rt-toolbar>
            <el-table ref="dispatchData" :data="dispatchData" style="width: 100%" max-height="500" highlight-current-row  v-loading="dispatchLoading">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="new_worker_idname" label="服务工程师">
                </el-table-column>
                <el-table-column prop="new_jobtext" label="岗位">
                </el-table-column>
                <el-table-column prop="new_productgroupidname" label="产品线">
                </el-table-column>
                <el-table-column prop="new_typetext" label="服务类型">
                </el-table-column>
                <el-table-column prop="new_channeltypetext" label="购买单位类型">
                </el-table-column>
                <el-table-column prop="new_multiconnectedtext" label="是否大多联">
                </el-table-column>
                <el-table-column prop="new_ismodularitytext" label="是否模块机">
                </el-table-column>
                <el-table-column prop="new_city_idname" label="城市">
                </el-table-column>
                <el-table-column prop="new_county_idname" label="县区">
                </el-table-column>
                <el-table-column prop="new_town_idname" label="乡镇">
                </el-table-column>
            </el-table>            
        </el-dialog>
        <ProductgroupDialog ref="productgroupDialog" @lookupSelect="selectProductgroup" @lookupSelectClear="clearProductgroup"></ProductgroupDialog>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      dialogFormVisible: false, //设置主档表单禁用状态
      queryForm: {
        new_productgroup_id: "",
        new_productgroup_idName: ""
      },
      workerloading: false,
      workerpagingCookie: "",
      workerData: [],
      qualificationloading: false,
      qualificationpagingCookie: "",
      qualificationData: [],
      arealoading: false,
      areapagingCookie: "",
      areaData: [],
      currentRow: null,
      dispatchData: [],
      dispatchpaingCookie: "",
      dispatchLoading: false
    };
  },
  mounted: function() {
    this.getWorker();
    this.getQualification();
  },
  watch: {},
  computed: {},
  components: {
    ProductgroupDialog: resolve => {
      require(["../dialog/productgroupDialog.vue"], resolve);
    }
  },
  props: {},
  methods: {
    //加载数据
    _fetchRecords: function() {},
    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        this._fetchRecords();
      });
    },

    getWorker: function() {
      this.workerData = [];
      var filter = "";
      if (this.queryForm.new_name)
        filter += "new_name=" + this.queryForm.new_name + ",";
      if (this.queryForm.new_job)
        filter += "new_job=" + this.queryForm.new_job + ",";
      if (filter.length > 0) {
        filter = filter.substring(filter, filter.length - 1);
      }
      var params = {
        filter: filter,
        pagingCookie: this.workerpagingCookie
      };
      this.workerloading = true;
      var requestStr = "../api/WorkOrder/GetWorkerList";
      rt.get(requestStr, params)
        .then(res => {
          this.workerData = res.workerList;
          this.workerpagingCookie = res.pagingCookie;
          this.workerloading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.workerloading = false;
        });
    },
    getQualification: function() {
      this.qualificationData = [];
      this.currentRow = null;
      var filter = "";
      if (this.queryForm.new_productgroupid)
        filter +=
          "new_productgroupid=" + this.queryForm.new_productgroupid + ",";
      if (this.queryForm.new_channeltype)
        filter += "new_channeltype=" + this.queryForm.new_channeltype + ",";
      if (this.queryForm.new_type)
        filter += "new_type=" + this.queryForm.new_type + ",";
      if (filter.length > 0) {
        filter = filter.substring(filter, filter.length - 1);
      }
      var params = {
        filter: filter,
        pagingCookie: this.qualificationpagingCookie
      };
      this.qualificationloading = true;
      var requestStr = "../api/WorkOrder/GetQualificationList";
      rt.get(requestStr, params)
        .then(res => {
          this.qualificationData = res.qualificationList;
          this.qualificationpagingCookie = res.pagingCookie;
          this.qualificationloading = false;
          this.areaData = [];
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.qualificationloading = false;
        });
    },
    getArea: function() {
      this.areaData = [];
      if (
        this.currentRow == null ||
        rt.isNullOrWhiteSpace(this.currentRow.id)
      ) {
        rt.showErrorToast("请先选择业务资质");
        return;
      }
      var filter = "";
      if (this.queryForm.new_county_idname)
        filter += "new_county_idname=" + this.queryForm.new_county_idname + ",";
      if (this.queryForm.new_town_idname)
        filter += "new_town_idname=" + this.queryForm.new_town_idname + ",";
      if (filter.length > 0) {
        filter = filter.substring(filter, filter.length - 1);
      }
      var params = {
        qualificationid: this.currentRow.id,
        filter: filter,
        pagingCookie: this.qualificationpagingCookie
      };
      this.arealoading = true;
      var requestStr = "../api/WorkOrder/GetAreaList";
      rt.get(requestStr, params)
        .then(res => {
          this.areaData = res.dispatchAreaList;
          this.areapagingCookie = res.pagingCookie;
          this.arealoading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.arealoading = false;
        });
    },
    handleCurrentChange(val) {
      if (this.currentRow == val) this.areaData = [];
      this.currentRow = val;
      if (this.currentRow != null) this.getArea();
    },
    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.$emit("reLoad");
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },
    quickChooseProductgroup: function() {
      this.$refs.productgroupDialog.show();
    },
    //显示产品大类Dialog
    productgroupLookup: function() {
      this.$refs.productgroupDialog.show();
    },
    //产品大类选择
    selectProductgroup: function(value) {
      this.queryForm.new_productgroup_id = value.id;
      this.queryForm.new_productgroup_idName = value.name;
    },
    //清除产品大类数据
    clearProductgroup: function() {
      this.queryForm.new_productgroup_id = "";
      this.queryForm.new_productgroup_idName = "";
    },
    addDispatch: function() {
      var workerselection = this.$refs.workerData.selection;
      if (workerselection == null || workerselection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择服务人员"
        });
        return;
      }
      if (
        this.currentRow == null ||
        rt.isNullOrWhiteSpace(this.currentRow.id)
      ) {
        rt.showErrorToast("请先选择业务资质");
        return;
      }
      var areaselection = this.$refs.areaData.selection;
      if (areaselection == null || areaselection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择负责区域"
        });
        return;
      }
      this.dispatchData = [];
      workerselection.forEach(element => {
        areaselection.forEach(area => {
          var model = {};
          model.new_worker_idname = element.new_name;
          model.new_worker_id = element.id;
          model.new_worker_code = element.new_code,
          model.new_jobtext = element.new_job;
          model.new_productgroupidname = this.currentRow.new_productgroupidname;
          model.new_productgroupid = this.currentRow.new_productgroupid;
          model.new_type = this.currentRow.new_type;
          model.new_typetext = this.currentRow.new_typetext;
          model.new_channeltype = this.currentRow.new_channeltype;
          model.new_channeltypetext = this.currentRow.new_channeltypetext;
          model.new_multiconnectedtext = this.currentRow.new_multiconnectedtext;
          model.new_multiconnected = this.currentRow.new_multiconnected;
          model.new_ismodularitytext = this.currentRow.new_ismodularitytext;
          model.new_ismodularity = this.currentRow.new_ismodularity;
          model.new_county_idname = area.new_county_idname;
          model.new_county_id = area.new_county_id;
          model.new_town_idname = area.new_town_idname;
          model.new_town_id = area.new_town_id;
          model.new_city_idname = area.new_city_idname;
          model.new_city_id = area.new_city_id;
          model.new_province_idname = area.new_province_idname;
          model.new_province_id = area.new_province_id;
          model.new_station2qualification_id = this.currentRow.id;
          this.dispatchData.push(model);
        });
      });
    },
    removeDispatch: function() {
      var dispatchselection = this.$refs.dispatchData.selection;
      if (dispatchselection == null || dispatchselection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要移除的数据"
        });
        return;
      }
      dispatchselection.forEach(element => {
        var index = this.dispatchData.indexOf(element);
        if (index > -1) {
          this.dispatchData.splice(index, 1);
        }
      });
    },
    saveDispatch: function() {
      var self = this;
      rt.post("../api/WorkOrder/SaveWorkorder2dispatch", this.dispatchData)
        .then(function(res) {
          rt.showSuccessToast(self.$t("Successfullysaved"));
          self.handleClose();
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>

