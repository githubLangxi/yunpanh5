<template>
  <div>
    <rt-section :title="$t('new_orderline')">
      <!--头部操作按钮-->
      <template slot="toolbar">
        <rt-button type="add" @click="createDetail" v-if="!disabled" />
        <rt-button type="delete" @click="deleteDetail" v-if="!disabled" />
      </template>

      <!--明细列表-->
      <el-table ref="tableData" :data="tableData" max-height="500" v-loading="loading">
        <el-table-column type="selection" width="55" :selectable="isSelectedTable">
        </el-table-column>
        <el-table-column prop="new_productcode" :label="$t('new_orderline.new_productcode')" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoEditPage(scope.row)" v-if="!disabled">{{scope.row.new_productcode}}</el-button>
            <span v-if="disabled">{{scope.row.new_productcode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="new_productidName" :label="$t('new_orderline.new_productid')">
        </el-table-column>
        <el-table-column prop="new_qty" label="配件数量">
        </el-table-column>
        <el-table-column prop="new_uom_idName" label="计量单位">
        </el-table-column>
        <el-table-column prop="new_actualprice" label="结算价">
        </el-table-column>
        <el-table-column prop="new_amount" label="总金额">
        </el-table-column>
      </el-table>
      
      <newOrderCreateDialog :mainid="mainid" @resetLoadData="loadData" :stocksiteid="stocksiteid" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></newOrderCreateDialog>

      <newOrderCreateOldPartDialog :mainid="mainid" :productgroupid="productgroupid"  @resetLoadData="loadData" :visible.sync="needShowCreateOldPartDialog" v-if="needShowCreateOldPartDialog"></newOrderCreateOldPartDialog>


    </rt-section>
  </div>
</template>

<script type="text/javascript">
import newOrderCreateDialog from "./newOrderCreateDialog";
import newOrderCreateOldPartDialog from "./newOrderCreateOldPartDialog"

export default {
  data: function() {
    return {
      //数据加载
      loading: false,
      //明细列表
      tableData: [], //列表数据源
      needShowCreateDialog:false,
      needShowCreateOldPartDialog:false
    };
  },
  props: {
    mainid: "",
    disabled: {
      type: Boolean
    },
    newname: "",
    stocksiteid: "",
    parttype:"",
    productgroupid:""
  },
  components: { newOrderCreateDialog,newOrderCreateOldPartDialog },
  watch: {
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    /***************/
    /**列表处理方法**/
    /***************/
    //加载数据
    loadData() {
      var self = this;
      this.loading = true;
      if (self.rowid === "") {
        self.editForm.new_sourcefrom = 2;
      }
      rt
        .get("../api/NewOrder/GetNewOrderLine/" + self.mainid)
        .then(function(res) {
          self.tableData = res.orderlinedata;
          //self.editForm.new_name = self.newname;
          //self.stocksiteId = self.stocksiteid
          //self.detailDialog = true
          self.loading = false;

          self.$emit("reloadEdit");
          self.$emit("ievent", self.tableData);
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        });
    },
    //明細列表创建明细
    createDetail: function() {
      if(this.parttype==1)
        this.needShowCreateDialog=true;
      if(this.parttype==2)
        this.needShowCreateOldPartDialog=true;
    },
    //删除明细列表
    deleteDetail: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      }
      this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
        confirmButtonText: this.$t("BUTTON_DETERMINE"),
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: this.$t("BUTTON_CANCEL"),
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].new_orderlineId);
          }
          var params = deleteList;
          var deleteStr = "../api/NewOrderLine/DelOrderLine";
          rt
            .post(deleteStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.loadData();
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
            message: this.$t("HasCancelled")
          });
        });
    }
  }
};
</script>

