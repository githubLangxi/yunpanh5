<template>
  <div>
    <rt-header :title="$t('PARTSTOCKTRANSACTION')">
      <rt-toolbar show-autoback>
      </rt-toolbar>
    </rt-header>
    <rt-content>
      <el-form ref="dataForm" :model="dataForm" label-width="120px" label-position="left">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_stocksite_id')">
              <el-input v-model="dataForm.new_stocksite_idName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_product_id')">
              <el-input v-model="dataForm.new_product_idName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_partcode')">
              <el-input v-model="dataForm.new_partcode" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_invtransdirection')">
              <el-input v-model="dataForm.new_invtransdirectionName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_qty')">
              <el-input v-model="dataForm.new_qty" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_uom_id')">
              <el-input v-model="dataForm.new_uom_idName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_fromno')">
              <el-input v-model="dataForm.new_fromno" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_part_stocktransaction.new_transactiontype')">
              <el-input v-model="dataForm.new_transactiontypeName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </rt-content>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dataForm: {
      },
    }
  },
  mounted: function () {
    this._fetchRecords();
  },
  methods: {
    _fetchRecords: function () {
      var formData = JSON.parse(this.$route.params.row)
      this.dataForm = formData
    }
  }
}
</script>
