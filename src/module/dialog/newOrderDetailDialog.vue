<template>
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item :label="$t('InqueryCon')" :label-width="formLabelWidth">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
      </el-form-item>
      <el-table :data="dialogTableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect">
        <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" v-bind:current-page="currentPage" v-bind:page-sizes="[3, 5, 10, 20]" v-bind:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" v-bind:total="dataTotalCount">
        </el-pagination>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="lookupSelect">{{$t('BUTTON_DETERMINE')}}</el-button>
      <el-button @click="lookupCancel">{{$t('BUTTON_CANCEL')}}</el-button>
      <el-button @click="lookupSelectClear">{{$t('BUTTON_REMOVE')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data: function() {
    return {
      shipConfirmId: '',
      //lookup数据
      currentPage: 1,//当前页码
      pageSize: 10,//每页显示条数
      dataTotalCount: 0,//总数据条数
      lookupCondition: '',//搜索框筛选条件
      //lookup显示列
      lookupOptions: [{ label: this.$t('product.name'), name: 'name' }, { label: this.$t('product.price'), name: 'price.Value' }, { label: this.$t('product.productnumber'), name: 'productnumber' }],
      dialogFormVisible: false,//lookup显示与隐藏
      formLabelWidth: '80px',//Label默认宽度
      dialogTableData: [],
      currentRow: '',//当前选中行
      lookupBtn: true,//确定按钮是否可用
    }
  },
  props: {
    stocksiteid: ''
  },
  mounted: function() {
    if (this.stocksiteid) {
      this.handleclick()
    }
  },
  methods: {
    /*********************/
    /**配件名称lookUP方法**/
    /*********************/
    //lookup快速查询
    lookupsearch() {
      this.handleclick()
    },
    //lookup确定按钮
    lookupSelect() {
      this.lookupCondition = ''
      if (this.currentRow != '') {
        this.$emit('select-data', {
          productid: this.currentRow.productid,
          name: this.currentRow.name,
          productnumber: this.currentRow.productnumber,
          price: this.currentRow.price == null ? '' : this.currentRow.price.Value,
          defaultuomid: this.currentRow.defaultuomid,
          defaultuomidName: this.currentRow.defaultuomidName
        })
        //this.lookupCondition = this.currentRow.name
        this.dialogFormVisible = false;
      }
      else {
        rt.showErrorToast(this.$t('PleaseOneLine'))
      }
      this.currentRow = ''
      this.handleclick()
    },
    lookupCancel: function() {
      this.lookupCondition = ''
      this.currentRow = ''
      this.dialogFormVisible = false
      this.handleclick()
    },
    //lookup移除值
    lookupSelectClear() {
      this.lookupCondition = ''
      this.currentRow = ''
      this.dialogFormVisible = false;
      this.$emit('clear-data', [])
    },
    //lookup选中行改变
    selectRowChange(val) {
      this.lookupBtn = false
      this.currentRow = val;
    },
    //lookup的页码变更
    handleCurrentChange(val) {
      //页码改变
      this.currentPage = val;
      this.handleclick();
    },
    //lookup的页面尺寸变更
    handleSizeChange(val) {
      //每页尺寸改变
      this.pageSize = val;
      this.handleclick();
    },
    handleclick: function() {
      if (this.stocksiteid) {
        var that = this
        if (rt.isNullOrWhiteSpace(this.lookupCondition)) {
          this.lookupCondition = ''
        }
        that.dialogTableData = []
        // that.dataTotalCount = 0
        var params = {
          id: that.stocksiteid,
          pageIndex: that.currentPage,
          pageSize: that.pageSize,
        }
        if (that.lookupCondition) {
          params.name = that.lookupCondition;
        }
        var dataStr = 'api/SiteInvProduct/GetSiteInvProduct'
        rt.get(dataStr, params).then(function(res) {
          if (res === null) {
            return
          }
          that.dialogTableData = res.datalist
          that.dataTotalCount = res.totalCount
        }).catch(function(error) {
          rt.showErrorToast(error)
        })
      }
      else {
        rt.showErrorToast(this.$t('PleaseChooseStationWarehouse'))
      }
    },
    show: function() {
      this.dialogFormVisible = true
    }
  }
}
</script>

