<template>
  <div class="diatches">
   <el-dialog :title="$t('BUTTON_BATCHADD')" :visible="visible" :before-close="beforeClose" size="large" style="top:1%;">
    <div class="SideBar">
      <div class="SideBar-Title">
        <el-tree :data="regions" :indent="6" :highlight-current="true" :accordion="false" :props="props"
                 :load="loadNode"
                 lazy @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div class="ContentItem">
        <el-form :model="queryForm" class="detail-form" label-position="left" label-width="80px">
          <el-row :gutter="50">
               <el-col :span="7">
                  <el-form-item label="机器条码">
                    <el-input v-model="queryForm.new_number" @blur="changeBarcode()"></el-input>
                  </el-form-item>
               </el-col>
                <el-col :span="7">
                  <el-form-item label="机型">
                    <el-input readonly icon="search" v-model="queryForm.productName"  :on-icon-click="productlookup"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="是否有库存">
                    <el-select v-model="queryForm.isHasInv">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
               <el-col :span="7">
                  <el-form-item label="配件编码">
                    <el-input v-model="queryForm.partsCode"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="7">
                  <el-form-item label="配件名称">
                    <el-input v-model="queryForm.partsName"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="7">   
                  <el-button type="primary" @click="search">{{$t('BUTTON_SEARCH')}}</el-button>
                  <el-button type="primary" @click="submit">{{$t('BUTTON_DETERMINE')}}</el-button>
                  <el-button @click="beforeClose">{{$t('BUTTON_CANCEL')}}</el-button>
               </el-col>            
            </el-row>
        </el-form>

        <!-- @selection-change="handleSelectionChange" 选择表单数据的时候使用-->
        <el-table stripe :data="tableData" v-loading="loading" ref="tableData" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
            <el-table-column type="selection" width="35" :selectable="isSelectedTable">
            </el-table-column>
            <el-table-column prop="productnumber" label="配件编码" width="150">
            </el-table-column>
            <el-table-column prop="name" label="配件名称" width="250" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="default_apply_qty" label="申请数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.default_apply_qty" @blur="changeCount(scope.row)" :class="scope.row.default_apply_qty<=0||scope.row.default_apply_qty===''?'active':''" :disabled="scope.row.isAdd==='true'?true:false" :width="40"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="defaultuomidName" label="计量单位">
            </el-table-column>
            <el-table-column prop="new_settlementprice" label="结算价" width="70">
            </el-table-column>
            <el-table-column prop="applyAmount" label="申请金额" width="80">
            </el-table-column>
            <el-table-column prop="curstation_inv" label="网点库存" width="80">
            </el-table-column>
            <el-table-column prop="station_inv" label="上级库存" width="100">
            </el-table-column>
            <el-table-column prop="new_ifapplied" :formatter="(row, column) => dataFormatterApply(row, 'new_ifapplied')" label="是否可申请">
            </el-table-column>
            <el-table-column prop="new_frequency" label="频率">
            </el-table-column>
            <el-table-column prop="new_interchangeable" :formatter="(row, column) => dataFormatter(row, 'new_interchangeable')" label="通用件">
            </el-table-column>
            <el-table-column prop="new_preferentialcontent" label="优惠内容" show-overflow-tooltip>
            </el-table-column>
            </el-table>
            <div class="block">
            <el-pagination v-bind:page-sizes="[3, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper"  v-bind:page-size="pageSize" :current-page="currentPage" v-bind:total="dataTotalCount" @current-change="handleCurrentChange" @size-change="handleSizeChange">
            </el-pagination>
        </div>

    </div>
  </el-dialog>
        <productDialog :visible.sync="needShowProductDialog" v-if="needShowProductDialog" @send-workid="outworkid"  @clear-workid="clearworkid"></productDialog>
  </div>
