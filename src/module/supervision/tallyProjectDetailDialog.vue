<template>
	<rt-section :title="title">
    <template slot="toolbar">
    </template>
		<el-table stripe ref="tableData" max-height="500" v-loading="loading" v-bind:data="tableData">
            <el-table-column prop="new_supervisionstageText" width="100" label="监理阶段">
            </el-table-column>
  			    <el-table-column prop="new_tallycode" width="100" label="点检编码">
            </el-table-column>
            <el-table-column prop="new_tallytypeText" width="100" label="点检类型">
            </el-table-column>
            <el-table-column prop="new_checkproject_idName" width="300" label="点检内容">
            </el-table-column>
            <el-table-column prop="new_tallymemo" width="300" label="点检情况描述">
            </el-table-column>
            <el-table-column prop="new_supervisiondate" width="200" label="监理日期">
            </el-table-column>
            <el-table-column prop="new_problemlevelText" width="100" label="问题等级">
            </el-table-column>
            <el-table-column prop="new_liabilityText" width="100" label="责任归属">
            </el-table-column>
            <el-table-column prop="new_rectification" width="100" label="整改情况">
            </el-table-column>
            <el-table-column prop="new_rectificationdate" width="200" label="整改日期">
            </el-table-column>
            <el-table-column prop="new_isletterText" width="100" label="是否出函">
            </el-table-column>
            <el-table-column prop="createdon" width="200" label="创建时间">
            </el-table-column>
	    </el-table>	
          <!-- <InvoicerecordCreateDialog :id="supervisionid" @resetLoadData="_fetchRecords" :visible.sync="needShowCreateDialog" v-if="needShowCreateDialog"></InvoicerecordCreateDialog> -->
	</rt-section>
</template>
<script>
// import InvoicerecordCreateDialog from "./InvoicerecordCreateDialog";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      needShowCreateDialog: false,
      time: "",
      title: ""
    };
  },
  components: {
    //   InvoicerecordCreateDialog
  },
  props: {
    supervisionid: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      require: true
    }
  },
  watch: {
    formDialog: function(val) {
      if (!this.formDialog) {
        this.$emit("reloadEdit");
      }
    }
  },
  mounted: function() {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function() {
      if (this.type == "1") this.title = "审图点检项目明细";
      else if (this.type == "2") this.title = "开工检查项目明细";
      else if (this.type == "3") this.title = "过程检查项目明细";

      var apiUrl =
        "../api/Supervision/GetTallyProjectDetail?id=" + this.supervisionid +"&type="+this.type;
      rt
        .get(apiUrl)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },

    isSelectedTable: function() {
      if (this.disabled == true) {
        return false;
      } else {
        return true;
      }
    },

  }
};
</script>
<style></style>