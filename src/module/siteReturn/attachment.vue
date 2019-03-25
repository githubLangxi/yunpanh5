<template>
  <rt-section id="area9" title="附件明细">
    <template slot="toolbar">
      <input type="file" value="请点击上传附件" @change="onFileChange" style="display:none" ref="upload" />
      <rt-button text="上传" type="add" @click="uploadFile" />
      <rt-button type="delete" @click="deleteData" />
    </template>
    <el-table ref="gridTable" :data="attachmentData" v-loading="loading">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="文件名" prop="filename" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="文件大小" prop="filesize">
      </el-table-column>
      <el-table-column label="类型" prop="subject" v-if="showDetail">
      </el-table-column>
      <el-table-column label="说明" prop="nodetext" v-if="showDetail">
      </el-table-column>
      <el-table-column label="创建时间" prop="createdon">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a :href="scope.row.filelink" :download="scope.row.filename" @click="downLoadFile(scope.$index,scope.row)">下载</a>
        </template>
      </el-table-column>
    </el-table>
  </rt-section>
</template>

<script>
export default {
  name: "attachment",
  data: function() {
    return {
      loading: false,
      dialogVisible: false,
      attachmentData: [],
      fileAutoSize: 3145728	//3M大小文件限制
    }
  },
  props: {
    sitereturnId: {
      type: String,
      require: true
    },
    showDetail: {
      type: Boolean,
      require: true
    },
    subject: {
      type: String,
      require: false
    },
    noteText: {
      type: String,
      require:false
    }
  },
  mounted: function() {
    this.fetchRecords();
  },
  methods: {
    //加载附件明细
    fetchRecords: function() {
      if (this.sitereturnId) {
        this.loading = true;
        var requestStr = '../api/WorkOrder/Annotation/' + this.sitereturnId;
        rt.get(requestStr).then((res) => {
          var attachmentList = res;
          var list = [];
          attachmentList.map((step) => {
            let filelink = 'data:' + step.mimetype + ";base64," + step.documentbody;
            let blob = this.base64Img2Blob(filelink)
            step.filelink = window.URL.createObjectURL(blob);
            step.blob = blob
            list.push(step)
          })
          this.attachmentData = list;
          this.loading = false;
          this.$emit('isExitatt', this.attachmentData.length);

        }).catch((error) => {
          rt.showErrorToast(error);
          this.loading = false;
        });
      }
    },
    //input输入框发生变化时触发该事件
    onFileChange: function() {
      var _this=this;
      var id = _this.sitereturnId;
      var files = _this.$refs.upload.files;
      var reader = new FileReader();
      var file = files[0];
      var ifSame = _this.checkSameName(file.name);
       if (ifSame) {
        _this.$message({
          type: 'warning',
          message: '存在同名文件,请勿重复上传'
        })
      }
      else
      {
        reader.readAsDataURL(file);
        reader.onload = function(f) {
          //大小限制
          if (file.size >= _this.fileAutoSize) {
            _this.$message({
              type: 'warning',
              message: '附件请控制在3M以内'
            })
          }
          else {
            var annotation = {};
            annotation["name"] = file.name;
            annotation["type"] = file.type;
            if (f.target.result !== "data:") {
              annotation["documentbody"] = f.target.result.substring(f.target.result.indexOf(",") + 1);
            }
            if (_this.showDetail) {
              annotation["subject"] = _this.subject
              annotation["nodetext"] = _this.noteText
            }
            annotation["id"] = id;
            annotation["entityname"] = "new_srv_sitereturn";
            var requestStr = '../api/WorkOrder/AddAnnotationToWorkOrder'
            rt.post(requestStr, annotation).then((res) => {
              rt.showSuccessToast("上传成功");
              _this.fetchRecords();
            }).catch((error) => {
              rt.showErrorToast(error);
            })
          }
        }
      }

    },
    //检查是否有同名文件
    checkSameName: function(val) {
        if (this.attachmentData.length == 0) {
        return false;
      }
      else {
        for (var i in this.attachmentData) {
          if (this.attachmentData[i].filename == val) {
            return true;
          }
        }
        return false;
      }
    },
    //上传附件
    uploadFile: function() {
     if (rt.isNullOrWhiteSpace(this.sitereturnId)) {
         this.$message({
          type: "warning",
          message: "请先保存主档"
        })
        return;
      }
      this.$refs.upload.click();
    },
    //删除附件
    deleteData: function() {
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一条记录'
        });
      }
      else {
        this.$confirm('此操作将永久删除该记录,是否继续', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'ConfirmButtonClass',
          cancelButtonText: '取消',
          cancelButtonClass: 'CancelButtonClass',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          var deleteList = [];
          for (var i in selection) {
            deleteList.push(selection[i].id);
          }
          var params = deleteList;
          var requestStr = '../api/WorkOrder/DeleteAnnotation';
          rt.post(requestStr, params).then((res) => {
            rt.showSuccessToast("删除成功");
            this.fetchRecords();
          }).catch((error) => {
            rt.showErrorToast(error);
          })
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });

        })
      }
    },
    //下载附件
    downLoadFile: function(index, row) {
      let filelink = 'data:' + row.mimetype + ";base64," + row.documentbody;
          row.blob = this.base64Img2Blob(filelink)
          row.filelink = window.URL.createObjectURL(row.blob);
          let userAgent = navigator.userAgent;
          if (userAgent.indexOf("Trident") > -1) {
            //用于IE浏览器
            window.navigator.msSaveBlob(row.blob, row.filename);
          }
    },
    base64Img2Blob: function(code) {
      var parts = code.split(';base64,');
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;

      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  }
}
</script>
