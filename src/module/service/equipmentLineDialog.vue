<template>
    <div>
        <el-dialog :title="$t('new_srv_partline')" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form ref="editForm" :model="editForm" label-width="120px" label-position="left" :rules="rules">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_product_id')" prop="new_product_idname">
                            <el-input v-model="editForm.new_product_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="partLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_serialno')" prop="new_serialno">
                            <el-input v-model="editForm.new_serialno"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_serialnonew')" prop="new_serialnonew">
                            <el-input v-model="editForm.new_serialnonew"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_qty')" prop="new_qty">
                            <el-input v-model="editForm.new_qty" @change="countPartCost"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_price')" prop="new_price">
                            <el-input disabled v-model="editForm.new_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_partscost')" prop="new_partscost">
                            <el-input disabled v-model="editForm.new_partscost"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_name')" prop="new_name">
                            <el-input disabled v-model="editForm.new_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_model')">
                            <el-input v-model="editForm.new_model"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_supplier_id')" prop="new_supplier_idname">
                            <el-input v-model="editForm.new_supplier_idname" readonly icon="search" :on-icon-click="supplierLookup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_productnew_id')" prop="new_productnew_idname">
                            <el-input v-model="editForm.new_productnew_idname" readonly :disabled="disabledform" icon="search" :on-icon-click="partnewLookup"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item :label="$t('new_srv_partline.new_productcodenew')" prop="new_productcodenew">
                            <el-input v-model="editForm.new_productcodenew"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">{{this.$t('BUTTON_CANCEL')}}</el-button>
                <el-button type="primary" @click="onSave('editForm')">{{this.$t('BUTTON_DETERMINE')}}</el-button>
            </div>
        </el-dialog>
        <partsDialog ref="parts" :productId='this.productId' :workOrderId=this.workOrderId  @lookupSelect="selectParts" @lookupSelectClear="clearParts"></partsDialog>
        <supplierDialog ref="supplier" @lookupSelect="selectSupplier" @lookupSelectClear="clearSupplier"></supplierDialog>
    </div>
</template>

<script>
import partsDialog from '../dialog/partsDialog'
import supplierDialog from '../dialog/supplierDialog'

