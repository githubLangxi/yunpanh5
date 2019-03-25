<template>
 <div class="upload_img">
      <div style="width:100%;" class="uploader-list">
        <ul>
            <li>
                <input type="file" value="请点击上传附件" @change="onFileChange" style="display:none" ref="upload" />
                <div class="upload_card" @click="uploadFile()" @mouseover="showDetail()" @mouseout="hideDetail()">
                  <div class="upload_check" v-show="basePng==''?false:true">
                    <i class="el-icon-upload-success el-icon-check"></i>
                  </div>
                  <img :src="basePng" v-show="basePng==''?false:true" :class="showDel==true?'showshadow':''"/>
                  <i class="el-icon-plus" v-show="(basePng==''&&disabled==false)?true:false"></i>
                  <i class="el-icon-view" v-show="(basePng!=''&&showDel==true)?true:false" @click="openPngDetail"></i>
                  <i class="el-icon-delete" v-show="(basePng!=''&&showDel==true&&disabled==false)?true:false" @click="handleRemove"></i>
                </div>
            </li>
        </ul>
    </div>
    <div class="imgViewDom" style="z-index: 1000;" v-show="pngDialogVisible"  @click="closeUpload">
      <!-- <div class="upload_dialog">
      <div class="upload_dialog_header">
        <span class="upload_dialog_title">图片预览</span>
        <button type="button" aria-label="Close" class="upload_dialog_btn" @click="closeUpload">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div> -->
              <img :src="basePng" style="max-width: 80%;max-height:70%;  cursor: pointer;"/>
      </div>
    </div>
</template>