</template>
<script type="text/javascript">
import productDialog from "./productDialog";
export default {
  data: function() {
    return {
      queryForm: {
        //查询条件
        partsName: "",
        partsCode: "",
        productName: "",
        productId: "",
        new_number: "",
        isHasInv:"" //是否有库存
      },
      isClass: false,

      tableData: [], //表格数据
      loading: false, //加载动画

      currentPage: 1, //页码
      pageSize: 10, //条数
      dataTotalCount: 0, //总数
      selectedNodeValue:"", //选中节点的值

      needShowProductDialog: false, //弹出框是否显示
      regions: [{}],
      props: {
          label: 'name',
          children: 'zones'
        },

      chooseParts: [], //被选中的配件
      orderby: "productnumber,descending"
    };
  },
  props: {
    visible: {
      default: false
    },
    mainid: {
      //主档id
      type: String,
      require: true
    }
  },
  mounted: function() {
    this.loadData();
  },
  components: {
    productDialog
  },
  methods: {
    //关闭dialog
    beforeClose: function() {
      this.$emit("update:visible", false);
    },

    //初始化数据
    loadData: function() {
      this.loading = true;
      var apiUrl =
        "../api/siteInvProduct/GetAllProductForMulti?partsName=" +
        encodeURIComponent(this.queryForm.partsName) +
        "&partsCode=" + this.queryForm.partsCode +
        "&srvBom=" + this.queryForm.productId +
        "&pageIndex=" + this.currentPage +
        "&pageSize=" + this.pageSize +
        "&partsapply_id=" + this.mainid +
        "&nodeValue=" + this.selectedNodeValue +
        "&isHasInv=" + this.queryForm.isHasInv +
        "&orderby=" + this.orderby;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res.datalist;
          this.dataTotalCount = res.totalCount;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    },

    handleSortChange: function(sort) {
      if (!sort.prop) {
        return;
      }
      this.orderby = sort.prop + "," + sort.order;
      this.tableData = [];
      this.loadData();
    },

    //查询
    search: function() {
      this.loadData();
    },

    //页码改变
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.loadData();
    },

    //每页显示条数变化
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.loadData();
    },

    //输入框中的值判断
    changeCount: function(row) {
      if (
        !/^-?\d+$/.test(row.default_apply_qty) &&
        row.default_apply_qty !== ""
      ) {
        row.default_apply_qty = "";
        return;
      }else{
        //给申请金额赋值
        row.applyAmount=row.default_apply_qty * row.new_settlementprice;
      }
    },

    //选中的条数
    handleSelectionChange: function(val) {
      this.chooseParts=val;
    },
    changeSelectionChange:function(val){
      if(this.chooseParts.length>0){
        for (var i = 0; i < this.chooseParts.length; i++) {
          if (this.chooseParts[i].productid === val.productid) {
            this.chooseParts[i].new_memo=val.new_memo;
            return;
          }
        }
      }
    },
    dataFormatter(row, column) {
        if(row[column])
          return "是";
        else
          return "否";
      },
    dataFormatterApply(row, column) {
        if(row[column]==1)
          return "是";
        else
          return "否";
      },
    loadNode(node, resolve) {
        var requestStr = '';
        var childrenId = '';
        if (node.level >=1) {
          childrenId = node.data.id;
        }
        if (childrenId == '') {
          //配件大类
          requestStr = '../api/crmpicklist/options/new_srv_partstype/new_partsclass';
          rt.get(requestStr).then((res) => {
          var datafirst = [];
          for (var i = 0; i < res.length; i++) {
            var arrFirst = {
              name: res[i].Text,
              id: res[i].Value,
              code: res[i].Text,
              seq: res[i].Value,
            };
            datafirst.push(arrFirst);

          }
          resolve(datafirst);
          //console.log(datafirst[0]);
          /*if (datafirst != null && datafirst.length > 0) {
            this.handleNodeClick(datafirst[0]);
          }*/
          }).catch((error) => {
            rt.showErrorToast(error);
          });
        }
        else {
          if(node.level>=2){
            //childrenId=0;
            return resolve([]);
          }
          //配件小类
          requestStr = '../api/PartsApply/GetPartstypeByClass?classValue=' + childrenId;
          rt.get(requestStr).then((res) => {
          var datafirst = [];
          for (var i = 0; i < res.length; i++) {
            var arrFirst = {
              name: res[i].new_name,
              id: res[i].new_srv_partstypeid,
              code: res[i].new_code,
              seq: i,
            };
            datafirst.push(arrFirst);
          }


          resolve(datafirst);
          //console.log(datafirst[0]);
          /*if (datafirst != null && datafirst.length > 0) {
            this.handleNodeClick(datafirst[0]);
          }*/
          }).catch((error) => {
            rt.showErrorToast(error);
          });
        }
        

    },
    handleNodeClick: function(data) {
      this.selectedNodeValue = data.id;
      //如果是配件大类，就不查询配件数据
      if (/^-?\d+$/.test(data.id)) {
          return;
      }
      this.loadData();
    },
    //确定
    submit: function() {
      if (this.chooseParts.length <= 0) {
        this.$message({
          showClose: true,
          type: "warning",
          message: this.$t('PleaseChooseOneLine')
        });
      } else {
        var obj = {};
        var list = [];
        obj.new_srv_partsapply_id = this.mainid;
        for (var i = 0; i < this.chooseParts.length; i++) {
          //检查当前配件是否可申请
          if(this.chooseParts[i].new_ifapplied!=1){
            rt.showErrorToast("配件编码：" + this.chooseParts[i].productnumber + " 处于未启用/冻结状态，请优先考虑代用件");
            return;
          }

          if (this.chooseParts[i].price === null) {
            this.chooseParts[i].price = {};
            this.chooseParts[i].price.Value = 0;
          }
          list.push({
            new_product_id: this.chooseParts[i].productid,
            new_product_idname: this.chooseParts[i].name,
            new_code: this.chooseParts[i].productnumber,
            new_qty: this.chooseParts[i].default_apply_qty,
            new_price: this.chooseParts[i].new_settlementprice,
            new_memo: this.chooseParts[i].new_memo,
            new_uom_id: this.chooseParts[i].defaultuomid,
            new_uom_idname: this.chooseParts[i].defaultuomidName,
            new_partscost:
              this.chooseParts[i].new_settlementprice * this.chooseParts[i].default_apply_qty,
            new_stocksite_sendid: this.chooseParts[i].new_stocksite_sendid
          });
        }

        //判断申请数量的值是否合理
        for (var i = 0; i < this.chooseParts.length; i++) {
          if (this.chooseParts[i].default_apply_qty === "") {
            this.chooseParts[i].default_apply_qty = 0;
            this.$message({
              showClose: true,
              type: "warning",
              message: this.$t('ApplyCountNotEmpty'),
              duration: 1000
            });
            return;
          }
          if (this.chooseParts[i].default_apply_qty <= 0) {
            //this.chooseParts[i].default_apply_qty=this.chooseParts[i].default_apply_qty;
            this.$message({
              showClose: true,
              type: "warning",
              message: this.$t("CountMoreThanZero"),
              duration: 1000
            });
            return;
          }

          if (!/^-?\d+$/.test(this.chooseParts[i].default_apply_qty)) {
            this.chooseParts[i].default_apply_qty = "";
            this.$message({
              showClose: true,
              type: "warning",
              message: "只能输入整数",
              duration: 1000
            });
            return;
          }
        }
        obj.multi_partsapply_detail = list;
        var apiUrl = "../api/PartsApply/MultiAddPartsApplyDetail";
        var params = obj;

        this.loading = true;
        rt
          .post(apiUrl, params)
          .then(res => {
            this.$emit("resetLoadData");
            this.loading = false;
            rt.showSuccessToast(this.$t("Successfullyadded"));
            this.loadData();

            //this.$emit('update:visible', false);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },
    changeBarcode: function(){
       if(this.queryForm.new_number==""){
         this.queryForm.productId = "";
         this.queryForm.productName = "";
       }else{
         //配件小类
          var requestStr = '../api/PartsApply/GetProductInfoByMachineCode?machinecode=' + this.queryForm.new_number;
          rt.get(requestStr).then((res) => {
            this.queryForm.productId = res.new_product_id;
            this.queryForm.productName = res.new_product_idname;
          }).catch((error) => {
            rt.showErrorToast(error);
          });
       }
    },
    //产品名称的dialog
    productlookup: function() {
      this.needShowProductDialog = true;
    },

    //选中之后接收的数据
    outworkid: function(val) {
      this.queryForm.productId = val[0];
      this.queryForm.productName = val[1];
    },

    //移出之后接收的数据
    clearworkid: function(val) {
      this.queryForm.productId = val[0];
      this.queryForm.productName = val[1];
    },
    isSelectedTable: function(row) {
      if (row.isAdd === "true") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style type="text/css" >
.diatches{
  margin-top: 0;
}
/*.diatches .el-dialog {
  margin-bottom: 0px !important;
  top: 8% !important;
}
.diatches .el-dialog__wrapper {
  overflow-x: hidden;
}
.diatches .el-table__body-wrapper {
  max-height: 300px;
  overflow-x: hidden !important;
}
.active .el-input__inner {
  border: 1px solid #f00 !important;
}*/


  .SideBar {
    width: 18%;
    min-width: 200px;
    max-width: 210px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ContentItem {
    width: 82%;
    margin-left: 220px;
    background-color: rgb(246, 246, 246);
    font-size: 12px;
    padding-top: 5px;
  }

  .SideBar-Title {
    border-width: 0;
    text-align: left;
    padding-top: 30px;
    position: absolute;
    z-index: 10;
    line-height: 120px;
    min-width: 210px;
    max-width: 210px;
    min-height: 100px;
    max-height: 410px;
    background-color: #4993EB;
    overflow-y: auto;
  }

  .el-tree-node__content {
    line-height: 25px;
    height: 25px;
    cursor: pointer;
  }

  .el-tree-node__label {
    font-size: 12px;
    vertical-align: middle;
    display: inline-block;
  }

  .el-tree--highlight-current {
    min-height: 400px;
  }

  .el-dialog__body {
    padding: 20px 20px;
    color: rgb(72, 95, 106);
    font-size: 14px;
    min-height: 415px;
  }

  .el-form-item__label{
    font-size: 12px;
    padding-left: 5px;
  }

  .el-table .cell{
    font-size: 12px;
    padding-left: 8px;
    padding-right: 8px;
  }

/*.diatches .el-table__body-wrapper::-webkit-scrollbar {
    display: none;
   }*/
</style>
