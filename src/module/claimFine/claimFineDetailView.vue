<template>
    <div>
        <rt-header v-bind:title="$t('new_srv_claimfine')">
            <rt-toolbar show-autoback>
            </rt-toolbar>
        </rt-header>
        <rt-content>
            <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_name')" required>
                            <el-input v-model="editForm.new_name" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_findate')" required>
                            <el-input v-model="editForm.new_findate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_finetype')" required>
                            <rt-picklist v-model="editForm.new_finetype" entity="new_srv_claimfine" attribute="new_finetype" disabled></rt-picklist>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_amount')">
                            <el-input v-model="editForm.new_amount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_checkitem')">
                            <el-input v-model="editForm.new_checkitem" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_approvalstatus')" required>
                            <rt-picklist v-model="editForm.new_approvalstatus" entity="new_srv_claimfine" attribute="new_approvalstatus" disabled></rt-picklist>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="24">
                        <el-form-item v-bind:label="$t('new_srv_claimfine.new_memo')">
                            <el-input v-model="editForm.new_memo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </rt-content>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      new_srv_claimfineid: "", //奖惩单id
      editForm: {
        id: "",
        new_name: "", //单号
        new_findate: "", //调整日期

        new_finetype: "", //调整类型
        new_amount: "", //调整金额
        new_checkitem: "", //调整事项

        new_approvalstatus: "", //审核状态
        new_memo: "" //备注
      }
    };
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      this.new_srv_claimfineid = this.$route.params.id;
      if (this.new_srv_claimfineid) {
        var requestStr =
          "../api/ClaimFine/GetClaimFineById/" + this.new_srv_claimfineid;
        rt
          .get(requestStr)
          .then(res => {
            this.editForm = res;
          })
          .catch(error => {
            rt.showErrorToast(error);
          });
      }
    }
  }
};
</script>
