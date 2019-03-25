<template>
  <div>
    <el-dialog title="处理服务单" :visible.sync="dialogFormVisible" :before-close="beforeClose" size="large">

      <rt-content class="rt-content-dialog">
        <el-form class="rt-portal-form" label-position="left" label-width="120px">

          <div class="cssNav ">
            <li @click="updateselect(3)" v-bind:class="{'complete':3<=currentindex,'select':selectindex===3,'default':selectindex!==3}">响应</li>
            <li @click="updateselect(4)" v-bind:class="{'complete':4<=currentindex,'select':selectindex===4,'default':selectindex!==4}">出发</li>
            <li @click="updateselect(5)" v-bind:class="{'complete':5<=currentindex,'select':selectindex===5,'default':selectindex!==5}">到位</li>
            <li @click="updateselect(6)" v-bind:class="{'complete':6<=currentindex,'select':selectindex===6,'default':selectindex!==6}">拍照</li>
            <li @click="updateselect(7)" v-bind:class="{'complete':7<=currentindex,'select':selectindex===7,'default':selectindex!==7}">完工</li>
          </div>
          <div style="padding-top:20px" v-show="selectindex===3">
            <rt-section title="服务响应">
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="是否服务" prop="ResponseIsServer" required>
                    <el-select @change="ResServiceChange" class="rt-portal-item-select" v-model="ResponseIsServerSel" clearable :placeholder="$t('Select')">
                      <el-option v-for="item in ResponseIsServerOption" :key="item.Value" :label="item.Text" :value="item.Value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="响应时间" prop="ResponseTime">
                    <el-input disabled v-model="queryForm.ResponseTime"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="预约时间" prop="ResponseAppointmentTime">
                    <el-date-picker v-model="queryForm.ResponseAppointmentTime" type="datetime" class="el-input__inner_dialog">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="24">
                  <el-form-item label="响应信息">
                    <el-input type="textarea" v-model="queryForm.ResponseMemo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </rt-section>
          </div>
          <div style="padding-top:20px" v-show="selectindex===4">
            <rt-section title="服务出发">
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="出发时间" prop="GotoTime" required>
                    <el-date-picker v-model="queryForm.GotoTime" type="datetime" class="el-input__inner_dialog">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="出发地点" prop="GotoAddress" required>
                    <el-input v-model="queryForm.GotoAddress"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="24">
                  <el-form-item label="出发信息">
                    <el-input type="textarea" v-model="queryForm.GotoMemo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </rt-section>
          </div>
          <div style="padding-top:20px" v-show="selectindex===5">
            <rt-section title="服务到位">
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="到位时间" prop="ArrivedTime" required>
                    <el-date-picker v-model="queryForm.ArrivedTime" type="datetime" class="el-input__inner_dialog">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="到位地点" prop="ArrivedAddress" required>
                    <el-input v-model="queryForm.ArrivedAddress"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="24">
                  <el-form-item label="到位信息">
                    <el-input type="textarea" v-model="queryForm.ArrivedMemo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </rt-section>
          </div>
          <div style="padding-top:20px" v-show="selectindex===6">
            <rt-section title="故障拍照">
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="照片类型" prop="picType">
                    <el-select @change="picTypeChange" class="rt-portal-item-select" v-model="picType" clearable :placeholder="$t('Select')">
                      <el-option v-for="item in picTypeOption" :key="item.Text" :label="item.Text" :value="item.Value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="照片说明" prop="txtPhotoMes">
                    <el-input v-model="txtPhotoMes"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </rt-section>
            <attachment :workOrderId="this.formData.new_srv_workorderid" :showDetail="true" :subject="picType" :noteText="txtPhotoMes" @isExitatt="isExitatt" :approvalstatus="this.approvalstatus"></attachment>
          </div>
          <div style="padding-top:20px" v-show="selectindex===7">
            <rt-section title="服务完工">
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="8">
                  <el-form-item label="完工时间" prop="FinishTime" required>
                    <el-date-picker v-model="queryForm.FinishTime" type="datetime" class="el-input__inner_dialog">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="24">
                  <el-form-item label="故障信息">
                    <el-input type="textarea" v-model="queryForm.FinishErrorMemo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="50" class="rt-portal-form-row">
                <el-col :span="24">
                  <el-form-item label="处理措施">
                    <el-input type="textarea" v-model="queryForm.FinishDealMemo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </rt-section>
          </div>
        </el-form>
      </rt-content>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="onSave" v-show="(this.formData.new_dealstatus+1)===this.selectindex">提 报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import attachment from './attachment'
