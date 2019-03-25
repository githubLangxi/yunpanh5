<template>
  <div>
    <!--头部操作按钮-->
    <rt-header :title="$t('PARTSSIGN')">
      <rt-toolbar show-autoback>
        <rt-button type="" @click="signConfirm" :text="$t('BUTTON_SIGNANDCON')" v-show="confirmable" :disabled="isconfirming"/>
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left">
        <rt-section :title="$t('BaseInfo')">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="入库单号">
                <el-input v-model="editForm.new_name" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库类型">
                <el-input v-model="editForm.new_invintype" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收仓库">
                <el-input v-model="editForm.new_srv_recstocksite_idName" :disabled="disabledform" icon="search"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item  label="配件申请单号">
                <el-input v-model="editForm.new_srv_partsapply_idName" :disabled="disabledform" icon="search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_stockoutorder.new_indate')">
                <el-date-picker class="rt-portal-item-date" v-model="editForm.new_transportdateUtc" type="date" :placeholder="$t('SelectDate')" :disabled="disabledform"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="签收时间">
               <el-date-picker class="rt-portal-item-date" v-model="editForm.new_receivedon" type="date" :placeholder="$t('SelectDate')" :disabled="disabledform"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="服务商签收状态">
                <el-input v-model="editForm.new_recstatuscodeName" :disabled="disabledform" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="物流公司">
                <el-input v-model="editForm.new_logisticscompanyName" :disabled="disabledform" ></el-input>
              </el-form-item>
            </el-col>
        
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item :label="$t('new_stockoutorder.new_recuser')">
                <el-input v-model="editForm.new_receiver" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('new_stockoutorder.new_rectele')">
                <el-input v-model="editForm.new_receiver_tel" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份">
                 <el-input v-model="editForm.new_province_idName" :disabled="disabledform" icon="search"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
                <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="城市">
                <el-input v-model="editForm.new_city_idName" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  label="区县">
                <el-input v-model="editForm.new_county_idName" :disabled="disabledform" icon="search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="街道">
                 <el-input v-model="editForm.new_town_idName" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24">
              <el-form-item label="详细地址">
                <el-input v-model="editForm.new_address" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
        <rt-section :title="$t('DeliveryDetail')">
          <!--明细列表-->
          <el-table ref="tableData" :data="tableData" max-height="500" v-loading="loading">
            <el-table-column type="selection" width="55" :selectable="isSelectedTable">
            </el-table-column>
            <el-table-column prop="new_srv_partsapplydetil_idName" :label="$t('new_stockoutorderdetail.new_srv_partsapplydetil_id')" width="185">
            </el-table-column>
            <el-table-column prop="new_product_idName" :label="$t('new_stockoutorderdetail.new_product_id')" show-overflow-tooltip width="120">
            </el-table-column>
            <el-table-column prop="new_partcode" show-overflow-tooltip width="120" :label="$t('new_stockoutorderdetail.new_partscode')">
            </el-table-column>
            <el-table-column prop="new_uom_idName" label="计量单位">
            </el-table-column>
            <el-table-column prop="new_partqty" label="配件数量">
            </el-table-column>
            <el-table-column prop="new_differences" label="差异数量">
            </el-table-column>
            <el-table-column prop="new_approvalqty" label="核准数量">
            </el-table-column>
            <el-table-column prop="new_Reasons" label="差异原因">
            </el-table-column>
            <el-table-column prop="new_Logistics" label="物流单号">
            </el-table-column>
          </el-table>
        </rt-section>
      </el-form>
    </rt-content>
  </div>
</template>

<script type="text/javascript">

export default {
  data: function() {
    return {
      isconfirming:false,   //禁用按钮
      new_stockoutorder_id: '',//主档ID
      confirmable: false,
      /****************/
      //主档数据编辑项数据
      /****************/
      disabledform: true,/*控制编辑项是否可用*/
      /*表单数据*/
      editForm: {},
      tableData: [],
    }
  },
  mounted: function() {
    if (this.$route.params.id) {
      this.new_stockoutorder_id = this.$route.params.id;
    }
    this.initData();
  },
  // watch: {
  //   new_workorder_id: function(val) {
  //     this.editForm.new_workorder_id = val;
  //   },
  //   new_workorder_idname: function(val) {
  //     this.editForm.new_workorder_idname = val;
  //   },
  // },

  methods: {
    /*****************/
    /**初始化编辑页面**/
    /*****************/
    //初始化数据
    initData: function() {
      if (this.new_stockoutorder_id === '') {
        return
      }
      else {
        this.loadData();
      }
    },

    //数据加载
    loadData: function() {
      var that = this
      //加载主档数据
      var loadStr = '../api/SotckOutOrder/GetStockOutOrderLine/' + this.new_stockoutorder_id
      rt.get(loadStr).then(function(res) {
        that.editForm = res
        that.tableData = that.editForm.detaillist
        that.ifShowConfirm();
      }).catch((error) => {
        rt.showErrorToast(error);
      })
    },
    ifShowConfirm: function() {
      //只能是出库完成或已托运并且签收状态不是全部签收的
    /*  if ((this.editForm.new_transportstatus == 5
        || this.editForm.new_transportstatus == 6)
        && (this.editForm.new_reciveStatus_id == 1
          || this.editForm.new_reciveStatus_id == 3)) {
        this.confirmable = true;
      } else {
        this.confirmable = false;
      }*/
      if (this.editForm.new_transportstatus == 2
        && this.editForm.new_reciveStatus_id == 1 && this.editForm.new_recstatuscode==1) {
        this.confirmable = true;
      } else {
        this.confirmable = false;
      }
    },
    /*****************/
    /***主档数据操作***/
    /*****************/
    //保存方法
    signConfirm: function() {
      this.isconfirming=true;     //禁用按钮
      var that = this
      that.$confirm(that.$t('WhetherDeterminSign'), that.$t('Tip'), {
        confirmButtonText: that.$t('BUTTON_DETERMINE'),
        confirmButtonClass: 'ConfirmButtonClass',
        cancelButtonText: that.$t('BUTTON_CANCEL'),
        cancelButtonClass: 'CancelButtonClass',
        type: 'warning'
      }).then((res) => {
        var params = {
          new_stockoutorder_id: that.new_stockoutorder_id,
        };
        var updateStr = 'api/SotckOutOrder/ReciveConfirm'
        rt.post(updateStr, params).then((res) => {
          that.isconfirming=false;
          that.loadData()
          that.$router.push({ name: "partssignedit", params: { id: that.new_stockoutorder_id } })
          rt.showSuccessToast("签收成功")
        }).catch((error) => {
          that.isconfirming=false;
          rt.showErrorToast(error)
        });

      })
      .catch((error)=>{
        that.isconfirming=false;
      });
    },
    isSelectedTable: function() {
      return false
    },

  },
}
</script>
