<template>
    <rt-section id="area5" title="条码录入">
        <template slot="toolbar">
        </template>
        <el-form label-position="left" ref="queryForm" label-width="120px">
            <el-form-item label="条码录入" prop="barCode">
                <el-input v-model="barCode" @keyup.enter.native="addUserProfile" icon="search" :on-icon-click="addUserProfile"></el-input>
                <el-input type="hidden"></el-input>
            </el-form-item>           
        </el-form>
        <el-table ref="gridTable" :data="userprofileData" v-loading="loading" max-height="500">
            <!-- <el-table-column type="selection" width="35">
            </el-table-column> -->
            <el-table-column label="条码" prop="new_number">
            </el-table-column>
            <el-table-column label="产品型号" prop="new_product_idName">
            </el-table-column>
            <el-table-column label="内/外机" prop="new_insideoroutsidetext">
            </el-table-column>
            <el-table-column label="产品类型" prop="new_ProductmodelName" >
            </el-table-column>
            <el-table-column label="产品小类" prop="new_aux_producttype_idName" >
            </el-table-column>
            <el-table-column label="是否故障机" prop="new_iserror" v-if="this.workOrder.new_type==5||(this.workOrder.new_type==4&&(this.workOrder.new_auditpoint==4||this.workOrder.new_auditpoint==5))||this.workOrder.new_type==12" >
              <template slot-scope="scope">
                 <el-checkbox v-model="scope.row.new_iserror" @change="isErrorChange(scope.row)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="退换机类型" prop="new_replacetype" v-if="(this.workOrder.new_type==5||this.workOrder.new_type==4)&&(this.workOrder.new_auditpoint==4||this.workOrder.new_auditpoint==5)" >
              <template slot-scope="scope">
                <rt-picklist v-model="scope.row.new_replacetype" entity="new_srv_workorder2userprofile" attribute="new_replacetype" disabled ></rt-picklist>
              </template>
            </el-table-column>
            <el-table-column  label="新机条码" prop="new_changednumber" v-if="this.workOrder.new_type==5&&this.workOrder.new_auditpoint==5" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.new_changednumber" :disabled="!scope.row.new_iserror" @keyup.enter.native="checkNewNumber(scope.row)" @blur="checkNewNumber(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" v-if="this.workOrder.new_type==4||(this.workOrder.new_type==5&&this.notInstalled)" >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteUserProfile(scope.$index, userprofileData)">移除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </rt-section>
</template>

<script>
export default {
  name: "userprofileDialog",
  data: function() {
    return {
      loading: false,
      barCode: "",
      userprofileData: [],
      installed: false,
      notInstalled: false,
      replacetypeOptions: []
    };
  },
  components: {},
  props: {
    workOrder: Object
  },
  mounted: function() {
    this.userprofileData = [];
  },
  methods: {
    deleteUserProfile: function(index, rows) {
      rows.splice(index, 1);
      if (rows == null || rows.length <= 0) {
        this.installed = false;
        this.notInstalled = false;
      }
    },

    //关闭时清除form内容
    handleClose: function() {
      this.dialogFormVisible = false;
      this.dialogtableData = [];
    },

    addUserProfile: function() {
      if (rt.isNullOrWhiteSpace(this.barCode)) {
        rt.showErrorToast("请输入条码");
        return;
      }
      for (var item in this.userprofileData) {
        if (this.userprofileData[item].new_number == this.barCode) {
          rt.showErrorToast("条码已存在");
          return;
        }
      }
      if (this.installed) {
        rt.showErrorToast("已包含有套机标识的条码，无法继续添加");
        return;
      }
      this.loading = true;
      var params = {
        id: this.workOrder.id,
        code: this.barCode
      };
      var requestStr = "../api/WorkOrder/GetUserprofileByCode";
      rt
        .get(requestStr, params)
        .then(res => {
          for (var item in res) {
            if (this.workOrder.new_type == 12 || this.workOrder.new_type == 4) {
              if (
                res[item].new_formstatus != 1 &&
                res[item].new_formstatus != 2 &&
                res[item].new_formstatus != 7
              ) {
                rt.showErrorToast(
                  "返包类型服务单只能添加已生产、已销售或返修修复的条码"
                );
                this.loading = false;
                return;
              } else if (this.workOrder.new_type == 12) {
                res[item].new_iserror = true;
              }
            }
            if (!rt.isNullOrWhiteSpace(res[item].new_setmark)) {
              if (this.notInstalled) {
                rt.showErrorToast(
                  "已包含不含套机标识的条码，无法添加含套机标识的条码"
                );
                this.loading = false;
                return;
              }
              this.installed = true;
              this.$emit("setFormDisable", true);
            } else {
              if (this.installed) {
                rt.showErrorToast(
                  "已包含含套机标识的条码，无法添加不含套机标识的条码"
                );
                this.loading = false;
                return;
              }
              this.notInstalled = true;
            }
            this.userprofileData.push(res[item]);
          }
          this.barCode = "";
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          rt.showErrorToast(error);
        });
    },
    checkNewNumber: function(row, ischeck) {
      if (!row.new_iserror) {
        return;
      }
      if (rt.isNullOrWhiteSpace(row.new_changednumber)) {
        rt.showErrorToast("请输入新机条码");
        return;
      }
      for (var item in this.userprofileData) {
        if (this.userprofileData[item].new_number == row.new_changednumber) {
          rt.showErrorToast("条码已存在");
          return;
        }
      }
      var params = {
        id: this.workOrder.id,
        code: row.new_changednumber
      };
      var requestStr = "../api/WorkOrder/GetUserprofileByCode";
      rt
        .get(requestStr, params)
        .then(res => {
          if (res == null || res.length <= 0) {
            rt.showErrorToast("新机条码" + row.new_changednumber + "验证失败");
            return;
          }
          if (res[0].new_formstatus == 3) {
            rt.showErrorToast("新机条码" + row.new_changednumber + "验证失败");
            return;
          }
          row.new_userprofileid_changed = res[0].new_userprofileid;
        })
        .catch(error => {
          row.new_changednumber = "";
          rt.showErrorToast(error);
          //rt.showErrorToast("新机条码" + row.new_changednumber + "验证失败");
        });
    },

    //是否故障机修改
    isErrorChange: function(row) {
      if (!row.new_iserror) {
        row.new_replacetype = null;
        row.new_changednumber = "";
        return;
      }
      row.new_replacetype =
        this.workOrder.new_auditpoint == 4
          ? 1
          : this.workOrder.new_auditpoint == 5 ? 2 : null;
      if (this.notInstalled) {
        return;
      }
      var params = {
        setmark: row.new_setmark
      };
      var requestStr = "../api/WorkOrder/GetWorkOrder2UserprofileBySetmark";
      rt
        .get(requestStr, params)
        .then(res => {
          this.$emit("setFormData", res);
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    }
  }
};
</script>
