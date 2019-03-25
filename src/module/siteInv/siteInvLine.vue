<template>
  <div>
    <rt-header :title="$t('new_srv_siteinv')">
      <rt-toolbar show-autoback>
      </rt-toolbar>
    </rt-header>
    <rt-content>
      <el-form ref="dataForm" :model="dataForm" label-width="120px" label-position="left">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_stocksite_id')" >
              <el-input v-model="dataForm.new_stocksite_idName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_stockcode')" >
              <el-input v-model="dataForm.new_stockcode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_product_id')">
              <el-input v-model="dataForm.new_product_idName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_productcode')">
              <el-input v-model="dataForm.new_productcode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_qty')">
              <el-input v-model="dataForm.new_qty" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('new_srv_siteinv.new_uom_id')">
              <el-input v-model="dataForm.new_uom_idName" disabled></el-input>
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
