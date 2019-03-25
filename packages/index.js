import Vue from 'vue';

import RtHeader from '../packages/header/src/main';
import RtContent from '../packages/content/src/main';
import RtToolbar from '../packages/toolbar/src/main';
import RtQuery from '../packages/query/src/main';
import RtGrid from '../packages/grid/src/main';
import RtPicklist from '../packages/picklist/src/main';
import RtButton from '../packages/button/src/main';
import RtSection from '../packages/section/src/main';
import RtNav from '../packages/nav/src/nav';
import RtNavItem from '../packages/nav/src/nav-item';
//Lookup
import RtLookup from '../packages/lookup/src/lookup';
import RtLookupDialog from '../packages/lookup/src/lookup-dialog';
//Excel导入
import RtExcelImportDialog from '../packages/excel-import/src/main';
//流程提交
import RtFlowSubmitDialog from '../packages/flow/src/submit-dialog';
//审批进度
import RtApprovalProgress from '../packages/approval/src/progress';
import RtApprovalProgressDialog from '../packages/approval/src/progress-dialog';

const components = [
    RtHeader,
    RtContent,
    RtToolbar,
    RtQuery,
    RtGrid,
    RtPicklist,
    RtButton,
    RtSection,
    RtNav,
    RtNavItem,
    RtLookup,
    RtLookupDialog,
    RtExcelImportDialog,
    RtFlowSubmitDialog,
    RtApprovalProgress,
    RtApprovalProgressDialog
];

export default {
    install: function (Vue, opts) {

        components.map(function (component) {
            Vue.component(component.name, component);
        });
    }
}