export default {
  name: "dealDialog",
  data: function() {
    return {
      fileLength: '',//拍照步骤时 附件明细列表长度
      dialogFormVisible: false,
      selectindex: 1,
      currentindex: 1,
      picType: '',
      txtPhotoMes: '',
      picTypeOption: [//照片类型
        { Value: '维修前', Text: '维修前' },
        { Value: '维修后', Text: '维修后' }
      ],
      ResponseIsServerOption: [
        { Value: '0', Text: '否' },
        { Value: '1', Text: '是' }
      ],
      ResponseIsServerSel: '',
      formPK: '',
      formData: {},
      url: '../api/WorkOrder/WorkOrderDeal/',
      detailurl: '../api/WorkOrder/GetWorkOrderData/',
      urlFull: '',
      detailUrlFull: '',
      disabledform: false,/*设置可见性*/
      dialogVisible: false,
      queryForm: {
        ResponseIsServer: '',//是否服务
        ResponseTime: '',//响应时间
        ResponseAppointmentTime: '',//预约时间
        ResponseMemo: '',//响应信息
        GotoTime: '',//出发时间
        GotoAddress: '',//出发地点
        GotoMemo: '',//出发信息
        ArrivedTime: '',//到位时间
        ArrivedAddress: '',//到位地点
        ArrivedMemo: '',//到位信息
        FinishTime: '',//完工时间
        FinishDealMemo: '',//处理措施
        FinishErrorMemo: '',//故障信息
        DealStatus: ''//当前位置
      },
      atta: '',//在提交附件时赋值传递给父组件   及时刷新服务单编辑页面的附件列表
    }
  },
  props: {
    workOrderId: String,
    approvalstatus: '',
    isService: '',
  },
  components: { attachment },
  mounted: function() {
  },
  methods: {
    show: function(val) {
      this.dialogFormVisible = true
      this.urlFull = ''
      this.detailUrlFull = ''
      this.formData = val
      this.urlFull = this.url + this.formData.new_srv_workorderid
      this.detailUrlFull = this.detailurl + this.formData.new_srv_workorderid
      if (this.formData.new_dealstatus === 7) {
        this.selectindex = this.formData.new_dealstatus//默认完成流程

      } else {
        this.selectindex = this.formData.new_dealstatus + 1//默认选择下一级流程
      }
      this.currentindex = this.formData.new_dealstatus//已完成响应位置
      this.queryForm.DealStatus = this.formData.new_dealstatus//当前需要记录的状态
      if (this.isService == true && this.formData.new_dealstatus == 2) {
        this.formData.new_dealstatus = 2;
      }
      else if (this.isService == false) {
        this.formData.new_dealstatus = 1;
      }
      this.LoadFormData()//加载响应数据集
    },
    beforeClose: function() {
      this.dialogFormVisible = false;
    },
    onSave: function() {
      this.submitForm()
    },
    updateselect: function(val) {
      this.selectindex = val;
    },
    submitForm: function() {
      //验证参数
      if (!this.vailParamter()) {
        return
      }
      //提交
      rt.post(this.urlFull, this.queryForm).then((res) => {
        rt.showSuccessToast(res);
        //此处进行广播通知详细刷新避免静态数据
        this.$emit("refWorkerOrder", this.atta)
        this.dialogFormVisible = false
      }).catch((error) => {
        rt.showErrorToast(error);
      });
    },
    //验证参数函数，针对不同步骤
    vailParamter: function() {
      var flag = false
      //此处加1是为了解决主档还停留在上一步完成状态
      this.queryForm.DealStatus = this.formData.new_dealstatus
      switch (this.formData.new_dealstatus + 1) {
        case 3:
          if (this.ResponseIsServerSel === '') {
            rt.showErrorToast('请选择是否服务')
            break
          }
          this.queryForm.ResponseIsServer = this.ResponseIsServerSel === '0' ? false : true

          if (this.queryForm.ResponseAppointmentTime != '') {
            this.queryForm.ResponseAppointmentTime = rt.formatDateTime(this.queryForm.ResponseAppointmentTime, 'yyyy-mm-dd HH:MM:ss')
          }
          flag = true//标记已通过
          break
        case 4:
          if (this.queryForm.GotoTime === '') {
            rt.showErrorToast('请填写出发时间')
            break
          }
          if (this.queryForm.GotoAddress === '') {
            rt.showErrorToast('请填写出发地点')
            break
          }
          this.queryForm.GotoTime = rt.formatDateTime(this.queryForm.GotoTime, 'yyyy-mm-dd HH:MM:ss')
          flag = true
          break
        case 5:
          if (this.queryForm.ArrivedTime === '') {
            rt.showErrorToast('请填写到位时间')
            break
          }
          if (this.queryForm.ArrivedAddress === '') {
            rt.showErrorToast('请填写到位地点')
            break
          }
          this.queryForm.ArrivedTime = rt.formatDateTime(this.queryForm.ArrivedTime, 'yyyy-mm-dd HH:MM:ss')
          flag = true
          break
        case 6:
          if (this.fileLength == 0) {
            this.$message({
              type: 'warning',
              message: '请上传图片'
            })
            break;
          }
          this.atta = 1;
          flag = true
          break
        case 7:
          if (this.queryForm.FinishTime === '') {
            rt.showErrorToast('请填写完工时间')
            break
          }
          this.queryForm.FinishTime = rt.formatDateTime(this.queryForm.FinishTime, 'yyyy-mm-dd HH:MM:ss')
          flag = true
          break
      }

      return flag
    },
    picTypeChange: function() {
      //to do
    },
    ResServiceChange: function() {
      //to do
    },

    //获取子组件传过来的附件明细列表长度参数
    isExitatt: function(val) {
      this.fileLength = val;
    },

    //加载处理流程已完成的数据
    LoadFormData: function() {
      rt.get(this.detailUrlFull).then((res) => {
        if (res != null) {
          this.queryForm = res
          if (res != null) {
            if (this.queryForm.ResponseAppointmentTime == '0001-01-01 08:00:00') {
              this.queryForm.ResponseAppointmentTime = ''
            }
            this.queryForm.ResponseIsServer ? this.ResponseIsServerSel = '1' : this.ResponseIsServerSel = '0'
            //判断已过响应阶段

          }
        }
      }).catch((error) => {
        rt.showErrorToast(error);
      });
    }
  }
}
</script>

