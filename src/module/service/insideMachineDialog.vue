<template>
  <div>
    <el-dialog :title="this.title" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
      <div class="rt-header1">
        <rt-toolbar showBack @goback="beforeGoBack" v-if="!disabledForm">
          <rt-button type="save" text="保存" v-show="true" @click="onSave()"  />
        </rt-toolbar>
      </div>
      <el-form v-show="!this.isInside" ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="外机型号" prop="productid">
              <el-input v-model="editForm.productName" readonly @keyup.enter.native="quickChooseProduct" icon="search" :on-icon-click="showProduct"
                :disabled="disabledForm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外机制冷量" prop="new_RefrigeratingCapacity">
              <el-input :disabled="true" v-model="editForm.new_RefrigeratingCapacity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外机安装条件" prop="new_outinstallterm">
              <el-select v-model="editForm.new_outinstallterm" clearable  :disabled="disabledForm">
                <el-option v-for="item in options" :key="item.Value" :label="item.Text" :value="item.Value">{{item.Text}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="外机安装不满足条件" prop="new_outinstalldissatisfyterm">
              <el-select v-model="editForm.new_outinstalldissatisfyterm" clearable  :disabled="disabledForm">
                <el-option v-for="item in disOptions" :key="item.Value" :label="item.Text" :value="item.Value">{{item.Text}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险提示" prop="new_incount">
              <el-input v-model="editForm.new_incount" :disabled="disabledForm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form v-show="this.isInside" ref="editForm2" :model="editForm2" label-width="120px" label-position="left" :rules="rules">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="内机型号" prop="productid">
              <el-input readonly icon="search" v-model="editForm2.productName" :on-icon-click="showProduct" :disabled="disabledForm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="内机制冷量" prop="new_refrigeratingcapacity">
              <el-input v-model="editForm2.new_refrigeratingcapacity" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="内机数量" prop="new_insideqty">
              <el-input v-model.number="editForm2.new_insideqty" :disabled="disabledForm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <productDialog ref="productDialog" @lookupSelect="outworkid" @lookupSelectClear="clearworkid" :ids="mids" :product-model="productModel"
      @send-workid="outworkid" @clear-workid="clearworkid"></productDialog>
  </div>
</template>
<script>
//import productDialog from "./visitDesignProductDialog";
export default {
  name: "insideMachineDialog",
  data: function() {
    return {
      // 外机安装条件选项
      options: [
        {
          Text: "格栅",
          Value: 1
        },
        {
          Text: "屋顶",
          Value: 2
        },
        {
          Text: "外墙",
          Value: 3
        },
        {
          Text: "遮挡",
          Value: 4
        }
      ],
      //外机安装不满足条件
      disOptions: [
        {
          Text: "空间小",
          Value: 1
        },
        {
          Text: "散热不良",
          Value: 2
        },
        {
          Text: "噪音",
          Value: 3
        }
      ],
      productModel: "",
      dialogFormVisible: false,
      needShowProductDialog: false, //判断是否显示productDialog
      dialogDisplayFields: [
        {
          name: "Name",
          label: "名称"
        },
        {
          name: "createdon",
          label: "创建日期",
          width: 180
        }
      ],
      //外机
      editForm: {
        id: "",
        productid: "",
        productName: "",
        new_RefrigeratingCapacity: "",
        new_outinstalldissatisfyterm: "",
        new_incount: "",
        new_outinstallterm: ""
      },
      //内机
      editForm2: {
        productid: "",
        productName: "",
        new_refrigeratingcapacity: "",
        new_insideqty: ""
      },
      rules: {
        new_outinstallterm: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        new_insideqty: [
          {
            type: "number",
            required: true,
            message: "",
            trigger: "change"
          }
        ],
        productid: [
          {
            required: true,
            message: "",
            trigger: "change"
          }
        ]
      },
      disabledForm: false,
      isSetType: false,
      canSave: true
    };
  },
  props: {
    isInside: Boolean,
    title: String,
    mids: String,
    //outsideMachine: Object, //外机的时候会有（外机id）
    areaId: String,
    workOrder: Object
  },
  components: {
    productDialog: resolve => {
      require(["./visitDesignProductDialog"], resolve);
    }
  },
  watch: {
    // outsideMachine: function(newValue, oldValue) {
    //   this.editForm = newValue;
    // }
  },
  methods: {
    init: function() {
      //修改外机
      if (!this.isInside && this.outsideid != "") {
      } else {
        //清空
        this.clearProduct();
      }
    },
    //提供给父组件调用
    show: function(outsideMachineModel) {
      //this.$nextTick(() => {
      this.dialogFormVisible = true;
      if (
        outsideMachineModel &&
        !rt.isNullOrWhiteSpace(outsideMachineModel.id)
      ) {
        //this.outsideMachine = outsideMachineModel;
        this.editForm = outsideMachineModel;
      } else {
      }
              debugger;
      this.disabledForm = !(
        this.workOrder.new_dealstage == 6 ||
        this.workOrder.new_dealstage == 7 ||
        this.workOrder.new_dealstage == 10 ||
        this.workOrder.new_dealstage == 15 ||
        this.workOrder.new_dealstage == 16 ||
        this.workOrder.new_dealstage == 17 ||
        this.workOrder.new_tech_approvalstatus == 3
      );
      //});
    },
    //移出之后接收的数据
    clearworkid: function(val) {
      this.editForm2.productid = "";
      this.editForm2.productName = "";

      this.editForm.productid = "";
      this.editForm.productName = "";
    },
    //接受选择的数据
    outworkid: function(val) {
      if (this.isInside) {
        this.editForm2.productid = val.id;
        this.editForm2.productName = val.name;
        this.editForm2.new_refrigeratingcapacity =
          val.new_refrigeratingcapacity;
      } else {
        this.editForm.productid = val.id;
        this.editForm.productName = val.name;
        this.editForm.new_RefrigeratingCapacity = val.new_refrigeratingcapacity;
      }
    },
    //显示产品Dialog
    showProduct: function() {
      if (this.disabledForm) {
        return;
      }
      this.$refs.productDialog.show();
    },
    quickChooseProduct: function() {
      this.needShowProductDialog = true;
    },
    //选择product
    selectProduct: function(id, name) {
      if (
        this.editForm.new_productid == id &&
        this.editForm.new_productName == name
      ) {
        return;
      } else {
        this.editForm.new_productid = id;
        this.editForm.new_productName = name;
      }
    },
    //清除数据
    clearProduct: function() {
      this.editForm2.productid = "";
      this.editForm2.productName = "";
      this.editForm2.new_refrigeratingcapacity = "";
      this.editForm2.new_insideqty = "";

      this.editForm.productName = "";
      this.editForm.productid = "";
      this.editForm.new_RefrigeratingCapacity = "";
      this.editForm.new_outinstallterm = "";
      this.editForm.new_outinstalldissatisfyterm = "";
    },
    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.disabledForm = false;
      this.$emit("reLoad");
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },
    reLoadUserprofile: function() {},

    //保存事件
    onSave: function() {
      var formName = "editForm";
      if (this.isInside) formName = "editForm2";
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isInside) {
            let requestStr =
              "../api/VisitDesign/AddInsideInfo?areaInfoId=" + this.areaId;
            let AreaInfoModel = {
              new_product_id: this.editForm2.productid,
              new_refrigeratingcapacity: this.editForm2
                .new_refrigeratingcapacity,
              new_insideqty: this.editForm2.new_insideqty
            };
            rt
              .post(requestStr, AreaInfoModel)
              .then(res => {
                rt.showSuccessToast(res);
                this.dialogFormVisible = false;
                this.handleClose();
                this.clearProduct();
              })
              .catch(error => {
                rt.showErrorToast(error.Data);
                this.loading = false;
              });
          } else {
            if (!rt.isNullOrWhiteSpace(this.editForm.id)) {
              //执行更新
              let requestStr = "../api/VisitDesign/UpdateOutsideMachineInfo";
              let model = {
                id: this.editForm.id,
                new_outinstallterm: this.editForm.new_outinstallterm,
                new_RefrigeratingCapacity: this.editForm
                  .new_RefrigeratingCapacity, //外机制冷量
                new_outproduct_id: this.editForm.productid, //外机型号
                new_outinstalldissatisfyterm: this.editForm
                  .new_outinstalldissatisfyterm //外机安装不满足条件
              };

              rt
                .post(requestStr, model)
                .then(res => {
                  rt.showSuccessToast(res);
                  this.init();
                })
                .catch(error => {
                  rt.showErrorToast(error.Data);
                  this.loading = false;
                });

              return;
            }
            let requestStr =
              "../api/VisitDesign/addOutsideMachineInfo?ids=" +
              this.mids +
              "&orderId=" +
              this.workOrder.id;

            let model = {
              new_outproduct_id: this.editForm.productid,
              new_RefrigeratingCapacity: this.editForm
                .new_RefrigeratingCapacity, //外机制冷量
              new_outinstallterm: this.editForm.new_outinstallterm, //外机安装条件
              new_outinstalldissatisfyterm: this.editForm
                .new_outinstalldissatisfyterm //外机安装不满足条件
            };
            rt
              .post(requestStr, model)
              .then(res => {
                rt.showSuccessToast(res);
                this.dialogFormVisible = false;
                this.handleClose();
                this.clearProduct();
              })
              .catch(error => {
                rt.showErrorToast(error.Data);
                this.loading = false;
              });
          }
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    },
    //设置单据装态
    setFormDisable: function(val) {
      this.disabledForm = val;
    },
    //设置单据数据
    setFormData: function(val) {
      this.editForm = val;
    },

    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.$refs["editForm"].resetFields();
      this.$refs["editForm2"].resetFields();
      this.$emit("reLoad");
    },
    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    }
  }
};
</script>
<style>
.rt-header1 {
  background-color: #ffffff;
  margin-bottom: 10px !important;
  margin-top: -30px !important;
  height: 40px;
  line-height: 40px;
  box-shadow: none !important;
}
</style>
