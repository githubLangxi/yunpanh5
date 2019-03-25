<template>
    <div style="width:100%;height:100%;">
        <template>
            <div class="rt-home-table-header header-margin">
                <h2>{{$t('new_srv_siteinv')}}</h2>
                <el-button id="apply" type="text" @click="apply">
                    申请
                </el-button>
            </div>
            <template>
                <div class="table-content">
                    <el-table :data="siteinvData" :row-class-name="tableRowClassName" style="width: 100%;" border >
                        <el-table-column prop="new_product_idName" label="配件名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="new_productcode" label="配件编码" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="new_productgroupidName" label="产品线">
                        </el-table-column>
                        <el-table-column prop="new_stocksite_idName" label="仓库名称">
                        </el-table-column>
                        <el-table-column prop="new_qty" label="配件数量">
                        </el-table-column>
                        <el-table-column prop="new_safetystock" label="安全库存">
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
      siteinvData: [],
      siteinv: {
        new_recipient: "",
        new_phonenumber: ""
      },
      dataForm: {
        id: "", //明细列表选中行ID
        new_product_id: "", //配件ID
        new_product_idname: "", //配件名称
        new_code: "", //配件编码
        new_price: "", //价格
        new_qty: "", //数量
        new_partscost: "", //金额
        new_srv_workorder_id: "", //服务单id
        new_srv_workorder_idname: "", //服务单名称
        new_stocksite_sendid: "", //发货仓库id
        new_stocksite_sendidname: "", //发货仓库名称
        new_srv_partsapply_id: "", //主档ID
        new_unitcode: "", //服务商编码
        new_station_idName: "", //服务商名称
        new_station_id: "", //服务商id

        new_type: 0, //申请类型
        new_sendtype: 0, //发货类型

        new_submit_time: "",
        new_approvalstatus: 0, //审核状态
        new_applyattr: 0, //申请归属

        new_recipient: "", //收货人
        new_phonenumber: "", //收货电话
        new_province_id: "", //省份

        new_city_id: "", //城市
        new_county_id: "", //区县
        new_town_id: "", //街道

        new_address: "" //详细地址
      },
      partsapplyid: "",
      padetailList: []
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    //加载数据
    _fetchRecords: function() {
      this.siteinvData = [];
      var self = this;
      var requestStr = "../api/SiteInv/GetSiteInv";
      rt
        .get(requestStr)
        .then(res => {
          this.siteinvData = res;
          self.getStationInfo();
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.loading = false;
        });
    },
    apply: function() {
      var self = this;
      if (
        this.siteinvData == [] ||
        this.siteinvData.length == 0 ||
        this.siteinvData == undefined
      ) {
        rt.showErrorToast("暂不需要申请配件，请检查配件库存数！");
        return;
      }
      rt
        .showConfirmDialog(
          "",
          "确认创建配件申请单？",
          "确定",
          "取消",
          "warning"
        )
        .then(function() {
          var partsApply = self.dataForm;
          var entity = {
            new_unitcode: partsApply.new_unitcode, //服务商编码
            new_station_idName: partsApply.new_station_idName, //服务商名称
            new_station_id: partsApply.new_station_id, //服务商id

            new_type: partsApply.new_type, //申请类型
            new_sendtype: partsApply.new_sendtype, //发货类型

            new_submit_time: rt.formatDateTime(
              partsApply.new_subnpmmit_time,
              "yyyy-mm-dd"
            ), //提交时间
            new_approvalstatus: partsApply.new_approvalstatus, //审核状态
            new_applyattr: partsApply.new_applyattr, //申请归属

            new_province_id: partsApply.new_province_id, //省份

            new_city_id: partsApply.new_city_id, //城市
            new_county_id: partsApply.new_county_id, //区县
            new_town_id: partsApply.new_town_id, //街道

            new_address: partsApply.new_address //详细地址
          };
          var detailList = [];
          var detail = {};
          for (var i = 0; i < self.siteinvData.length; i++) {
            detail = {};
            detail = {
              new_recipient: self.siteinvData[i].new_recipient, //收货人
              new_phonenumber: self.siteinvData[i].new_phonenumber, //收货电话
              new_applyproduct_id: self.siteinvData[i].new_product_id,
              new_applyproduct_idname: self.siteinvData[i].new_product_idName,
              new_applycode: self.siteinvData[i].new_productcode,
              new_product_id: self.siteinvData[i].new_product_id,
              new_product_idname: self.siteinvData[i].new_product_idName,
              new_code: self.siteinvData[i].new_productcode,
              new_productgroup_id: self.siteinvData[i].new_productgroupid,
              new_uom_idname: self.siteinvData[i].new_uom_idName,
              new_qty:
                self.siteinvData[i].new_safetystock -
                self.siteinvData[i].new_qty
            };
            detailList.push(detail);
          }
          var params = { partsapply: entity, detailList: detailList };
          /*创建*/
          if (self.partsapplyid === "") {
            rt
              .post("../api/PartsApply/CreateSiteinvAndDetail", params)
              .then(function(res) {
                rt.showSuccessToast(
                  "配件申请单已生成，请至配件管理-配件申请单下查看！"
                );
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        });
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
    },
    //获取服务站信息
    getStationInfo: function() {
      this.dataForm = {};
      var self = this;
      rt.get("../api/NewSrvStation/GetBasicStation").then(res => {
        self.dataForm.new_unitcode = res.new_code; //申请单位编码
        self.dataForm.new_station_idName = res.new_name; //申请单位名称
        self.dataForm.new_station_id = res.new_srv_stationid; //申请单位id

        var date = new Date();
        this.dataForm.new_submit_time = new Date();
        this.dataForm.new_type = 1; //申请类型默认备货申请
        this.dataForm.new_approvalstatus = 1; //审核状态默认制单
        this.dataForm.new_applyattr = 1; //申请属性默认服务商申请
        this.dataForm.new_sendtype = 1;

        self.getRecipientInfo(); //收货人默认信息
      });
    },
    getInfo: function(i) {
      var self = this;
      if (i == self.siteinvData.length) {
        return;
      } else {
         rt
          .get(
            "../api/NewSrvStation/GetStockLineByStationID?new_station_id=" +
              this.dataForm.new_station_id +
              "&new_productgroup_id=" +
              self.siteinvData[i].new_productgroupid
          )
          .then(res => {
             if (i === 0) {
              self.dataForm.new_province_id = res.new_province_id; //省会
              self.dataForm.new_province_idname = res.new_province_idName; //省会名称
              self.dataForm.new_city_id = res.new_city_id; //城市
              self.dataForm.new_city_idname = res.new_city_idName; //城市名称
              self.dataForm.new_county_id = res.new_county_id; //县区
              self.dataForm.new_county_idname = res.new_county_idName; //县区名称
              self.dataForm.new_town_id = res.new_town_id; //街道
              self.dataForm.new_town_idname = res.new_town_idName; //街道名称
              //地址
              self.dataForm.new_address =
                res.new_province_idName +
                res.new_city_idName +
                res.new_county_idName +
                res.new_town_idName +
                res.new_address;
            }
            self.siteinv = self.siteinvData[i];
            self.siteinv.new_recipient = res.new_contact; //收货人
            self.siteinv.new_phonenumber = res.new_tele; //收货电话
            self.siteinvData[i] = self.siteinv;
            self.getInfo(i+1);
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    },
    //收货人默认信息
    getRecipientInfo: function() {
      this.getInfo(0);
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

#apply {
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

#apply:hover {
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
