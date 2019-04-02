<template>
<div>
  <el-row>

    <el-button type="success" @click="dialogFormVisible = true" class="el-icon-edit">创建文件夹</el-button>
    <el-button type="success" @click="peoplelistFormVisible = true" class="el-icon-document">创建客户</el-button>

  </el-row>


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
  <el-dialog title="创建" :visible.sync="peoplelistFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="客户姓名" :label-width="formLabelWidth" :required="true" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户电话" :label-width="formLabelWidth" :required="true" prop="tel">
        <el-input v-model="form.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户职业" :label-width="formLabelWidth" :required="true" prop="work">
        <el-input v-model="form.work" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="工作年限" :label-width="formLabelWidth">
        <el-input v-model="form.workage" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户公司" :label-width="formLabelWidth">
        <el-input v-model="form.company" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户学历" :label-width="formLabelWidth">
        <el-input v-model="form.education" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户性别" :label-width="formLabelWidth">
        <el-input v-model="form.sex" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户备注" :label-width="formLabelWidth" :label-height="formheight">
        <el-input v-model="form.Remarks" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="peoplelistFormVisible = false">取 消</el-button>

      <el-button type="primary" @click="onSubmite('form')">确定</el-button>
      <el-button type="primary" @click="resetForm('form')">重置</el-button>

    </div>
  </el-dialog>


</div>

</template>

<script>

  export default{
    props: ['peopleitems'],
    data(){
      return{
        rules:{
          name :[{required: true, message: '请输入123', trigger: 'blur'}],
          tel :[{required: true, message: '请输入123', trigger: 'blur'}],
          sex :[{required: true, message: '请输入444', trigger: 'blur'}]
        },
        peoplelistFormVisible:false,
        dialogFormVisible: false,
        form: {
          name: '',
          tel: '',
          work: '',
          workage: '',
          company: '',
          education: '',
          sex: '',
          Remarks: ''
        },
        formheight:'100px',
        formLabelWidth: '120px'

      }
    },
    components:{

    },
    created(){
      console.log('数据信息')
    },
    methods:{
     async  onSubmite(formData) {
       debugger;

       await  this.$refs[formData].validate(async (valid) => {
          if (valid) {
           console.log(this.$refs[formData].model,this.$cookies.get("menuid"));

            let result= await new Promise(async (resolve, reject) => {
              await    rt
                .post("http://local.gankao.com:8057/peoples/savepeople?id="+ this.$cookies.get("menuid"),this.$refs[formData].model)
                .then(res => {
                  console.log("resheader")
                  console.log(res.headers)
                  console.log(res);
                  resolve(res)
                })
                .catch(res => {
                  rt.showErrorToast(res);
                });
            });
          await   console.log(result);
            if(result.result && result.result.code ===1)
            {
              this.$message({
                message: '电话号码不能重复',
                type: 'warning'
              });
            }else {
              await  this.$emit("peoplechanged",this.$refs[formData].model.name);
            }
            //this.$router.go(0)
          }
        });

      },
      resetForm(formData) {
        console.log(this.$refs)
        this.$refs[formData].resetFields();//表单重置
      }
  ,
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