<script>
export default {
  model: {
    prop: "basePng",
    event: "pngSrc"
  },
  props: {
    workOrder: Object,
    basePng: {
      type: String,
      value: ""
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data() {
    return {
      fileAutoSize: 3145728, //3M大小文件限制
      // basePng: "",
      fileName: "",
      showDel: false,
      pngDialogVisible: false
    };
  },
  methods: {
    openPngDetail() {
      this.pngDialogVisible = true;
    },
    closeUpload() {
      this.pngDialogVisible = false;
    },
    showDetail() {
      if (this.basePng == "") {
        return;
      }
      this.showDel = true;
    },
    hideDetail() {
      this.showDel = false;
    },
    handleRemove() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.basePng != "") {
            var annotation = {
              Url: this.basePng,
              name: this.workOrder.new_id,
              id: this.workOrder.id
            };
            //删除数据库url
            var requestStr = "../api/StationApply/DeletePicture"; //请求接口
            rt.get(requestStr, annotation)
              .then(res => {
                this.basePng = "";
                this.fileName = "";
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                // rt.showSuccessToast(res);
              })
              .catch(error => {
                rt.showErrorToast(error);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //上传附件
    uploadFile: function() {
      if (this.disabled == true) {
        return;
      }
      if (rt.isNullOrWhiteSpace(this.workOrder.id)) {
        this.$message({
          type: "warning",
          message: this.$t("PleaseSave")
        });
        return;
      }
      if (this.basePng != "") {
        return;
      } else {
        this.$refs.upload.click();
      }
    },
    onFileChange() {
      console.log();
      var that = this;
      var files = that.$refs.upload.files;
      var reader = new FileReader();
      var file = files[0];
      // console.log(file);
      //   var ifSame = that.checkSameName(file.name);

      reader.readAsDataURL(file);
      reader.onload = function(f) {
        //大小限制
        if (file.size >= that.fileAutoSize) {
          that.$message({
            type: "warning",
            message: that.$t("FileIn3M")
          });
        } else {
          that.basePng = f.target.result;
          that.$emit("pngSrc", that.basePng);
          var annotation = {};
          // id: that.workId //申请ID
          annotation["entityName"] = "new_srv_station_apply";
          annotation["formNo"] = "textno";
          annotation["base64String"] = f.target.result;
          annotation["fileName"] = file.name;
          annotation["applyid"] = that.workOrder.id;
          annotation["new_id"] = that.workOrder.new_id;
          that.$emit("pngSrc", that.basePng);
          //  上传请求post
          var requestStr = "../api/StationApply/UpLoadPicture"; //请求接口
          rt.post(requestStr, annotation)
            .then(res => {
              that.basePng = res;
              that.$message({
                message: "上传成功",
                type: "success"
              });
              // rt.showSuccessToast(res);
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        }
      };
      that.$refs.upload.value = "";
    }
  }
};
</script>
<style scoped>
img {
  vertical-align: top;
  border: none;
}
li {
  list-style: none;
}
.upload_dialog {
  width: 600px;
  height: 600px;
  position: absolute;
  left: 25%;
  top: -25%;
  z-index: 1000;
  background: red;
}
.el-icon-delete {
  position: absolute;
  font-size: 18px;
  top: 42%;
  right: 30%;
  color: #000;
  transition: width 0.5s;
}
.el-icon-delete :hover {
  font-size: 20px;
}
.el-icon-view {
  position: absolute;
  top: 42%;
  font-size: 18px;
  left: 30%;
  color: #000;
  transition: width 0.5s;
}
.el-icon-view:hover {
  font-size: 20px;
}
.showshadow {
  opacity: 0.6;
}
.el-icon-check {
  font-size: 12px;
  margin-top: 11px;
  transform: rotate(-45deg);
  color: #fff;
}
.upload_check {
  width: 40px;
  height: 24px;
  background: #13ce66;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: -6px;
  right: -15px;
  z-index: 1;
}
.pngDetail {
  width: 100%;
  /* display: inline-block; */
  font-size: 14px;
  color: #97a8be;
  margin-right: 7px;
  line-height: inherit;
}
.icon_close {
  font-size: 12px;
  line-height: 12px;
  float: right;
}
.pngDetail:hover span {
  color: #20a0ff;
  cursor: pointer;
}
.uploadBtn {
  outline: none;
  font-size: 12px;
  width: 86px;
  height: 24px;
  padding: 0 18px;
  background: none;
  border-radius: 3px;
  border-color: rgb(196, 196, 196);
  color: rgb(31, 52, 61);
  cursor: pointer;
}
.uploadBtn:hover {
  color: #1fb6d8;
  border-color: #1fb6d8;
}
.upload_card {
  background-color: #fbfdff;
  /* border: 1px dashed #c0ccda; */
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  position: relative;
  overflow: hidden;
}
.upload_card:hover {
  border-color: #409eff;
  color: #409eff;
}
.el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  margin: 0 auto;
  position: absolute;
  left: 45%;
  top: 45%;
}
.imgViewDom {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  transition: all 0.6s;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: auto;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.imgViewDom:hover {
  transform: scale(1.5);
}
.upload_wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
}
.upload_dialog {
  position: relative;
  top: 15vh;
  left: 35%;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 30%;
  height: 15vh;
}
.upload_dialog_header {
  padding: 20px;
  padding-bottom: 10px;
}
.upload_dialog_title {
  line-height: 24px;
  font-size: 16px;
  color: #303133;
}
.upload_dialog_btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 12px;
}
.el-icon-close {
  color: #909399;
}

li {
  list-style: none;
}
.uploader-list {
  width: 100%;
}
.uploader-list > ul > li {
  float: left;
  width: 278px;
  height: 278px;
  border-radius: 5px;
  border: 1px #bebebe solid;
  margin: 10px 15px;
}
.uploader > ul > li:nth-last-child(1) {
  margin-right: 0px;
}
.uploader-list > ul > li img {
  opacity: 0.7;
  transition: all ease 1s;
  filter: alpha(opacity=70); /* 针对 IE8 以及更早的版本 */
  width: 270px;
  height: 270px;
  border: 1px #bebebe solid;
  margin: 3px;
}
.uploader-list > ul > li img:hover {
  opacity: 1;
  filter: alpha(opacity=100); /* 针对 IE8 以及更早的版本 */
}
</style>
