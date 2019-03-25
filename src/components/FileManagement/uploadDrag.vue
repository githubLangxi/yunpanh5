<template>
<el-dialog :title="tagName" :visible.sync="dialogVisible">
  <el-upload
    class="upload-demo"
    drag
    class='ensure ensureButt' :action="importFileUrl"
  :on-error="uploadError"
  :on-success="uploadSuccess"
  :before-upload="beforeAvatarUpload"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过10MB</div>
  </el-upload>
  <div slot="footer" class="dialog-footer">
    <!--<el-button v-on:click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>


  export default{
    data(){
      return{

      }
    },
    components:{

    },
    created(){
      console.log('数据信息')
    },
    methods:{
      // 上传成功后的回调
      uploadSuccess (response) {
        let code = response.returncode;
        let msg = response.msg;
        this.open(msg, code);
      },
// 上传错误
      uploadError (response) {
        this.open("500", "文件导入异常！");
      }
    }
  }
</script>

<style>
</style>