<style>
.cssNav {
  padding: 0px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.rt-content-dialog {
  margin-top: -20px !important;
}

.rt-content .rt-content-dialog .rt-content__main {
  overflow-x: hidden;
  overflow-y: visible;
  position: inherit !important;
  bottom: 50px;
  top: 56px;
  right: 50px;
  left: 230px;
}

.el-date-editor.el-input {
  position: relative !important;
  font-size: 14px !important;
  display: inline-block !important;
  width: 100% !important;
}

.cssNav li {
  font-size: 14px;
  text-align: center;
  padding: 0px 20px;
  line-height: 30px;
  display: inline-block;
  position: relative;
  flex: 1;
  margin-right: 5px;
  cursor: pointer;
}

.cssNav li:before {
  content: '';
  display: block;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #fff;
  position: absolute;
  left: 0px;
  top: 0;
}

.cssNav li:after {
  content: '';
  display: block;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left-style: solid;
  border-left-width: 15px;
  position: absolute;
  right: -15px;
  top: 0;
  z-index: 10;
}

.cssNav li:first-child {
  border-radius: 4px 0 0 4px;
  padding-left: 25px;
}

.cssNav li:last-child,
.cssNavEnd {
  border-radius: 0px 4px 4px 0px;
  padding-right: 25px;
}

.cssNav li:first-child:before {
  display: none;
}

.cssNav li:last-child:after,
.cssNavEnd:after {
  display: none;
}

.cssNav li.active {
  background-color: #ef72b6;
}

.cssNav li.active:after {
  border-left-color: #ef72b6;
}

.default {
  color: #adadad;
  background: #e6e6e6;
}

.default:after {
  border-left-color: #e6e6e6;
}

.select {
  color: #555;
  background: rgba(0, 136, 86, 0.4);
}

.select:after {
  border-left-color: rgba(0, 136, 86, 0.4);
}

.complete {

  background: rgb(0, 136, 86);
  color: #fff;
}

.complete:after {
  border-left-color: rgb(0, 136, 86);
}
</style>
