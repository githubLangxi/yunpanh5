<template>
  <el-dialog :title="$t('Inquery')" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item :label="$t('InqueryCon')" :label-width="formLabelWidth">
        <el-input v-model="lookupCondition" auto-complete="off" icon="search" :on-icon-click="lookupsearch"></el-input>
      </el-form-item>
      <el-table :data="dialogtableData" style="width: 100%" max-height="500" highlight-current-row @current-change="selectRowChange" @row-dblclick="lookupSelect">
        <el-table-column v-for="item in lookupOptions" :key="item.label" :prop="item.name" :label="item.label" show-overflow-tooltip>
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
      //lookup数据
      currentPage: 1,//当前页码
      pageSize: 10,//每页显示条数
      dataTotalCount: 0,//总数据条数
      lookupCondition: '',//搜索框筛选条件
      quickSearch: 'name',//默认筛选条件
      entityName: 'product',//
      attributeList: 'name,price,productnumber',//
      filterList: 'statuscode=1',//后台需要的筛选条件
      //lookup显示列
      lookupOptions: [{ label: this.$t('product.name'), name: 'name' }, { label: this.$t('product.price'), name: 'price' }, { label: this.$t('product.productnumber'), name: 'productnumber' },{ label: this.$t('product.new_desc'), name: 'new_desc' }],
      dialogFormVisible: false,//lookup显示与隐藏
      formLabelWidth: '80px',//Label默认宽度
      dialogtableData: [],//lookup数据源
      currentRow: '',//当前选中行
      lookupBtn: true,//确定按钮是否可用
    }
  },
  props: {},
  mounted: function() {
    this.handleclick('new_product_id')
  },
  methods: {
    /*********************/
    /**配件名称lookUP方法**/
    /*********************/
    //lookup快速查询
    lookupsearch() {
      this.handleclick();
    },
    //lookup确定按钮
    lookupSelect() {
      this.lookupCondition = ''
      if (this.currentRow != '' && this.currentRow != null) {
        this.$emit('select-data', [
          this.currentRow.new_id,
          this.currentRow.name,
          this.currentRow.productnumber,
          this.currentRow.price,
          this.currentRow.new_desc
        ])
        this.dialogFormVisible = false;
      }
      else {
        rt.showErrorToast(this.$t('PleaseChooseAtLeastOne'))
      }
      this.handleclick();
    },
    lookupCancel() {
      this.lookupCondition = ''
      this.dialogFormVisible = false
      this.handleclick();
    },
    //lookup移除值
    lookupSelectClear() {
      this.lookupCondition = ''
      this.dialogFormVisible = false;
      this.$emit('clear-data', [])
      this.handleclick();
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
    //处理lookup逻辑
    handleclick: function(ev) {
      if (this.disabledform) {
        return;
      }
      this.lookupid = ev;
      this.lookupidname = ev + 'name';
      this.dialogtableData = [];
      var params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      }
      var lookupQueryStr = '/api/SiteInvProduct/GetAllProduct';
      if (this.lookupCondition) {
        params.name = this.lookupCondition;
      }
      let that = this;
      rt.get(lookupQueryStr, params).then(function(res) {
        var data = res;
        that.dataTotalCount = data.totalCount;

        for (var i in data.datalist) {
          var e = data.datalist[i]
          var obj = {};
          obj.checked = false; //声明标志位，表示该列是否被选中，默认为false
          obj.new_id = e.productid
          obj.name = e.name
          obj.productnumber = e.productnumber
          obj.new_desc = e.new_desc
          if (e.price != null) {
            obj.price = e.price.Value
          } else {
            obj.price = null
          }
          that.dialogtableData.push(obj);//将obj添加到数据集
        }
      })
        .catch((error) => {
          rt.showErrorToast(error);
        });
      return;
    },
    show: function() {
      this.dialogFormVisible = true
    }
  },
}
</script>

