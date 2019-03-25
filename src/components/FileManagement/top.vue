<template>
<div>
  <el-row>

    <el-button type="success" @click="dialogFormVisible = true" class="el-icon-edit">创建文件夹</el-button>
    <el-button type="success" @click="dialoguploadVisible = true" class="el-icon-document">创建文件</el-button>


  </el-row>

  <el-dialog title="上传文件" :visible.sync="dialoguploadVisible">

    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8057/docment/postsfile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
  </el-dialog>

  <el-dialog title="创建" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="文件夹名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="createdir(1)"  >创建根文件夹</el-button>
      <el-button type="primary" @click="createchilddir(2)"  >创建子文件夹</el-button>
    </div>
  </el-dialog>


</div>

</template>

<script>

  export default{
    data(){
      return{
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dialogFormVisible: false,
        dialoguploadVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'

      }
    },
    components:{

    },
    created(){
      console.log('数据信息')
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
     async createdir(a){
        console.log(a);
        this.dialogFormVisible = false
        //this.open5();
        alert(this.form.name);
        let menusave ={
          "menusave": {"entity": {"parentMenuId":"0000a0000a0000a0000a0000", "icon": "el-icon-message\r\n", "alias":this.form.name, "state": "ENABLE", "name":this.form.name}},
          "parentid":"0000a0000a0000a0000a0000",
          "tag":0
        }
        let result= await  new Promise(async (resolve, reject) => {
          await    rt
            .post("http://localhost:8057/docment/saveDocument",menusave)
            .then(res => {
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });
       location.reload();
      },
     async  createchilddir(a){
        console.log(a);
        this.dialogFormVisible = false
        //this.open5();
        alert(this.form.name);
        alert(this.$store.state.menu.id);
        let menusave ={
          "menusave": {"entity": {"parentMenuId":this.$store.state.menu.id, "icon": "el-icon-message\r\n", "alias":this.form.name, "state": "ENABLE", "name":this.form.name}},
          "parentid":this.$store.state.menu.id,
          "tag":1
        }
        let result= await new Promise(async (resolve, reject) => {
          await    rt
            .post("http://localhost:8057/docment/saveDocument",menusave)
            .then(res => {
              resolve(res)
            })
            .catch(res => {
              rt.showErrorToast(res);
            });
        });
        location.reload()
      }
    }
  }
</script>

<style>
</style>
