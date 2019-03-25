      <!-- 新增弹框 -->
  <template>
    <div v-if="formDialog">
      <el-dialog title="用户列表" :visible.sync="formDialog" :show-close="true" :close-on-press-escape="false" :close-on-click-modal="false" width="580px">
        <el-form class="detail-form" label-position="center" label-width="175px">
          <el-table ref="gridTable" v-bind:data="userData" style="width: 100%" v-loading="loading" :default-sort="{prop: 'PublishDate', order: 'descending'}" height="250">
            <el-table-column type="selection" width="80" :selectable="isSelectedTable">
            </el-table-column>
            <el-table-column prop="fullname" sortable label="全名" width="120" align="center">
            </el-table-column>
            <el-table-column prop="domainname" label="用户名" width="180" align="center">
            </el-table-column>
            <el-table-column prop="businessunitid" label="业务部门" width="100" align="center">
            </el-table-column>
          </el-table>
          <el-form-item>
            <div class="user-detail-buttons" >
              <el-button class="Cancel-Footer" @click="beforeClose">取消</el-button>
              <el-button class="Confirm-Footer" type="primary" @click="addFlowRoleMember('editForm')">确认</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
      disabled: false,
      formDialog: false,
      loading: true,
      new_flowroleid: '',
      tableData: [],
      userData: [],
      systemuserid: [],
      selection: [],
      isneedCookie: false,
      dataTotalCount: 0,
      searchtype: 1
    }
  },
  watch: {},
  mounted: function() {
    if (this.$route.params.id) {
      this.new_flowroleid = this.$route.params.id
    }
  },
  computed: {},
  methods: {


    //Dialog取消按钮
    beforeClose() {
      this.formDialog = false
    },


    //获取全部系统用户
    getUserList() {
      this.loading = true
      let apiUrl = '../api/PortalFlowRole/GetUserList'
      this.isneedCookie = false
      let that = this
      rt
        .get(apiUrl)
        .then(res => {
          that.userData = res.flowRoleList
          that.loading = false
        })
        .catch(error => {
          rt.showErrorToast(error)
          that.loading = false
        })
    },


    //新增签核角色用户
    addFlowRoleMember(index, row) {
      var selection = this.$refs.gridTable.store.states.selection
      if (selection == null || selection.length == 0) {
        rt.showErrorToast(error)
        return
      }

      this.loading = true
      var systemuserid = []
      for (var i in selection) {
        systemuserid.push(selection[i].systemuserid)
      }
      var params = systemuserid
      let DelUrl =
        '../api/PortalFlowRole/AddFlowRoleMember?new_flowroleid=' +
        this.new_flowroleid
      let that = this
      rt
        .post(DelUrl, params)
        .then(res => {
          this.formDialog = false
          rt.showSuccessToast('新增成功！')
          this.$emit('a')
        })
        .catch(error => {
          rt.showErrorToast(error)
          that.loading = false
        })
    },

    show: function() {
      this.formDialog = true
      this.getUserList()
    },
    isSelectedTable: function() {
      if (this.disabled == true) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>