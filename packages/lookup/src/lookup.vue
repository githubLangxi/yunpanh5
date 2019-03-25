<template>
  <div class="rt-lookup">
    <el-input readonly :disabled="disabled" icon="search" v-model="lookupValue.name" :on-icon-click="showLookupDialog">
    </el-input>
    <rt-lookup-dialog ref="lookupDialog" :entity="entity" :request-url="dialogRequestUrl" :name-field="nameField" :id-field="idField"
      :display-fields="dialogDisplayFields" :orderby-fields="dialogOrderbyFields" :filter-fields="dialogFilterFields" @data-selected="handleDataSelected"></rt-lookup-dialog>
  </div>
</template>

<script>
  import RtLookupDialog from './lookup-dialog';

  export default {
    name: "RtLookup",
    props: {
      value: {
        type: Object,
        required: false
      },
      disabled: Boolean,
      entity: {
        type: String,
        required: true
      },
      nameField: String,
      idField: String,
      dialogRequestUrl: String,
      dialogDisplayFields: Array,
      dialogOrderbyFields: String,
      dialogFilterFields: String
    },
    components: {
      'rt-lookup-dialog': RtLookupDialog
    },
    created:function(){
       this.lookupValue = this.value;;
    },
    computed: {},
    data() {
      return {
        lookupValue: {},
      }
    },
    watch: {
      value(newValue) {
        this.lookupValue = newValue;
      }
    },
    methods: {
      showLookupDialog() {
        if (!this.disabled)
          this.$refs.lookupDialog.show();
      },
      handleDataSelected(val) {
        this.lookupValue = val;
        this.$emit("input", val);
      }
    }
  }

</script>
