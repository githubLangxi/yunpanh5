<template>
  <div>
    <rt-header title="服务互动">
      <rt-toolbar showBack @goback="beforeGoBack">
        <rt-button  text="重电申诉" type="submit" @click="RepeatComplain()" v-if="this.editForm.new_isrepeat==1"/>
      </rt-toolbar>
    </rt-header>
    <rt-content>
        <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left">
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="服务单号" prop="new_srv_workorder_idname">
                        <el-input v-model="editForm.new_srv_workorder_idname" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="类型" prop="new_interactiontypetext">
                        <el-input v-model="editForm.new_interactiontypetext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="跟单内容" prop="new_contenttext">
                        <el-input v-model="editForm.new_contenttext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="跟单描述" prop="new_desc">
                        <el-input v-model="editForm.new_desc" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
                <el-col :span="24">
                    <el-form-item label="服务互动详情" prop="new_details">
                        <el-input type="textarea" v-model="editForm.new_details" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="重电标识" prop="new_isrepeattext">
                        <el-input v-model="editForm.new_isrepeattext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="退单类型" prop="new_retreattypetext">
                        <el-input v-model="editForm.new_retreattypetext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="退单原因" prop="new_retreatreasontext">
                        <el-input v-model="editForm.new_retreatreasontext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
                <el-col :span="8">
                    <el-form-item label="处理单位" prop="new_unittext">
                        <el-input v-model="editForm.new_unittext" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="操作人" prop="new_operator">
                        <el-input v-model="editForm.new_operator" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="创建时间" prop="createdon">
                        <el-input v-model="editForm.createdon" disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="50">
                <el-col :span="24">
                    <el-form-item label="重电申诉/判断说明" prop="new_repeatmemo" :rules=" [{required: true,message: '',trigger: 'change'}]">
                        <el-input type="textarea" v-model="editForm.new_repeatmemo" :disabled="editForm.new_isrepeat!=1" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </rt-content>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      id: "",
      editForm: {}
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    this._fetchRecords();
  },
  created: function() {
    this.id = this.$route.params.id;
  },
  methods: {
    beforeGoBack: function() {
      window.history.go(-1);
    },

    _fetchRecords: function() {
      if (this.id) {
        var requestStr = "../api/WorkOrder/GetInteractionById/" + this.id;
        var that = this;
        rt.get(requestStr).then(res => {
          that.editForm = res;
        });
      }
    },

    //重电申诉
    RepeatComplain: function() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          var requestStr = "./api/WorkOrder/RepeatComplain";
          var self = this;
          rt.post(requestStr, this.editForm)
            .then(function(res) {
              rt.showSuccessToast(self.$t("Successfullysaved"));
              self._fetchRecords();
            })
            .catch(error => {
              rt.showErrorToast(error);
            });
        } else {
          this.$message({
            message: this.$t("PleaseInputRequiredFields"),
            type: "error"
          });
        }
      });
    }
  }
};
</script>
    