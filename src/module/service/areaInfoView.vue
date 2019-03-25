<template>
  <div>
    <rt-header :title="$t('new_srv_workorder')">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save" text="保存" @click="SaveData('editForm')" />
        <rt-button type="save" text="保存并关闭" @click="SaveData('1')" />
      </rt-toolbar>
    </rt-header>

    <rt-content>
      <!--侧边栏-->
      <rt-nav slot="side" ref="_rt_nav">
        <rt-nav-item href="#area1">基本信息</rt-nav-item>
      </rt-nav>

      <el-form ref="areaInfo7" label-width="120px" label-position="left">
        <rt-section id="area1" title="区域信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <!-- {{areaInfo.new_srv_workorder_id}} -->
              <el-form-item label="关联服务单" prop="new_srv_workorder_id">
                <rt-lookup v-model="areaInfo.new_srv_workorder_id" :disabled="true" :rt-disabled="false" entity="new_srv_workorder" dialog-filter-fields="new_name"
                />

              </el-form-item>
            </el-col>
            <!-- {{areaInfo.new_placetypes_id}} -->
            <el-col :span="8">
              <el-form-item label="场所类型" prop="new_placetypes_id">
                <rt-lookup v-model="areaInfo.new_placetypes_id" :disabled="false" :rt-disabled="false" entity="new_placetypes" dialog-filter-fields="new_name"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item label="功能区域" prop="new_functionalareas_id">
                <rt-lookup v-model="areaInfo.new_functionalareas_id" :disabled="false" :rt-disabled="false" entity="new_functionalareas"
                  dialog-filter-fields="new_name" />
              </el-form-item> -->
              <!-- {{areaInfo.new_functionalareas_id}} -->
              <el-form-item label="功能区域" prop="new_functionalareas_id">
                <el-input readonly icon="search" v-model="areaInfo.new_functionalareas_id.name" :on-icon-click="showArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div style="display:none;">ddd{{this.test}}ddd</div>

          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="参考单位制冷量KW" prop="new_referenceurc">
                <el-input :disabled="true" v-model="areaInfo.new_referenceurc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用面积m²" prop="new_usearea">
                <el-input v-model="areaInfo.new_usearea"></el-input>
              </el-form-item>
            </el-col>
            <!-- {{this.areaInfo.new_ismeet}} -->
            <el-col :span="8">
              <el-form-item label="匹配是否满足" prop="new_ismeet">
                <el-select v-model="areaInfo.new_ismeet" :disabled="true" placeholder="请选择">
                  <el-option :key="1" :label='option.opt1' :value="1">
                  </el-option>
                  <el-option :key="2" :label='option.opt2' :value="2">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="区域标识" prop="new_regionalidentity">
                <el-input v-model="areaInfo.new_regionalidentity"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="功能区域特征" prop="new_areafeatures">
                <el-select v-model="areaInfo.new_areafeatures" clearable>
                  <el-option v-for="item in this.areaOption" :key="item.Value" :label="item.Text" :value="item.Value">{{item.Text}}</el-option>
                </el-select>

                <!-- {{test1}} -->
                <!-- <rt-picklist v-model="test1" entity="new_workorderfunctionalareas" attribute="new_areafeatures"></rt-picklist> -->

              </el-form-item>
            </el-col>

          </el-row>
        </rt-section>

        <rt-section id="area1" title="内机信息">
          <template slot="toolbar" v-if="this.isAdd!=1">
            <rt-button type="add" text="新增" @click="addInsideMachine()" />
            <rt-button type="delete" text="删除" @click="deleteInsideInfo()" />
          </template>
          <el-table ref="insideinfoTable" :data="insideInfo" row-key="id" stripe v-loading="false">
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
      <insideMachineDialog ref="insideMachineDialog" @insideMachineSelect="insideMachineSelect" v-bind:isInside="a" :title="wtitle"></insideMachineDialog>
      <areaFunctionDialog ref="areaFunctionDialog" @areaClear="areaClear" @lookupSelect="areaSelect" v-bind:id="areaInfo.new_placetypes_id.id"></areaFunctionDialog>
    </rt-content>

  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        areaInfo: {
          new_areafeatures: 9, //功能区域特征
          new_ismeet: 2,
          new_functionalareas_id: {}, //功能区域id
          new_placetypes_id: "", //场所类型
          new_referenceurc: "", //参考制冷量
          new_srv_workorder_id: {}
        },
        test1: parseInt(4),
        test: "",
        areaOption: [{
            Text: "西晒",
            Value: 1
          },
          {
            Text: "东首",
            Value: 2
          },
          {
            Text: "落地窗",
            Value: 3
          },
          {
            Text: "顶层",
            Value: 4
          }, {
            Text: "无",
            Value: 9
          }
        ],
        isAdd: "",
        option: {
          "opt1": "是",
          "opt2": "否"
        },
        new_srv_workorderid: "", //主档id
        new_areainfo_id: "", //区域信息id
        a: true,
        wtitle: "内机条码",
        insideInfo: [] //内机信息
      };
    },
    components: {
      insideMachineDialog: resolve => {
        require(['./insideMachineDialog.vue'], resolve)
      },
      areaFunctionDialog: resolve => {
        require(['./areaFunctionDialog.vue'], resolve)
      }
    },
    mounted: function () {
      this.init();
    },

    created: function () {

    },

    watch: {
      "areaInfo.new_placetypes_id.id": {
        handler: function (n, o) {
          if (o != "") {
            this.areaInfo.new_functionalareas_id.id = "";
            this.areaInfo.new_functionalareas_id.name = "";
          }
        }
        // immediate: true
      },
      "areaInfo.new_functionalareas_id.id": function (newValue, oldValue) {
        //获取功能区域
        var requestStr = "../api/VisitDesign/getAreaCapicity?id=" + newValue;
        rt
          .get(requestStr)
          .then(res => {
            if (this.areaInfo.new_areafeatures != "" && this.areaInfo.new_areafeatures != 9) {
              this.areaInfo.new_referenceurc = res * 1.2;
            } else {
              this.areaInfo.new_referenceurc = res;
            }

            this.test = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      },
      "areaInfo.new_areafeatures": function (newValue, oldValue) {
        if ((oldValue == "" || oldValue == 9 || oldValue == undefined) && (newValue != "" && newValue != 9 &&
            newValue != undefined)) {
          this.areaInfo.new_referenceurc = this.areaInfo.new_referenceurc * 1.2;
        }
        if ((oldValue != "" && oldValue != 9 && oldValue != undefined) && (newValue == "" || newValue == 9 ||
            newValue == undefined)) {
          this.areaInfo.new_referenceurc = this.areaInfo.new_referenceurc / 1.2;
        }

      }
    },
    methods: {
      init: function () {
        this.isAdd = this.$route.params.id == 1 ? 1 : 2;
        //编辑（！=1）
        if (this.$route.params.id != "1" && this.$route.params.id != null & this.$route.params.id != "") {
          //获取功能区域
          var requestStr = "../api/VisitDesign/AreaInfoById?id=" + this.$route.params.id;
          rt
            .get(requestStr)
            .then(res => {
              //数据加工areaInfo.new_srv_workorder_id
              this.areaInfo = {
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
              this.judgeIsMeet();
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });


          //获取内机信息(by功能区域)
          var requestStr = "../api/VisitDesign/GetInsideInfo?pageSize=20&pageIndex=1&pageCookie=&queryValue=" +
            this.$route
            .params.id + "&new_srv_workorder_id=" + this.$route.params.preid;
          rt
            .get(requestStr)
            .then(res => {
              // this.areaInfo = res;
              //数据加工areaInfo.new_srv_workorder_id
              if (res.InsideMachineInfoList != null) {
                this.insideInfo = res.InsideMachineInfoList;
              } else {
                this.insideInfo = [];
              }
              this.judgeIsMeet();
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        }
        //新增
        else {
          // 初始化关联服务单
          var requestStr = "../api/VisitDesign/getOrderName?id=" + this.$route.params.preid;
          rt
            .get(requestStr)
            .then(res => {
              // alert(res);
              // this.areaInfo.new_srv_workorder_id.id = this.$route.params.preid;
              // this.areaInfo.new_srv_workorder_id.name = res;

              this.areaInfo.new_srv_workorder_id = {
                id: this.$route.params.preid,
                name: res
              };
              this.areaInfo.new_ismeet = 2;
              this.areaInfo.new_areafeatures = 9;
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        }
      },
      //返回按钮之前提示保存服务单数据
      beforeGoBack: function () {
        if (rt.isNullOrWhiteSpace(this.new_srv_workorderid)) {
          this.$confirm(this.$t("NewOrderNotSaveSureQuit"), this.$t("Tip"), {
              confirmButtonText: this.$t("BUTTON_DETERMINE"),
              confirmButtonClass: "ConfirmButtonClass",
              cancelButtonText: this.$t("BUTTON_CANCEL"),
              cancelButtonClass: "CancelButtonClass",
              type: "warning"
            })
            .then(() => {
              this.$router.push({
                name: "orderedit",
                params: {
                  id: this.$route.params.preid
                }
              });

            })
            .catch(() => {});
        } else {
          // this.$router.push({
          //   name: "workorder",
          //   params: {
          //     id: this.$route.params.preid
          //   }
          // });
        }
      },
      addInsideMachine: function () {
        this.$refs.insideMachineDialog.init();
        this.$refs.insideMachineDialog.show();
      },
      judgeIsMeet: function () {
        //判断所选的内机和区域信息是否满足
        var sum_referenceurc = 0;
        // debugger;
        if (this.insideInfo.length > 0) {
          this.insideInfo.forEach((k) => {
            let sum = 0.0;
            sum = parseFloat(k.new_insideqty) * parseFloat(k.new_RefrigeratingCapacity);
            sum_referenceurc += sum;
          });
        }
        var rate = sum_referenceurc / parseFloat(this.areaInfo.new_usearea * 1.0);

        if (rate < this.areaInfo.new_referenceurc) {
          // rt.showErrorToast("所选内机单位制冷量小于参考值");
          this.areaInfo.new_ismeet = 2;
        } else {
          this.areaInfo.new_ismeet = 1;
        }
      },
      //选完内机后调用
      insideMachineSelect: function (form) {
        let requestStr = "../api/VisitDesign/AddInsideInfo?areaInfoId=" + this.$route.params.id;

        let AreaInfoModel = {
          new_product_id: form.productid,
          new_refrigeratingcapacity: form.new_refrigeratingcapacity,
          new_insideqty: form.new_insideqty
        }
        rt
          .post(requestStr, AreaInfoModel)
          .then(res => {

            rt.showSuccessToast(res);
            this.init();
          })
          .catch(error => {

            rt.showErrorToast(error.Data);
            this.loading = false;
          });
      },
      areaClear: function () {
        this.areaInfo.new_functionalareas_id.id = "";
        this.areaInfo.new_functionalareas_id.name = "";
      },
      //选完区域完调用
      areaSelect: function (form) {
        console.log(form);
        this.areaInfo.new_functionalareas_id = {
          id: form.id,
          name: form.name
        };
        // this.areaInfo.new_functionalareas_id.name = form.name;
      },
      SaveData: function (isBack) {
        //条件判断
        if (this.areaInfo.new_placetypes_id == null || this.areaInfo.new_placetypes_id == undefined || this.areaInfo
          .new_placetypes_id ==
          "") {
          rt.showErrorToast("请选择场所类型");
          return;
        }
        if (this.areaInfo.new_srv_workorder_id == null || this.areaInfo.new_srv_workorder_id == undefined || this.areaInfo
          .new_srv_workorder_id ==
          "") {
          rt.showErrorToast("请选择关联服务单");
          return;
        }
        if (this.areaInfo.new_functionalareas_id == null || this.areaInfo.new_functionalareas_id == undefined ||
          this
          .areaInfo.new_functionalareas_id ==
          "") {
          rt.showErrorToast("请选择功能区域");
          return;
        }
        if (this.areaInfo.new_usearea == null || this.areaInfo.new_usearea == undefined || this.areaInfo.new_usearea ==
          "" || this.areaInfo.new_usearea <= 0) {
          rt.showErrorToast("请输入使用面积(大于0)");
          return;
        }

        //新增保存
        if (this.$route.params.id == "1") {
          let requestStr = "../api/VisitDesign/AddAreaInfo";

          let AreaInfoModel = {
            new_srv_workorder_id: this.areaInfo.new_srv_workorder_id.id,
            new_placetypes_id: this.areaInfo.new_placetypes_id.id,
            new_functionalareas_id: this.areaInfo.new_functionalareas_id.id,
            new_referenceurc: this.areaInfo.new_referenceurc,
            new_usearea: this.areaInfo.new_usearea,
            new_ismeet: this.areaInfo.new_ismeet,
            new_regionalidentity: this.areaInfo.new_regionalidentity,
            new_areafeatures: this.areaInfo.new_areafeatures
          };

          rt
            .post(requestStr, AreaInfoModel)
            .then(res => {
              rt.showSuccessToast("保存成功");
              this.isAdd = 2;
              this.$router.push({
                name: "areainfocreate",
                params: {
                  id: res
                }
              });
            })
            .catch(error => {
              rt.showErrorToast(error);
              this.loading = false;
            });
        }
        //修改保存
        else {
          let requestStr = "../api/VisitDesign/SaveAreaInfo";

          let AreaInfoModel = {
            new_workorderfunctionalareasid: this.$route.params.id, //主键
            new_srv_workorder_id: this.areaInfo.new_srv_workorder_id.id,
            new_placetypes_id: this.areaInfo.new_placetypes_id.id,
            new_functionalareas_id: this.areaInfo.new_functionalareas_id.id,
            new_referenceurc: this.areaInfo.new_referenceurc,
            new_usearea: this.areaInfo.new_usearea,
            new_ismeet: this.areaInfo.new_ismeet,
            new_regionalidentity: this.areaInfo.new_regionalidentity,
            new_areafeatures: this.areaInfo.new_areafeatures
          };

          rt
            .post(requestStr, AreaInfoModel)
            .then(res => {

              rt.showSuccessToast(res);

              if (isBack == 1) {
                //返回
                this.$router.push({
                  name: "orderedit",
                  params: {
                    id: this.$route.params.preid
                  }
                });
              } else {
                this.init();
              }

            })
            .catch(error => {
              rt.showErrorToast(error.Data);
              this.loading = false;
            });
        }



      },
      gotoAddPage: function () {},
      deleteInsideInfo: function () {
        var selection = this.$refs.insideinfoTable.store.states.selection;
        var list_id = [];
        selection.forEach(e => {
          list_id.push(e.id);
        });
        //删除内机信息
        var requestStr1 = "../api/VisitDesign/DeleteInsideInfo";
        rt
          .post(requestStr1, list_id)
          .then(res => {
            this.init();
            rt.showSuccessToast(res);
          })
          .catch(error => {
            rt.showErrorToast(error.Data);
          });
      },
      showArea: function () {
        // if (this.disableForm) {
        //   return;
        // }
        console.log("输出对象");
        console.log(this.$refs.areaFunctionDialog);
        this.$refs.areaFunctionDialog.show();
      },
    }
  };

</script>
<style>


</style>
