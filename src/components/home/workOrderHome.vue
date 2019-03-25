<template>
    <div style="width:100%;height:100%;" class="service">
        <template>
            <div class="rt-home-table-header header-margin">
                <h2>服务单处理</h2>
                <el-button id="refresh" type="text" @click="refresh">
                    刷新
                </el-button>
            </div>
            <template>
                <div class="table-content" >
                    <h3>服务单处理阶段</h3>
                    <el-row>
                    <el-col :span="4">
                        待接单<span class="el-dropdown-link" @click="openWorkOrderList(1)" v-if="editForm.ReceiptCount>0">(<a href="javascript:void 0">{{editForm.ReceiptCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        待派工<span class="el-dropdown-link" @click="openWorkOrderList(2)" v-if="editForm.DispatchCount>0">(<a href="javascript:void 0">{{editForm.DispatchCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        待预约<span class="el-dropdown-link" @click="openWorkOrderList(3)" v-if="editForm.AppointmentCount>0">(<a href="javascript:void 0">{{editForm.AppointmentCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        待转派<span class="el-dropdown-link" @click="openWorkOrderList(4)" v-if="editForm.TransferCount>0">(<a href="javascript:void 0">{{editForm.TransferCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        退单<span class="el-dropdown-link" @click="openWorkOrderList(5)" v-if="editForm.RefundCount>0">(<a href="javascript:void 0">{{editForm.RefundCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        待完工<span class="el-dropdown-link" @click="openWorkOrderList(6)" v-if="editForm.CompletedCount>0">(<a href="javascript:void 0">{{editForm.CompletedCount}})</a></span>
                    </el-col>
                </el-row>
                <h3>处理中超期服务单</h3>
                <el-row>
                    <el-col :span="4">
                        超1天<span class="el-dropdown-link" @click="openWorkOrderList(11)" v-if="editForm.Overdue1DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue1DayCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        超2天<span class="el-dropdown-link" @click="openWorkOrderList(12)" v-if="editForm.Overdue2DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue2DayCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        超3天<span class="el-dropdown-link" @click="openWorkOrderList(13)" v-if="editForm.Overdue3DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue3DayCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        超5天<span class="el-dropdown-link" @click="openWorkOrderList(14)" v-if="editForm.Overdue5DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue5DayCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        超7天<span class="el-dropdown-link" @click="openWorkOrderList(15)" v-if="editForm.Overdue7DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue7DayCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        超15天<span class="el-dropdown-link" @click="openWorkOrderList(16)" v-if="editForm.Overdue15DayCount>0">(<a href="javascript:void 0">{{editForm.Overdue15DayCount}})</a></span>
                    </el-col>
                </el-row>
                <h3>信息提醒</h3>
                <el-row>
                    <el-col :span="4">
                        重电<span class="el-dropdown-link" @click="openWorkOrderList(21)" v-if="editForm.RechargecyclesCount>0">(<a href="javascript:void 0">{{editForm.RechargecyclesCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        跟踪警告<span class="el-dropdown-link" @click="openWorkOrderList(22)" v-if="editForm.TracWarningCount>0">(<a href="javascript:void 0">{{editForm.TracWarningCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        督办预警<span class="el-dropdown-link" @click="openWorkOrderList(23)" v-if="editForm.SuperviseWarningCount>0">(<a href="javascript:void 0">{{editForm.SuperviseWarningCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        督办<span class="el-dropdown-link" @click="openWorkOrderList(24)" v-if="editForm.SuperviseCount>0">(<a href="javascript:void 0">{{editForm.SuperviseCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        特殊工单<span class="el-dropdown-link" @click="openWorkOrderList(25)" v-if="editForm.SpeicaltypeCount>0">(<a href="javascript:void 0">{{editForm.SpeicaltypeCount}})</a></span>
                    </el-col>
                    <el-col :span="4">
                        回访虚假<span class="el-dropdown-link" @click="openWorkOrderList(26)" v-if="editForm.UnrealstatusCount>0">(<a href="javascript:void 0">{{editForm.UnrealstatusCount}})</a></span>
                    </el-col>
                </el-row>  
                <el-row>
                    <el-col :span="4">
                        催单<span class="el-dropdown-link" @click="openWorkOrderList(27)" v-if="editForm.UrgeCount>0">(<a href="javascript:void 0">{{editForm.UrgeCount}})</a></span>
                    </el-col></el-row>                 
                </div>                
            </template>
        </template>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      editForm: {
        ReceiptCount: 0,
        DispatchCount: 0,
        AppointmentCount: 0,
        TransferCount: 0,
        RefundCount: 0,
        CompletedCount: 0,
        Overdue1DayCount: 0,
        Overdue2DayCount: 0,
        Overdue3DayCount: 0,
        Overdue5DayCount: 0,
        Overdue7DayCount: 0,
        Overdue15DayCount: 0,
        RechargecyclesCount: 0,
        TracWarningCount: 0,
        SuperviseWarningCount: 0,
        SuperviseCount: 0,
        SpeicaltypeCount: 0,
        UnrealstatusCount: 0,
        UrgeCount: 0
      }
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    more: function() {},
    //加载数据
    _fetchRecords: function() {
      var requestStr = "../api/WorkOrder/GetWorkOrderHome";
      rt.get(requestStr)
        .then(res => {
          this.editForm = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    refresh: function() {
      this._fetchRecords();
    },
    openWorkOrderList: function(type) {
      this.$router.push({ name: "workorderWithType", params: { type: type } });
    }
  }
};
</script>
<style>
.service h3 {
  padding: 8px 0;
  font-weight: bold;
}
.service a {
  text-decoration: underline;
  color: #20a0ff;
}

.el-row {
  padding: 5px 0;
}

.header-margin {
  margin-top: 30px;
}

.table-content {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: #fff;
  height: 216px;
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
    margin-top: 50px;
  }
  .table-content {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background: #fff;
    height: 256px;
  }
}
</style>
