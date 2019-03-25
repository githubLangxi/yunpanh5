<template>
  <rt-section :title="$t('new_srv_sitereturnline')">
    <!--头部操作按钮-->
    <template slot="toolbar">
      <rt-button type="add" text="批量添加" @click="createDetail" v-if="!disabled" />
      <rt-button type="delete" @click="deleteDetail" v-if="!disabled" />
    </template>

    <!--明细列表-->
    <el-table ref="tableData" :data="tableData" max-height="500" v-loading="loading">
      <el-table-column type="selection" width="55" :selectable="isSelectedTable">
      </el-table-column>
      <el-table-column prop="new_partcode" label="配件编码" width="200">
      </el-table-column>
     <el-table-column prop="new_product_idName" label="配件名称" width="400">
      </el-table-column>
      <el-table-column prop="new_uomidName" label="计量单位" width="100">
      </el-table-column>
      <el-table-column prop="new_returnqty" label="返还数量" width="100">
          <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.new_returnqty" @blur="changeQty(scope.row)" :disabled="disabled" :class="scope.row.new_returnqty<=0?'actives':''"></el-input>
          </template> -->
      </el-table-column>
      <el-table-column prop="new_price" label="结算价" width="100">
      </el-table-column>
      <el-table-column prop="new_amount" label="申请金额" width="100">
      </el-table-column>
      <el-table-column prop="new_logisticscode" label="物流单号" width="200">
          <template slot-scope="scope">
                <el-input v-model="scope.row.new_logisticscode" @blur="changeLogisticscode(scope.row)" :disabled="approvalstatus != 3 || returnorderstatus != 1"></el-input>
          </template>
      </el-table-column>
      <el-table-column>
        &nbsp;
      </el-table-column>
    </el-table>

    <!-- 配件申请明细页面 弹出框 -->
    <siteReturnDetailCreateDialog  @resetLoadData="loadData" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></siteReturnDetailCreateDialog>
    <SiteReturnDetailDialog ref="siteReturnDetailDialog" @select-data="outData" @clear-data="clearData" :stocksiteid="stocksiteid"></SiteReturnDetailDialog>
  </rt-section>
</template>

