<template>
 <div>
    <!--头部操作按钮-->
   <rt-header title="服务人员">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button type="save" @click="onSave('editForm')"/>
      </rt-toolbar>
    </rt-header>

    <!--主档数据编辑Form-->
    <rt-content>
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="left" >
        <rt-section title="基本信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="服务人员编码">
                <el-input v-model="editForm.new_code" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="姓名" prop="new_name">
                <el-input v-model="editForm.new_name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务站">
                <el-input v-model="editForm.new_srv_station_idName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="岗位" prop='new_job'>
                <rt-picklist v-model="editForm.new_job" entity="new_srv_worker" attribute="new_job"></rt-picklist>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机" prop="new_phone">
              <el-input v-model="editForm.new_phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工人类别" prop='new_contracttype'>
                <rt-picklist v-model="editForm.new_contracttype" entity="new_srv_worker" attribute="new_contracttype"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="入司开始日期">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_workstart" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期">
              <el-date-picker class="rt-portal-item-date" v-model="editForm.new_workend" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop='new_sex'>
                <rt-picklist v-model="editForm.new_sex" entity="new_srv_worker" attribute="new_sex"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="微信账号">
                   <el-input v-model="editForm.new_wechat"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="技能">
                <el-input v-model="editForm.new_skill"></el-input>
              </el-form-item>
            </el-col>
               <el-col :span="8">
              <el-form-item label="文化程度" prop='new_educationlevel'>
               <rt-picklist v-model="editForm.new_educationlevel" entity="new_srv_worker" attribute="new_educationlevel"></rt-picklist>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="8">
            <el-form-item label="工作年限">
              <el-input v-model="editForm.new_workyear"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="培训次数">
              <el-input v-model="editForm.new_trainnumber"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证编码" prop="idnumber">
                   <el-input v-model="editForm.idnumber" :disabled="enableEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
         <rt-section title="保险信息">
          <el-row :gutter="50">
            <el-col :span="8">
              <el-form-item label="保险单号">
                <el-input v-model="editForm.new_insurenumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保险公司">
                <el-input v-model="editForm.new_insurecompany"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保险生效日期">
                  <el-date-picker class="rt-portal-item-date" v-model="editForm.new_insurestart" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </rt-section>
      </el-form>
    </rt-content>
  </div>
</template>

<script type="text/javascript">

