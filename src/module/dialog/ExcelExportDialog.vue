<template>
  <!--文件下载弹出框-->
  <el-dialog :title="$t('ExcelExport')" :visible.sync="dialogFormVisible" width="30%">
    <el-form>
      <el-form-item :label="$t('FileName')" label-width="70px" >
        <el-input v-model="FileName" auto-complete="off" @keyup.enter.native="DownLoadActive"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="DownLoadActive" type="primary" :loading="buttonLoading"  :disabled="buttonDisabled">{{$t('DownLoad')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "FileDownLoad",
  data: function() {
    return {
      loading: false,
      dialogFormVisible: false,
      buttonDisabled: false,
      buttonLoading: false,
      postData: {
        ExportModuleId: "",
        ViewId: "",
        QuickSearch: "",
        SearchList: [],
        HeaderMap: {},
        FileName: ""
      },
      FileName: "" //自定义文件名
    };
  },
  methods: {
    //ExportModuleId:自定义导出数据策略名
    //ViewId:目标实体名
    //QuickSearch:快速查找，默认实体主属性
    //SearchList:搜索条件集合
    //HeaderMap:Excel头集合
    show: function(ExportModuleId, ViewId, QuickSearch, SearchList, HeaderMap) {
      this.dialogFormVisible = true;

      this.postData = {
        ExportModuleId: ExportModuleId == undefined ? "" : ExportModuleId,
        ViewId: ViewId,
        QuickSearch: QuickSearch == undefined ? "" : QuickSearch,
        SearchList: SearchList == undefined ? [] : SearchList,
        HeaderMap: HeaderMap
      };
    },
    DownLoadActive: function() {
      if (rt.isNullOrWhiteSpace(this.postData.ViewId)) {
        rt.showErrorToast("未提供目标记录表信息");
        return;
      }
      if (
        this.postData.HeaderMap == undefined ||
        this.postData.HeaderMap.length == 0
      ) {
        rt.showErrorToast("未提供导出的Excel表头");
        return;
      }
      if (rt.isNullOrWhiteSpace(this.FileName)) {
        rt.showErrorToast("请提供需要下载的文件名");
        return;
      }
      this.postData.FileName = this.FileName;
      this.buttonDisabled = true;
      this.buttonLoading = true;
      var that = this;
      rt
        .post("../api/ExcelExport/ExportViewData", this.postData)
        .then(res => {
          //请求后自动执行下载
          var data = {
            fileId: res,
            moduleType: "ExcelExport",
            objectId: ""
          };
          var baseurl =
            rt.getBaseUrl() +
            "api/filehandlers/download?moduleType=ExcelExport&objectId=&fileId=" +
            res;

          window.open(
            baseurl,
            "_self",
            "toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no",
            true
          );
          that.buttonDisabled = false;
          that.buttonLoading = false;
        })
        .catch(error => {
          rt.showErrorToast(error);
          that.buttonDisabled = false;
          that.buttonLoading = false;
        });
    }
  }
};
</script>
