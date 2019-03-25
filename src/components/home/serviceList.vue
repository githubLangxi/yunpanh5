<template>
    <div style="width:100%;height:100%;">
        <template>
            <div class="rt-home-table-header header-margin">
                <h2>{{$t('new_srv_workorder')}}</h2>
                <el-button id="servicemore" type="text" @click="showmore">
                    {{$t('More')}}
                </el-button>
            </div>
            <template>
                <div class="table-content" >
                    <el-table :data="serviceData" :row-class-name="tableRowClassName" style="width: 100%;" border @row-dblclick="doubleClick">
                        <el-table-column :label="$t('new_srv_workorder.new_name')" width="140" style="color:1fb6d8;">
                            <template slot-scope="scope">
                                <el-button id="servicename" type="text" @click="servicedetail(scope.row)">{{scope.row.new_name}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="new_typetext" :label="$t('new_srv_workorder.new_type')" class="table-title"  @cell-click="more">
                        </el-table-column>
                        <el-table-column prop="new_contact" :label="$t('new_srv_workorder.new_contact')" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="new_feedbacktel" :label="$t('new_srv_workorder.new_feedbacktel')" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="new_dealstatustext" :label="$t('new_srv_workorder.new_dealstatus')">
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </template>
    </div>
</template>


<script>
export default {
  data: function() {
    return {
      serviceData: []
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    more: function() {
      alert("123");
    },
    //加载数据
    _fetchRecords: function() {
      var requestStr = "../api/WorkOrder/GetDealingData";
      rt
        .get(requestStr)
        .then(res => {
          this.serviceData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    showmore: function() {
      this.$router.push({ name: "workorder" }); //ServiceList
    },
    servicedetail: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.Id } });
    },
    doubleClick: function(row) {
      this.$router.push({ name: "orderedit", params: { id: row.Id } });
    },
    tableRowClassName: function(row, index) {
      if (index % 2 === 0) {
        //偶数行
        return "positive-row";
      } else {
        //奇数行
        return "info-row";
      }
      return "";
    }
  }
};
</script>
<style>
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

#servicemore {
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
