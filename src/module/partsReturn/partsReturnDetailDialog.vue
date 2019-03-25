<template>
  <div>
    <!-- 旧件明细页面 弹出框 -->
    <el-dialog :title="$t('new_srv_partsreturnline')" :visible="visible" :show-close="true" :before-close="beforeClose" :close-on-press-escape="false">
      <div class="monthplan-detail-form">
        <el-form :model="editForm" ref="editForm" :rules="rules" class="detail-form" label-position="left" label-width="120px" v-loading="formLoading">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_partsid')" prop="new_partsidname">
                <el-input icon="search" readonly v-model="editForm.new_partsidname" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_partscode')" prop="new_partscode">
                <el-input v-model="editForm.new_partscode" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_price')" prop="new_price">
                <el-input v-model="editForm.new_price" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_approvalqty')" prop="new_approvalqty">
                <el-input v-model="editForm.new_approvalqty"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_partscost')" prop="new_partscost">
                <el-input v-model="editForm.new_partscost" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_unit')" prop="new_unit">
                <el-input v-model="editForm.new_unit" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_modal')"  prop="new_modal">
                <el-input v-model="editForm.new_modal" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_isreturn')" prop="new_isreturn">
                <el-select v-model="editForm.new_isreturn" disabled :placeholder="$t('Select')">
                  <el-option v-for="item in resultOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_formstatus')" prop="new_formstatus">
                <el-select v-model="editForm.new_formstatus" :placeholder="$t('Select')" disabled>
                  <el-option v-for="item in formOptions" :key="item.Value" :label="item.Text" :value="item.Value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('new_srv_partsreturnline.new_receiveqty')" prop="new_receiveqty">
                <el-input v-model="editForm.new_receiveqty" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="$t('new_srv_partsreturnline.new_meno')" prop="new_meno">
                <el-input type="textarea" v-model="editForm.new_meno"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <div>
              <el-button @click="beforeClose">{{$t('BUTTON_CANCEL')}}</el-button>
              <el-button type="primary" @click="saveDataClick('editForm')">{{$t('BUTTON_DETERMINE')}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      needShowDialog: false,
      formDialog: false,
      formLoading: false, //表单的loading参数

      editForm: {
        new_partsid: "", //配件id
        new_partsidname: "", //配件名称
        new_partscode: "", //配件编码
        new_price: "", //配件价格
        new_approvalqty: "", //实际返回数量
        new_partscost: "", //金额
        new_unit: "", //单位
        new_modal: "", //型号
        new_isreturn: true, //是否返厂
        new_formstatus: 1, //配件状态
        new_appraisername: "", //鉴定人
        new_appraisalresult: "", //旧件鉴定结果
        new_receiveqty: "", //签收数量
        new_meno: "" //备注
      },
      rules: {
        new_approvalqty: [
          { required: true, message: "不能为空" },
          { pattern: /^\+?[1-9]\d*$/, message: "必须为大于0的整数" }
        ],
        new_partsidname: [
          { required: true, message: "请选择配件名称", trigger: "change" }
        ],
        new_partscost: [
          { required: true, message: "不能为空" },
          { pattern: /^([0-9])+(\.[0-9]+)?$/, message: "必须为数字值" }
        ],
        new_formstatus: [
          {
            type: "number",
            required: true,
            message: "请选择配件状态",
            trigger: "change"
          }
        ]
      },
      formOptions: [], //配件状态
      returnOptions: [
        { value: false, label: "false" },
        { value: true, label: "true" }
      ], //是否返厂
      resultOptions: [
        { value: true, label: this.$t('Back to Factory') },
        { value: false, label: this.$t('Not Back to Factory') }
      ] //鉴定结果
    };
  },
  props: {
    visible: {
      default: false
    },
    partsRowId: {
      type: String,
      require: true
    },
    partsReturnId: {
      type: String,
      require: true
    }
  },

  mounted: function() {
    this.formStatus();
    if (this.partsRowId) {
      this.loadData();
    }
  },
  methods: {
    //关闭和取消
    beforeClose: function() {
      if (!this.partsRowId) {
        this.$refs.editForm.resetFields();
      }
      this.$emit("update:visible", false);
    },

    //初始化数据
    loadData: function() {
      this.formLoading = true;
      var apiUrl =
        "../api/PartsReturn/GetPartsReturnLineById/" + this.partsRowId;
      rt
        .get(apiUrl)
        .then(res => {
          this.editForm = res;
          if (res.new_price != null && res.new_approvalqty != null) {
            this.editForm.new_partscost = res.new_price * res.new_approvalqty;
          }
          this.formLoading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          this.formLoading = false;
        });
    },

    //配件状态下拉列表数据
    formStatus: function() {
      var apiUrl =
        "../api/crmpicklist/options/new_srv_partsreturnline/new_formstatus";
      rt
        .get(apiUrl)
        .then(res => {
          this.formOptions = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    //确认事件
    saveDataClick: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('1243124')
          var that = this;
          that.formLoading = true;
          that.editForm.id = that.partsRowId;
          that.editForm.new_partsreturnid = that.partsReturnId;
          var apiUrl = "../api/PartsReturn/UpdatePartsReturnDetail";
          rt
            .post(apiUrl, that.editForm)
            .then(res => {
              rt.showSuccessToast(that.$t("Successfullysaved"));
              that.formLoading = false;
              that.$emit("resetLoadData");
              that.$emit("update:visible", false);

              //that.$refs.editForm.resetFields();
            })
            .catch(error => {
              rt.showErrorToast(error);
              that.formLoading = false;
            });
        } else {
          return;
        }
      });
    }
    /* saveDataClick:function(formName){
      this.$refs[formName].validate((valid) => {
                 if(valid){
                      var that = this;
                      that.formLoading = true;
                      that.editForm.id = that.partsRowId;
                      that.editForm.new_partsreturnid = that.partsReturnId;
                      if(that.partsRowId){
                            var apiUrl='../api/PartsReturn/UpdatePartsReturnDetail';
                              rt.post(apiUrl,that.editForm).then((res)=>{
                                  rt.showSuccessToast('保存成功');
                                  that.formLoading = false;
                                  that.$emit('update:visible', false);
                                  that.$emit('resetLoadData');
                                  that.$refs.editForm.resetFields();
                              }).catch((error)=>{
                                    rt.showErrorToast(error);
                                    that.formLoading = false;
                              })
                      }else{
                           var apiUrl='../api/PartsReturn/CreatePartsReturnDetail';
                           rt.post(apiUrl,that.editForm).then((res)=>{
                                    rt.showSuccessToast('保存成功');
                                    that.$emit('resetLoadData')
                                    that.formLoading = false;
                                    that.$emit('update:visible', false);
                                    that.$refs.editForm.resetFields();
                           }).catch((error)=>{
                                    rt.showErrorToast(error);
                                    that.formLoading = false;
                                    this.$emit('update:visible', false);
                           })
                      }
                 }else{
                    return;
                 }
      })
    }*/
  }
};
</script>
<style></style>