<script type="text/javascript">
import SiteReturnDetailDialog from '../dialog/siteReturnDetailDialog'
import siteReturnDetailCreateDialog from "./siteReturnDetailCreateDialog";
export default {
  data: function() {
    return {
      //数据加载
      loading: false,

      //明细列表
      tableData: [], //列表数据源
      shipOptions: [],
      rowid: '', //选中行id
      aftersent:false,//物流单号
      needShowCreateDialog: false, //明细新建
      //明细列表编辑Dialog
      formDialog: '', //显示隐藏Dialog
      editForm: {
        new_srv_sitereturnId: '', //主档ID
        new_srv_sitereturnlineId: '', //明细列表选中行ID
        new_product_id: '', //配件ID
        new_product_idName: '', //配件名称
        new_partcode: '', //配件编码

        new_shipproperty: '', //配件属性id
        new_shippropertyName: '', //配件属性
        new_returnqty: '', //退货数量

        new_transqty: '', //发运数量
        new_approvedqty: '',
        new_receiveqty: '', //签收数量

        new_price: '', //配件价格
        new_uomid: '', //单位id
        new_uomidName: '', //单位

        new_amount: '', //退货金额
        new_productmodel: '', //配件型号
        new_productmodelName: '', //配件型号

        new_sitereturnid: '', //退库申请id
        new_sitereturnidName: '' //退库申请
      },
      rules: {
        new_product_idName: [{ required: true, message: '配件名称不能为空' }],
        new_returnqty: [
          { required: true, message: '退货数量不能为空' },
          { pattern: /^[1-9]\d*$/, message: '必须输入正整数', trigger: 'blur' }
        ],
        new_logisticscode: [{require:true,message:'物流单号不能为空', trigger: 'blur'}],
      },
      formLoading: false //dialog加载特效
    }
  },
  components: { SiteReturnDetailDialog,siteReturnDetailCreateDialog },
  props: {
    mainid: '',
    disabled: {
      type: Boolean
    },
    newname: '',
    stocksiteid: '',
    approvalstatus: '',
    returnorderstatus: '',
    disabledaftersend:''
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit('reloadEdit')
      }
    }
  },
  mounted: function() {
    this.loadData()
    this.bindPickListData()
  },
  methods: {
    /***************/
    /**列表处理方法**/
    /***************/
    //加载数据
    loadData() {
      this.editForm.new_sitereturnid = this.mainid
      var self = this
      self.loading = true
      if (self.rowid === '') {
        self.editForm.new_sourcefrom = 2
        self.editForm.new_shipproperty = 1
        self.editForm.new_sitereturnidName = self.newname
      }
      
      rt
        .get('../api/SrvSiteReturn/GetSrvSiteReturnSign/' + self.mainid)
        .then(function(res) {
          self.editForm.new_sitereturnidName = self.newname;
          self.tableData = res.sitereturnline;
          self.editForm.new_name = self.newname;
          self.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error)
          self.loading = false
        })
    },
    //明細列表创建明细
    createDetail: function() {
      this.formDialog = true
    },
    //删除明细列表
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))
        return
      }
      this.$confirm(this.$t('ThisActionDeletePerpetually'), this.$t('Tip'), {
        confirmButtonText: this.$t('BUTTON_DETERMINE'),
        confirmButtonClass: 'ConfirmButtonClass',
        cancelButtonText: this.$t('BUTTON_CANCEL'),
        cancelButtonClass: 'CancelButtonClass',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          var deleteList = []
          for (var i in selection) {
            deleteList.push(selection[i].new_srv_sitereturnlineId)
          }
          var params = deleteList
          var deleteStr = '../api/SrvSiteReturn/DelSrvSiteLineReturn'
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast("删除成功")
              this.loadData()
              this.loading = false
            })
            .catch(error => {
              rt.showErrorToast(error)
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('HasCancelledForDeleting')
          })
        })
    },
    //打开明细编辑Dialog
    gotoEditPage(row) {
      //编辑记录
      var self = this
      self.rowid = row.new_srv_sitereturnlineId
      this.loading = true
      var requestStr =
        '../api/SrvSiteReturn/GetSrvSiteReturnLineSign/' + self.rowid
      rt
        .get(requestStr)
        .then(function(res) {
          self.editForm = res
          self.editForm.new_name = self.newname
          self.loading = false
          self.formDialog = true
        })
        .catch(error => {
          rt.showErrorToast(error)
          self.loading = false
        })
    },

    /*****************/
    /**明细Dialog方法**/
    /*****************/
    //Dialog字段（配件名称）打开lookup
    productlookup() {
      this.$refs.siteReturnDetailDialog.show()
    },
    //Dialog保存按钮
    saveDataClick(formName) {
      let that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.formLoading = true
          if (that.rowid) {
            that.editForm.new_srv_sitereturnlineId = that.rowid
          } else {
            that.editForm.new_srv_sitereturnlineId = ''
          }
          if (!that.rowid) {
            if (!rt.isNullOrWhiteSpace(that.editForm.new_product_id)) {
              for (var i in that.tableData) {
                if (
                  that.tableData[i].new_product_id ==
                  that.editForm.new_product_id
                ) {
                  rt.showErrorToast(this.$t('ThisPartLineHasExisted'))
                  that.formLoading = false
                  return
                }
              }
            }
          }
           if(that.editForm.new_transqty!=null&&that.editForm.new_transqty!=''&&that.editForm.new_transqty<=0){
            rt.showErrorToast(that.$t('SendLessThanZero'))
            that.formLoading=false
            return
          }

          if (that.editForm.new_returnqty < that.editForm.new_transqty) {
           
            rt.showErrorToast(that.$t('SendLessThanBack'))
            that.formLoading = false
            return
          }

          if (that.editForm.new_returnqty > 99999) {
            rt.showErrorToast(that.$t('BackLessThan100000'))
            that.formLoading = false
            return
          }
          if (that.editForm.new_transqty > 99999) {
            rt.showErrorToast(that.$t('SendLessThan100000'))
            that.formLoading = false
            return
          }
          that.editForm.new_receivedqty = ''
          that.editForm.new_approvedqty = that.editForm.new_returnqty
          let apiUrl = '../api/SrvSiteReturn/SaveSrvSiteReturnLine'
          rt
            .post(apiUrl, that.editForm)
            .then(res => {
              rt.showSuccessToast(that.$t('Successfullysaved'))
              this.clearDetail()
              that.loadData()
              that.formLoading = false
              that.formDialog = false
            })
            .catch(error => {
              that.formLoading = false
              rt.showErrorToast(error)
            })
        } else {
          return
        }
        that.rowid = ''
      })
    },
    //Dialog取消按钮
    beforeClose() {
      this.clearDetail()
      this.formDialog = false
      this.rowid = ''
    },
    //输出数据
    outData: function(val) {
      this.editForm.new_product_id = val.productid
      this.editForm.new_product_idName = val.name
      this.editForm.new_partcode = val.productnumber
      this.editForm.new_price = val.price
      this.editForm.new_uomid = val.defaultuomid
      this.editForm.new_uomidName = val.defaultuomidName
      this.editForm.new_productmodel = val.new_productmodelName
      this.editForm.new_productmodelName = val.new_productmodelName
      this.countPrice()
    },
    //清空数据
    clearData: function() {
      this.editForm.new_product_id = ''
      this.editForm.new_product_idName = ''
      this.editForm.new_partcode = ''
      this.editForm.new_productmodel = ''
      this.editForm.new_productmodelName = ''
      this.editForm.new_price = ''
      this.editForm.new_uomid = ''
      this.editForm.new_uomidName = ''
      this.countPrice()
    },
    //返回明细列表
    outdetail: function() {
      var detailArr = []

      for (var line in this.tableData) {
        var detailObj = {}
        detailObj.new_returnqty = this.tableData[line].new_returnqty
        detailObj.new_srv_sitereturnlineId = this.tableData[line].new_srv_sitereturnlineId
        detailArr.push(detailObj)
      }
      return detailArr
    },
    changeTransqty: function(val) {
      if (val.new_transqty > val.new_returnqty) {
        rt.showErrorToast(this.$t('SendLessThanCheck'))
        val.new_transqty = ''
        return
      }
      if ((val.new_transqty = '')) {
        rt.showErrorToast(this.$t('DeliveredquantityREQUIRED'))
        return
      }
    },

    /***********/
    /**公用方法**/
    /***********/
    //计算总金额
    countPrice: function() {
      this.editForm.new_amount =
        this.editForm.new_price * this.editForm.new_returnqty
    },
    //清空Dialog字段
    clearDetail: function() {
      this.editForm.new_product_id = '' //配件ID
      this.editForm.new_product_idName = '' //配件名称
      this.editForm.new_partcode = '' //配件编码

      this.editForm.new_returnqty = '' //退货数量

      this.editForm.new_transqty = '' //发运数量
      this.editForm.new_receiveqty = '' //签收数量

      this.editForm.new_price = '' //配件价格
      this.editForm.new_uomid = '' //单位id
      this.editForm.new_uomidName = '' //单位

      this.editForm.new_amount = '' //退货金额
      this.editForm.new_productmodel = '' //配件型号id
      this.editForm.new_productmodelName = '' //配件型号名称
    },
    isSelectedTable: function() {
      if (this.disabled == true) {
        return false
      } else {
        return true
      }
    },
    //获取下拉框选项
    bindPickListData: function() {
      var sourceLoad =
        '../api/crmpicklist/options/new_srv_sitereturnline/new_shipproperty'
      rt
        .get(sourceLoad)
        .then(res => {
          this.shipOptions = res
        })
        .catch(error => {
          rt.showErrorToast(error)
        })
    },
    // changeQty: function(row) {
    //   if (row.new_returnqty === "") {
    //     row.new_returnqty = 0;
    //     this.$message({
    //       showClose: true,
    //       type: "warning",
    //       message: this.$t("AppliedquantityREQUIRED")
    //     });
    //     return;
    //   }

    //   if (!/^-?\d+$/.test(row.new_returnqty) && row.new_returnqty !== "") {
    //     row.new_returnqty = 0;
    //     this.$message({
    //       showClose: true,
    //       type: "warning",
    //       message: this.$t("OnlyInt")
    //     });
    //     return;
    //   }

    //   if (row.new_returnqty <= 0 && row.new_returnqty !== "") {
    //     row.new_returnqty = 0;
    //     this.$message({
    //       showClose: true,
    //       type: "warning",
    //       message: this.$t("CountMoreThanZero")
    //     });

    //     return;
    //   }
    //   row.new_amount=row.new_returnqty * row.new_price;
    //   var obj = {};
    //   obj.new_srv_sitereturnlineId = row.new_srv_sitereturnlineId;
    //   obj.new_returnqty = row.new_returnqty;
    //   obj.new_price = row.new_price;
    //   obj.new_amount = row.new_returnqty * row.new_price;
    //   obj.new_logisticscode = row.new_logisticscode;
    //   var apiUrl = "../api/SrvSiteReturn/SaveSrvSiteReturnLine";
    //   var params = obj;
    //   this.loading = true;
    //   rt
    //     .post(apiUrl, params)
    //     .then(res => {
          
    //       rt.showSuccessToast(this.$t("ModifySuccess"));
    //       this.loading = false;
    //       this.loadData();
    //     })
    //     .catch(error => {
    //       this.loading = false;
    //       rt.showErrorToast(error);
    //     });
    // },

    changeLogisticscode: function(row) {
      var obj = {};
      obj.new_srv_sitereturnlineId = row.new_srv_sitereturnlineId;
      obj.new_logisticscode = row.new_logisticscode;
      obj.new_returnqty = row.new_returnqty;
      var apiUrl = "../api/SrvSiteReturn/SaveSrvSiteReturnLine";
      var params = obj;
      this.loading = true;
      rt
        .post(apiUrl, params)
        .then(res => {
          
          rt.showSuccessToast(this.$t("ModifySuccess"));
          this.loading = false;
          this.loadData();
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    },
    createDetail: function() {
      this.needShowCreateDialog = true;
    },
  }
}
</script>

<style>

</style>
