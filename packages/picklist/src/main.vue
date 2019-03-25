<template>
    <el-select v-model="selectedValue" clearable :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.Value" :label="item.Text" :value="item.Value">
            {{item.Text}}
        </el-option>
    </el-select>
</template>

<script type="text/javascript">
export default {
    name: "RtPicklist",
    props: {
        value: [String, Number],
        entity: {
            type: String,
            required: true
        },
        attribute: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            selectedValue: null,
            options: [],
        }
    },
    watch: {
        value(newVal, oldVal) {
            this.selectedValue = newVal;
        }
    },
    methods: {
        bindPicklist: function () {
            var self = this;
            rt.get("../api/crmpicklist/options/" + this.entity + "/" + this.attribute)
                .then(function (res) {
                    self.options = res;
                });
        },
        handleChange(val) {
            this.$emit("input", val);
        }
    },
    mounted: function () {
        this.bindPicklist();
    }
}
</script>