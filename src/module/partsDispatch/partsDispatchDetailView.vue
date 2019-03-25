<template>
    <div class="partsApplyDetailView">
        <el-form ref="editForm" class="rt-portal-form" :model="editForm" :rules="rules" label-width="100px">
            <div class="rt-portal-form-command">
                <el-button @click="onSave('editForm')" icon="edit" class="rt-portal-form-button" :disabled="disabledform" v-if="activeName=='first'">保存</el-button>
                <el-button @click="onSaveAndClose('editForm')" icon="edit" class="rt-portal-form-button" :disabled="disabledform" v-if="activeName=='first'">保存并关闭</el-button>
            </div>
            <el-tabs v-model="activeName" class="rt-portal-form-tabs">
                <el-tab-pane label="配件申请单明细" name="first">
                    <el-row :gutter="20" class="rt-portal-form-row">
                        <el-col :span="8">
                          <!--new_code-->
                            <el-form-item label="人员编码" prop="new_code">
                                <el-input v-model="editForm.new_code" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_name-->
                            <el-form-item label="姓名" prop="new_code">
                                <el-input v-model="editForm.new_code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_sex-->
                            <el-form-item label="性别" prop="new_type">
                                <el-input v-model="editForm.new_price"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="rt-portal-form-row">
                        <el-col :span="8">
                          <!--new_phone-->
                            <el-form-item label="手机" prop="new_requiredate">
                                <el-input v-model="editForm.new_qty"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_postalcode-->
                            <el-form-item label="邮政编码">
                                <el-input v-model="editForm.new_partscost" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_workyear-->
                            <el-form-item label="工作年限">
                                <el-input v-model="editForm.new_desc" :disabled="disabledform"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="rt-portal-form-row">
                        <el-col :span="8">
                          <!--new_skill-->
                            <el-form-item label="技能" prop="new_requiredate">
                                <el-input v-model="editForm.new_qty"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_trainnumber-->
                            <el-form-item label="培训次数">
                                <el-input v-model="editForm.new_partscost"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <!--new_job-->
                            <el-form-item label="岗位">
                                <el-input v-model="editForm.new_desc" :disabled="disabledform"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="rt-portal-form-row">
                        <el-col :span="8">
                          <!--new_educationlevel-->
                            <el-form-item label="文化程度" prop="new_requiredate">
                                <el-input v-model="editForm.new_qty" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    
        <!-- 提示框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <span>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('BUTTON_CANCEL')}}</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{$t('BUTTON_DETERMINE')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">

import picklistComponent from '@/components/common/picklist'

export default {
    data() {
        return {
            detailId: '',
            url: '..',
            disabledform: false,/*设置可见性*/
            activeName: 'first',
            activeNames: ['1'],/*折叠面板控制*/
            dialogVisible: false,

            partsapplyid: '',
            typeOptions: [],
            loading: false,
            isSaveAndClose: false,

            /*表单数据*/
            editForm: {
                new_product_id: '',/*配件id*/
                new_product_idName: '',/*配件名称*/
                new_srv_partsapply_id: '',/*配件申请单号id*/
                new_code: '',/*配件编码*/

                new_price: '',/*单价*/
                new_qty: '',/*数量*/
                new_partscost: '',/*金额*/
                new_desc: '',/*描述*/
            },
            rules: {
                new_type: [
                    { type: 'number', required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                new_code: [
                    { required: true, message: '请添加配件单号', trigger: 'change' }
                ],
                new_requiredate: [
                    { type: 'date', required: true, message: '请选择发货日期', trigger: 'change' }
                ]
            },
            filterList: '',////'name=苏州瑞泰信息技术有限公司';
            /*LookUp回写问题，无法识别editdata.new_workorder_id,这里作为中间量，后期修改*/
            new_product_id: '',
            new_product_idname: '',

            orderby:''

        }
    },
    components: { picklistComponent },
    mounted: function () {
        if (this.$route.params.partid) {
            this.partsapplyid = this.$route.params.partid;
        }
        else if (this.$route.params.id) {
            this.detailId = this.$route.params.id;
        }
        this.initData();
    },
    watch: {
        new_workorder_id: function (val) {
            this.editForm.new_workorder_id = val;
        },
        new_workorder_idname: function (val) {
            this.editForm.new_workorder_idname = val;
        }
    },

    methods: {
        //初始化数据
        initData: function () {
            if (this.$route.params.id) {
                this.loadData();
            }
        },
        //数据加载
        loadData: function () {
            var self = this;
            //加载主档数据
            this.loadFormData().then(function (res) {
                self.editForm = res;
            })
                .catch((error) => {
                    rt.showErrorToast(error);
                });
        },
        //选项集绑定
        loadPickListData: function () {
            var self = this;
            rt.get(this.url + '/api/crmpicklist/options/new_srv_partsapply/new_type')
                .then(function (res) {
                    var picklist = res;
                    for (var i = 1; i <= picklist.length; i++) {
                        var picklistOption = {};
                        picklistOption.value = picklist[i - 1].Value;
                        picklistOption.label = picklist[i - 1].Text;
                        self.typeOptions.push(picklistOption);
                    }
                }).catch((error) => {
                    rt.showErrorToast(error);
                });
        },
        //加载主档数据
        loadFormData: function () {
            return rt.get(this.url + '/api/PartsApply/PartsApplyDetail/' + this.partsapplyid);
        },
        //加载明细列表
        loadLineData: function () {
            return rt.get(this.url + '/api/PartsApply/PartsApplyLine?id='+ this.partsapplyid+"&orderby="+this.orderby);
        },
        //创建明细数据
        createFormData: function (params) {
            return rt.post(this.url + '/api/PartsApply/CreatePartsApplyDetail', params);
        },
        //更新主档数据
        updateFormDate: function (params) {
            return rt.post(this.url + '/api/PartsApply/UpdatePartsApply', params);
        },
        //保存事件
        onSave: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var self = this;
                    var partsApply = self.editForm;
                    var params = partsApply;
                    /*创建*/
                    if (self.detailId === '') {
                        self.createFormData(params)
                            .then(function (res) {
                                self.$message({
                                    message: self.$t('Successfullysaved'),
                                    type: 'success'
                                });
                                self.partsapplyid = res;
                                if (self.isSaveAndClose) {
                                    self.$router.push({ name: "partlist" });
                                }
                                else {
                                    self.$router.push({ name: "partdetailedit", params: { id: res } })
                                }

                            })
                            .catch((error) => {
                                rt.showErrorToast(error);
                            });
                    }
                    /*更新*/
                    else {
                        params.id = self.partsapplyid;
                        self.updateFormDate(params)
                            .then(function (res) {
                                self.$message({
                                    message:  self.$t('Successfullysaved'),
                                    type: 'success'
                                });
                                if (self.isSaveAndClose) {
                                    self.$router.push({ name: "partlist" });
                                }
                                else {
                                    self.$router.push({ name: "partedit", params: { id: self.partsapplyid } })
                                }
                            })
                            .catch((error) => {
                                rt.showErrorToast(error);
                            });
                    }
                }
                else {
                    this.$message({
                        message: this.$t('PleaseInputRequiredFields'),
                        type: 'error'
                    });
                }
            })
        },
        onSaveAndClose: function (form) {
            this.isSaveAndClose = true;
            this.onSave(form);
        },
        //选项控件组件赋值
        GetTypeSelected: function (val) {
            this.editForm.new_type = val;/*todo：不同picklist取值字段不同*/
        },
        GetApprovalStatusSelected: function (val) {
            this.editForm.new_approvalstatus = val;
        },
        //关闭提示
        handleClose: function (done) {
            this.$confirm(this.$t('DeterminClose'))
                .then(function () {
                    done();
                })
                .catch(function () { });
        },
    }
}

</script>

<style type="text/css" scoped>

</style>