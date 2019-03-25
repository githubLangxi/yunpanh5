<template>
    <div class="icheckbox_div"  @click="chooseCheckbox(cValue,cLabel)">
        <span class="jqTransformCheckboxWrapper">
            <a href="javascript:void 0" class="jqTransformCheckbox" :class="list.indexOf(cValue)>-1?'jqTransformChecked':''">
              <i class="el-icon-check" :class="list.indexOf(cValue)>-1?'check_checked':'check_default'"></i>
            </a>
            <input type="checkbox" :value="cValue" class="checkboxOption">
        </span>
        <label class="option_label" style="cursor: pointer;">{{cLabel}}</label>
    </div>
</template>

<script>
export default {
  model: {
    prop: "list",
    event: "checkbox"
  },
  props: {
    cValue: {
      type: Number,
      value: ""
    },
    cLabel: {
      type: String,
      value: ""
    },
    list: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      emitList: []
    };
  },
  methods: {
    chooseCheckbox(value, label) {
      if (this.list.indexOf(value) < 0) {
        this.list.push(value);
      } else {
        let index = this.list.indexOf(value);
        this.list.splice(index, 1);
      }
      this.$emit("checkbox", this.list);
    }
  }
};
</script>

<style scoped>
.check_checked {
  display: block;
}
.check_default {
  display: none;
}
.icheckbox_div {
  position: relative;
  float: left;
  padding-left: 20px;
}
.jqTransformCheckbox {
  width: 14px;
  height: 14px;
  display: inline-block;
  /* line-height: 20px; */
  vertical-align: middle;
  border: solid 1px #ccc;
}
.option_label {
  font-size: 14px;
  height: 22px;
  color: #555555;
  line-height: 22px;
}
.jqTransformChecked {
  background: #1fb6d8;
  border: solid 1px #1fb6d8;
}
.checkboxOption {
  display: none;
}
.el-icon-check {
  color: #fff;
  line-height: 15px;
  font-size: 12px;
}
</style>