export default {
    data(){
      return {
         enableEdit:false,
         workerid:'',   //主档ID
         editForm:{
          new_code:'',			        //服务人员编码
          new_name:'',			        //姓名
          new_srv_station_idName:'',		//服务站
          new_job:'',			          //岗位
          new_phone:'',			        //手机
          new_contracttype:'',		  //工人类别
          new_workstart:null,		    //入司开始日期
          new_workend:null,		      //结束日期
          new_sex:'',			          //性别
          new_wechat:'',			      //微信
          new_skill:'',			        //技能
          new_educationlevel:'',		//文化程度
          new_workyear:'',		      //工作年限
          new_trainnumber:'',		    //培训次数
          idnumber:'',          //身份证编码
          new_insurenumber:'',		  //保险单号
          new_insurecompany:'',		  //保险公司
          new_insurestart:null		  //保险生效日期
         },
        rules: {
        new_name: [
          { required: true, message: "请输入姓名", trigger: "change" }
        ],
        new_sex: [
          {
            type: "number",
            required: true,
            message: "请输入性别",
            trigger: "change"
          }
        ],
        new_educationlevel: [
          {
            type: "number",
            required: true,
            message: "请输入文化程度",
            trigger: "change"
          }
        ],
        new_job: [
          {
            type: "number",
            required: true,
            message: "请选择岗位",
            trigger: "change"
          }
        ],
        new_phone: [
          { required: true, message: "请输入手机", trigger: "change" }
        ],
        idnumber: [
          { required: true, message: "请输入身份证编码", trigger: "change" }
        ],
        new_contracttype: [
          {
            type: "number",
            required: true,
            message: "请选择工人类别",
            trigger: "change"
          }
        ]
      }
      }
    },
    created: function() {
        if (this.$route.params.id) {
          this.workerid = this.$route.params.id
        }
    },
    mounted: function() {
      if(this.workerid=='')
      {
        this.getStationInfo();      //获取服务站信息
      }
      else
      {
        this.getWorkerInfo();       //获取服务人员信息
      }
      
    },
    methods:{
        //返回按钮之前提示保存申请单数据
        beforeGoBack: function() {
        if (rt.isNullOrWhiteSpace(this.workerid)) {
          this.$confirm('服务人员信息尚未保存，是否确定退出', '提示', {
            confirmButtonText: '确定',
            confirmButtonClass: 'ConfirmButtonClass',
            cancelButtonText: '取消',
            cancelButtonClass: 'CancelButtonClass',
            type: 'warning'
          }).then(() => {
            this.$router.push({ name: "basicdetaillist" })
          }).catch(() => {
          })
        }
        else {
          this.$router.push({ name: "basicdetaillist" })
        }
      },
      //获取服务站信息
      getStationInfo:function(){
          var self=this; 
         rt.get('../api/NewSrvStation/GetBasicStation')
         .then(res=>{
            self.editForm.new_srv_station_idName=res.new_name;    //服务站名称
         });
      },
      //获取服务人员信息
      getWorkerInfo:function(){
      var self = this;
      this.loading = true;
      var requestStr = "../api/SrvWorker/GetSrvWorkerSign/" + this.workerid;
      rt
        .get(requestStr)
        .then(function(res) {
          self.editForm = res;
          self.loading = false;
          self.enableEdit=true;
        })
        .catch(error => {
          rt.showErrorToast(error);
          self.loading = false;
        });
      },
      //校验身份证
      isCardNo:function(card){
          //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
          if(reg.test(card) === false)  
          {  
              alert("身份证输入不合法");  
              return  false;  
          }  
          return true;
      },
      //保存
      onSave:function(formName) {
            let that = this;
            if(that.editForm.idnumber=="" || that.editForm.idnumber==null || that.editForm.idnumber==undefined)
            {
              alert("身份证编码不能为空");
              return false;
            }
            this.$refs[formName].validate(valid => {
              if (valid) {
                //校验身份证
                if(!that.isCardNo(that.editForm.idnumber))
                {
                     return false;
                }
                that.formLoading = true;
                var params = {
                  new_srv_workerid: that.workerid,
                  new_code:that.editForm.new_code,			                //服务人员编码
                  new_name:that.editForm.new_name,			                //姓名
                  new_job:that.editForm.new_job,			                  //岗位
                  new_phone:that.editForm.new_phone,			              //手机
                  new_contracttype:that.editForm.new_contracttype,		  //工人类别
                  new_workstart:that.editForm.new_workstart,		        //入司开始日期
                  new_workend:that.editForm.new_workend,		            //结束日期
                  new_sex:that.editForm.new_sex,			                  //性别
                  new_wechat:that.editForm.new_wechat,			            //微信
                  new_skill:that.editForm.new_skill,			              //技能
                  new_educationlevel:that.editForm.new_educationlevel,	//文化程度
                  new_workyear:that.editForm.new_workyear,		          //工作年限
                  new_trainnumber:that.editForm.new_trainnumber,		    //培训次数
                  idnumber:that.editForm.idnumber,                      //身份证编码
                  new_insurenumber:that.editForm.new_insurenumber,		  //保险单号
                  new_insurecompany:that.editForm.new_insurecompany,		//保险公司
                  new_insurestart:that.editForm.new_insurestart		      //保险生效日期
                };

                let apiUrl = "../api/SrvWorker/SaveSrvWorker";
                rt
                  .post(apiUrl, params)
                  .then(res => {
                    that.workerid=res;
                    rt.showSuccessToast(that.$t("Successfullysaved"));
                    //that.$router.replace({ name: "basicdetailedit", params: { id: that.workerid } });
                    that.getWorkerInfo();       //获取服务人员信息
                  })
                  .catch(error => {
                    that.formLoading = false;
                    rt.showErrorToast(error);
                  });
                //that.rowid = '';
              } else {
                return false;
              }
            });
          }
    }
  }
</script>