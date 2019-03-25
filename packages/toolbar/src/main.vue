<template>
    <div class="rt-toolbar">
        <slot></slot>
        <template v-if="showBack || showAutoback">
            <div class="rt-divider"></div>
            <el-button type="text" @click="handleBackClick">{{$t('BUTTON_RETURN')}}</el-button>
        </template>
    </div>
</template>

<script>
export default {
  name: "RtToolbar",
  props: {
    showBack: {
      type: Boolean,
      default: false,
      required: false
    },
    showAutoback: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    handleBackClick() {
      if (this.showAutoback) {
        this.$router.back();
      } else {
        this.$emit("goback");
      }
    }
  }
};
</script>