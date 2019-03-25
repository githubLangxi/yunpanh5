<template>
    <el-dialog size="small" :title="$t('BUTTON_APPROVALPROGRESS')" :close-on-click-modal="false" :visible.sync="dialogVisible">
        <rt-approval-progress v-if="dialogVisible" :entity-name="entityName" :entity-id="entityId">
        </rt-approval-progress>
    </el-dialog>
</template>


<script>
import RtApprovalProgress from './progress'

export default {
    name: 'RtApprovalProgressDialog',
    components: {
        'rt-approval-progress': RtApprovalProgress
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    props: {
        entityName: {
            type: String,
            require: true
        },
        entityId: {
            type: String,
            require: true
        }
    },
    methods: {
        show() {
            this.dialogVisible = true;
        }
    }

}
</script>
