<template>
    <el-button type="text" @click="handleClick" @disabled="buttonDisabled">
        <i :class="iconClass"></i>
        {{buttonText}}
    </el-button>
</template>

<script>
export default {
  name: "RtButton",
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String
    }
  },
  data() {
    return {
      iconClass: null,
      buttonText: null,
      buttonDisabled: false
    };
  },
  created() {
    this.iconClass = "rt-icon-" + this.type;
    switch (this.type) {
      case "add":
        this.buttonText = this.text || this.$t("BUTTON_ADD");
        break;
      case "print":
        this.buttonText = this.text || this.$t("BUTTON_PRINT");
        break;
      case "confirm":
        this.buttonText = this.text || this.$t("BUTTON_DETERMINE");
        break;
      case "approve-progress":
        this.buttonText = this.text || this.$t("BUTTON_APPROVALPROGRESS");
        break;
      case "delete":
        this.buttonText = this.text || this.$t("BUTTON_DELETE");
        break;
      case "enable":
        this.buttonText = this.text || this.$t("BUTTON_ENABLE");
        break;
      case "disable":
        this.buttonText = this.text || this.$t("BUTTON_DISABLE");
        break;
      case "more":
        this.buttonText = this.text || this.$t("BUTTON_MORE");
        break;
      case "export":
        this.buttonText = this.text || this.$t("BUTTON_EXPORT");
        break;
      case "import":
        this.buttonText = this.text || this.$t("BUTTON_IMPORT");
        break;
      case "submit":
        this.buttonText = this.text || this.$t("BUTTON_SUBMIT");
        break;
      case "revert":
        this.buttonText = this.text || this.$t("BUTTON_WITHDRAW");
        break;
      case "download":
        this.buttonText = this.text || this.$t("BUTTON_DOWNLOAD");
        break;
      case "save":
        this.buttonText = this.text || this.$t("BUTTON_SAVE");
        break;
      case "btnsingle":
        this.buttonText = "接单";
        break;
      case "btnslip":
        this.buttonText = "转单";
        break;
      case "btndispatch":
        this.buttonText = "派工";
        break;
      case "btncompleted":
        this.buttonText = "完工" || this.$t("BUTTON_DETERMINE");
        break;
      default:
        this.iconClass = "";
        this.buttonText = this.text || "<Text>";
        break;
    }
  },
  methods: {
    handleClick() {
      if (this.buttonDisabled) return;
      this.buttonDisabled = true;
      this.$emit("click");
      this.buttonDisabled = false;
    },
  }
};
</script>