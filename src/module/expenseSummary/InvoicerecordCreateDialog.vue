<template>
  <div class="partsReturn">
    <el-dialog title="发票登记单" :visible="visible" :before-close="beforeClose" size="large">
      <el-form :model="editForm" class="detail-form" label-position="left" label-width="80px">
        <el-row :gutter="50">
          <el-col :span="7">
            <el-form-item label="发票号码" >
              <el-input v-model="editForm.new_invoiceno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="发票类型">
								<rt-picklist entity="new_srv_invoicerecord" attribute="new_expensetype" v-model="editForm.new_expensetype"></rt-picklist>
            </el-form-item>
          </el-col>
          <el-col :span="7">
              <el-form-item label="开票日期">
                <el-date-picker v-model="editForm.new_invdate" type="date" :placeholder="$t('SelectDate')"></el-date-picker>
              </el-form-item>
            </el-col>
          <el-col :span="7">
            <el-form-item label="发票金额含税">
              <el-input v-model="editForm.new_amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="发票税金">
              <el-input v-model="editForm.new_invoice_tax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="save" :disabled="isconfirming">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_invoiceno" label="发票号码">
            </el-table-column>
  			    <el-table-column prop="new_expensetypetext" label="发票类型">
            </el-table-column>
            <el-table-column prop="new_invdateUTC" label="开票日期">
            </el-table-column>
            <el-table-column prop="new_amount" label="发票金额含税">
            </el-table-column>
            <el-table-column prop="new_amount_notax" label="发票金额不含税">
            </el-table-column>
            <el-table-column prop="new_invoice_tax" label="发票税金">
            </el-table-column>
            <el-table-column prop="new_recorddateUTC" label="登记日期">
            </el-table-column>
	    </el-table>	
      <div class="button">
        <el-button type="primary" @click="beforeClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      isconfirming: false,
      loading: false,
      editForm: {
        id: "",
        new_invoiceno: "", //发票号码 string
        new_expensetype: "", //发票类型 picklist
        new_invdate: "", //开票日期 datetime
        new_amount: "", //发票金额含税 decimal
        new_invoice_tax: "" //发票税金 decimal
      }
    };
  },
  props: {
    visible: {
      default: false
    },
    id: {
      type: String,
      require: true
    },
    time: {
      type: String,
      require: true
    }
  },
  watch: {
    time: function(val) {
      this.time = time;
    }
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    //关闭dialog
    beforeClose: function() {
      this.$emit("refreshparent");
      this.$emit("resetLoadData");
      this.$emit("update:visible", false);
    },

    //初始化数据
    initData: function() {
      var params = {
        id: this.id,
        time: this.time
      };
      var apiUrl = "../api/ExpenseSummary/GetRecentInvoicerecord";
      rt
        .get(apiUrl, params)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    save: function() {
      this.isconfirming = true;
      if (
        rt.isNullOrWhiteSpace(this.editForm.new_invoiceno) ||
        rt.isNullOrWhiteSpace(this.editForm.new_expensetype.toString()) ||
        rt.isNullOrWhiteSpace(this.editForm.new_invdate.toString())
      ) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请检查必填项：发票号码，发票类型，开票日期！"
        });
        this.isconfirming = false;
        return;
      }

      if (
        !rt.isNumeric(this.editForm.new_amount) ||
        !rt.isNumeric(this.editForm.new_invoice_tax)
      ) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请输入数字"
        });
        this.isconfirming = false;
        return;
      }
      if (
        Number(this.editForm.new_amount) <=
        Number(this.editForm.new_invoice_tax)
      ) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "发票金额应大于发票税金，请重新输入"
        });
        this.editForm.new_amount = "";
        this.editForm.new_invoice_tax = "";
        this.isconfirming = false;
        return;
      }
      var apiUrl = "../api/ExpenseSummary/AddInvoicerecord";
      this.editForm.new_invdateUTC = rt.formatDateTime(
        this.editForm.new_invdate,
        "yyyy-mm-dd"
      );
      this.editForm.new_invdate = "";
      this.editForm.id = this.id;
      var params = this.editForm;
      rt
        .post(apiUrl, params)
        .then(res => {
          rt.showSuccessToast(res);
          this.initData();
          this.editForm.new_invoiceno = ""; //发票号码 string
          this.editForm.new_expensetype = ""; //发票类型 picklist
          this.editForm.new_invdate = ""; //开票日期 datetime
          this.editForm.new_amount = ""; //发票金额含税 decimal
          this.editForm.new_invoice_tax = ""; //发票税金 decimal
        })
        .catch(error => {
          rt.showErrorToast(error);
        });

      this.isconfirming = false;
    }
  }
};
</script>
<style>
.partsReturn .button {
  margin: 20px 0;
  float: right;
}
</style>