export default {
    name: "equipmentLineDialog",
    data: function() {
        return {
            dialogFormVisible: false,
            disabledform: false,
            new_srv_workorderid: '',//主档id
            new_srv_partlineid: '',//更换件id
            before: {},
            //更换配件明细数据
            editForm: {
                new_product_id: '',//旧件id//
                new_product_idname: '',//旧件名称
                new_serialno: '',//旧件序列号
                new_serialnonew: '',//新件序列号

                new_qty: '',//数量//
                new_price: 0,//旧件定价
                new_partscost: 0,//旧件金额//

                new_name: '',//旧件编码
                new_model: '',//旧件型号//
                new_supplier_id: '',//旧件供应商id
                new_supplier_idname: '',//旧件供应商

                new_productnew_id: '',//新件id
                new_productnew_idname: '',//新件名称
                new_productcodenew: ''//新件编码
            },
            rules: {
                new_product_idname: [{ required: true, message: '请填写旧件名称', trigger: 'change' }],
                new_qty: [
                    { required: true, message: '不能为空' }, { pattern: /^[1-9]\d*$/, message: '必须输入正整数', trigger: 'blur' }
                ],
            }
        }
    },
    props: {
        workOrderId: String,
        productId:String,
        partsArray: Array,
    },
    components: { partsDialog, supplierDialog },
    methods: {
        //根据更换件明细id加载故障模式内容
        _fetchRecords: function() {
            if (this.new_srv_partlineid) {
                var requestStr = '../api/WorkOrder/GetPartsLineById/' + this.new_srv_partlineid;
                rt.get(requestStr).then((res) => {
                    this.editForm = res;
                    this.before = res;
                }).catch((error) => {
                    rt.showErrorToast(error);
                });
            }
        },
        //提供给父组件调用，
        show: function(val) {
            this.dialogFormVisible = true;
            if (val) {
                this.new_srv_partlineid = val;//获取传递的参数，赋值更换件明细id，加载数据
                this._fetchRecords();
            }
            else {
                this.new_srv_partlineid = '';
            }
        },
        //保存故障模式明细
        onSave: function() {

            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    var self = this;
                    var params = self.editForm;
                    params.new_srv_workorder_id = self.workOrderId;
                    //创建
                    if (rt.isNullOrWhiteSpace(self.new_srv_partlineid)) {
                        if (this.checkSameParts()) {
                            self.createFormData(params)
                                .then(function(res) {
                                    rt.showSuccessToast(self.$t('Successfullysaved'));
                                    self.$emit('reLoad')
                                    self.dialogFormVisible = false;
                                    self.$refs['editForm'].resetFields();
                                })
                                .catch((error) => {
                                    rt.showErrorToast(error);
                                });
                        }
                        else{
                            rt.showErrorToast(self.$t('ExitNotRepeat'));
                        }
                    }
                    //更新
                    else {
                        params.id = self.new_srv_partlineid;
                        self.updateFormDate(params)
                            .then(function(res) {
                                rt.showSuccessToast(self.$t('Successfullysaved'));
                                self.$emit('reLoad')
                                self.dialogFormVisible = false;
                                self.$refs['editForm'].resetFields();
                            })
                            .catch((error) => {
                                rt.showErrorToast(error);
                            });
                    }
                }
                else {
                    rt.showErrorToast(this.$t('PleaseInputRequiredFields'));
                }
            })
        },
        //创建更换件明细
        createFormData: function(params) {
            return rt.post('../api/WorkOrder/CreateOrUpdatePartsLine', params);
        },
        //更新更换件明细数据
        updateFormDate: function(params) {
            return rt.post('../api/WorkOrder/UpdatePartsLineDetail', params);
        },

        /************
         Dialog弹出框部分
        ************/
        //旧件lookup
        partLookup: function() {
            this.$refs.parts.show(1);
        },
        //新件lookup
        partnewLookup: function() {
            this.$refs.parts.show(2);
        },
        //根据type区别旧件和新件的查找,区别赋值  type=1:旧件查找，并且新件信息默认等于旧件信息  type=2:新件查找
        selectParts: function(type, id, name, productnumber, productmodel, price) {
            if (type == 1) {
                this.editForm.new_product_id = id;
                this.editForm.new_product_idname = name;
                this.editForm.new_name = productnumber;
                this.editForm.new_model = productmodel;
                this.editForm.new_price = price;
                this.editForm.new_productnew_id = id;
                this.editForm.new_productnew_idname = name;
                this.editForm.new_productcodenew = productnumber;
                this.countPartCost();
            }
            if (type == 2) {
                this.editForm.new_productnew_id = id;
                this.editForm.new_productnew_idname = name;
                this.editForm.new_productcodenew = productnumber;
            }
        },
        //type=1:清除旧件以及新件信息;type=2:仅清除新件信息
        clearParts: function(type) {
            if (type == 1) {
                this.editForm.new_product_id = '';
                this.editForm.new_product_idname = '';
                this.editForm.new_name = '';
                this.editForm.new_model = '';
                this.editForm.new_price = '';
                this.editForm.new_productnew_id = '';
                this.editForm.new_productnew_idname = '';
                this.editForm.new_productcodenew = '';
                this.editForm.new_price = '';
            }
            if (type == 2) {
                this.editForm.new_productnew_id = '';
                this.editForm.new_productnew_idname = '';
            }
        },
        //供应商lookup(暂无数据)
        supplierLookup: function() {
            this.$refs.supplier.show();
        },
        //监听供应商组件双击、确定事件，传递参数值
        selectSupplier: function(id, name,price) {
            this.editForm.new_supplier_id = id;
            this.editForm.new_supplier_idname = name;
        },
        //监听供应商组件移除值事件，清除供应商数据
        clearSupplier: function() {
            this.editForm.new_supplier_id = '';
            this.editForm.new_supplier_idname = '';
        },


        //关闭清空数据
        handleClose: function() {
            this.dialogFormVisible = false;
            this.$refs['editForm'].resetFields();

        },
        //当就旧件数量发生变化计算旧件金额
        countPartCost: function() {
            this.editForm.new_partscost = this.editForm.new_price * this.editForm.new_qty;
        },
        //检测是否重复提交配件
        checkSameParts: function() {            
            if (this.partsArray==null||this.partsArray.length == 0) {
                return true;
            }
            else {
                for (var i in this.partsArray) {
                    if (this.partsArray[i].new_product_id == this.editForm.new_product_id) {
                        return false
                    }
                }
                return true;
            }
        }
    }
}
</script>
