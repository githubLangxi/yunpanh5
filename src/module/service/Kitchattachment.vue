<template>
  <div>
    <rt-section id="areacdzs  " :title="tiltetex">
      <template slot="toolbar">
        <input type="file" value="请点击上传附件" @change="onFileChange" style="display:none" ref="upload" />
        <rt-button :text="$t('BUTTON_UPLOAD')" type="add" @click="uploadFile" />
        <rt-button type="delete" @click="deleteData" />
      </template>
      <el-table ref="gridTable" :data="attachmentData" v-loading="loading">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column :label="$t('annotation.filename')" prop="filename" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$t('annotation.filesize')" prop="filesize">
        </el-table-column>
        <el-table-column :label="$t('annotation.subject')" prop="subject" v-if="showDetail">
        </el-table-column>
        <el-table-column :label="$t('annotation.nodetext')" prop="nodetext" v-if="showDetail">
        </el-table-column>
        <el-table-column :label="$t('annotation.createdon')" prop="createdon">
        </el-table-column>
         
       
        <el-table-column label="预览">
          <template slot-scope="scope">
            <a v-show="isNotIE" :href="scope.row.filelink" target="_blank" @click="downLoadFile(scope.$index,scope.row)">预览</a>
            <a v-show="isIE" href="#" @click="downLoadOrOpenFile(scope.$index,scope.row)">预览</a>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ACT')">
          <template slot-scope="scope">
            <a :href="scope.row.filelink" :download="scope.row.filename" @click="downLoadFile(scope.$index,scope.row)">下载</a>
          </template>
        </el-table-column>
      </el-table>
    </rt-section>
  </div>
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
      isIE: false,
      isNotIE: true,
      isLoad: false,
      tsgxid: "",
      tsgxidname: ""
    };
  },
  computed: {
    tiltetex: {
      get: function() {
        return this.tsgxidname;
      }
    }
  },
  props: {
    workOrder: Object,
    showDetail: {
      type: Boolean,
      require: true
    }
  },
  mounted: function() {
    // this.fetchRecords();
    // this.$nextTick(this.fetchRecords);
    // if (this.sourceData)  {
    //   this.outLineData = this.mapAttachments(this.sourceData);
    // }
    // else {
    //   // this.$nextTick(this._fetchRecords);
    //   // this._fetchRecords();
    //   this.outLineData = null;
    // }
    this.attachmentData = [];
    setTimeout(() => {
      this._fetchRecords();
    }, 1000);
    //this.fetchRecords();
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Trident") > -1) {
      //用于IE浏览器
      this.isIE = true;
      this.isNotIE = false;
    } else {
      this.isIE = false;
      this.isNotIE = true;
    }
  },
  methods: {
    show: function(val) {
      this.$nextTick(() => {
        this.dialogFormVisible = true;
        if (val) {
          this.tsgxid = val.id;
          this.tsgxidname = val.new_name;
          this._fetchRecords();
        } else {
          /*     this.new_srv_troubleid = "";
          this.editForm.new_srv_workhours_id = ""; */
        }
      });
    },
    //加载附件明细
    _fetchRecords: function() {
      if (this.tsgxid) {
        this.loading = true;
        var requestStr = "../api/WorkOrder/Annotation/" + this.tsgxid;
        rt
          .get(requestStr)
          .then(res => {
            var attachmentList = res;
            var list = this.mapAttachments(attachmentList);

            this.attachmentData = list;
            this.loading = false;
            this.$emit("isExitatt", this.attachmentData.length);
          })
          .catch(error => {
            rt.showErrorToast(error);
            this.loading = false;
          });
      }
      this.isLoad = true;
    },

    mapAttachments: function(attachmentList) {
      var list = [];
      attachmentList.map(step => {
        let filelink = "data:" + step.mimetype + ";base64," + step.documentbody;
        let blob = this.base64Img2Blob(filelink);
        let userAgent = navigator.userAgent;
        step.filelink = window.URL.createObjectURL(blob);
        step.blob = blob;
        list.push(step);
      });
      return list;
    },

    //input输入框发生变化时触发该事件
    onFileChange: function() {
      var ttid = this.tsgxid;

      var that = this;
      var files = that.$refs.upload.files;
      var reader = new FileReader();
      var file = files[0];
      var ifSame = that.checkSameName(file.name);
      if (ifSame) {
        that.$message({
          type: "warning",
          message: that.$t("ExistSameFile")
        });
      } else {
        reader.readAsDataURL(file);
        reader.onload = function(f) {
          //大小限制
          if (file.size >= that.fileAutoSize) {
            that.$message({
              type: "warning",
              message: that.$t("FileIn3M")
            });
          } else {
            var annotation = {
              id: ttid
            };
            annotation["name"] = file.name;
            annotation["type"] = file.type;
            if (f.target.result !== "data:") {
              annotation["documentbody"] = f.target.result.substring(
                f.target.result.indexOf(",") + 1
              );
            }
            if (that.showDetail) {
              annotation["subject"] = that.subject;
              annotation["nodetext"] = that.noteText;
            }
            annotation["filesize"] = file.size;
            annotation["entityname"] = "new_workorder2commissiondetail";
            var requestStr = "../api/WorkOrder/AddAnnotationToWorkOrder";

            rt
              .post(requestStr, annotation)
              .then(res => {
                rt.showSuccessToast(res);
                that._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        };
      }
      that.$refs.upload.value = "";
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
    //上传附件
    uploadFile: function() {
      if (rt.isNullOrWhiteSpace(this.tsgxid)) {
        this.$message({
          type: "warning",
          message: this.$t("PleaseSave")
        });
        return;
      }
      this.$refs.upload.click();
    },
    //删除附件
    deleteData: function() {
      var selection = this.$refs.gridTable.selection;
      if (selection == null || selection.length == 0) {
        this.$message({
          type: "warning",
          message: this.$t("PleaseChooseAtLeastOne")
        });
      } else {
        this.$confirm(this.$t("ThisActionDeletePerpetually"), this.$t("Tip"), {
          confirmButtonText: this.$t("BUTTON_DETERMINE"),
          confirmButtonClass: "ConfirmButtonClass",
          cancelButtonText: this.$t("BUTTON_CANCEL"),
          cancelButtonClass: "CancelButtonClass",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            var deleteList = [];
            for (var i in selection) {
              deleteList.push(selection[i].id);
            }
            var params = deleteList;
            var requestStr = "../api/WorkOrder/DeleteAnnotation";
            rt
              .post(requestStr, params)
              .then(res => {
                rt.showSuccessToast(res);
                this._fetchRecords();
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          })
          .catch(error => {
            this.$message({
              type: "info",
              message: this.$t("HasCancelledForDeleting")
            });
          });
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
        //window.navigator.msSaveBlob(row.blob, row.filename);
        window.navigator.msSaveBlob(row.blob, row.filename);
      }
    },
    //针对IE浏览器下  区分预览和下载两种情况
    downLoadOrOpenFile: function(index, row) {
      let filelink = "data:" + row.mimetype + ";base64," + row.documentbody;
      row.blob = this.base64Img2Blob(filelink);
      let userAgent = navigator.userAgent;
      if (userAgent.indexOf("Trident") > -1) {
        window.navigator.msSaveOrOpenBlob(row.blob, row.filename);
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
      return new Blob([uInt8Array], {
        type: contentType
      });
    }
  }
};
</script>
