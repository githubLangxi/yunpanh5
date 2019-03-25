<template>
  <div>
    <rt-header v-bind:title="$t('new_srv_amountchangelog')">
      <rt-toolbar show-autoback>
      </rt-toolbar>
    </rt-header>
    <rt-content>
      <el-form ref="dataForm" :model="dataForm" label-width="120px" label-position="left">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item v-bind:label="$t('new_srv_amountchangelog.createdon')" >
              <el-input v-model="dataForm.createdon" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-bind:label="$t('new_srv_amountchangelog.new_name')" >
              <el-input v-model="dataForm.new_name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-bind:label="$t('new_srv_amountchangelog.new_adjustmenttype')" >
              <el-input v-model="dataForm.new_adjustmenttypeName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item v-bind:label="$t('new_srv_amountchangelog.new_adjustamount')">
              <el-input v-model="dataForm.new_adjustamount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </rt-content>
  </div>
</template>

<script>
// import Vue from "vue";
// import moment from "moment";
// import VueMomentJS from "vue-momentjs";
// Vue.use(VueMomentJS, moment);

export default {
  data: function() {
    return {
      dataForm: {
        new_srv_amountchangelogid: "",
        new_name: "", //来源单据编号
        new_adjustmenttype: "", //来源类型

        new_adjustmenttypeName: "", //来源类型名
        new_adjustamount: "", //调整金额
        createdon: "" //创建时间
      }
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      var formData = JSON.parse(this.$route.params.row);
      this.dataForm = formData;
    }
  }
};
</script>
