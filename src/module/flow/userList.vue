<template>
  <div class="tableData">
<rt-content>
    <rt-section title="用户">
      <template slot="toolbar">
        <rt-button id="add" type="add" @click="addUser" v-if="!disabled" />
        <rt-button id="delete" type="delete" @click="deleteUser" v-if="!disabled" />
      </template>
      <el-table ref="tableData" v-bind:data="tableData" align="center" style="width: 100%" v-loading="loading" :default-sort="{prop: 'PublishDate', order: 'descending'}">
        <el-table-column type="selection" width="90" :selectable="isSelectedTable" aligin="center">
        </el-table-column>
        <el-table-column prop="fullname" sortable label="全名" width="140" align="center">
        </el-table-column>
        <el-table-column prop="domainname" label="用户名" width="180" align="center">
        </el-table-column>
        <el-table-column prop="businessunitid" label="业务部门" width="200" align="center">
        </el-table-column>
        <el-table-column prop="parentsystemuserid" label="经理" width="150" align="center">
        </el-table-column>
        <el-table-column prop="address1_telephone1" label="主要电话" width="200" align="center">
        </el-table-column>
        <el-table-column prop="internalemailaddress" label="主要电子邮件" width="280" align="center">
        </el-table-column>
        <el-table-column prop="new_proofer" label="签核主管" width="220" align="center">
        </el-table-column>
      </el-table>
    </rt-section>
</rt-content>
    <formDialog ref="formDialog" @a="getRecords"></formDialog>

  </div>
</template>

<script type="text/javascript">
import formDialog from "./formDialog";
export default {
  data() {
    return {
      disabled: false,
      formDialog: false,
      dialogDeleteFormVisible: false,
      loading: true,
      new_flowroleid: "",
      tableData: [],
      userData: [],
      systemuserid: [],
      selection: [],
      isneedCookie: false,
      dataTotalCount: 0,
      searchtype: 1
    };
  },
  watch: {},
  components: { formDialog },
  mounted: function() {
    if (this.$route.params.id) {
      this.new_flowroleid = this.$route.params.id;
    }
    this.getRecords();
  },
  computed: {},
  methods: {
    addUser: function() {
      this.$refs.formDialog.show();
    },

    //查询签核角色用户
    getRecords() {
      this.loading = true;
      let apiUrl =
        "../api/PortalFlowRole/GetFlowRoleMemberList?new_flowroleid=" +
        this.new_flowroleid;
      this.isneedCookie = false;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.tableData = res.flowRoleList;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },
    //获取全部系统用户
    getUserList() {
      this.loading = true;
      let apiUrl = "../api/PortalFlowRole/GetUserList";
      this.isneedCookie = false;
      let that = this;
      rt
        .get(apiUrl)
        .then(res => {
          that.userData = res.flowRoleList;
          that.loading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.loading = false;
        });
    },
    //删除签核角色用户
    deleteUser: function() {
      var selection = this.$refs.tableData.store.states.selection;
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(this.$t("PleaseChooseAtLeastOne"));
        return;
      } else {
        // this.loading = true

        var systemuserid = [];
        for (var i in selection) {
          systemuserid.push(selection[i].systemuserid);
        }
      }
      this.$confirm("是否要删除", "警告", {
        confirmButtonText: "确认",
        confirmButtonClass: "ConfirmButtonClass",
        cancelButtonText: "取消",
        cancelButtonClass: "CancelButtonClass",
        type: "warning"
      })
        .then(() => {
          var params = systemuserid;
          let DelUrl =
            "../api/PortalFlowRole/DeleteFlowRoleMember?new_flowroleid=" +
            this.new_flowroleid;

          let that = this;
          rt
            .post(DelUrl, params)
            .then(res => {
              rt.showSuccessToast(res);
              this.dialogDeleteFormVisible = false;
              this.getRecords();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },

    isSelectedTable: function() {
      if (this.disabled == true) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>




