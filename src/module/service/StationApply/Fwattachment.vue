<template>
  <rt-section id="area9" title="附件明细">
    <el-table ref="gridTable" :data="attachmentData" v-loading="loading">
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
      fileAutoSize: 3145728, //3M大小文件限制
      Isif: true
    };
  },
  props: {
    workOrder: Object,
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
      require: false
    }
  },
  mounted: function() {
    this.fetchRecords();
  },
  methods: {
    //加载附件明细
    fetchRecords: function() {
      if (this.workOrder.id) {
        this.loading = true;
        var requestStr =
          "../api/WorkOrder/Annotation/" + this.workOrder.id;
        rt.get(requestStr)
          .then(res => {
            if (
              this.workOrder.state != null &&
              (this.workOrder.state != "1" && this.workOrder.state != "4")
            ) {
              this.Isif = false;
            } else {
              this.Isif = true;
            }
            var attachmentList = res;
            var list = [];
            attachmentList.map(step => {
              let filelink =
                "data:" + step.mimetype + ";base64," + step.documentbody;
              let blob = this.base64Img2Blob(filelink);
              step.filelink = window.URL.createObjectURL(blob);
              step.blob = blob;
              list.push(step);
            });
            this.attachmentData = list;
            this.loading = false;
            this.$emit("isExitatt", this.attachmentData.length);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
    },
    //检查是否有同名文件
    checkSameName: function(val) {
      if (this.attachmentData.length == 0) {
        return false;
      } else {
        for (var i in this.attachmentData) {
          if (this.attachmentData[i].filename == val) {
            return true;
          }
        }
        return false;
      }
    },
    //下载附件
    downLoadFile: function(index, row) {
      let filelink = "data:" + row.mimetype + ";base64," + row.documentbody;
      row.blob = this.base64Img2Blob(filelink);
      row.filelink = window.URL.createObjectURL(row.blob);
      let userAgent = navigator.userAgent;
      if (userAgent.indexOf("Trident") > -1) {
        //用于IE浏览器
        window.navigator.msSaveBlob(row.blob, row.filename);
      }
    },
    base64Img2Blob: function(code) {
      var parts = code.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  }
};
</script>
