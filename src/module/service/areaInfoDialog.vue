<template>
  <div>
      <el-dialog  title="区域信息" :visible.sync="dialogFormVisible" :before-close="handleClose" size="large">
          <div class="rt-header1" >
          <rt-toolbar showBack @goback="beforeGoBack" v-if="!disabledform">
            <rt-button type="save" text="保存" @click="SaveData('editForm')"  />
            <rt-button type="save" text="保存并关闭" @click="SaveData('1')" />
          </rt-toolbar>
        </div>
      <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules" >
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="关联服务单" prop="new_srv_workorder_id">
                <!-- <rt-lookup v-model="editForm.new_srv_workorder_id" :disabled="true"  entity="new_srv_workorder" dialog-filter-fields="new_name" /> -->
                <el-input readonly icon="search" v-model="editForm.new_srv_workorder_id.name" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="场所类型" prop="new_placetypes_id.name">
                <!-- <rt-lookup v-model="editForm.new_placetypes_id" :disabled="false"  entity="new_placetypes" dialog-filter-fields="new_name" /> -->
                <el-input readonly icon="search" v-model="editForm.new_placetypes_id.name" :on-icon-click="showPlaceType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="功能区域" prop="new_functionalareas_id.name">
                <el-input readonly icon="search" v-model="editForm.new_functionalareas_id.name" :on-icon-click="showArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="参考单位制冷量KW" prop="new_referenceurc">
                <el-input :disabled="true" v-model.number="editForm.new_referenceurc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用面积m²" prop="new_usearea">
                <el-input v-model.number="editForm.new_usearea" type="number" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="匹配是否满足" prop="new_ismeet">
                <!-- <el-input v-model.number="editForm.new_ismeet" type="number" :disabled="disabledform"></el-input> -->
                <rt-picklist v-model="editForm.new_ismeet" entity="new_workorderfunctionalareas" attribute="new_ismeet" :disabled="true"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="区域标识" prop="new_regionalidentity">
                <el-input v-model="editForm.new_regionalidentity" :disabled="disabledform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="功能区域特征" prop="new_areafeatures">
                <rt-picklist v-model="editForm.new_areafeatures" entity="new_workorderfunctionalareas" attribute="new_areafeatures" :disabled="disabledform"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>    
      <el-form ref="areaInfo7" label-width="120px" label-position="left">
        <rt-section id="area1" title="内机信息">
          <template slot="toolbar" v-if="!disabledform&&new_workorderfunctionalareasid">
            <rt-button type="add" text="新增" @click="addInsideMachine()"  />
            <rt-button type="delete" text="删除" @click="deleteData()"  />
          </template>
          <el-table ref="insideinfoTable" :data="insideInfo" row-key="id" stripe v-loading="loading">
            <el-table-column type="selection" width="35">
            </el-table-column>
            <el-table-column prop="new_product_name" label="内机型号">
            </el-table-column>
            <el-table-column prop="new_RefrigeratingCapacity" label="内机制冷量">
            </el-table-column>
            <el-table-column prop="new_insideqty" label="内机数量">
            </el-table-column>
          </el-table>
        </rt-section>
      </el-form>
    </el-dialog>
    <insideMachineDialog ref="insideMachineDialog" v-bind:isInside="true" title="内机条码" :areaId="new_workorderfunctionalareasid" :workOrder="workOrder" @reLoad="reloadInsideInfo"></insideMachineDialog>
    <areaFunctionDialog ref="areaFunctionDialog" v-bind:id="editForm.new_placetypes_id.id" @areaClear="areaClear" @lookupSelect="areaSelect"></areaFunctionDialog>
    <placeTypeDialog ref="placeTypeDialog"  @areaClear="clearPlaceType" @lookupSelect="selectPlaceType"></placeTypeDialog>
  </div>
</template>
<script>
import insideMachineDialog from "./insideMachineDialog";
import areaFunctionDialog from "./areaFunctionDialog";
import placeTypeDialog from "../Dialog/placeTypeDialog";
export default {
  data: function() {
    return {
      loading: false,
      new_workorderfunctionalareasid: "",
      dialogFormVisible: false,
      disabledform: false,
      isLoad: false,
      editForm: {
        new_functionalareas_id: {},
        new_srv_workorder_id: {},
        new_placetypes_id: {}
      },
      userarea: 0,
      insideInfo: [],
      rules: {
        "new_placetypes_id.name": [
          {
            type: "string",
            required: true
          }
        ],
        "new_functionalareas_id.name": [
          {
            type: "string",
            required: true
          }
        ],
        new_usearea: [
          {
            type: "number",
            required: true
          }
        ],
        new_regionalidentity: [
          {
            required: true
          }
        ]
      }
    };
  },
  props: {
    workOrder: Object
  },
  components: {
    insideMachineDialog,
    areaFunctionDialog,
    placeTypeDialog
  },
  watch: {
    "editForm.new_areafeatures": function(newValue, oldValue) {
      if (this.isLoad) {
        this.isLoad = false;
        return;
      }
      if (
        (oldValue == "" || oldValue == 9 || oldValue == undefined) &&
        (newValue != "" && newValue != 9 && newValue != undefined)
      ) {
        this.editForm.new_referenceurc = this.editForm.new_referenceurc * 1.2;
      }
      if (
        oldValue != "" &&
        oldValue != 9 &&
        oldValue != undefined &&
        (newValue == "" || newValue == 9 || newValue == undefined)
      ) {
        this.editForm.new_referenceurc = this.editForm.new_referenceurc / 1.2;
      }
    }
  },
  methods: {
    //提供给父组件调用
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.disabledform = !(
            this.workOrder.new_dealstage == 6 ||
            this.workOrder.new_dealstage == 7 ||
            this.workOrder.new_dealstage == 10 ||
            this.workOrder.new_dealstage == 15 ||
            this.workOrder.new_dealstage == 16 ||
            this.workOrder.new_dealstage == 17 ||
            this.workOrder.new_tech_approvalstatus == 3
          );
          this.new_workorderfunctionalareasid = val;
          this._fetchRecords();
        } else {
          this.disabledform = false;
          this.editForm.new_srv_workorder_id.id = this.workOrder.id;
          this.editForm.new_srv_workorder_id.name = this.workOrder.name;
        }
      });
    },

    _fetchRecords: function() {
      if (this.new_workorderfunctionalareasid) {
        var that = this;
        //获取功能区域
        var requestStr =
          "../api/VisitDesign/AreaInfoById?id=" +
          this.new_workorderfunctionalareasid;
        rt
          .get(requestStr)
          .then(res => {
            //数据加工areaInfo.new_srv_workorder_id
            that.isLoad = true;
            that.editForm = {
              new_srv_workorder_id: {
                id: res.new_srv_workorder_id,
                name: res.new_srv_workorder_name
              },
              new_placetypes_id: {
                id: res.new_placetypes_id,
                name: res.new_placetypes_name
              },
              new_functionalareas_id: {
                id: res.new_functionalareas_id,
                name: res.new_functionalareas_name
              },
              new_referenceurc: res.new_referenceurc,
              new_usearea: res.new_usearea,
              new_ismeet: res.new_ismeet,
              new_regionalidentity: res.new_regionalidentity,
              new_areafeatures: res.new_areafeatures
            };
            // this.judgeIsMeet();
            that.GetInsideInfo(that);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },

    reloadInsideInfo: function() {
      this.GetInsideInfo(this);
    },

    GetInsideInfo: function(that) {
      //获取内机信息(by功能区域)
      var requestStr =
        "../api/VisitDesign/GetInsideInfo?pageSize=20&pageIndex=1&pageCookie=&queryValue=" +
        that.new_workorderfunctionalareasid +
        "&new_srv_workorder_id=" +
        that.workOrder.id;
      rt
        .get(requestStr)
        .then(res => {
          //数据加工areaInfo.new_srv_workorder_id
          if (res.InsideMachineInfoList != null) {
            that.insideInfo = res.InsideMachineInfoList;
          } else {
            that.insideInfo = [];
          }
          that.judgeIsMeet(that);
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },

    judgeIsMeet: function() {
      //判断所选的内机和区域信息是否满足
      var sum_referenceurc = 0;
      // debugger;
      if (this.insideInfo.length > 0) {
        this.insideInfo.forEach(k => {
          let sum = 0.0;
          sum =
            parseFloat(k.new_insideqty) *
            parseFloat(k.new_RefrigeratingCapacity);
          sum_referenceurc += sum;
        });
      }
      var rate = sum_referenceurc / parseFloat(this.editForm.new_usearea * 1.0);

      if (rate < this.editForm.new_referenceurc) {
        // rt.showErrorToast("所选内机单位制冷量小于参考值");
        this.editForm.new_ismeet = 2;
      } else {
        this.editForm.new_ismeet = 1;
      }
    },

    //返回按钮之前提示保存服务单数据
    beforeGoBack: function() {
      this.handleClose();
    },
    //关闭时清除form内容
    handleClose: function() {
      this.$refs["editForm"].resetFields();
      this.insideInfo = [];
      this.dialogFormVisible = false;
      this.editForm.new_referenceurc = "";
      this.editForm.new_functionalareas_id = {};
      this.editForm.new_placetypes_id = {};
      this.editForm.new_srv_workorder_id = {};
      this.new_workorderfunctionalareasid = "";
      this.$emit("reload");
    },

    showArea: function() {
      if (this.disabledform) return;
      this.$refs.areaFunctionDialog.show();
    },

    areaClear: function() {
      this.editForm.new_functionalareas_id.id = "";
      this.editForm.new_functionalareas_id.name = "";
    },
    //选完区域完调用
    areaSelect: function(form) {
      this.editForm.new_functionalareas_id = {
        id: form.id,
        name: form.name
      };
      var res = form.new_urc;
      if (
        this.editForm.new_areafeatures != "" &&
        this.editForm.new_areafeatures != 9
      ) {
        this.editForm.new_referenceurc = res * 1.2;
      } else {
        this.editForm.new_referenceurc = res;
      }
    },

    showPlaceType: function() {
      if (this.disabledform) return;
      this.$refs.placeTypeDialog.show();
    },

    clearPlaceType: function() {
      this.editForm.new_placetypes_id.id = "";
      this.editForm.new_placetypes_id.name = "";
      this.areaClear();
    },
    selectPlaceType: function(data) {
      this.editForm.new_placetypes_id = {
        id: data.id,
        name: data.name
      };
      this.areaClear();
    },

    addInsideMachine: function() {
      this.$refs.insideMachineDialog.show();
    },

    SaveData: function(isBack) {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          //条件判断
          // if (
          //   this.editForm.new_placetypes_id.id == null ||
          //   this.editForm.new_placetypes_id.id == undefined ||
          //   this.editForm.new_placetypes_id.id == ""
          // ) {
          //   rt.showErrorToast("请选择场所类型");
          //   return;
          // }
          // if (
          //   this.editForm.new_srv_workorder_id == null ||
          //   this.editForm.new_srv_workorder_id == undefined ||
          //   this.editForm.new_srv_workorder_id == ""
          // ) {
          //   rt.showErrorToast("请选择关联服务单");
          //   return;
          // }
          // if (
          //   this.editForm.new_functionalareas_id.id == null ||
          //   this.editForm.new_functionalareas_id.id == undefined ||
          //   this.editForm.new_functionalareas_id.id == ""
          // ) {
          //   rt.showErrorToast("请选择功能区域");
          //   return;
          // }
          if (
            this.editForm.new_usearea == null ||
            this.editForm.new_usearea == undefined ||
            this.editForm.new_usearea == "" ||
            this.editForm.new_usearea <= 0
          ) {
            rt.showErrorToast("请输入使用面积(大于0)");
            return;
          }
          // if (
          //   this.editForm.new_regionalidentity == null ||
          //   this.editForm.new_regionalidentity == undefined ||
          //   this.editForm.new_regionalidentity == ""
          // ) {
          //   rt.showErrorToast("请填写区域标识");
          //   return;
          // }
          var that = this;
          //新增保存
          if (!this.new_workorderfunctionalareasid) {
            that.editForm.new_ismeet = 2;
            let requestStr = "../api/VisitDesign/AddAreaInfo";
            let AreaInfoModel = {
              new_srv_workorder_id: this.editForm.new_srv_workorder_id.id,
              new_placetypes_id: this.editForm.new_placetypes_id.id,
              new_functionalareas_id: this.editForm.new_functionalareas_id.id,
              new_referenceurc: this.editForm.new_referenceurc,
              new_usearea: this.editForm.new_usearea,
              new_ismeet: this.editForm.new_ismeet,
              new_regionalidentity: this.editForm.new_regionalidentity,
              new_areafeatures: this.editForm.new_areafeatures
            };

            rt
              .post(requestStr, AreaInfoModel)
              .then(res => {
                debugger;
                rt.showSuccessToast("保存成功");
                if (isBack == 1) {
                  //返回
                  that.handleClose();
                } else {
                  that.new_workorderfunctionalareasid = res;
                  //that._fetchRecords();
                }
              })
              .catch(error => {
                rt.showErrorToast(error);
                that.loading = false;
              });
          } else {
            //修改保存
            let requestStr = "../api/VisitDesign/SaveAreaInfo";
            this.judgeIsMeet();
            let AreaInfoModel = {
              new_workorderfunctionalareasid: this
                .new_workorderfunctionalareasid, //主键
              new_srv_workorder_id: this.editForm.new_srv_workorder_id.id,
              new_placetypes_id: this.editForm.new_placetypes_id.id,
              new_functionalareas_id: this.editForm.new_functionalareas_id.id,
              new_referenceurc: this.editForm.new_referenceurc,
              new_usearea: this.editForm.new_usearea,
              new_ismeet: this.editForm.new_ismeet,
              new_regionalidentity: this.editForm.new_regionalidentity,
              new_areafeatures: this.editForm.new_areafeatures
            };

            rt
              .post(requestStr, AreaInfoModel)
              .then(res => {
                rt.showSuccessToast(res);

                if (isBack == 1) {
                  //返回
                  that.handleClose();
                } else {
                  //that._fetchRecords();
                }
              })
              .catch(error => {
                rt.showErrorToast(error.Data);
                that.loading = false;
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

    deleteData: function() {
      //删除请求
      var selection = this.$refs.insideinfoTable.selection;
      if (selection == null || selection.length == 0) {
        alert("请至少选择一条记录！");
        return;
      }
      this.$confirm("此操作将永久删除该记录,是否继续", "提示", {
        confirmButtonText: "确定",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].id);
          }
          var params = deleteList;
          var requestStr = "../api/VisitDesign/DeleteInsideInfo";
          rt
            .post(requestStr, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.reloadInsideInfo();
              this.loading = false;
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        })
        .catch(e => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
</style>
